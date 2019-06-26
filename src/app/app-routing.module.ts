import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminmanagementComponent} from './adminmanagement/adminmanagement.component';
import {LoginComponent} from './login/login.component';
import {BrandmanagementComponent} from './brandmanagement/brandmanagement.component';
import {InfluencersmanagementComponent} from "./influencersmanagement/influencersmanagement.component";
import {InfluencersdashbordComponent} from "./influencersdashbord/influencersdashbord.component";
import {BranddashbordComponent} from "./branddashbord/branddashbord.component";
import {AdmindashbordComponent} from "./admindashbord/admindashbord.component";
import { AuthGuard } from './auth.guard';
import {ForgatepasswordComponent} from './forgatepassword/forgatepassword.component';
import {ChangepasswordComponent} from './changepassword/changepassword.component';
import {AdminlistComponent} from "./adminlist/adminlist.component";
import {AdminformComponent} from "./adminform/adminform.component";
import {AdminmodalformComponent} from "./adminmodalform/adminmodalform.component";
import {ManagedashboardComponent} from "./managedashboard/managedashboard.component";
import {Resolveservice} from "./resolveservice";
import {ContractComponent} from "./contract/contract.component";
import {AgreementComponent} from "./agreement/agreement.component";
import {ModalComponent} from "./modal/modal.component";
import {AudiodeadlinesgreementComponent} from "./audiodeadlinesgreement/audiodeadlinesgreement.component";
import {ModalaudiodeadlineComponent} from "./modalaudiodeadline/modalaudiodeadline.component";
import {ModeldashboardComponent} from "./modeldashboard/modeldashboard.component";
import {AffilitemarketingComponent} from "./affilitemarketing/affilitemarketing.component";
import {UpdatesigninstatusComponent} from "./updatesigninstatus/updatesigninstatus.component";
import {AudiodeadlinecontentComponent} from "./audiodeadlinecontent/audiodeadlinecontent.component";
import {ModeleditComponent} from "./modeledit/modeledit.component";
import {JoqudashboardComponent} from "./joqudashboard/joqudashboard.component";
import {JoquprocesslistComponent} from "./joquprocesslist/joquprocesslist.component";
import {OrderDetailsComponent} from "./order-details/order-details.component";
import {ModelmyordersComponent} from "./modelmyorders/modelmyorders.component";
import {VieworderdetailsComponent} from "./vieworderdetails/vieworderdetails.component";
import {ViewcommissiondetailsComponent} from "./viewcommissiondetails/viewcommissiondetails.component";
import {ModelcommissionsComponent} from "./modelcommissions/modelcommissions.component";
import {SiteadminsettingsComponent} from "./siteadminsettings/siteadminsettings.component";
import {AdminemailComponent} from "./adminemail/adminemail.component";
import {AccountPageComponent} from "./account-page/account-page.component";
import {RecentSignUpComponent} from "./recent-sign-up/recent-sign-up.component";
import {ActiveUsersComponent} from "./active-users/active-users.component";
import {CommissionListComponent} from "./commission-list/commission-list.component";
import { FbComponent } from './fb/fb.component';

const routes: Routes = [
  { path: "admin", component: AdminmanagementComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent},
  { path: "recentSignUp", component: RecentSignUpComponent, canActivate:[AuthGuard], resolve: {results: Resolveservice}, data: {source: 'admindashboard'}},
  { path: "activeUsers", component: ActiveUsersComponent, canActivate:[AuthGuard], resolve: {results: Resolveservice}, data: {source: 'admindashboard'}},
  { path: "login/:path/:id", component: LoginComponent, resolve: {results: Resolveservice}, data: { source: 'allmodelllist', condition: {_id: 'id'}}},
  { path: "model_details/:id", component: AdminemailComponent, resolve: {results: Resolveservice}, data: { source: 'allmodelllist', condition: {_id: 'id'}}},
  { path: "brand", component: BrandmanagementComponent, canActivate: [AuthGuard] },
  { path: "influencers", component: InfluencersmanagementComponent, canActivate:[AuthGuard] },
  { path: "influencersdashboard", component: InfluencersdashbordComponent, canActivate: [AuthGuard]},

  { path: "contract", component: ContractComponent, canActivate: [AuthGuard]},
  // { path: "adminlist", component: AdminlistComponent, canActivate: [AuthGuard], resolve: {results: Resolveservice}, data: { source: 'users', condition: {} }},
  { path: "branddashboard", component: BranddashbordComponent, canActivate: [AuthGuard], resolve: { results: Resolveservice}, data: {source: 'admindashboard'}},
  { path: "admindashboard", component: AdmindashbordComponent, canActivate:[AuthGuard], resolve: {results: Resolveservice}, data: {source: 'admindashboard'}},  // resolve is use for this page PRE LOAD DATA PRIOR
  { path: 'forgetpassword', component: ForgatepasswordComponent},
  { path: 'modal', component: ModalComponent},

  { path: 'resetpassword/:token', component: ChangepasswordComponent},
  {path: 'adminlist', component: AdminlistComponent, canActivate: [AuthGuard], resolve: {results: Resolveservice}, data: { source:'admindashboard', condition:{}}},
  {path: 'adminform', component:AdminformComponent},
  {path: 'adminform/:pagename', component:AdminformComponent, canActivate: [AuthGuard] },
  {path: 'adminmodalform', component: AdminmodalformComponent, canActivate: [AuthGuard]},

  {path: 'managedashboard', component: ManagedashboardComponent, canActivate: [AuthGuard]},

  {path: 'agreement', component: AgreementComponent, canActivate: [AuthGuard]},
  {path: 'affilitemarketing', component: AffilitemarketingComponent, canActivate: [AuthGuard], resolve: {results: Resolveservice}, data: {server:'audiodeadline',source: 'datalist',condition: {"condition":{"type":7,"status":1},source:'mediaview'}}},


  {path: 'audioseadlineagreement', component: AudiodeadlinesgreementComponent},
  {path: 'audiodeadlinecontent', component: AudiodeadlinecontentComponent},
  {path: 'audiodeadlinemodal', component: ModalaudiodeadlineComponent},
  {path: 'modeldashboard', component: ModeldashboardComponent,canActivate:[AuthGuard], resolve: {results: Resolveservice}, data: {source: 'modeldashboard'}},
  {path: 'updatesigninstatus/:path/:userid', component: UpdatesigninstatusComponent},
  // {path: 'modeledit/:modelid', component: ModeleditComponent},
  {path: 'modeledit', component: ModeleditComponent},
  {path: 'edit-admin/:id', component: AccountPageComponent, canActivate:[AuthGuard]},
  // {path: 'admin-account/:pagename', component: AccountPageComponent},
  {path: 'modeledit/:pagename', component: ModeleditComponent},
  // {path: 'joqudashboard/:id', component: JoqudashboardComponent, canActivate:[AuthGuard], resolve: {results: Resolveservice}, data: {source: 'getjoqustatus', condition: {myid:'id'}}},
  {path: 'joqudashboard', component: JoqudashboardComponent, canActivate:[AuthGuard], resolve: {results: Resolveservice}, data: {source: 'getjoqustatus', condition: {myid:'id'}}},
  {path: 'joquprocesslist', component: JoquprocesslistComponent, canActivate:[AuthGuard], resolve: {results: Resolveservice}, data: {source: 'datalist',condition: {"condition":{"status":1},source:'joquuser'}}},
  {path: 'orderdetails', component: OrderDetailsComponent},
  {path: 'commissionList', component: CommissionListComponent, canActivate:[AuthGuard]},

  // {path: 'modelmyorders', component: ModelmyordersComponent, canActivate: [AuthGuard], resolve: { results: Resolveservice}, data: {server:'audiodeadline',source: 'datalist',condition: {"condition":{"userid_object":"5cb80dff74b8d41e0502fe77"},source: "order_view"}}},
  {path: 'modelmyorders', component: ModelmyordersComponent, canActivate: [AuthGuard], resolve: { results: Resolveservice}, data: {server:'audiodeadline',source: 'datalist',condition: {myid:"username"}}},

  {path: 'vieworderdetails', component: VieworderdetailsComponent},
  {path: 'vieworderdetails/:pagename', component: VieworderdetailsComponent, canActivate:[AuthGuard], resolve: {results: Resolveservice}, data: {server:'audiodeadlineforpostorder', source: 'vieworderdetails',condition: {myid:"orderid"}}},

  {path: 'viewcommissiondetails', component: ViewcommissiondetailsComponent, canActivate:[AuthGuard]},
  // {path: 'viewcommissiondetails/:pagename', component: ViewcommissiondetailsComponent, canActivate:[AuthGuard]},
  {path: 'viewcommissiondetails/:pagename', component: ViewcommissiondetailsComponent, canActivate:[AuthGuard], resolve: {results: Resolveservice}, data: {server:'audiodeadlineforcommission', source: "datalist",condition: {myid:"username"}}},


  {path: 'modelmycommissions', component: ModelcommissionsComponent, canActivate: [AuthGuard], resolve: { results: Resolveservice}, data: {server:'audiodeadline',source: 'datalist',condition: {myid:"commission"}}},
  {path: 'siteadminsettings', component: SiteadminsettingsComponent, canActivate: [AuthGuard]},
  {path: 'facebook', component: FbComponent},



  {path: '**', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
