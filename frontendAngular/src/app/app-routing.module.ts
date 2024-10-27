import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PasswordGeneratorComponent } from './components/password-generator/password-generator.component';
import { ProjectDescriptionComponent } from './components/project-description/project-description.component';

@NgModule({
  imports: [
    RouterModule.forRoot([ 
      { path: '', component: ProjectDescriptionComponent },
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
