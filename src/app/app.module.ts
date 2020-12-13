import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { TabsModule } from "ngx-bootstrap/tabs";
import { ButtonsModule } from "ngx-bootstrap/buttons";
import { NgMultiSelectDropDownModule } from "../ng-multiselect-dropdown/src";
// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { SelectSectionComponent } from "./components/select-section";
import { SampleSectionComponent } from "./components/sample-section.component";
import { SingleDemoComponent } from "./components/select/single-demo";
import { MultipleDemoComponent } from "./components/select/multiple-demo";
import { MultipleCustomTempComponent } from "./components/select/multiple-custom-template/multiple-custom-template";
import { ShCodeViewer } from "../code-viewer/code-viewer.module";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [
    SelectSectionComponent,
    SampleSectionComponent,
    SingleDemoComponent,
    MultipleDemoComponent,
    MultipleCustomTempComponent,
    AppComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    ShCodeViewer,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
