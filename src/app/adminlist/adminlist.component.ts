import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {AdminformComponent} from "../adminform/adminform.component";
import {AdminmodalformComponent} from "../adminmodalform/adminmodalform.component";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../app/api.service';

@Component({
  selector: 'app-adminlist',
  templateUrl: './adminlist.component.html',
  styleUrls: ['./adminlist.component.css']
})

export class AdminlistComponent implements OnInit {
  displayedColumns: string[] = ['status', 'name', 'username', 'description', 'actions' ];
  dataSource: any ;
  dataSource1: any ;
  public result: any;
  public endpoint ='datalist';
  public editroute ='edit-admin';
  adminlist: any=[];
  adminlist_skip: any= ['_id','firstname','lastname','username','type','unique_id','joqu_status','password'];
  adminlist_modify_header: any = {'email': 'Email', 'phone': 'Phone', 'state': 'State', 'status': 'Status', 'date': 'Data', 'name': 'Name', 'State': 'State' };
  // status_gretterthan_zero_detail_skip:any=['_id','email','name','type','status'];
  statusarray:any=[{val:1,name:'Active'},{val:0,name:'Inactive'}];
  updateurapiurll='addorupdatedata';
  delurl='deletesingledata';
  click_to_add_ananother_page='/adminform';
  tablename='users';
  // editroute1:any='modeledit';


  constructor( public dialog:MatDialog, public apiservice: ApiService, public router :Router, public route: ActivatedRoute) {





  }

  ngOnInit() {
    this.route.data.forEach( (data) =>{
      console.log('data in resolve');
      console.log(data);
      this.adminlist = data['results'].item.adminlist;
      console.log('this.adminlist');
      console.log(this.adminlist);
      this.adminlist[0].state ='';
      console.log(this.adminlist[0].state);
      console.log(this.adminlist);

    })
  }
/*  openDialog(){
    const dialogRef= this.dialog.open(AdminmodalformComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }*/

  //  toogle views
 /* public show:boolean = true;
  public hide:boolean = false;
  public buttonName:any = 'ListView';

  toggle(){
    this.show = !this.show;
    this.hide = !this.hide;
    // CHANGE THE NAME OF THE BUTTON.
    if(this.show)
      this.buttonName = "GridView";
    else
      this.buttonName = "ListView";


  };
*/




}
