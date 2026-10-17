import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Geçersiz malzeme" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "eksik_malzeme.json");
    let existing: string[] = [];
    try {
      existing = JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch {}

    if (!existing.includes(name)) {
      existing.push(name);
      fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), "utf8");
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
