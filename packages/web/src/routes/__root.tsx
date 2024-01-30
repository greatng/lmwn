import { createRootRoute, Outlet } from '@tanstack/react-router';
import '/styles/index.css';

export const Route = createRootRoute({
    component: () => (
        <div className="max-h-full min-h-svh pb-4 bg-slate-100">
            <Outlet />
        </div>
    ),
});

