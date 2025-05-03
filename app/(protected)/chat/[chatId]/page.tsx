import ChatContainer from "@/component/chat/ChatContainer";

export default async function Page({
    params
}: {
    params: Promise<{ chatId: string }>;
}) {
    const { chatId } = await params;
    if (chatId === "new") {
        console.log("new chatId:", chatId);
    } else {
        console.log("existing chatId:", chatId);
    }
    return (
        <div>
            <ChatContainer />
        </div>
    );
}
