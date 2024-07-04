import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuardService } from "./services/auth-guard.service";
import { MemberGuard } from './guards/member.guard';
import { ManagerGuard } from './guards/manager.guard';

const routes: Routes = [
  {
    path: 'index',
    loadChildren: () =>
      import('./lazyPages/index/index.module').then((m) => m.IndexModule),
  },

  //搜尋
  {
    path: 'search',
    loadChildren: () =>
      import('./lazyPages/search/search.module').then((m) => m.SearchModule),
  },

  /* 未指定的預設值 */
  { path: '**', redirectTo: 'index' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      //換頁時自動捲到頂端: 'top'
      scrollPositionRestoration: 'top',
      /*anchorScrolling: "enabled" */
      // onSameUrlNavigation: "reload"

      //useHash 路由 #
      useHash: true,
      enableTracing: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
