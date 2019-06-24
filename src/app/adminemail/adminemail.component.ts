import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from "../api.service";
import { ActivatedRoute, Router} from "@angular/router";
import {Updatetest5} from "../modeldashboard/modeldashboard.component";
import { CookieService } from 'ngx-cookie-service';
import {MatDialog } from '@angular/material';
import {prevroute} from "../prevroute";

@Component({
  selector: 'app-adminemail',
  templateUrl: './adminemail.component.html',
  styleUrls: ['./adminemail.component.css']
})
export class AdminemailComponent implements OnInit {
public id: any;
public modeldata: any;
public profileimg: any;
public modelimage: any;
public secondimg: any;
public path: any;
  endpoint1:any='artistxpprofileimageupdate';
  endpoint:any='addorupdatedata';
  secondimageupdate:any='secondimgupdate';
  constructor(public route: ActivatedRoute, public router: Router, public apiService: ApiService, public cookieService: CookieService, public dialog: MatDialog,public prevroute: prevroute) {
    this.route.params.subscribe(params => {
      this.id = params.id;
      console.log('this.id');
      console.log(this.id);
    });
    this.route.data.forEach((data) => {
      console.log(data);
      this.modeldata = data['results'].result1[0];
      console.log(this.modeldata);
    })
  }


  ngOnInit() {
    if(this.modeldata.profile_img!=null){
      this.modelimage=this.apiService.uplodeimg_url+'/'+this.modeldata.profile_img;
      this.profileimg =this.modeldata.profile_img;
    }else{
      this.modelimage=this.apiService.uplodeimg_url+'/'+this.modeldata.images[0];
    }
    if(this.modeldata.second_img!=null) {
      this.secondimg = this.modeldata.second_img;
    }
  }
  changeimg(img) {
    this.modelimage = this.apiService.uplodeimg_url+'/'+img;
  }
  approve() {
    let data = {
      id: this.id,
      status: 1
    };
    let data1 = {data: data, source:'users'};
    this.apiService.postData(this.endpoint, data1).subscribe(res =>{
      let result: any = {};
      result=res;
      console.log('result');
      console.log(result);
      if (result.status == 'success') {}
      console.log('status uptodate');
    })
  }

  decline() {
    let data = {
      id: this.id,
      status: 4
    };
    console.log('data');
    console.log(data);
    let data1 = {data: data, source:'users'};
    this.apiService.postData(this.endpoint, data1).subscribe(res =>{
      let result: any = {};
      result=res;
      if (result.status == 'success') {}
      console.log('status uptodate');
    })
  }
  setprofilepictureimage(img:any){
    // console.log(img);
    let data={images:img,email:this.cookieService.get('email')};
    this.apiService.postData(this.endpoint1, data).subscribe( res => {
      let result: any = {};
      result = res;
      console.log('result');
      console.log(result);
      if (result.status == 'success') {
        // show a modal for update
        const dialogRef = this.dialog.open(Updatetest5, {
          data: {msg: 'Profile Image Updated'},
        });
      }
    })
  }
  setsecndpictureimage(img:any){
    let data={images:img,email:this.cookieService.get('email')};
    this.apiService.postData(this.secondimageupdate, data).subscribe( res => {
      let result: any = {};
      result = res;
      console.log('result');
      console.log(result);
      if (result.msg == 'success') {
        // show a modal for update
        const dialogRef = this.dialog.open(Updatetest5, {
          data: {msg: 'Image Updated'},
        });
      }
    })
  }

}
