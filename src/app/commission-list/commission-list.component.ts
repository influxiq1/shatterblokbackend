import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiService } from "../api.service";
import {prevroute} from "../prevroute";
import {AppComponent} from "../app.component";
import { CookieService } from 'ngx-cookie-service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-commission-list',
  templateUrl: './commission-list.component.html',
  styleUrls: ['./commission-list.component.css']
})
export class CommissionListComponent implements OnInit {
  datasource:any;
  endpoint:any = 'datalist';
  adminlist:any=[];
  editroutecommission:any='viewcommissiondetails';
public fullname: any;
public type: any;




  allordersdata:any=[];

  auidodeadinedata:any=[];
  auidodeadineusernamedataarr:any=[];

  allcommissions:any=[];
  allcommissions_skip: any= ['_id','parent','username','orderid','added_time','firstname','lastname'];
  allcommissions_modify_header1: any = { 'signupdate': 'Sign-Up Date', 'accounttype':'Account Type','noofsale':'# Of Sale','totalamount':'Total Commission','productname':'Product Name','email':'Email','fullname':'Name'};

  status_gretterthan_zero: any=[];


  statusarray:any=[{val:1,name:'Approve'},{val:4,name:'Decline'},{val:0,name:'Pending'},{val:3,name:'Dashboard Access'}];
  updateurl='addorupdatedata';
  delurl='deletesingledata';
  tablename='users';


  constructor(public router: Router,private route: ActivatedRoute, public apiservice: ApiService,public prevroute: prevroute, public appcomponent: AppComponent, public cookieService:CookieService) {
    let previousurl = this.prevroute.getPreviousUrl();
    //  console.log(previousurl);
    console.log(this.cookieService.getAll());
    this.fullname = this.cookieService.get('firstname')+''+this.cookieService.get('lastname');
    this.type = this.cookieService.get('type');
  }

  ngOnInit() {
    this.route.data.forEach((data) => {
      // PRE LOAD DATA PRIOR
      console.log(data);
      console.log('data from route ... !!!');
      console.log('json',data['results']);
    });
    if(this.type == 'admin' && this.type != ''){
    this.allcommissionfunc();
    } else if(this.type == 'model' && this.type != ''){
    this.allcommissionfunc_for_model();
    }
    this.allorders();
  }

  allcommissionfunc(){
    // this.appcomponent.loading = false;
    let data = {source:'newcommision_view'};
    console.log('--------------------------------------------');
    this.apiservice.postaffilite(this.endpoint, data).subscribe( res => {

      console.log('+++++++++++++++++++++++++++++++++++');
      let result: any;
      result = res;
      this.allcommissions=result.res;
      // this.appcomponent.loading = true;
      console.log('allcommissions');
      console.log(this.allcommissions);
    })
  }

  allcommissionfunc_for_model(){
    // this.appcomponent.loading = false;
    let data = {source:'newcommision_view',condition:this.fullname};
    console.log('--------------------------------------------');
    this.apiservice.postaffilite(this.endpoint, data).subscribe( res => {

      console.log('+++++++++++++++++++++++++++++++++++');
      let result: any;
      result = res;
      this.allcommissions=result.res;
      // this.appcomponent.loading = true;
      console.log('allcommissions');
      console.log(this.allcommissions);
    })
  }

  allorders(){
    let sourcecondition={auidodeadineusername:{$exists:true}};
    let data = {source:'users',condition:sourcecondition};
    this.apiservice.postData(this.endpoint, data).subscribe( res => {
      let result: any = {};
      result = res;
      /*this.auidodeadinedata=result.res;
      for(let i in this.auidodeadinedata){
        this.auidodeadineusernamedataarr.push(this.auidodeadinedata[i].auidodeadineusername);
      }*/
      console.log('auidodeadineusernamedataarr');
      // console.log(this.auidodeadineusernamedataarr);
      let data1={condition: {useremail: {$in:this.auidodeadineusernamedataarr}},source: "order_view"};
      this.apiservice.postaffilite(this.endpoint, data1).subscribe( res => {
        let result: any;
        result = res;
        this.allordersdata=result.res;
        console.log('allordersdata--------');
        console.log(this.allordersdata);
      })
    });
  }

}
