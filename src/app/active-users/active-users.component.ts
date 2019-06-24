import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiService } from "../api.service";
import {prevroute} from "../prevroute";
@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent implements OnInit {


  status_gretterthan_zero: any=[];
  status_gretterthan_zero_skip: any= ['_id','username','phone','city','state','ethnicity','height','haircolor','eyecolor','weight','bust','waist','hips','slim','toned','tattoos','athletic','piercings','retail','voluptuous','promotions','sales','descriptionbox','facebooklink','twitterlink','instagramlink','modelmayhemlink','type','images'];
  status_gretterthan_zero_modify_header: any = { 'dateformat': 'Date','status':'Status','email':'Email', 'name':'Full Name', 'bodytype' : 'Bodytype', 'shatterblok agreement date': 'Shatterblok Agreement Date', 'audiodeadline agreement date': 'Audiodeadline Agreement Date' };
  status_gretterthan_zero_detail_skip:any=['_id','email','name','type','status'];
  status_gretterthan_zero_detail_datatype:any=[{key:"images",value:'image',fileurl:this.apiservice.uplodeimg_url }];
  custom_link: any = [{label: 'Shatterblok-agreement',url:'http://shatterblok.com/testpdf/html2pdf/shatterblok-agreement.php?id=',action:'null'},{label: 'ArtistXP-agreement',url:'http://shatterblok.com/testpdf/html2pdf/artistxp-agreement.php?id=',action:'null'}];
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
      // this.status_gretterthan_zero=data['results'].item.pendingapplication_view;
      this.status_gretterthan_zero=data['results'].item.status_gretterthan_zero;
    })
  }

}
