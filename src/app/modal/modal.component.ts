import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog} from '@angular/material';
import {AgreementComponent} from "../agreement/agreement.component";
import { FormGroup, Validators, FormBuilder} from "@angular/forms";
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  public myForm: any ;
  public today: number = Date.now();

  // constructor( public modal: MatDialog, public bf: FormBuilder) {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public modal: MatDialog, public bf: FormBuilder) {
    // this.myForm = this.bf.group({
    //   fullname: ['', Validators.required],
    // })
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
  }

}
