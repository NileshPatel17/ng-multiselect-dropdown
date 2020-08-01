import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ShCodeViewer } from '../code-viewer/code-viewer.module';
import { NgMultiSelectDropDownModule } from '../ng-multiselect-dropdown/src';
import { AppComponent } from './app.component';
import { SampleSectionComponent } from './components/sample-section.component';
// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SelectSectionComponent } from './components/select-section';
import { MultipleDemoComponent } from './components/select/multiple-demo';
import { SingleDemoComponent } from './components/select/single-demo';



@NgModule({
  declarations: [SelectSectionComponent, SampleSectionComponent, SingleDemoComponent, MultipleDemoComponent, AppComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    ShCodeViewer
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
