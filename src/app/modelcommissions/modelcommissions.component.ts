import { Component, OnInit, Inject } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiService } from "../api.service";
import { CookieService } from 'ngx-cookie-service';
import { Resolveservice } from '../resolveservice';

@Component({
  selector: 'app-modelcommissions',
  templateUrl: './modelcommissions.component.html',
  styleUrls: ['./modelcommissions.component.css']
})
export class ModelcommissionsComponent implements OnInit {
  public modelcommissions:any=[];
  modelcommissions_skip: any= ['_id','parent','username','email'];
  modelcommissions_modify_header1: any = { 'signupdate': 'Sign-Up Date','firstname':'First name', 'lastname':'Last name', 'accounttype':'Account Type','noofsale':'# Of Sale','totalamount':'Total Commission'};
  editroutecommission:any='viewcommissiondetails';

  constructor(public apiservice: ApiService, public router: Router, private cookieService: CookieService,public route: ActivatedRoute, public resolveservice: Resolveservice ) {

  }

  ngOnInit() {
    this.route.data.forEach( (data) =>{
      console.log('data in proceslist');
      console.log(data);
      this.modelcommissions = data['results'].res;
    });
  }

}
