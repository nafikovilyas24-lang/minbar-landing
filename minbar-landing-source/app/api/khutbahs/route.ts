import { uploadKhutba } from "@/lib/supabase-khutbas";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    await uploadKhutba(formData);
    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Не удалось загрузить хутбу.";
    return Response.json({ ok: false, message }, { status: 400 });
  }
}
