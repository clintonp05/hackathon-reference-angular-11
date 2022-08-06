import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { take } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/services/api.service';

import { AppConfigService } from '../../shared/services/app-config.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit,AfterViewInit {

  _id: string = '';
  productDetailObj: any = {};
  accountStatementList: Array<any> = [];
  readonly transactionLimit: number = 10;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private appConfigService: AppConfigService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params != null) {
        this._id = params.id; // logic here
      }
    });
    this.fetchProductDetailById();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
  }

  fetchProductDetailById() {
    this.apiService.getProductDetailsById(this._id)
      .pipe(take(1))
      .subscribe(
        (response: any) => {
          if (response.success) {
            switch (response.statusCode) {
              case this.appConfigService.STATUS_CODE_SUCCESS:
                this.productDetailObj = response.data;
                this.fetchAccountStatementByAccountId(this.productDetailObj.accountId);
                break;
              case this.appConfigService.STATUS_CODE_NO_CONTENT:
                break;
              case this.appConfigService.STATUS_CODE_INTERNAL_SERVER_ERROR:
                break;
              default:
                break;
            }
          } else {
            // api failure
          }
        },
        (error) => { },
        () => { }
      );
  }

  fetchAccountStatementByAccountId(accountId) {
    this.apiService.getStatementListByAccountId(accountId)
      .pipe(take(1))
      .subscribe(
        (response: any) => {
          if (response.success) {
            switch (response.statusCode) {
              case this.appConfigService.STATUS_CODE_SUCCESS:
                this.accountStatementList = Object.assign([], response.data);
                break;
              case this.appConfigService.STATUS_CODE_NO_CONTENT:
                break;
              case this.appConfigService.STATUS_CODE_INTERNAL_SERVER_ERROR:
                break;
              default:
                break;
            }
          } else {
            // api failure
          }
        },
        (error) => { },
        () => { }
      );
  }

  trackByStatementId(index: number, statement: any): string {
    return statement._id;
  }
}
