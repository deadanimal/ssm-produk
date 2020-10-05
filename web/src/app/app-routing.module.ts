import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoreLayoutComponent } from './layouts/core-layout/core-layout.component';
import { AuthGuard } from './shared/guard/auth.guard';
// import { PagesModule } from './pages/pages.module';
// import { PublicModule } from './public/public.module';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: CoreLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./core/core.module').then(m => m.CoreModule),
        canActivate: [AuthGuard]
      },
      {
        path: '',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
      },
      {
        path: '',
        loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
      }
    ]

  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 64]
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
