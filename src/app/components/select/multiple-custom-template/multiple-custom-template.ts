import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { IDropdownSettings } from "../../../../ng-multiselect-dropdown/src";

@Component({
  selector: "multiple-custom-template",
  templateUrl: "./multiple-custom-template.html",
})
export class MultipleCustomTempComponent implements OnInit {
  myForm: UntypedFormGroup;
  disabled = false;
  ShowFilter = true;
  showAll = true;
  limitSelection = false;
  disableBangalore = true;
  cities: Array<any> = [];
  selectedItems: Array<any> = [];
  dropdownSettings: IDropdownSettings = {};
  htmlCode = `
    &lt;form [formGroup]="myForm"&gt;
        &lt;ng-multiselect-dropdown
            name="city"
            [settings]="dropdownSettings"
            [placeholder]="'Select City'"
            [data]="cities"
            formControlName="city"
            [disabled]="disabled"
            (onSelect)="onItemSelect($event)"&gt;
        &lt;/ng-multiselect-dropdown&gt;
        &lt;ng-template #optionsTemplate let-item let-option="option" let-id="id" let-isSelected="isSelected"&gt
        &lt;div style="padding:1px 10px;margin-right:10px;right:2px;top:-2px"&gt
          &lt;img [src]="getItems[id].image" style="width: 18px; margin: 0 20px;" /&gt
          &lt;label style="color: #333;min-width: 130px;" [ngStyle]="{ 'color': getItems[id].isDisabled? 'lightgrey':''}"&gt
            {{getItems[id].item_text}}
          &lt;/label&gt
        &lt;/div&gt
       &lt;/ng-template&gt
       &lt;ng-template #optionSelectedTemplate let-option="option"  let-id="id"&gt
         &lt;div&gt
           &lt;img [src]="getItems[id].image" style="width: 18px; margin-right: 2px;" /&gt
          {{option}}
         &lt;/div&gt
       &lt;/ng-template&gt
   &lt;/form&gt;
`;
  typescriptCode = `
    import { FormBuilder, FormGroup } from '@angular/forms';
    import { Component, OnInit } from '@angular/core';

    @Component({
        selector: 'multiple-demo',
        templateUrl: './multiple-demo.html'
    })
    export class MultipleDemoComponent implements OnInit {
        myForm:FormGroup;
        disabled = false;
        ShowFilter = false;
        limitSelection = false;
        cities: Array<any> = [];
        selectedItems: Array<any> = [];
        dropdownSettings: any = {};
        constructor(private fb: FormBuilder) {}

        ngOnInit() {
            this.cities = [
              {
                item_id: 1,
                item_text: "India",
                image: "http://www.sciencekids.co.nz/images/pictures/flags96/India.jpg",
              },
              {
                item_id: 2,
                item_text: "Spain",
                image: "http://www.sciencekids.co.nz/images/pictures/flags96/Spain.jpg",
              },
              {
                item_id: 3,
                item_text: "United Kingdom",
                image:
                  "http://www.sciencekids.co.nz/images/pictures/flags96/United_Kingdom.jpg",
              },
              {
                item_id: 4,
                item_text: "Canada",
                image:
                  "http://www.sciencekids.co.nz/images/pictures/flags96/Canada.jpg",
                isDisabled: this.disableBangalore,
              },
              {
                item_id: 5,
                item_text: "Israel",
                image:
                  "http://www.sciencekids.co.nz/images/pictures/flags96/Israel.jpg",
              },
              {
                item_id: 6,
                item_text: "Brazil",
                image:
                  "http://www.sciencekids.co.nz/images/pictures/flags96/Brazil.jpg",
              },
              {
                item_id: 7,
                item_text: "Barbados",
                image:
                  "http://www.sciencekids.co.nz/images/pictures/flags96/Barbados.jpg",
              },
              {
                item_id: 8,
                item_text: "Mexico",
                image:
                  "http://www.sciencekids.co.nz/images/pictures/flags96/Mexico.jpg",
              },
            ];
            this.selectedItems = [
              {
                item_id: 1,
                item_text: "India",
                image: "http://www.sciencekids.co.nz/images/pictures/flags96/India.jpg",
              },
              {
                item_id: 5,
                item_text: "Israel",
                image:
                  "http://www.sciencekids.co.nz/images/pictures/flags96/Israel.jpg",
              },
            ];
            this.dropdownSettings = {
                singleSelection: false,
                idField: 'item_id',
                textField: 'item_text',
                selectAllText: 'Select All',
                unSelectAllText: 'UnSelect All',
                itemsShowLimit: 3,
                allowSearchFilter: this.ShowFilter
            };
            this.myForm = this.fb.group({
                city: [this.selectedItems]
            });
        }

        onItemSelect(item: any) {
            console.log('onItemSelect', item);
        }
        onSelectAll(items: any) {
            console.log('onSelectAll', items);
        }
        toogleShowFilter() {
            this.ShowFilter = !this.ShowFilter;
            this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
        }

        handleLimitSelection() {
            if (this.limitSelection) {
                this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
            } else {
                this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
            }
        }
    }
`;

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit() {
    this.cities = [
      {
        item_id: 1,
        item_text: "India",
        image: "http://www.sciencekids.co.nz/images/pictures/flags96/India.jpg",
      },
      {
        item_id: 2,
        item_text: "Spain",
        image: "http://www.sciencekids.co.nz/images/pictures/flags96/Spain.jpg",
      },
      {
        item_id: 3,
        item_text: "United Kingdom",
        image:
          "http://www.sciencekids.co.nz/images/pictures/flags96/United_Kingdom.jpg",
      },
      {
        item_id: 4,
        item_text: "Canada",
        image:
          "http://www.sciencekids.co.nz/images/pictures/flags96/Canada.jpg",
        isDisabled: this.disableBangalore,
      },
      {
        item_id: 5,
        item_text: "Israel",
        image:
          "http://www.sciencekids.co.nz/images/pictures/flags96/Israel.jpg",
      },
      {
        item_id: 6,
        item_text: "Brazil",
        image:
          "http://www.sciencekids.co.nz/images/pictures/flags96/Brazil.jpg",
      },
      {
        item_id: 7,
        item_text: "Barbados",
        image:
          "http://www.sciencekids.co.nz/images/pictures/flags96/Barbados.jpg",
      },
      {
        item_id: 8,
        item_text: "Mexico",
        image:
          "http://www.sciencekids.co.nz/images/pictures/flags96/Mexico.jpg",
      },
    ];
    this.selectedItems = [
      {
        item_id: 1,
        item_text: "India",
        image: "http://www.sciencekids.co.nz/images/pictures/flags96/India.jpg",
      },
      {
        item_id: 5,
        item_text: "Israel",
        image:
          "http://www.sciencekids.co.nz/images/pictures/flags96/Israel.jpg",
      },
    ];
    this.dropdownSettings = {
      singleSelection: false,
      defaultOpen: false,
      idField: "item_id",
      textField: "item_text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      enableCheckAll: this.showAll,
      itemsShowLimit: 3,
      allowSearchFilter: this.ShowFilter,
    };
    this.myForm = this.fb.group({
      city: [this.selectedItems],
    });
    console.log(this.getItems[1]);
  }

  get getItems() {
    return this.cities.reduce((acc, curr) => {
      acc[curr.item_id] = curr;
      return acc;
    }, {});
  }

  onItemSelect(item: any) {
    console.log("onItemSelect", item);
    console.log("form model", this.myForm.get("city").value);
  }
  onItemDeSelect(item: any) {
    console.log("onItem DeSelect", item);
    console.log("form model", this.myForm.get("city").value);
  }

  onSelectAll(items: any) {
    console.log("onSelectAll", items);
  }

  onDropDownClose() {
    console.log("dropdown closed");
  }

  toogleShowAll() {
    this.showAll = !this.showAll;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, {
      enableCheckAll: this.showAll,
    });
  }
  toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, {
      allowSearchFilter: this.ShowFilter,
    });
  }

  handleLimitSelection() {
    if (this.limitSelection) {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, {
        limitSelection: 2,
      });
    } else {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, {
        limitSelection: -1,
      });
    }
  }

  handleDisableBangalore() {
    this.cities[2].isDisabled = this.disableBangalore;
    this.cities = [...this.cities];
  }

  handleReset() {
    this.myForm.get("city").setValue([]);
  }
}
