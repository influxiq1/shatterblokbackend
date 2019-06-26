import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {Router} from "@angular/router";
import {ModalaudiodeadlineComponent} from "../modalaudiodeadline/modalaudiodeadline.component";
import {ApiService} from "../api.service";
import {CookieService} from "ngx-cookie-service";
import {AppComponent} from '../app.component'
import {Updatetest5} from "../modeldashboard/modeldashboard.component";
@Component({
  selector: 'app-audiodeadlinesgreement',
  templateUrl: './audiodeadlinesgreement.component.html',
  styleUrls: ['./audiodeadlinesgreement.component.css']
})
export class AudiodeadlinesgreementComponent implements OnInit {
  fullname: string;
  public errormsg: any;
  public name: any;
  public show: any = false;
  public successmsg: any;
  public endpoint = 'addorupdatedata';
  public endpoint1 = 'datalist';
  public today: number = Date.now();
  constructor(public modal: MatDialog, public apiservice: ApiService,public cookieService:CookieService, public router: Router, public appComponent: AppComponent) {
    console.log('id-- '+this.cookieService.get('id'));
    console.log(this.cookieService.getAll());
    window.scrollTo(0, 0);
    this.name = this.cookieService.get('firstname')+"  " + this.cookieService.get('lastname');
  }
  openDialog(){
    this.errormsg='';
    // console.log('-- '+this.fullname);
   /* const dialogRef = this.modal.open(ModalaudiodeadlineComponent);{
      data: {myForm : this.fullname}
    }*/
    const dialogRef = this.modal.open(ModalaudiodeadlineComponent, {
      data: {myForm : this.fullname}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.fullname = result;
      this.show = true;
      console.log('this.myForm');
      console.log(this.fullname);
    });
  }

  ngOnInit() {
  }
  onAgreement() {
    console.log(this.fullname);
    let data = {
      audiodeadline_sign: this.fullname,
      audiodeadline_agreement_date: new Date().getTime(),
      status: 3,
      id: this.cookieService.get('id'),
      create_a_user: true,
      name: this.name
    };
    let data1 = {data: data,source:'users'};
    console.log(data);
    if (this.fullname != '' && this.fullname!= null) {
      this.appComponent.loading = false;
      this.apiservice.postData(this.endpoint, data1).subscribe(res => {

        this.successmsg = true;
        let result: any = {};
        result = res;
        console.log('result');
        console.log(result);
        if (result.data.status == 'success') {
          let data2={_id: this.cookieService.get('id')};
          let data3 = {"condition": data2,source:'users'};
          this.apiservice.postData(this.endpoint1, data3).subscribe( res => {
            this.appComponent.loading = true;
            let result: any;
            result = res;
            const dialogRef = this.modal.open(Updatetest5, {
              data: {msg: 'Success! \n' +
                    'Your Model/Affiliate profile has been created on Shatter Blok and ArtistXP. To view and customize your ArtistXP profile even more go to www.artistxp.com and use the same login information that has been submitted here to access your account! '},
            });

            console.log("result.res[0].auidodeadineusername");
            console.log(result.res[0].auidodeadineusername);
            // this.cookieService.delete('status');
            this.cookieService.set('status', '3');
            console.log('success');
            console.log(this.cookieService.getAll());
            this.cookieService.set('modelaffiliateemail', result.res[0].auidodeadineusername);
            this.router.navigate(['/modeldashboard']);
          })
        }
      },error => {
        this.successmsg = false;
        this.onAgreement();
      })

    } else {
      this.errormsg = "Sign is required";
    }
  }

}



