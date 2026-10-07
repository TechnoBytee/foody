import { createBrowserClient } from "@supabase/ssr";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Anahtarlar tanımlı değilse null döner; UI buna göre gizlenir.
export const supabase = url && key ? createBrowserClient(url, key) : null;
