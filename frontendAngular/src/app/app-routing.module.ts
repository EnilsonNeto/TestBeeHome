// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PasswordGeneratorComponent } from './components/password-generator/password-generator.component';

@NgModule({
  imports: [
    RouterModule.forRoot([ // Alterado para forRoot
      { path: '', component: PasswordGeneratorComponent }, // Redireciona diretamente para PasswordGeneratorComponent
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
