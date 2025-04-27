import Chat from "@/app/component/chat";
import { auth } from "@/lib/auth";

export default function Page() {
    const session = auth();
    return <Chat />

}