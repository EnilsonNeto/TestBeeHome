import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PasswordGeneratorComponent } from './components/password-generator/password-generator.component';

@NgModule({
  imports: [
    RouterModule.forRoot([ 
      { path: '', component: PasswordGeneratorComponent },
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
