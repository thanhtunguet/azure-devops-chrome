import * as Sentry from '@sentry/react';
import {createRoot} from 'react-dom/client';
import {SENTRY_DSN} from './config/dotenv';

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
  });
}

const div = document.getElementById('root')!;
const root = createRoot(div);

root.render(<></>);
