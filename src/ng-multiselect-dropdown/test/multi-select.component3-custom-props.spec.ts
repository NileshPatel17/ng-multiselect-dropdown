import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, fakeAsync} from '@angular/core/testing';
import {MultiSelectComponent, IDropdownSettings} from './../src';
import {createTestingModule} from './helper';
import {ListItem} from 'ng-multiselect-dropdown/multiselect.model';


@Component({
  template: ``
})
class Ng2MultiSelectDropdownMultipleSelect {
  @ViewChild(MultiSelectComponent, {static: false}) select: MultiSelectComponent;
  cities = [
    {item_id: 0, item_text: 'Navsari'},
    {item_id: 1, item_text: 'Mumbai', population: 20_961_000},
    {item_id: 2, item_text: 'Bangalore', timezone: 'India Standard Time', population: 13_193_000},
    {item_id: 3, item_text: 'Pune', },
    {item_id: 5, item_text: 'New Delhi'}
  ];
  selectedItem = [{item_id: 0, item_text: 'Navsari'}];
  disabled: false;
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: true,
    closeDropDownOnSelection: true,
  };
}

/**
 * @see https://github.com/NileshPatel17/ng-multiselect-dropdown/issues/172
 */
describe('ng-multiselect-component: Issue#172 - custom properties support', function () {
  describe('multi-select', function () {
    let fixture: ComponentFixture<Ng2MultiSelectDropdownMultipleSelect>;
    beforeEach(
      fakeAsync(() => {
        fixture = createTestingModule(
          Ng2MultiSelectDropdownMultipleSelect,
          `<div class='container'>
                      <ng-multiselect-dropdown name="city" [data]="cities"
                        [(ngModel)]="selectedItem" [settings]="dropdownSettings"
                        (onSelect)="onItemSelect($event)"
                        [disabled]="disabled">
                      </ng-multiselect-dropdown>
                  </div>`);
      })
    );

      it('getSourceObj() should return an new object instance with the omitted "item_id", "item_text", and "disabled" properties', () => {
        const mockObject = {item_id: 2, item_text: 'Bangalore', timezone: 'India Standard Time', population: 13_193_000};
        const expected = {timezone: 'India Standard Time', population: 13_193_000};

        const result = fixture.componentInstance.select.getSourceObj(mockObject);

        expect(result).toEqual(expected);
        expect(Object.keys(mockObject).length).toEqual(4); // check original object is not mutated
      });

      it('objectify() should return an new object instance with the custom properties included', () => {
        const mockObject = {id: 2, text: 'Bangalore', sourceObj: {timezone: 'India Standard Time', population: 13_193_000}};
        const expected = {item_id: 2, item_text: 'Bangalore', timezone: 'India Standard Time', population: 13_193_000};

        const result = fixture.componentInstance.select.objectify(mockObject as ListItem);

        expect(result).toEqual(expected);
    });
  });
});

