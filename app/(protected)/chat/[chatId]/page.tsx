export default async function Page({
    params,
}: {
    params: Promise<{ chatId: string }>
}) {
    const { chatId } = await params;
    if (chatId === 'new') {
        console.log('new chatId:', chatId);
    } else {
        console.log('existing chatId:', chatId);
    }
    return <div>My Post: {chatId}</div>
}