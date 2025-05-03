import { ReactNode } from "react";
import { auth } from "@/lib/server-api/auth";
import { redirect } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { SessionStoreProvider } from "@/component/provider/session-provider";

export default async function ProtectedLayout({
    children
}: {
    children: ReactNode;
}) {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    const messages = await getMessages(session.locale || "ko");
    const locale = session.locale || "ko";
    console.log("session:", session);

    return (
        <SessionStoreProvider initialState={{ session }}>
            <NextIntlClientProvider locale={locale} messages={messages}>
                {children}
            </NextIntlClientProvider>
        </SessionStoreProvider>
    );
}
