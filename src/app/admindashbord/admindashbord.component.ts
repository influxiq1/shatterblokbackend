import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiService } from "../api.service";
import {prevroute} from "../prevroute";
import {AppComponent} from "../app.component";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-admindashbord',
  templateUrl: './admindashbord.component.html',
  styleUrls: ['./admindashbord.component.css']
})
export class AdmindashbordComponent implements OnInit {
    datasource:any;
    public id:any;
    public username:any;
    public lastname:any;
    public firstname:any;
    public enroller:any;
    endpoint:any = 'datalist';
    notpendingapplication_view: any=[];
    brandarray: any=[];
    adminlist:any=[];
    editroute1:any='modeledit';
    editrouteorder:any='vieworderdetails';
    editroutecommission:any='viewcommissiondetails';
public loading = false;

    custom_link: any = [{label: 'Shatterblok-agreement',url:'http://shatterblok.com/testpdf/html2pdf/shatterblok-agreement.php?id=',action:'null'},{label: 'ArtistXP-agreement',url:'http://shatterblok.com/testpdf/html2pdf/artistxp-agreement.php?id=',action:'null'}];
    pendingapplication_view: any=[];
    pendingapplication_view_skip: any= ['_id','username','phone','city','state','ethnicity','height','haircolor','eyecolor','weight','bust','waist','hips','slim','toned','tattoos','athletic','piercings','retail','voluptuous','promotions','sales','descriptionbox','facebooklink','twitterlink','instagramlink','modelmayhemlink','type','images'];
    pendingapplication_view_modify_header1: any = { 'dateformat': 'Date','status':'Status','email':'Email', 'name':'Full Name' , 'bodytype' : 'Bodytype' };
    pendingapplication_view_detail_skip:any=['_id','email','name','type','status'];
    pendingapplication_view_detail_datatype:any=[{key:"images",value:'image',fileurl:this.apiservice.uplodeimg_url }];


    joquuserlist: any=[];
    joquuserlist_skip: any= ['id','_id','instagramlink','shatterblok_user_id','joqu_status','city','state','unique_id','created at'];
    joquuserlist_modify_header1: any = { 'name': 'Full Name','lastname':'Last Name','email':'Email', 'age':'Age', 'dateformat':'Date','status':'Status','phone':'Phone'};
    joquuserlist_statusarray:any=[{val:1,name:'Pending for process'},{val:2,name:'Processed by admin'},{val:3,name:'Approved from Joqu'},{val:4,name:'Decline'}];


    allordersdata:any=[];
    allordersdata_skip: any= ['userid','_id','zip','tax','state','productid','orderdetails','mode','city','media','shipping','userphone','firstname','lastname','useremail','subtotal','added_time','time','order_id','address','promocode'];
    allordersdata_modify_header1: any = { 'name':'Name','email':'Email', 'phone':'Phone', 'affiliate':'Enroller','sponsor':'Sponsor','mode':'Mode','transactionId':'Transaction Id','total':'Total','discount':'Discount','added_time':'Order Time','productname':'Product Name'};
    auidodeadinedata:any=[];
    auidodeadineusernamedataarr:any=[];

    allcommissions:any=[];
    allcommissions_skip: any= ['_id','parent','username','orderid','added_time','firstname','lastname'];
    allcommissions_modify_header1: any = { 'signupdate': 'Sign-Up Date', 'accounttype':'Account Type','noofsale':'# Of Sale','totalamount':'Total Commission','productname':'Product Name','email':'Email','fullname':'Name'};

    allcommissions_view_detail_skip:any=['_id','email','name','type','status'];
    allcommissions_view_detail_datatype:any=[{key:"images",value:'image',fileurl:this.apiservice.uplodeimg_url }];


    status_gretterthan_zero: any=[];
    status_gretterthan_zero_skip: any= ['_id','username','phone','city','state','ethnicity','height','haircolor','eyecolor','weight','bust','waist','hips','slim','toned','tattoos','athletic','piercings','retail','voluptuous','promotions','sales','descriptionbox','facebooklink','twitterlink','instagramlink','modelmayhemlink','type','images'];
    status_gretterthan_zero_modify_header: any = { 'dateformat': 'Date','status':'Status','email':'Email', 'name':'Full Name', 'bodytype' : 'Bodytype', 'shatterblok agreement date': 'Shatterblok Agreement Date', 'audiodeadline agreement date': 'Audiodeadline Agreement Date' };
    status_gretterthan_zero_detail_skip:any=['_id','email','name','type','status'];
    status_gretterthan_zero_detail_datatype:any=[{key:"images",value:'image',fileurl:this.apiservice.uplodeimg_url }];



    model_pending_and_notpending_application_view: any=[];
    model_pending_and_notpending_application_view_skip: any= ['type','password','Contracts_Signed', 'created_at', '_id','username','email','status','date_iso_dateformat','regDate'];
    model_pending_and_notpending_application_view_modify_header: any = { 'date': 'Date','Age':'Age','name':'Name','submissionprocess':'Submission Process','contractssigned':'Contracts Signed'};



   // statusarray:any=[{val:1,name:'Approve'},{val:2,name:'Decline'},{val:4,name:'Lock'},{val:0,name:'Pending'},{val:3,name:'Dashboard Access'}];
    statusarray:any=[{val:1,name:'Approve'},{val:4,name:'Decline'},{val:0,name:'Pending'},{val:3,name:'Dashboard Access'}];
    updateurl='addorupdatedata';
    delurl='deletesingledata';
    tablename='users';
    tablename1='joquuser';
    tablename2='demoname';
    stateGroups:any = ['Alabama', 'Alaska', 'Arizona', 'Arkansas','California', 'Colorado', 'Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho', 'Illinois', 'Indiana', 'Iowa','Kansas', 'Kentucky','Louisiana','Maine', 'Maryland', 'Massachusetts', 'Michigan','Minnesota', 'Mississippi', 'Missouri', 'Montana','Nebraska', 'Nevada', 'New Hampshire', 'New Jersey','New Mexico', 'New York', 'North Carolina', 'North Dakota'];

    constructor(public router: Router,private route: ActivatedRoute, public apiservice: ApiService,public prevroute: prevroute, public cookieService: CookieService ) {
        let previousurl = this.prevroute.getPreviousUrl();
      //  console.log(previousurl);

        console.log(this.cookieService.getAll());
        this.id = this.cookieService.get('id');
        this.firstname = this.cookieService.get('firstname');
        this.lastname = this.cookieService.get('lastname');
        if(this.lastname != null && this.lastname !='undefined'){
        this.username = this.firstname +''+this.lastname;
        }
        this.enroller = this.cookieService.get('enroller');
        console.log(this.id);

        this.allcommission_for_model_func();

    }

    ngOnInit() {
        this.route.data.forEach((data) => {
            // PRE LOAD DATA PRIOR
            console.log(data);
            console.log('data from route ... !!!');
            console.log('json',data['results']);
            this.brandarray=data['results'].item.brand;
            this.status_gretterthan_zero=data['results'].item.status_gretterthan_zero;


            this.pendingapplication_view=data['results'].item.pendingapplication_view;
            this.joquuserlist=data['results'].item.joquusercollection_view;
            // this.model_pending_and_notpending_application_view=data['results'].item.model_pending_and_notpending_application_view;

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

    allcommission_for_model_func(){
        // let data = {source:'newcommision_view'};
        let data={condition: {parent: this.username},source: "new_newcommision_view"};
        console.log('data');
        console.log(data);
        this.apiservice.postaffilite(this.endpoint, data).subscribe( res => {
            let result: any;
            result = res;
            // console.log(res);
            console.log('result');
            console.log(result);
           /* this.allcommissions=result.res;
            console.log('allcommissions');
            console.log(this.allcommissions);*/
        })
    }

// himadri


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

