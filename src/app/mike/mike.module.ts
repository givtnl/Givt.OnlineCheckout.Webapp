import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MikeRoutingModule } from './mike-routing.module';
import { MikeComponent } from './app/app/mike.component';
import { CoreModule } from './app/core/core.module';

@NgModule({
  imports: [
    // BrowserModule,
    // BrowserAnimationsModule,
    
    CoreModule,
    
    MikeRoutingModule,
  ],
  declarations: [MikeComponent],
  bootstrap: [MikeComponent]
})
export class MikeModule { }
