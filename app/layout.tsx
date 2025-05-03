import getCustomLocale from "@/lib/server-api/getCustomLocale";
import { ReactNode } from "react";

export default async function RootLayout({
    children
}: {
    children: ReactNode;
}) {
    const locale = await getCustomLocale();
    console.log("rootLayout locale:", locale);

    return (
        <html lang={locale}>
            <body>{children}</body>
        </html>
    );
}
