// This is used only for Angular Universal or SSR (Server-Side Rendering). It defines extra routes or different behavior for server-rendered pages, often used for SEO, better performance, or when rendering happens on the server.

import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
