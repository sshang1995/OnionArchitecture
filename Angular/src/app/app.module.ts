import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { QuotesComponent } from './quotes/quotes.component';
import { LoginComponent } from './login/login.component';
import { AddEditQuotesComponent } from './quotes/add-edit-quotes/add-edit-quotes.component';
import { ShowQuotesComponent } from './quotes/show-quotes/show-quotes.component';
import { ShareService } from './share.service';
import { AppRoutingModule } from './route/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GuardService } from './guard.service';
import { FilterTextboxComponent } from './quotes/filter-textbox/filter-textbox.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    QuotesComponent,
    LoginComponent,
    AddEditQuotesComponent,
    ShowQuotesComponent,
    FilterTextboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
    
  ],
  providers: [ShareService, GuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
