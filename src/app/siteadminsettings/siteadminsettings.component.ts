import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api.service';
import { Resolveservice } from '../resolveservice';

@Component({
  selector: 'app-siteadminsettings',
  templateUrl: './siteadminsettings.component.html',
  styleUrls: ['./siteadminsettings.component.css']
})
export class SiteadminsettingsComponent implements OnInit {
  public endpoint = 'addorupdatedata';
  public myForm: any;
  delurl='deletesingledata';
  tablename='siteadminemail';
  updateurl='addorupdatedata';


  siteadminlist: any=[];
  siteadminlist_skip: any= ['_id','username','phone','city','state','ethnicity','height','haircolor','eyecolor','weight','bust','waist','hips','slim','toned','tattoos','athletic','piercings','retail','voluptuous','promotions','sales','descriptionbox','facebooklink','twitterlink','instagramlink','modelmayhemlink','type','images'];
  siteadminlist_modify_header1: any = { 'dateformat': 'Date','status':'Status','email':'Email', 'name':'Full Name' , 'bodytype' : 'Bodytype' };


  constructor(public fb: FormBuilder, private cookieService: CookieService, public http: HttpClient, public apiService: ApiService, public router: Router, public resolveservice: Resolveservice) {
    this.siteadminlistfunc();
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])]
    });
  }

  onSubmit() {
    let data = this.myForm.value;
    let x: any;
    for (x in this.myForm.controls) {
      this.myForm.controls[x].markAsTouched();
    }
    if(this.myForm.valid){
      let data1 = {data: data,source:'siteadminemail'};
      this.apiService.postData(this.endpoint, data1).subscribe(res => {
        let result: any = {};
        result = res;
        if (result.status == 'success') {
          this.siteadminlistfunc();
        }
      }, error => {
        console.log('Oooops!');
      });

    }
  }


  siteadminlistfunc(){
        this.apiService.getData({'source':'siteadminemail'}).subscribe(res=> {
          let result:any;
          result = res;
          console.log('result==========================');
          console.log(result);
          if(result.res.length>0){
            this.siteadminlist = result.res;
          console.log(this.siteadminlist);
          }
        });
  }

  inputblur(val:any){
    console.log('on blur .....');
    this.myForm.controls[val].markAsUntouched();
  }
}
