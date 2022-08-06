import { analyzeAndValidateNgModules, ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/services/api.service';
import { AppConfigService } from 'src/app/shared/services/app-config.service';

@Component({
  selector: 'app-account-statement-info',
  templateUrl: './account-statement-info.component.html',
  styleUrls: ['./account-statement-info.component.scss']
})
export class AccountStatementInfoComponent implements OnInit {
  _id : string = ""; 
  statement :any ={};
  
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private apiService: ApiService,
    private appConfigService: AppConfigService
  ) 
  { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params != null) {
        this._id = params.id; // logic here
      }
    });
    this.fetchAccountStatementById(this._id);
  }

  fetchAccountStatementById(statementId) {
    this.apiService.getStatementById(this._id)
      .pipe(
        take(1))
      .subscribe(
        (response: any) => {
          if (response.success) {
            switch (response.statusCode) {
              case this.appConfigService.STATUS_CODE_SUCCESS:
                this.statement = response.data;
                this.statement.transactionTime = new Date(response.data.transactionTime);
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


  goBack() {
    this.router.navigate(['/productDetails/' + this.statement.accountId]);
  }

}
