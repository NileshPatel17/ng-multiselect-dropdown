import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from '../../../ng-multiselect-dropdown/src';

@Component({
  selector: 'multiple-demo',
  templateUrl: './multiple-demo.html'
})
export class MultipleDemoComponent implements OnInit {
  myForm: FormGroup;
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
            [placeholder]="'Select City'"
            [data]="cities"
            formControlName="city"
            [disabled]="disabled"
            [settings]="dropdownSettings"
            (onSelect)="onItemSelect($event)"&gt;
        &lt;/ng-multiselect-dropdown&gt;
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
                { item_id: 1, item_text: 'New Delhi' },
                { item_id: 2, item_text: 'Mumbai' },
                { item_id: 3, item_text: 'Bangalore' },
                { item_id: 4, item_text: 'Pune' },
                { item_id: 5, item_text: 'Chennai' },
                { item_id: 6, item_text: 'Navsari' }
            ];
            this.selectedItems = [{ item_id: 4, item_text: 'Pune' }, { item_id: 6, item_text: 'Navsari' }];
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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.cities = [
      { item_id: 1, item_text: 'New Delhi' },
      { item_id: 2, item_text: 'Mumbai' },
      { item_id: 3, item_text: 'Bangalore', isDisabled: this.disableBangalore },
      { item_id: 4, item_text: 'Pune' },
      { item_id: 5, item_text: 'Chennai' },
      { item_id: 6, item_text: 'Navsari' }
    ];
    this.selectedItems = [
      { item_id: 4, item_text: 'Pune' },
      { item_id: 6, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      defaultOpen: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableCheckAll: this.showAll,
      itemsShowLimit: 3,
      allowSearchFilter: this.ShowFilter
    };
    this.myForm = this.fb.group({
      city: [this.selectedItems]
    });
  }

  onItemSelect(item: any) {
    console.log('onItemSelect', item);
    console.log('form model', this.myForm.get('city').value);
  }
  onItemDeSelect(item: any) {
    console.log('onItem DeSelect', item);
    console.log('form model', this.myForm.get('city').value);
  }

  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }

  onDropDownClose() {
    console.log('dropdown closed');
  }

  toogleShowAll() {
    this.showAll = !this.showAll;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, {
      enableCheckAll: this.showAll
    });
  }
  toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, {
      allowSearchFilter: this.ShowFilter
    });
  }

  handleLimitSelection() {
    if (this.limitSelection) {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, {
        limitSelection: 2
      });
    } else {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, {
        limitSelection: -1
      });
    }
  }

  handleDisableBangalore() {
    this.cities[2].isDisabled = this.disableBangalore;
    this.cities = [...this.cities];
  }

  handleReset() {
    this.myForm.get('city').setValue([]);
  }
}
