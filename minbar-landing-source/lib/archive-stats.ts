import type { Khutba } from "@/lib/khutbas";

function countBy(items: Khutba[], key: "city" | "language" | "mosque") {
  return Array.from(items.reduce((map, item) => {
    const value = item[key];
    map.set(value, (map.get(value) ?? 0) + 1);
    return map;
  }, new Map<string, number>())).sort((a, b) => b[1] - a[1]);
}

export function getArchiveStats(items: Khutba[]) {
  const totalSeconds = items.reduce((sum, item) => sum + item.durationSeconds, 0);
  return {
    recordings: items.length,
    mosques: new Set(items.map((item) => item.mosque)).size,
    cities: new Set(items.map((item) => item.city)).size,
    languages: new Set(items.map((item) => item.language)).size,
    imams: new Set(items.map((item) => item.imam)).size,
    hours: Math.round(totalSeconds / 3600),
    byCity: countBy(items, "city"),
    byLanguage: countBy(items, "language"),
    byMosque: countBy(items, "mosque"),
  };
}
