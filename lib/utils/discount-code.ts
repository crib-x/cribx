/**
 * Generates a random discount code in the format XXXX-XXXX-XXXX
 */
export function generateDiscountCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segments = 3;
  const segmentLength = 4;
  
  const generateSegment = () => {
    return Array.from(
      { length: segmentLength }, 
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join('');
  };

  return Array.from(
    { length: segments }, 
    generateSegment
  ).join('-');
}
