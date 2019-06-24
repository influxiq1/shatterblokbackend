import { NgModule } from '@angular/core';
import { ListingComponent } from './listing.component';
import {DemoMaterialModule} from './materialmodules';
import { ApiService } from './api.service';

@NgModule({
  declarations: [ListingComponent],
  imports: [
    DemoMaterialModule
  ],
  exports: [ListingComponent],
  providers: [ApiService],
})
export class ListingModule { }
