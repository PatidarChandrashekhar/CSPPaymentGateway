import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transactions } from 'src/shared/transactions';
import { RestApiService } from 'src/shared/transaction-api.service';
import { FormGroup, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser'; // DOM data sanitizer //Sanitization in Angular
//Sanitization is the inspection of an untrusted value, turning it into a value that's safe to insert into the DOM. In many cases, sanitization doesn't change a value at all. Sanitization depends on context: A value that's harmless in CSS is potentially dangerous in a URL.
//HTML	Used when interpreting a value as HTML, for example, when binding to innerHtml.Style	Used when binding CSS into the style property.
//URL	Used for URL properties, such as <a href>.
//Resource URL	A URL that is loaded and executed as code, for example, in <script src>.

@Component({
  selector: 'app-root,input[type=date][ngModel], input[type=date][formControl]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'CSPPaymentGateway';
  public paymentGatewayurl: any;
  TransactionList: any = [];
  transactionArray: Transactions[] = [];
  htmlvalue: any;
  startdate: Date = new Date();
  enddate: Date = new Date();

  dateForm = new FormGroup({
    startdate: new FormControl(this.startdate.toISOString().split('T')[0]),
    enddate: new FormControl(this.enddate.toISOString().split('T')[0]),
  });

  constructor(
    public restApi: RestApiService,
    private router: Router,
    public sanitizer: DomSanitizer,
    public actRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    //DOM url sanitizer
    this.paymentGatewayurl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.paypal.com/ca/webapps/mpp/home'
    );
    this.htmlvalue = this.sanitizer.bypassSecurityTrustHtml(
      '<h1>DomSanitizer</h1><script>ourSafeCode()</script>'
    );
    //   console.log('URL DOM Sanitizer:', this.paymentGatewayurl);
  }

  navigateToTrack(element: any) {
    this.router.navigate(['/TransactionViewData/', element.id]);
    //this.router.navigate(['/TransactionViewData/', element.id], {
    //  queryParams: { tranStartDate: this.startdate, tranEndDate: this.enddate },
    //});
  }

  displayselectedTransaction() {
    //console.log(this.dateForm.value);
    console.log('StartDate', this.dateForm.get('startdate')?.value);
    console.log('EndDate', this.dateForm.get('enddate')?.value);

    this.restApi
      .findTransactionByDate(
        this.dateForm.get('startdate')?.value,
        this.dateForm.get('enddate')?.value
      )
      .subscribe((data) => {
        //Avoid unnecessary sensitive data exposure
        this.transactionArray = [];
        console.log('Date wise transactions:', data);
        this.TransactionList = data;
        for (const element of this.TransactionList) {
          let trans: Transactions;
          trans = {
            id: element.id,
            date: element.date,
            comments: element.Comments,
            status: element.status,
          };
          this.transactionArray.push(trans);
        }
      });
  }
}






















//CSS reference
//https://blog.logrocket.com/five-cool-css-header-styles-with-cross-browser-compatibility/
