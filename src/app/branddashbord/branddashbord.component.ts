import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiService } from "../api.service";

@Component({
  selector: 'app-branddashbord',
  templateUrl: './branddashbord.component.html',
  styleUrls: ['./branddashbord.component.css']
})
export class BranddashbordComponent implements OnInit {
  pendingmodelapplicationarray: any=[];
  notpendingapplication_view: any=[];
  pendingmodelapplicationarray_skip: any= ['type','password','Contracts_Signed', 'created_at', '_id','username','email','status','date_iso_dateformat','regDate'];
  pendingmodelapplicationarray_modify_header: any = { 'date': 'Date','name':'Name','submissionprocess':'Submission Process','contractssigned':'Contracts Signed'};
  constructor(public router: Router,private route: ActivatedRoute, public apiservice: ApiService) { }

  ngOnInit() {
    this.route.data.forEach((data) =>{
      console.log('data');
      console.log(data['results']);
      this.pendingmodelapplicationarray = data['results'].item.brand;
    })
  }

}
