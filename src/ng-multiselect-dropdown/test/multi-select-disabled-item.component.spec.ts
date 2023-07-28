import { Component, Type, ViewChild, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MultiSelectComponent } from './../src/multiselect.component';
import { createTestingModule, tickAndDetectChanges } from './helper';

@Component({
  template: ``
})
class Ng2MultiSelectDropdownMultipleSelectWithDisableItemComponent {
  @ViewChild(MultiSelectComponent)
  select: MultiSelectComponent;
  cities = [
    { item_id: 1, item_text: 'Mumbai' },
    { item_id: 2, item_text: 'Bangalore' },
    { item_id: 3, item_text: 'Pune', isDisabled: true },
    { item_id: 4, item_text: 'Navsari' },
    { item_id: 5, item_text: 'New Delhi' }
  ];
  selectedItem = [{ item_id: 1, item_text: 'Mumbai' }, { item_id: 4, item_text: 'Navsari' }];
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
describe('Multiple Selection:disable item', () => {
  let fixture: ComponentFixture<Ng2MultiSelectDropdownMultipleSelectWithDisableItemComponent>;
  beforeEach(fakeAsync(() => {
    fixture = createTestingModule(
      Ng2MultiSelectDropdownMultipleSelectWithDisableItemComponent,
      `<div class='container'>
          <ng-multiselect-dropdown name="city" [data]="cities"
      [(ngModel)]="selectedItem" [settings]="dropdownSettings"
      (onSelect)="onItemSelect($event)"
      [disabled]="disabled">
    </ng-multiselect-dropdown>
    </div>`
    );
  }));
  it('should have 4 items enabled and 1 item disabled', fakeAsync(() => {
    let selCheckBoxes: HTMLLIElement[];
    const sel = fixture.nativeElement.querySelectorAll('.multiselect-item-checkbox');
    selCheckBoxes = Array.from(sel);
    // tickAndDetectChanges(fixture);
    // Mumbai
    expect(selCheckBoxes[1].querySelector('div').textContent).toContain('Mumbai');
    expect(selCheckBoxes[1].querySelector('input').disabled).toBe(false);
    // Bangalore
    expect(selCheckBoxes[2].querySelector('div').textContent).toContain('Bangalore');
    expect(selCheckBoxes[2].querySelector('input').disabled).toBe(false);
    expect(selCheckBoxes[3].querySelector('div').textContent).toContain('Pune');
    expect(selCheckBoxes[3].querySelector('input').disabled).toBe(true); // Pune should have disable attribute

    // Navsari
    expect(selCheckBoxes[4].querySelector('div').textContent).toContain('Navsari');
    expect(selCheckBoxes[4].querySelector('input').disabled).toBe(false);
    // New Delhi
    expect(selCheckBoxes[5].querySelector('div').textContent).toContain('New Delhi');
    expect(selCheckBoxes[5].querySelector('input').disabled).toBe(false);
    
    expect(fixture.componentInstance.selectedItem.length).toEqual(2);
  }));
  it('should not select disabled item-Pune', fakeAsync(() => {
    const index = 3; // 0 is select all checkbox
    let selCheckBoxes: HTMLLIElement[];
    const sel = fixture.nativeElement.querySelectorAll('.multiselect-item-checkbox');
    selCheckBoxes = Array.from(sel);
    selCheckBoxes[index].click();
    selCheckBoxes[index - 1].click(); // select Bangalore
    tickAndDetectChanges(fixture);
    expect(selCheckBoxes[index - 1].querySelector('input').disabled).toBe(false); // Bangalore should not have disable attribute
    expect(selCheckBoxes[index].querySelector('input').disabled).toBe(true); // Pune should have disable attribute
    expect(selCheckBoxes[index].querySelector('div').textContent).toContain('Pune');
    expect(fixture.componentInstance.selectedItem.length).toEqual(3);
  }));
  it('should not select disabled item when selecting all items', fakeAsync(() => {
    const index = 0; // 0 is select all checkbox
    let selCheckBoxes: HTMLLIElement[];
    const sel = fixture.nativeElement.querySelectorAll('.multiselect-item-checkbox');
    selCheckBoxes = Array.from(sel);
    selCheckBoxes[index].click(); // click on "select all"
    tickAndDetectChanges(fixture);
    expect(selCheckBoxes[3].querySelector('div').textContent).toContain('Pune');
    expect(selCheckBoxes[3].querySelector('input').disabled).toBe(true); // Pune should have disable attribute
    expect(fixture.componentInstance.selectedItem.length).toEqual(4);
  }));
});
