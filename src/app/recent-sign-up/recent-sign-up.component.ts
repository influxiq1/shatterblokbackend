import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiService } from "../api.service";
import {prevroute} from "../prevroute";

@Component({
  selector: 'app-recent-sign-up',
  templateUrl: './recent-sign-up.component.html',
  styleUrls: ['./recent-sign-up.component.css']
})
export class RecentSignUpComponent implements OnInit {
  pendingapplication_view: any=[];
  pendingapplication_view_skip: any= ['_id','username','phone','city','state','ethnicity','height','haircolor','eyecolor','weight','bust','waist','hips','slim','toned','tattoos','athletic','piercings','retail','voluptuous','promotions','sales','descriptionbox','facebooklink','twitterlink','instagramlink','modelmayhemlink','type','images'];
  pendingapplication_view_modify_header1: any = { 'dateformat': 'Date','status':'Status','email':'Email', 'name':'Full Name' , 'bodytype' : 'Bodytype' };
  pendingapplication_view_detail_skip:any=['_id','email','name','type','status'];
  pendingapplication_view_detail_datatype:any=[{key:"images",value:'image',fileurl:this.apiservice.uplodeimg_url }];
  statusarray:any=[{val:1,name:'Approve'},{val:4,name:'Decline'},{val:0,name:'Pending'},{val:3,name:'Dashboard Access'}];
  updateurl='addorupdatedata';
  delurl='deletesingledata';
  tablename='users';
  editroute1:any='modeledit';

  constructor(public router: Router,private route: ActivatedRoute, public apiservice: ApiService,public prevroute: prevroute) {
    let previousurl = this.prevroute.getPreviousUrl();
  }
  ngOnInit() {
    this.route.data.forEach((data) =>{
      console.log('json',data['results']);
      this.pendingapplication_view=data['results'].item.pendingapplication_view;
    })
  }

}
