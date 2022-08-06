import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/services/api.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  _id : string = '';
  productDetailObj : any = {};

  constructor( 
    private route: ActivatedRoute, 
    private apiService : ApiService 
  ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params != null) {
        this._id = params.id;
      }
    });
    this.fetchProductDetailById();
  }

  fetchProductDetailById() {
    this.apiService.sendGetRequest()
    .pipe(take(1))
    .subscribe(
      (response) => {
        if( response.status ) {
          
          if( response.statusCode ==  ) {

          }

          this.productDetailObj = response.results;

        } 

      },
      (error) => {},
      () => {}
    );
  }
}
