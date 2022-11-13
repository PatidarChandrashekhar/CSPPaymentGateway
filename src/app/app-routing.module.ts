import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './TransactionList/app.component';
import { BrowserModule } from '@angular/platform-browser';

import { TransactionViewComponent } from './TransactionView/TransactionView.component';

const routes: Routes = [
  { path: 'TransactionViewData/:id', component: TransactionViewComponent },
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent],
})
export class AppRoutingModule {}
