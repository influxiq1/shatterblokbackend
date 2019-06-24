import { Component, OnInit, Inject } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiService } from "../api.service";
import { CookieService } from 'ngx-cookie-service';
import { Resolveservice } from '../resolveservice';

@Component({
  selector: 'app-joquprocesslist',
  templateUrl: './joquprocesslist.component.html',
  styleUrls: ['./joquprocesslist.component.css']
})
export class JoquprocesslistComponent implements OnInit {
public joquprocesslist:any;
  joquprocesslist_skip: any= ['_id','instagramlink','shatterblok_user_id','joqu_status','city','state','unique_id','created at'];
  joquprocesslist_modify_header1: any = { 'firstname': 'First Name','lastname':'Last Name','email':'Email', 'age':'Age'};
  tablename='joquuser';
  statusarray:any=[{val:1,name:'Pending for process'},{val:2,name:'Processed by admin'},{val:3,name:'Approved from Joqu'},{val:4,name:'Decline'}];

  constructor(public apiservice: ApiService, public router: Router, private cookieService: CookieService,public route: ActivatedRoute, public resolveservice: Resolveservice ) {

  }

  ngOnInit() {
    this.route.data.forEach( (data) =>{
      console.log('data in proceslist');
      console.log(data);
      this.joquprocesslist = data['results'].res;
    });
  }

}
