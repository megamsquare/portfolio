import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileLayoutComponent } from './layouts/profile-layout/profile-layout.component';
import { ProfileLayoutHeaderComponent } from './layouts/profile-layout/profile-layout-header/profile-layout-header.component';
import { ProfileLayoutFooterComponent } from './layouts/profile-layout/profile-layout-footer/profile-layout-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileLayoutComponent,
    ProfileLayoutHeaderComponent,
    ProfileLayoutFooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
