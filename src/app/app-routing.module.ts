import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './customer/login/login.component';
import { RegisterComponent } from './customer/register/register.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AppComponent } from './app.component';
import { BarLoginComponent } from './bar-login/bar-login.component';
import { BarRegisterComponent } from './bar-register/bar-register.component';

const routes: Routes = [
  { path: 'app', component: AppComponent },
  { path: 'login', component: BarLoginComponent },
  { path: 'register', component: BarRegisterComponent },
  { path: 'toolbar', component: ToolbarComponent },

  // {
  //   path: 'toolbar',
  //   component: ToolbarComponent,
  //   children: [
  //     { path: 'login', component: LoginComponent },
  //     { path: 'register', component: RegisterComponent }
  //   ]
  // },

  {
    path: 'sidenav',
    component: SidenavComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
