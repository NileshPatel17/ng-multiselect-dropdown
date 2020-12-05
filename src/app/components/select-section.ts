import { Component } from "@angular/core";

const tabDesc: any = {
  single: {
    heading: "Single",
  },
  multipleCustomTemplate: {
    heading: "multiple Custom Template",
  },
  multiple1: {
    heading: "Multiple-Example1",
  },
};

@Component({
  selector: "select-section",
  template: `
    <section>
      <div class="row">
        <div class="col-md-12">
          <tabset>
            <tab heading="Multiple">
              <sample-section [desc]="tabDesc.multiple1"
                ><multiple-demo></multiple-demo
              ></sample-section>
            </tab>
            <tab heading="Multiple-Custom Template">
              <sample-section [desc]="tabDesc.multipleCustomTemplate"
                ><multiple-custom-template></multiple-custom-template
              ></sample-section>
            </tab>
            <tab heading="Single">
              <sample-section [desc]="tabDesc.single"
                ><single-demo></single-demo
              ></sample-section>
            </tab>
          </tabset>
        </div>
      </div>
    </section>
  `,
})
export class SelectSectionComponent {
  public currentHeading = "Single";
  public tabDesc: any = tabDesc;
}
