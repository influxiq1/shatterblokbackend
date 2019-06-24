import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../app/api.service';

@Component({
  selector: 'app-viewcommissiondetails',
  templateUrl: './viewcommissiondetails.component.html',
  styleUrls: ['./viewcommissiondetails.component.css']
})
export class ViewcommissiondetailsComponent implements OnInit {
  // public username:any;
  public commissiondetails:any=[];
  commissiondetails_skip: any= ['_id','parent','username','email'];
  commissiondetails_modify_header1: any = { 'signupdate': 'Date','buyer':'Buyer', 'amount':'Amount', 'commission':'Commission'};

  constructor( public _http: HttpClient, private router: Router, public route : ActivatedRoute, public apiservice: ApiService) {
    // this.route.params.subscribe(params => {
    //   this.username = params['pagename'];
    //   console.log('this.username');
    //   console.log(this.username);
     //  this.getcommissiondetails();
    // });
  }

  ngOnInit() {
    this.route.data.forEach( (data) =>{
      console.log('data in proceslist');
      console.log(data);
      this.commissiondetails = data['results'].res;
    });
  }

/*  getcommissiondetails(){
    let sourcecondition={username:this.username};
    this.apiService.postaffilite('datalist',{'source':'commission_details',condition:sourcecondition}).subscribe(res=> {
      let result:any;
      result = res;
      if(result.res.length>0){
        console.log('commissiondetails');
          console.log(result.res);
          this.commissiondetails=result.res;
      }
    });
  }*/

}
