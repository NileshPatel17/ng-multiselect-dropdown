import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'single-demo',
  templateUrl: './single-demo.html'
})
export class SingleDemoComponent implements OnInit {
  cities: Array<string> = [];
  selectedItem: Array<string> = [];
  dropdownSettings: any = {};
  closeDropdownSelection = true;
  disabled = false;
  htmlCode = `
   &lt;ng-multiselect-dropdown
       name="city"
       [settings]="dropdownSettings"
       [data]="cities"
       [(ngModel)]="selectedItem"
       (onSelect)="onItemSelect($event)"
       [disabled]="disabled"
   &lt;/ng-multiselect-dropdown&gt;
`;
  typescriptCode = `
    import { Component, OnInit } from '@angular/core';

    @Component({
        selector: 'single-demo',
        templateUrl: './single-demo.html'
    })
    export class SingleDemoComponent implements OnInit {
        cities: Array<string> = [];
        selectedItem: Array<string> = [];
        dropdownSettings: any = {};
        closeDropdownSelection=false;
        disabled=false;

        ngOnInit() {
            this.cities = ['Mumbai', 'New Delhi', 'Bangaluru', 'Pune', 'Navsari'];
            this.selectedItem = ['Pune'];
            this.dropdownSettings = {
                singleSelection: true,
                selectAllText: 'Select All',
                unSelectAllText: 'UnSelect All',
                allowSearchFilter: true,
                closeDropDownOnSelection: this.closeDropdownSelection
            };
        }

        onItemSelect(item: any) {
            console.log('onItemSelect', item);
        }

        toggleCloseDropdownSelection() {
            this.closeDropdownSelection = !this.closeDropdownSelection;
            this.dropdownSettings = Object.assign({}, this.dropdownSettings,{closeDropDownOnSelection: this.closeDropdownSelection});
        }

    }
`;

  ngOnInit() {
    this.cities = ['Mumbai', 'New Delhi', 'Bangaluru', 'Pune', 'Navsari'];

    this.dropdownSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownSelection
    };
    this.selectedItem = ['Mumbai'];
  }

  onItemSelect(item: any) {
    console.log('onItemSelect', item);
    console.log('selectedItem', this.selectedItem);
  }

  toggleCloseDropdownSelection() {
    this.closeDropdownSelection = !this.closeDropdownSelection;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, { closeDropDownOnSelection: this.closeDropdownSelection });
  }

  handleReset() {
    this.selectedItem = [];
  }
}
