import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from "@angular/forms";
import {MatDialog} from "@angular/material";
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-modalaudiodeadline',
  templateUrl: './modalaudiodeadline.component.html',
  styleUrls: ['./modalaudiodeadline.component.css']
})
export class ModalaudiodeadlineComponent implements OnInit {

  public myForm: any ;
  public today: number = Date.now();
  // constructor( public modal: MatDialog, public bf: FormBuilder) {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,public modal: MatDialog, public bf: FormBuilder) {
   // console.log(data);

   /* console.log('================');
    console.log(modal);
    console.log(modal.data.myForm);*/

   if(data.myForm!=null){
     this.myForm = this.bf.group({
       fullname: [data.myForm, Validators.required],
     })
   }else{
    this.myForm = this.bf.group({
      fullname: ['', Validators.required],
    })
  }
  }


  ngOnInit() {
  }
  onSubmit() {
    let data = this.myForm.value;
    console.log(data);
  }

}
