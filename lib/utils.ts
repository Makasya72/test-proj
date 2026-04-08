export function formatJpy(value?: number | null) {
  if (value === null || value === undefined) return '—';
  return `¥ ${value.toLocaleString()}`;
}

export function formatKm(value?: number | null) {
  if (value === null || value === undefined) return '—';
  return `${value.toLocaleString()} km`;
}

export function getJpyToRubRate() {
  return 0.65;
}

export function convertJpyToRub(value?: number | null) {
  if (value === null || value === undefined) return null;
  const rate = getJpyToRubRate();
  return Math.round(value * rate);
}

export function formatRub(value?: number | null) {
  if (value === null || value === undefined) return '—';
  return `≈ ₽ ${value.toLocaleString()}`;
}