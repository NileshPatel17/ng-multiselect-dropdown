import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync } from '@angular/core/testing';
import { MultiSelectComponent } from './../src/multiselect.component';
import { createTestingModule, tickAndDetectChanges } from './helper';

// #region String Data
const ALL_CITIES = ['New Delhi', 'Mumbai', 'Bangalore', 'Pune', 'Chennai', 'Navsari'];
const SELECTED_CITIES = ['Mumbai', 'Navsari'];

@Component({
  template: ``
})
class SingleDimensionString {
  @ViewChild(MultiSelectComponent)
  select: MultiSelectComponent;
  cities: Array<string> = ALL_CITIES;
  selectedItem: Array<string> = SELECTED_CITIES;
  dropdownSettings = {
    singleSelection: false,
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    badgeShowLimit: 3,
    disabled: false,
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };
}

describe('Multiple Selection:String Data', () => {
  let fixture: ComponentFixture<SingleDimensionString>;
  beforeEach(fakeAsync(() => {
    fixture = createTestingModule(
      SingleDimensionString,
      `<div class='container'>
            <ng-multiselect-dropdown name='city' [data]='cities'
        [(ngModel)]='selectedItem' [settings]='dropdownSettings'
        (onSelect)='onItemSelect($event)'
        [disabled]='disabled'>
      </ng-multiselect-dropdown>
      </div>`
    );
  }));

  it('selected item should be array of string', fakeAsync(() => {
    const index = 0; // 0 is select all checkbox
    let selCheckBoxes: HTMLLIElement[];
    const sel = fixture.nativeElement.querySelectorAll('.multiselect-item-checkbox');
    selCheckBoxes = Array.from(sel);
    selCheckBoxes[index].click();
    tickAndDetectChanges(fixture);
    expect(fixture.componentInstance.selectedItem.length).toEqual(ALL_CITIES.length);
    expect(fixture.componentInstance.selectedItem).toEqual(ALL_CITIES);
  }));
});

// #endregion

// #region Numeric data
const NUMBERS = [1, 3, 5, 6];
@Component({
  template: ``
})
class SingleDimensionNumber {
  @ViewChild(MultiSelectComponent)
  select: MultiSelectComponent;
  cities: Array<number> = NUMBERS;
  selectedItem: Array<number> = [3];
  dropdownSettings = {
    singleSelection: false,
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    badgeShowLimit: 3,
    disabled: false,
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };
}

describe('Multiple Selection:Numeric Data', () => {
  let fixture: ComponentFixture<SingleDimensionNumber>;
  beforeEach(fakeAsync(() => {
    fixture = createTestingModule(
      SingleDimensionNumber,
      `<div class='container'>
            <ng-multiselect-dropdown name='city' [data]='cities'
        [(ngModel)]='selectedItem' [settings]='dropdownSettings'
        (onSelect)='onItemSelect($event)'
        [disabled]='disabled'>
      </ng-multiselect-dropdown>
      </div>`
    );
  }));

  it('selected item should be array of number', fakeAsync(() => {
    const index = 0; // 0 is select all checkbox
    let selCheckBoxes: HTMLLIElement[];
    const sel = fixture.nativeElement.querySelectorAll('.multiselect-item-checkbox');
    selCheckBoxes = Array.from(sel);
    selCheckBoxes[index].click();
    tickAndDetectChanges(fixture);
    expect(fixture.componentInstance.selectedItem.length).toEqual(NUMBERS.length);
    expect(fixture.componentInstance.selectedItem).toEqual(NUMBERS);
  }));
});
// #endregion

// #region Object data
interface ICity {
  item_id: number;
  item_text: string;
}
const CITIES: Array<ICity> = [
  { item_id: 1, item_text: 'New Delhi' },
  { item_id: 2, item_text: 'Mumbai' },
  { item_id: 3, item_text: 'Bangalore' },
  { item_id: 4, item_text: 'Pune' },
  { item_id: 5, item_text: 'Chennai' },
  { item_id: 6, item_text: 'Navsari' }
];
const SEL_CITIES: Array<ICity> = [
  { item_id: 2, item_text: 'Mumbai' },
  { item_id: 4, item_text: 'Pune' }
];

@Component({
  template: ``
})
class SingleDimensionObjectComponent {
  @ViewChild(MultiSelectComponent)
  select: MultiSelectComponent;
  cities: Array<ICity> = CITIES;
  selectedItem: Array<ICity> = SEL_CITIES;
  dropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    badgeShowLimit: 3,
    disabled: false,
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };
}

describe('Multiple Selection:Object Data', () => {
  let fixture: ComponentFixture<SingleDimensionObjectComponent>;
  beforeEach(fakeAsync(() => {
    fixture = createTestingModule(
      SingleDimensionObjectComponent,
      `<div class='container'>
            <ng-multiselect-dropdown name='city' [data]='cities'
        [(ngModel)]='selectedItem' [settings]='dropdownSettings'
        (onSelect)='onItemSelect($event)'
        [disabled]='disabled'>
      </ng-multiselect-dropdown>
      </div>`
    );
  }));

  it('selected item should be array of Object', fakeAsync(() => {
    const index = 0; // 0 is select all checkbox
    let selCheckBoxes: HTMLLIElement[];
    const sel = fixture.nativeElement.querySelectorAll('.multiselect-item-checkbox');
    selCheckBoxes = Array.from(sel);
    selCheckBoxes[index].click();
    tickAndDetectChanges(fixture);
    expect(fixture.componentInstance.selectedItem.length).toEqual(CITIES.length);
    expect(fixture.componentInstance.selectedItem).toEqual(CITIES);
  }));
});
// #endregion
