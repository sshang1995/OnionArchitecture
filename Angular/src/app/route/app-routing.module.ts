import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardService } from '../guard.service';
import { LoginComponent } from '../login/login.component';
import { QuotesComponent } from '../quotes/quotes.component';

const routes: Routes = [
    {path:'login', component:LoginComponent},
    {path:'quotes', component:QuotesComponent, canActivate:[GuardService]},
    {path: '', component:LoginComponent}
    ];
    @NgModule({
      imports: [RouterModule.forRoot(routes)],
      exports: [RouterModule]
    })
export class AppRoutingModule { }
    