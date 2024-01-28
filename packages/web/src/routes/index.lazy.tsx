import { createLazyFileRoute } from '@tanstack/react-router';

const Index = () => {
    return <div className="p-2">Hello from Index!</div>;
};

export const Route = createLazyFileRoute('/')({
    component: Index,
});

