import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FeaturesComponent } from './features/features.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent }, // homepage
  { path: 'upload', component: FileUploadComponent },
  { path: 'features', component: FeaturesComponent },
  { path: '**', redirectTo: '' } // wildcard: redirect unknown paths to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
