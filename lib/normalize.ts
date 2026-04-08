import { translateBrand } from './translate';

export function cleanText(input?: string | null) {
  if (!input) return null;
  return input.replace(/\s+/g, ' ').trim();
}

export function normalizeYear(input?: string | null) {
  const text = cleanText(input);
  if (!text) return null;
  const match = text.match(/(19|20)\d{2}/);
  return match ? Number(match[0]) : null;
}

export function normalizeMileageKm(input?: string | null) {
  const text = cleanText(input);
  if (!text) return null;
  const normalized = text.replace(/,/g, '');

  if (normalized.includes('万km')) {
    const value = parseFloat(normalized.replace('万km', ''));
    if (!Number.isNaN(value)) return Math.round(value * 10000);
  }

  const match = normalized.match(/(\d+(?:\.\d+)?)/);
  return match ? Math.round(Number(match[1])) : null;
}

export function normalizePriceJpy(input?: string | null) {
  const text = cleanText(input);
  if (!text) return null;
  const normalized = text.replace(/,/g, '');

  if (normalized.includes('万円')) {
    const value = parseFloat(normalized.replace(/[^\d.]/g, ''));
    if (!Number.isNaN(value)) return Math.round(value * 10000);
  }

  const digits = normalized.replace(/\D/g, '');
  return digits ? Number(digits) : null;
}

export function splitBrandModel(title?: string | null) {
  const text = cleanText(title);
  if (!text) return { brand: null, model: null };

  const parts = text.split(' ');
  const brand = translateBrand(parts[0]);
  const model = parts.slice(1).join(' ') || null;

  return { brand, model };
}
