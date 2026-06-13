export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString();
}

export function formatRelativeDate(date: string | Date) {
  const d = new Date(date);
  return d.toLocaleDateString();
}

export function formatNumber(num: number) {
  return new Intl.NumberFormat().format(num);
}

export function capitalizeFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}