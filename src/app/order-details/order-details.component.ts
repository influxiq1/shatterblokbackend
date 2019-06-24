import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiService } from "../api.service";
import {prevroute} from "../prevroute";


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  datasource:any;
  endpoint:any = 'datalist';
  adminlist:any=[];
  editrouteorder:any='vieworderdetails';
  editroutecommission:any='viewcommissiondetails';


  pendingapplication_view: any=[];


  joquuserlist: any=[];



  allordersdata:any=[];
  allordersdata_skip: any= ['userid','_id','zip','tax','state','productid','orderdetails','mode','city','media','shipping','userphone','firstname','lastname','useremail','subtotal','added_time','time','order_id','address','promocode'];
  allordersdata_modify_header1: any = { 'name':'Name','email':'Email', 'phone':'Phone', 'affiliate':'Enroller','sponsor':'Sponsor','mode':'Mode','transactionId':'Transaction Id','total':'Total','discount':'Discount','added_time':'Order Time','productname':'Product Name'};
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


  constructor(public router: Router,private route: ActivatedRoute, public apiservice: ApiService,public prevroute: prevroute) {
    let previousurl = this.prevroute.getPreviousUrl();
    //  console.log(previousurl);
  }

  ngOnInit() {
    this.route.data.forEach((data) => {
      // PRE LOAD DATA PRIOR
      console.log(data);
      console.log('data from route ... !!!');
      console.log('json',data['results']);
    });
    this.allcommissionfunc();
    this.allorders();
  }

  allcommissionfunc(){
    let data = {source:'newcommision_view'};
    // let data={condition: {username: "affiliateone"},source: "commission_details"};
    this.apiservice.postaffilite(this.endpoint, data).subscribe( res => {
      let result: any;
      result = res;
      this.allcommissions=result.res;
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
      this.auidodeadinedata=result.res;
      for(let i in this.auidodeadinedata){
        this.auidodeadineusernamedataarr.push(this.auidodeadinedata[i].auidodeadineusername);
      }
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
