import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiService } from "../api.service";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
public myFrom: FormGroup;
public endpoint = 'statusupdate';
public id: any;
  constructor(public apiservice: ApiService, private router: Router, private route: ActivatedRoute, public fb: FormBuilder) {
this.myFrom = this.fb.group({
  // fname: ['',Validators.required],
  status: ['',Validators.required],
})
    // this.apiservice.putData( this.endpoint, {}, i )
  }

  ngOnInit() {
this.id = this.apiservice.cookieService.get('id');
    console.log(this.apiservice.cookieService.get('id'));

  }
  onSubmit() {
    // let data: any = {};
    let data =  this.myFrom.value;
    console.log(data);
    data.id = this.id;
    data = {data: data};
    console.log(data);

    this.apiservice.postData(this.endpoint, data).subscribe( res => {
      let  result: any;
      result = res;
      console.log(result);
    });
  }

}
