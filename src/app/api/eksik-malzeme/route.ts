import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import { addIngredientName, validateIngredientName } from "@/lib/ingredient-request";

const filePath = path.join(process.cwd(), "eksik_malzeme.json");
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 10;

// shortcut: süreç bazlı limiting; birden fazla instance altında dağıtık değil,
// kalıcı çözüm Faz 3'te Supabase/kuyruk ile yapılacak.
const hits = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}

async function readNames(): Promise<string[]> {
  try {
    const parsed: unknown = JSON.parse(await fs.readFile(filePath, "utf8"));
    return Array.isArray(parsed) ? parsed.filter((n): n is string => typeof n === "string") : [];
  } catch {
    return [];
  }
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Çok fazla istek. Lütfen daha sonra tekrar deneyin." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const name = validateIngredientName(
    body && typeof body === "object" && "name" in body ? body.name : null
  );
  if (!name) {
    return NextResponse.json({ error: "Geçersiz malzeme adı." }, { status: 400 });
  }

  try {
    const names = addIngredientName(await readNames(), name);
    const tempPath = `${filePath}.${process.pid}.tmp`;
    await fs.writeFile(tempPath, JSON.stringify(names, null, 2), "utf8");
    await fs.rename(tempPath, filePath);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Kayıt şu anda yapılamıyor." }, { status: 503 });
  }
}
