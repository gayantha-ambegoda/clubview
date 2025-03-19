import { Routes } from '@angular/router';
import { SignInUpComponent } from './sign-in-up/sign-in-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FieldsComponent } from './pages/fields/fields.component';
import { authGuard } from './auth.guard';
import { ViewClubComponent } from './pages/view-club/view-club.component';

export const routes: Routes = [
    {
        path: '',
        component: SignInUpComponent
    },{
        path:'dashboard',
        component:DashboardComponent,
        canActivate: [authGuard]
    },{
        path:'fields',
        component:FieldsComponent,
        canActivate: [authGuard]
    },{
        path:'viewclub/:id',
        component:ViewClubComponent,
        canActivate:[authGuard]
    }
];
