import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';


import {ApiService} from '../../shared/services/api.service';

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.scss']
})
export class HelloWorldComponent implements OnInit {

  users : Array<any> = [];

  constructor( 
    private apiService : ApiService 
  ){}

  ngOnInit(): void {
    console.log("Hello World");
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    this.fetchUsers();
    
    /*
    this.router.navigate(['/route/' + _id]);

    this.route.params.subscribe(params => {
      if (params != null) {
        // this._id = params.id; // logic here
      }
    });
    
    
    this.route.queryParams.subscribe(params => {
      if (params != null) {
        if( params.queryParam == 'direct') {
          // logic here
        } 
      }
    });
    */
  }
  
  ngOnDestroy() {

  }

  fetchUsers() {
    this.apiService.sendGetRequest()
    .pipe(take(1))
    .subscribe(
      (response) => {
        this.users = response.results;
      },
      (error) => {},
      () => {}
    );
  }

  trackByUserId(index: number, user: any): string {
    return user.login.uuid;
  }

}
