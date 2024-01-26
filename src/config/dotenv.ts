export const SENTRY_DSN: string = process.env.SENTRY_DSN!;

if (!SENTRY_DSN) {
  throw new Error('SENTRY_DSN must be set');
}
