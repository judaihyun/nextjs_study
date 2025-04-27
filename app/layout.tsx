import getCustomLocale from '@/lib/getCustomLocale';
import { ReactNode } from 'react';

export default async function RootLayout({ children }: { children: ReactNode }) {

  const locale = await getCustomLocale();
  console.log('rootLayout locale:', locale);
  // 여기선 리다이렉트를 안함???
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}