let attempted = false;

/** Count a document opening, not client-side navigation or a visitor. */
export function countPageLoad(): void {
  if (attempted) return;
  attempted = true;
  if (
    !import.meta.env.PROD ||
    location.origin !== 'https://engender.barankiewicz.dev' ||
    location.pathname === '/' || !navigator.onLine
  ) return;

  void fetch('https://app.engender.barankiewicz.dev/_stats/website', {
    method: 'POST',
    credentials: 'omit',
    referrerPolicy: 'no-referrer',
    redirect: 'error',
    cache: 'no-store',
    keepalive: true
  }).catch(() => { /* Counts are best effort; no retries or offline queue. */ });
}
