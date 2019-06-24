import {Component, Inject, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
// import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../app/api.service';
export interface DialogData {
  msg: string;
}
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  public myForm: any;
  public error: any;
  public result: any;
  public show = false;
  public id: any;
  public endpoint = 'resetpasswordvalidate';
  public endpoint1 = 'updatepasswordwhenresetiig';
  public accesscode: any;

  constructor(  public _http: HttpClient, public fb: FormBuilder, private router: Router, public route : ActivatedRoute, public apiService: ApiService, public dialog: MatDialog) {
    this.route.params.subscribe(params => {
      this.accesscode = params['token'];
      console.log(this.accesscode);
      this.getuserdetails();
    });
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      confirmpassword: ['', Validators.required]},
        {validator: this.machpassword('password', 'confirmpassword')});
  }
  machpassword(passwordkye: string, confirmpasswordkye: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordkye],
          confirmpasswordInput = group.controls[confirmpasswordkye];
      if (passwordInput.value !== confirmpasswordInput.value) {
        return confirmpasswordInput.setErrors({notEquivalent: true});
      }
      else {
        return confirmpasswordInput.setErrors(null);
      }
    };
  }
  getuserdetails() {
    let data = {temp_forgetpass_key:this.accesscode};
    this.result = this.apiService.postDatawithoutToken(this.endpoint, data).subscribe(res => {
      let result: any = {};
      result = res;
      console.log('result.item');
      if (result.status == 'success') {
        this.show = true;
        this.id = result.data._id;

        // this.showmessage = 'We’ve sent an email to this address to reset your password.';
      }
      if (result.status == 'error') {
        console.log('open dialog');
        const dialogRef = this.dialog.open(Updatetest1, {
          // width: '250px',
          data: {msg: result.msg},

        });
        this.error = result.msg;
      }
    });
  }


  onSubmit() {
    let x: any;
    let data = {_id: this.id, password: this.myForm.value.password};
    console.log(data);
    console.log(this.myForm.value.password);
    console.log(this.myForm.value.confirmpassword);
    for (x in this.myForm.value) {
      console.log(this.myForm.controls[x]);
      this.myForm.controls[x].markAsTouched();
    }
    if (this.myForm.valid) {

      this.result = this.apiService.postDatawithoutToken(this.endpoint1, data).subscribe(res => {
        let result: any = {};
        result = res;
        console.log('result.item');
        console.log(result);
        if (result.status == 'success') {
          this.router.navigate(['/login']);
        }
        if (result.status == 'error') {
      //    const dialogRef = this.dialog.open(Dialogtest, {
          this.error = result.msg;
        }
        /*    // console.log(result.item);
            if (result.status == 'error1') {
              this.errormg = result.msg;
            }
            if (result.status == 'error2') {
              this.errormg = result.msg;
            }
            if (result.status == 'success') {
              this.showmessage = 'We’ve sent an email to this address to reset your password.';
            }*/
      });
    }
  }

}


/*@Component({
  selector: 'dialogtest',
  templateUrl: 'modal.html',
})
export class Dialogtest {
  public error: any;

  constructor(
      public dialogRef: MatDialogRef<Dialogtest>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.error=data.id;
  }*/

  @Component({
    selector: 'updatetest',
    templateUrl: '../commonmodals/updatemodal.html',
  })
  export class Updatetest1 {
  public modalmsg: any;

  constructor(
      public dialogRef: MatDialogRef<Updatetest1>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    console.log(data.msg);
    this.modalmsg=data.msg;

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
