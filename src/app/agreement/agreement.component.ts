import {Component, Input, OnInit,Inject} from '@angular/core';
 import {MatDialog} from '@angular/material';
import {Router, Route} from "@angular/router";
import {ModalComponent} from "../modal/modal.component";
import { ApiService } from '../../app/api.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.css']
})
export class AgreementComponent implements OnInit {
fullname: string;
public endpoint = 'addorupdatedata';
   public errmsg;
   public name;
    public today: number = Date.now();
  constructor(public modal: MatDialog, public apiservice: ApiService,public cookieService:CookieService, public router: Router,public dialog: MatDialog) {
      console.log('id-- '+this.cookieService.get('id'));
      window.scrollTo(0, 0);
      this.name = this.cookieService.get('firstname')+"  " + this.cookieService.get('lastname');
      console.log(this.name);
  }
  openDialog(){
      this.errmsg='';
      const dialogRef = this.modal.open(ModalComponent, {
          data: {myForm: this.fullname},
      });
      
      
    // const dialogRef = this.modal.open(ModalComponent);{
    //     data: {myForm : this.fullname}
    //   }

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.fullname = result;
      console.log('this.myForm');
      console.log(this.fullname);
    });
  }

  ngOnInit() {
      console.log(this.cookieService.getAll());
  }
    onAgreement() {
      console.log(this.fullname);
      let data = {
          shatterblok_sign: this.fullname,
          shatterblok_agreement_date: new Date().getTime(),
          status: 2,
          id: this.cookieService.get('id')
      };
      let data1 = {data: data,source:'users'};
      console.log(data);
        if(this.fullname!='' && this.fullname!=null){
      this.apiservice.postData(this.endpoint, data1).subscribe( res => {
          let result: any = {};
          result = res;
          console.log('result');
          console.log(result);
          if (result.status == 'success') {
              // this.cookieService.delete('status');
              console.log('okkkkkkkkkkkkk');
              console.log(typeof (this.cookieService.get('status')));
              this.cookieService.set('status', '2');

              console.log('success');
              console.log(this.cookieService.getAll());
              this.router.navigate(['/audioseadlineagreement']);
              // this.cookieService.set('status', result.res[0].status);
          } else {
              console.log('Ooops!!!');
              this.router.navigate(['/#']);
          }
      })
        }
        else{
            this.errmsg='Sign is required';
        }
    }
}
