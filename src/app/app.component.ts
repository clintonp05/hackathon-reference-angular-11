import { Component, OnInit } from '@angular/core';
import { AppConfigService } from './shared/services/app-config.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'reference-app';
  hasLoggedIn : boolean = false;

  constructor( private appConfigService: AppConfigService ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.hasLoggedIn = this.appConfigService.getIsLoggedIn();
  }
  
  ngOnDestroy() {

  }
}
