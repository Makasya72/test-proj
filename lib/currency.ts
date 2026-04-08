export async function getJpyToRubRate(): Promise<number | null> {
    try {
      const response = await fetch(
        'https://api.frankfurter.dev/v2/rates?base=JPY&quotes=RUB',
        {
          method: 'GET',
          cache: 'no-store',
        }
      );
  
      if (!response.ok) {
        return null;
      }
  
      const data = await response.json();
      const rate = data?.rates?.RUB;
  
      if (typeof rate !== 'number' || !Number.isFinite(rate)) {
        return null;
      }
  
      return rate;
    } catch {
      return null;
    }
  }
  
  export function convertByRate(amount?: number | null, rate?: number | null) {
    if (!amount || !rate) return null;
    return Math.round(amount * rate);
  }