import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiService } from "../api.service";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material";
import {Updatetest1} from "../changepassword/changepassword.component";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-updatesigninstatus',
  templateUrl: './updatesigninstatus.component.html',
  styleUrls: ['./updatesigninstatus.component.css']
})
export class UpdatesigninstatusComponent implements OnInit {
public path : any;
public userid : any;
public token : any;
public endpoint : any='createtoken';
public endpoint1 : any ='users';

    constructor(  public _http: HttpClient, public fb: FormBuilder, private router: Router, public route : ActivatedRoute, public apiService: ApiService, public dialog: MatDialog,private cookieService: CookieService) {
        this.route.params.subscribe(params => {
            this.path = params['path'];
            this.userid = params['userid'];
            console.log(this.path);
            if(this.path=='contract'){
                this.apiService.getDatawithouttoken(this.endpoint).subscribe(res => {
                    let result: any = {};
                    result = res;
                    if (result.status == 'success') {
                        this.token = result.oldtoken;
                        this.cookieService.set('jwttoken', result.token);
                        this.apiService.getData({'source':this.endpoint1,condition:{_id_object:this.userid}}).subscribe(res=> {
                            let result:any;
                            result = res;
                            if(result.res.length>0){
                             console.log('result.res---------------');
                             console.log(result.res);
                                this.cookieService.set('email', result.res[0].email);
                                this.cookieService.set('password', result.res[0].password);
                                this.cookieService.set('id', result.res[0]._id);
                                    if(result.res[0].status==1){
                                        this.router.navigate(['/agreement']);
                                    }
                                    if(result.res[0].status==2){
                                        this.router.navigate(['/audioseadlineagreement']);
                                    }
                                    if(result.res[0].status==3){
                                        this.router.navigate(['/modeldashboard']);
                                    }
                                    // if(result.item[0].status==4){
                                    //     this.errormg = 'The user is blocked';
                                    // }
                                    //  this.router.navigate(['/modeldashboard']);

                            }
                        });
                    }
                });



            }
        });
    }

  ngOnInit() {
  }

}
