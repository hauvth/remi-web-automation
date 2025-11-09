export function extractNumber(str: string): number | null {
  const match = str.match(/=\s*([\d,.]+)/);
  if (!match) return null;
  return parseFloat(match[1].replace(/,/g, ''));
}
