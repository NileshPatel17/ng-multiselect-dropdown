import { Component } from '@angular/core';

const tabDesc: any = {
  single: {
    heading: 'Single'
  }
  ,
  multiple1: {
    heading: 'Multiple-Example1'
  }
  ,
  customTemplate: {
    heading: 'Custom-Template'
  }
};

@Component({
  selector: 'select-section',
  template: `
<section>
  <div class="row">
    <div class="col-md-12">
     <tabset>
      <tab heading="Multiple">
        <sample-section [desc]="tabDesc.multiple1"><multiple-demo></multiple-demo></sample-section>
      </tab>
      <tab heading="Single">
        <sample-section [desc]="tabDesc.single"><single-demo></single-demo></sample-section>
      </tab>
      <tab heading="Custom template">
        <sample-section [desc]="tabDesc.customTemplate"><custom-template-demo></custom-template-demo></sample-section>
      </tab>
    </tabset>
    </div>
  </div>
</section>
  `
})
export class SelectSectionComponent {
  public currentHeading = 'Single';
  public tabDesc: any = tabDesc;
}
