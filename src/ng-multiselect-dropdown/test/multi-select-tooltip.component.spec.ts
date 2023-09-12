import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync } from '@angular/core/testing';
import { MultiSelectComponent } from './../src/multiselect.component';
import { createTestingModule } from './helper';

@Component({
  template: ``
})
class Ng2MultiSelectDropdownMultipleSelectWithDisableItemComponent {
  @ViewChild(MultiSelectComponent, { static: false })
  select: MultiSelectComponent;
  cities = [
    { item_id: 1, item_text: 'Mumbai' },
    { item_id: 2, item_text: 'Bangalore', tooltip_text: undefined },
    { item_id: 3, item_text: 'Pune', tooltip_text: '' },
    { item_id: 4, item_text: 'Navsari' },
    { item_id: 5, item_text: 'New Delhi', tooltip_text: 'The capital of India!' }
  ];
  selectedItem = [{ item_id: 1, item_text: 'Mumbai' }, { item_id: 4, item_text: 'Navsari' }];
  dropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    tooltipField: 'item_tooltip',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    badgeShowLimit: 3,
    disabled: false,
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };
}
describe('Multiple Selection:tooltip', () => {
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
  it('should show the tooltips', fakeAsync(() => {
    let selCheckBoxes: HTMLLIElement[];
    const sel = fixture.nativeElement.querySelectorAll('.multiselect-item-checkbox');
    selCheckBoxes = Array.from(sel);
    // Mumbai
    expect(selCheckBoxes[1].querySelector('div').textContent).toContain('Mumbai');
    expect(selCheckBoxes[1].title).toBe('');
    // Bangalore
    expect(selCheckBoxes[2].querySelector('div').textContent).toContain('Bangalore');
    expect(selCheckBoxes[2].title).toBe('');
    // Pune
    expect(selCheckBoxes[3].querySelector('div').textContent).toContain('Pune');
    expect(selCheckBoxes[3].title).toBe('');
    // Navsari
    expect(selCheckBoxes[4].querySelector('div').textContent).toContain('Navsari');
    expect(selCheckBoxes[4].title).toBe('The capital of India!');
    // New Delhi
    expect(selCheckBoxes[5].querySelector('div').textContent).toContain('New Delhi');
    expect(selCheckBoxes[5].title).toBe('');

    expect(fixture.componentInstance.selectedItem.length).toEqual(2);
  }));
});
