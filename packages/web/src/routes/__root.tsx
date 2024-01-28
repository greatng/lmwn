import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import '/styles/index.css';

export const Route = createRootRoute({
    component: () => (
        <>
            <div className="h-screen flex flex-col bg-slate-100">
                <Outlet />
                <TanStackRouterDevtools />
            </div>
        </>
    ),
});

