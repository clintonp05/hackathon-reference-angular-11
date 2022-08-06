import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/services/api.service';

import { AppConfigService } from 'src/app/shared/services/app-config.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | any;

  constructor(
    private router:Router,
    private appConfigService: AppConfigService,
    private apiService : ApiService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email,Validators.pattern(
        '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
      ),]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {

  }

  onSubmit(){
    if(!this.loginForm.valid){
      return;
    }
    this.loginAuthenticate(this.loginForm);
    this.router.navigate(['/home'])
  }

  loginAuthenticate(payload : FormGroup) {
    this.apiService.authenticateUser(payload)
      .pipe(
        take(1))
      .subscribe(
        (response: any) => {
          if (response.success) {
            switch (response.statusCode) {
              case this.appConfigService.STATUS_CODE_SUCCESS:
                this.appConfigService.setAccessToken(response.data.value)
                this.appConfigService.setIsLoggedIn("true");
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

}
