import {Component, OnInit, EventEmitter, TemplateRef, ViewChild, ElementRef, Inject} from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl} from '@angular/forms';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions, UploadStatus } from 'ngx-uploader';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from "../api.service";
// import { prevroute } from "../prevroute";
import {CookieService} from "ngx-cookie-service";
// import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-vieworderdetails',
  templateUrl: './vieworderdetails.component.html',
  styleUrls: ['./vieworderdetails.component.css']
})
export class VieworderdetailsComponent implements OnInit {
  public orderdetails : any;
  public orderdetailsarr : any;
  displayedColumns: string[] = ['title', 'categoryname', 'quantity', 'price', 'subtotal'];

  constructor(  public _http: HttpClient, private router: Router, public route : ActivatedRoute, public apiservice: ApiService,public cookieService: CookieService) {
  }

  ngOnInit() {
    this.route.data.forEach( (data) =>{
      // console.log('data in resolve');
      // console.log(data);
      this.orderdetails = data['results'].data[0];
      console.log(this.orderdetails);
      this.orderdetailsarr =  this.orderdetails.orderdetails;
     console.log('this.orderdetailsarr');
     console.log(this.orderdetailsarr);
    });
/*    let data1;
    if(this.orderid==null){
      data1={_id:this.cookieService.get('id')};
    }else{
      data1={_id:this.orderid};
    }
   this.apiservice.postorderdetails(this.endpoint, data1).subscribe( res => {
      let result:any;
      result = res;
      console.log(result);
      if(result.data.length>0){
        this.orderdata=result.data[0];
        console.log('this.orderdata');
        console.log(this.orderdata);
      }
    });*/
  }
}