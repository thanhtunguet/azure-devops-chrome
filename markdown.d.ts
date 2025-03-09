import type {FC} from 'react';

declare module '*.md' {
  const content: FC;
  export default content;
}
