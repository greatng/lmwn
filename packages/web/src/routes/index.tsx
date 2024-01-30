import { createFileRoute } from '@tanstack/react-router';

const Main = () => {
    return (
        <div className="flex flex-col h-svh w-full justify-center items-center gap-4">
            <h1 className="text-2xl md:text-3xl">
                <a href="/567051">ร้านลืมเคี้ยว</a>
            </h1>
            <h1 className="text-2xl md:text-3xl">
                <a href="/227018">Ekkamai Macchiato - Home Brewer</a>
            </h1>
        </div>
    );
};

export const Route = createFileRoute('/')({
    component: Main,
});

