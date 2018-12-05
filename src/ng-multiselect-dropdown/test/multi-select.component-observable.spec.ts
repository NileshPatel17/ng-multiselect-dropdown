import { Component, Type, ViewChild, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MultiSelectComponent, IDropdownSettings } from './../src';
import { createTestingModule, tickAndDetectChanges } from './helper'
import {of} from "rxjs/internal/observable/of";
import {Observable} from "rxjs/Observable";

@Component({
    template: ``
})
class Ng2MultiSelectDropdownObservable {
    @ViewChild(MultiSelectComponent) select: MultiSelectComponent;
    cities = [
      { item_id: 0, item_text: 'Navsari' },
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangalore' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    observableCities: Observable<Array<any>> = of(this.cities);
    selectedItem = [];
    dropdownSettingsSingleSelect: IDropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
    };
    dropdownSettingsMultiSelect: IDropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
    };
}

describe('should accept observables of data with single select', function () {
  let fixture: ComponentFixture<Ng2MultiSelectDropdownObservable>;

  beforeEach(fakeAsync(() => {
    this.selectedItem = [];
    fixture = createTestingModule(
      Ng2MultiSelectDropdownObservable,
      `<div class='container'>
          <ng-multiselect-dropdown name="city" [data]="observableCities"
      [(ngModel)]="selectedItem" [settings]="dropdownSettingsSingleSelect"
      (onSelect)="onItemSelect($event)"
      [disabled]="disabled">
    </ng-multiselect-dropdown>
    </div>`
    );
  }));

  it('should update internal model on select an item using observable as source', fakeAsync(() => {
    let index = 0;
    let selCheckBoxes: HTMLLIElement[];
    const sel = fixture.nativeElement.querySelectorAll(
      '.multiselect-item-checkbox'
    );
    selCheckBoxes = Array.from(sel);
    selCheckBoxes[index].click();
    tickAndDetectChanges(fixture);
    expect(fixture.componentInstance.selectedItem.length).toBe(1);
    let selItem = fixture.componentInstance.cities[index];
    expect(fixture.componentInstance.selectedItem[0]).toEqual(selItem);

    index = 1;
    selCheckBoxes[index].click();
    tickAndDetectChanges(fixture);
    expect(fixture.componentInstance.selectedItem.length).toBe(1);
    selItem = fixture.componentInstance.cities[index];
    expect(fixture.componentInstance.selectedItem[0]).toEqual(selItem);
  }));
});


describe('should accept observables of data with multi select', function () {
  let fixture: ComponentFixture<Ng2MultiSelectDropdownObservable>;

  beforeEach(fakeAsync(() => {
    this.selectedItem = [];
    fixture = createTestingModule(
      Ng2MultiSelectDropdownObservable,
      `<div class='container'>
          <ng-multiselect-dropdown name="city" [data]="observableCities"
      [(ngModel)]="selectedItem" [settings]="dropdownSettingsMultiSelect"
      (onSelect)="onItemSelect($event)"
      [disabled]="disabled">
    </ng-multiselect-dropdown>
    </div>`
    );
  }));

  it('should update internal model on multi select of items using observable as source', fakeAsync(() => {
    let index = 0;
    let selCheckBoxes: HTMLLIElement[];
    const sel = fixture.nativeElement.querySelectorAll(
      '.multiselect-item-checkbox'
    );
    selCheckBoxes = Array.from(sel);
    selCheckBoxes[index].click();
    tickAndDetectChanges(fixture);
    expect(fixture.componentInstance.selectedItem.length).toBe(1);
    let selItem = fixture.componentInstance.cities[index];
    expect(fixture.componentInstance.selectedItem[0]).toEqual(selItem);

    index = 1;
    selCheckBoxes[index].click();
    tickAndDetectChanges(fixture);
    expect(fixture.componentInstance.selectedItem.length).toBe(2);
    selItem = fixture.componentInstance.cities[index];
    expect(fixture.componentInstance.selectedItem[1]).toEqual(selItem);
  }));
});


