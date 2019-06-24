import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../api.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-adminform',
  templateUrl: './adminform.component.html',
  styleUrls: ['./adminform.component.css']
})
export class AdminformComponent implements OnInit {
  public myForm: any;
  public id: any;
  public adminid: any;
  public admindata: any;
  public stateslist: any;
  public endpoint: any = 'frontendsignup';
  public endpoint1: any = 'datalist';
  constructor(public fb: FormBuilder, private cookieService: CookieService, public http: HttpClient, public apiService: ApiService, public router: Router, public route: ActivatedRoute) {
    this.apiService.getState().subscribe(res => {
      let result;
      result = res;
      this.stateslist = result;
    }, error => {
      console.log('Oooops!');
    });


    this.myForm = this.fb.group({
      id: [''],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
      address: ['', Validators.required],
      address2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
      type: ['admin'],
      status: 1,
    }, {validator: this.machpassword('password', 'confirmpassword')});
  }

  ngOnInit() {
    /*this.route.params.subscribe(params => {
      this.adminid = params['pagename'];
      console.log(this.adminid);
      let data1;
      /!*if(this.adminid==null){
        data1={_id:this.cookieService.get('id')};
      }else{
        data1={_id:this.adminid};
      }*!/

      let data2 = {"condition": data1,source:'users'};
      this.apiService.postData(this.endpoint1, data2).subscribe( res => {
        let result:any;
        result = res;
        console.log(result);
        if(result.res.length>0){
          this.admindata=result.res[0];
          console.log('this.modeldata');
          console.log(this.admindata);
           this.id = this.admindata._id
          console.log('this.id');
          console.log(this.id);
          // console.log(this.modeldata.images);
          // this.modeldataimages = this.modeldata.images;
          console.log('==========================');
          // console.log(this.modeldataimages.length);
          this.myForm = this.fb.group({
                id: [this.id],
                firstname: [this.admindata.firstname, Validators.required],
                lastname: [this.admindata.lastname, Validators.required],
                username: [this.admindata.username, Validators.required],
                phone: [this.admindata.phone, Validators.required],
                address: [this.admindata.address, Validators.required],
                address2: [this.admindata.address2, Validators.required],
                email: [this.admindata.email, Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],
                city: [this.admindata.city, Validators.required],
                state: [this.admindata.state, Validators.required],
                zipcode: [this.admindata.zipcode, Validators.required],
                 password: [this.admindata.password, Validators.required],
                 confirmpassword: [this.admindata.confirmpassword, Validators.required],
                type: ['admin'],
                status: 1,
              }
              , {validator: this.machpassword('password', 'confirmpassword')}
          );
         /!* this.profileimg =this.modeldata.profile_img;
          this.secondimg =this.modeldata.second_img;*!/
        }
      });
    });*/
  }

  machpassword(passwordkye: string, confirmpasswordkye: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordkye],
          confirmpasswordInput = group.controls[confirmpasswordkye];
      if (passwordInput.value !== confirmpasswordInput.value) {
        return confirmpasswordInput.setErrors({notEquivalent: true});
      } else {
        return confirmpasswordInput.setErrors(null);
      }
    };
  };



  inputblur(val:any){
    console.log('on blur .....');
    this.myForm.controls[val].markAsUntouched();
  }
  onSubmit() {
    let x: any;
    let data = this.myForm.value;
    for (x in this.myForm.controls) {
      this.myForm.controls[x].markAsTouched();
    }
    console.log(data);
    // let data1 = {data: data,source:'users'};
    let data1;
    if(this.myForm.controls['this.id'].value!=''){
      console.log(1);
      data = this.myForm.value;
      data1 = {data: data,source:'users'};
    }else{
      console.log(2);
      data = {
        id:this.myForm.controls['id'].value,
        firstname:this.myForm.controls['firstname'].value,
        lastname:this.myForm.controls['lastname'].value,
        username:this.myForm.controls['username'].value,
        phone:this.myForm.controls['phone'].value,
        address:this.myForm.controls['address'].value,
        address2:this.myForm.controls['address2'].value,
        email:this.myForm.controls['email'].value,
        city:this.myForm.controls['city'].value,
        state:this.myForm.controls['state'].value,
        status:this.myForm.value['status'],
        zipcode:this.myForm.value['zipcode'],
        type:this.myForm.value['type'],
      };
      data1 = {data: data,source:'users'};
    }
    this.apiService.postData(this.endpoint, data1).subscribe(res => {
      console.log('okkk');
      let result: any = {};
      result = res;
      if (result.status == 'success') {
        console.log('okkk');
        this.myForm.reset();
      }
    });
  }

}
