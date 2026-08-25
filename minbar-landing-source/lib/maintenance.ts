export type MaintenanceState = {
  enabled: boolean;
  until: string | null;
};

type SiteSetting = {
  value: Partial<MaintenanceState> | null;
};

function getConfig() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return url && key ? { url: url.replace(/\/$/, ""), key } : null;
}

export async function loadMaintenanceState(): Promise<MaintenanceState> {
  const config = getConfig();
  if (!config) return { enabled: false, until: null };

  try {
    const response = await fetch(
      `${config.url}/rest/v1/site_settings?key=eq.maintenance&select=value&limit=1`,
      {
        headers: { apikey: config.key, Authorization: `Bearer ${config.key}` },
        cache: "no-store",
      },
    );
    if (!response.ok) return { enabled: false, until: null };

    const records = await response.json() as SiteSetting[];
    const value = records[0]?.value;
    const until = typeof value?.until === "string" ? value.until : null;
    const expired = until ? new Date(until).getTime() <= Date.now() : false;

    return {
      enabled: value?.enabled === true && !expired,
      until,
    };
  } catch {
    return { enabled: false, until: null };
  }
}
