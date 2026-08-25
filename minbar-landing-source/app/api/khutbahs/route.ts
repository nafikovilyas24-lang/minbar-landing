import { uploadKhutba } from "@/lib/supabase-khutbas";
import { loadMaintenanceState } from "@/lib/maintenance";

export async function POST(request: Request) {
  try {
    const maintenance = await loadMaintenanceState();
    if (maintenance.enabled) {
      return Response.json(
        { ok: false, message: "Сейчас в Minbar идут технические работы. Попробуйте позже." },
        { status: 503 },
      );
    }
    const formData = await request.formData();
    await uploadKhutba(formData);
    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Не удалось загрузить хутбу.";
    return Response.json({ ok: false, message }, { status: 400 });
  }
}
