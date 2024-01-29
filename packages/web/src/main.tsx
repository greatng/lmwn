import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider, createRouter } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

ReactDOM.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
    document.getElementById('root')
);

