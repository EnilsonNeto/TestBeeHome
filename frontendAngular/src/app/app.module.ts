import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PasswordGeneratorComponent } from './components/password-generator/password-generator.component';
import { PasswordHistoryComponent } from './components/password-history/password-history.component';
import { ProjectDescriptionComponent } from './components/project-description/project-description.component';

import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar'; import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { PasswordService } from '../shared/services/passwordService/password.service';
import { AlertService } from '../shared/services/alertService/alert.service';
import { NavigationComponent } from './components/navigation/navigation.component';


@NgModule({
  declarations: [
    AppComponent,
    PasswordGeneratorComponent,
    PasswordHistoryComponent,
    ProjectDescriptionComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    SweetAlert2Module,
    MatSliderModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatToolbarModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    PasswordService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
