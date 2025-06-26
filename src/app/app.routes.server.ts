import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
    {
    path: 'exam/:subjectId',
    renderMode:RenderMode.Server
  }
  ,
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
