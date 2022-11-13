import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/shared/transaction-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Transactions } from 'src/shared/transactions';

@Component({
  selector: 'app-employee-details',
  templateUrl: './TransactionView.component.html',
  styleUrls: ['./TransactionView.component.scss'],
})
export class TransactionViewComponent implements OnInit {
  id = '';
  TransactionViewData: Transactions[] = [];
  tranStartDate: any;
  tranEndDate: any;

  constructor(
    public restApi: RestApiService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) {
    //getting query params
    this.actRoute.queryParams.subscribe((queryParams) => {
      this.tranStartDate = queryParams['tranStartDate'];
      this.tranEndDate = queryParams['tranEndDate'];
      console.log('tranStartDate: ', this.tranStartDate);
      console.log('tranEndDate: ', this.tranEndDate);
    });

    this.actRoute.params.subscribe((params) => {
      this.id = params['id'];
      console.log('this.id-', this.id);
      this.restApi.getTransaction(this.id).subscribe((data) => {
        this.TransactionViewData = [];
        this.TransactionViewData.push(data);
        console.log('Data-', data);
      });
    });
  }

  ngOnInit() {}
}
