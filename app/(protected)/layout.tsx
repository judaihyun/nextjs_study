import { ReactNode } from 'react';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { SessionProvider } from '../../component/provider/session-provider';
import { NextIntlClientProvider } from 'next-intl';
import getLocale from '@/lib/getCustomLocale';
import { getMessages } from 'next-intl/server';

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
    const session = await auth();
    console.log('session:', session);

    if (!session) {
        redirect('/login');
    }

    const messages = await getMessages(session.locale || 'ko');
    const locale = session.locale || 'ko';
    console.log('messages:', messages);

    return (
        <SessionProvider session={session} >
            <NextIntlClientProvider locale={locale} messages={messages}>
                {children}
            </NextIntlClientProvider>
        </SessionProvider>
    );
}
