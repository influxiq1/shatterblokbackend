import { Component, OnInit, Inject } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiService } from "../api.service";
import { CookieService } from 'ngx-cookie-service';
import { Resolveservice } from '../resolveservice';

@Component({
  selector: 'app-modelmyorders',
  templateUrl: './modelmyorders.component.html',
  styleUrls: ['./modelmyorders.component.css']
})
export class ModelmyordersComponent implements OnInit {
  public modelmyorders:any=[];
  modelmyorders_skip: any= ['userid','_id','zip','tax','state','productid','orderdetails','mode','city','media','shipping','userphone','firstname','lastname','useremail','subtotal'];
  modelmyorders_modify_header1: any = { 'fullname': 'Name','email':'Email', 'phone':'Phone', 'affiliate':'Enroller','sponsor':'Sponsor','mode':'Mode','transactionId':'Transaction Id','total':'Total','promocode':'Promocode','discount':'Discount','added_time':'Order Time'};
  editrouteorder:any='vieworderdetails';

  constructor(public apiservice: ApiService, public router: Router, private cookieService: CookieService,public route: ActivatedRoute, public resolveservice: Resolveservice ) {

  }

  ngOnInit() {
    this.route.data.forEach( (data) =>{
      console.log('data in proceslist');
      console.log(data);
      this.modelmyorders = data['results'].res;
    });
  }

}
