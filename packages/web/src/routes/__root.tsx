import { createRootRoute, Outlet } from '@tanstack/react-router';
import '/styles/index.css';

export const Route = createRootRoute({
    component: () => (
        <>
            <div className="min-h-screen max-h-full bg-slate-100">
                <Outlet />
            </div>
        </>
    ),
});

