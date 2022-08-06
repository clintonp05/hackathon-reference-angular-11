import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { switchMap, take } from 'rxjs/operators';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-home',
  templateUrl: './account-home.component.html',
  styleUrls: ['./account-home.component.scss']
})
export class AccountHomeComponent implements OnInit {

  products : Array<any> = [];
  accountData : any = {};
  constructor( private apiService : ApiService, private appConfigService: AppConfigService, public router: Router, ){}

  ngOnInit(): void {
    this.loadAccountData();
  }

  ngOnDestroy() {  }

  loadAccountData() {
    let payload = {'username' : 'clinton'};
    this.apiService.getProductsForUser(payload)
    .pipe(take(1))
    .subscribe(
      (response : any) => {
        if (response.success) {
          switch (response.statusCode) {
            case this.appConfigService.STATUS_CODE_SUCCESS:
              this.products = Object.assign([],response.data) ;
              this.accountData = this.products[0];
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
      (error) => {},
      () => {}
    );
  }

  trackByProductId(index: number, product: any) {
    return product.id;
  }

  callTransfer(_id : string) {
    this.router.navigate(['/transfer/' + _id]);
  }

  callAccountDetail(_id : string) {
    this.router.navigate(['/productDetails/'+ _id]);
  }
}
