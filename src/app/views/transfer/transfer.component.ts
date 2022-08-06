import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { AppConfigService } from '../../shared/services/app-config.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {


  benificairy: any;
  currentDate = new Date();
  enquiryForm: FormGroup;
  successBalance: any;
  updatebalnce = false;
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.fetchBenificairy();
    this.initForm();
  }
  
  private initForm() {
    this.enquiryForm = new FormGroup({
      Balance: new FormControl(null,),
      Origin: new FormControl(null),
      Desitnation: new FormControl(null,[Validators.required]),
      currentDate: new FormControl(null),
      enterAmount: new FormControl(null, [ Validators.required,
        Validators.maxLength(15),Validators.pattern("^[0-9]*$"), ]),
      Comments: new FormControl(null, [ Validators.required ]),
    });

    return this.enquiryForm;
  }

  fetchBenificairy() {
    this.apiService.getBenficiaryDetails().subscribe(
      (response:any) => {
        if (response != null) {
          this.benificairy = response.data;
        }
      },
      (error) => {
        // this.snackbar.error(
        //   error.name + ' ' + error.status + '' + error.statusText
        // );
      }
    );
  }

  onSubmit(){
    if (this.enquiryForm?.valid) {
      this.apiService.Transferto(this.enquiryForm.value).subscribe(
              (response: any) => {
                this.updatebalnce = true
                this.successBalance = response.data.balance
                setTimeout(()=>{                           // <<<---using ()=> syntax
                  this.router.navigateByUrl('home')
              }, 1500);
              },
              (error) => {
               
              }
            );
    }

  }

  goBack() {
    this.router.navigate(['/home/']);
  }
  
}
