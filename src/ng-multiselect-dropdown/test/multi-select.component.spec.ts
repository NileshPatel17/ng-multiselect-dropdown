import { Component, Type, ViewChild, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MultiSelectComponent } from './../src/multiselect.component';
import { createTestingModule, tickAndDetectChanges } from './helper';

@Component({
  template: ``
})
class Ng2MultiSelectDropdownSingleSelect {
  @ViewChild(MultiSelectComponent)
  select: MultiSelectComponent;
  cities = [
    { item_id: 1, item_text: 'Mumbai' },
    { item_id: 2, item_text: 'Bangalore' },
    { item_id: 3, item_text: 'Pune', isDisabled: true },
    { item_id: 4, item_text: 'Navsari' },
    { item_id: 5, item_text: 'New Delhi' }
  ];
  selectedItem = [{ item_id: 4, item_text: 'Navsari' }];
  dropdownSettings = {
    singleSelection: true,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    badgeShowLimit: 3,
    disabled: false,
    allowSearchFilter: false,
    closeDropDownOnSelection: true
  };
}
@Component({
  template: ``
})
class Ng2MultiSelectDropdownMultipleSelect {
  @ViewChild(MultiSelectComponent)
  select: MultiSelectComponent;
  cities = [
    { item_id: 1, item_text: 'Mumbai' },
    { item_id: 2, item_text: 'Bangalore' },
    { item_id: 3, item_text: 'Pune' },
    { item_id: 4, item_text: 'Navsari' },
    { item_id: 5, item_text: 'New Delhi' }
  ];
  selectedItem = [
    { item_id: 1, item_text: 'Mumbai' },
    { item_id: 4, item_text: 'Navsari' }
  ];
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
describe('ng-multiselect-component', function() {
  describe('Single Selection', () => {
    let fixture: ComponentFixture<Ng2MultiSelectDropdownSingleSelect>;
    beforeEach(fakeAsync(() => {
      fixture = createTestingModule(
        Ng2MultiSelectDropdownSingleSelect,
        `<div class='container'>
          <ng-multiselect-dropdown name="city" [data]="cities"
      [(ngModel)]="selectedItem" [settings]="dropdownSettings"
      (onSelect)="onItemSelect($event)"
      [disabled]="disabled">
    </ng-multiselect-dropdown>
    </div>`
      );
    }));
    it('should update internal model on select an item', fakeAsync(() => {
      let index = 4;
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

      index = 3;
      selCheckBoxes[index].click();
      tickAndDetectChanges(fixture);
      expect(fixture.componentInstance.selectedItem.length).toBe(1);
      selItem = fixture.componentInstance.cities[index];
      expect(fixture.componentInstance.selectedItem[0]).toEqual(selItem);

      index = 4;
      selCheckBoxes[index].click();
      tickAndDetectChanges(fixture);
      expect(fixture.componentInstance.selectedItem.length).toBe(1);
      selItem = fixture.componentInstance.cities[index];
      expect(fixture.componentInstance.selectedItem[0]).toEqual(selItem);
    }));

    it('should dropdown gets close once item is selected', fakeAsync(() => {
      tickAndDetectChanges(fixture);
      const selDropdown: HTMLElement = fixture.nativeElement.querySelector(
        '.multiselect-dropdown'
      );
      selDropdown.click();
      tickAndDetectChanges(fixture);
      expect(fixture.componentInstance.select._settings.defaultOpen).toBe(
        false
      );
    }));

    it('selected item should be correct', fakeAsync(() => {
      expect(fixture.componentInstance.selectedItem.length).toBe(1);
      const selItem = fixture.componentInstance.cities[3];
      expect(fixture.componentInstance.selectedItem[0]).toEqual(selItem);
    }));
    it('should have default placeholder as "Select"', () => {
      const de: DebugElement = fixture.debugElement.query(
        By.css('.dropdown-btn>span')
      );
      const el = de.nativeElement;
      expect(el.textContent).toContain('Select');
    });

    it('close dropdown if opened and clicked outside dropdown container', fakeAsync(() => {
      fixture.componentInstance.select.isDropdownOpen = true;
      const de: DebugElement = fixture.debugElement.query(By.css('.container'));
      const el = de.nativeElement;
      el.click();
      tickAndDetectChanges(fixture);
      expect(fixture.componentInstance.select._settings.defaultOpen).toBe(
        false
      );
    }));

    // it('search filter should work', () => {
    //   const inputSearch = fixture.nativeElement.query(By.css('input[type=text]')) as HTMLInputElement;
    //   inputSearch.value = 'navsari';
    //   inputSearch.dispatchEvent(newEvent('input'));
    //   tickAndDetectChanges(fixture);
    //   const selItems: HTMLLIElement[] = Array.from(document.querySelectorAll('.multiselect-item-checkbox'));
    //   expect(selItems.length).toBe(1);
    // });
    it('dropdown should not open when component is disabled', fakeAsync(() => {
      fixture.componentInstance.select.isDropdownOpen = false;
      fixture.componentInstance.dropdownSettings.disabled = true;
      const de: DebugElement = fixture.debugElement.query(
        By.css('.dropdown-btn')
      );
      const el = de.nativeElement;
      tickAndDetectChanges(fixture);
      expect(fixture.componentInstance.select.isDropdownOpen).toBe(false);
    }));

    it('should not select disabled item', fakeAsync(() => {
      const selectedItems = [...fixture.componentInstance.selectedItem]; // currently selected items
      const index = 2;
      let selCheckBoxes: HTMLLIElement[];
      const sel = fixture.nativeElement.querySelectorAll(
        '.multiselect-item-checkbox'
      );
      selCheckBoxes = Array.from(sel);
      selCheckBoxes[index].click();
      tickAndDetectChanges(fixture);
      expect(fixture.componentInstance.select.isDropdownOpen).toBeTruthy();
      expect(fixture.componentInstance.selectedItem).toEqual(selectedItems); // selected items must've not changed
    }));
  });
  describe('Multiple Selection', () => {
    let fixture: ComponentFixture<Ng2MultiSelectDropdownMultipleSelect>;
    beforeEach(fakeAsync(() => {
      fixture = createTestingModule(
        Ng2MultiSelectDropdownMultipleSelect,
        `<div class='container'>
          <ng-multiselect-dropdown name="city" [data]="cities"
      [(ngModel)]="selectedItem" [settings]="dropdownSettings"
      (onSelect)="onItemSelect($event)"
      [disabled]="disabled">
    </ng-multiselect-dropdown>
    </div>`
      );
    }));
    // it('should update internal model on select an item', fakeAsync(() => {
    //   let index = 4;
    //   let selCheckBoxes: HTMLLIElement[];
    //   const sel = fixture.nativeElement.querySelectorAll('.multiselect-item-checkbox');
    //   selCheckBoxes = Array.from(sel);
    //   selCheckBoxes[index].click();
    //   tickAndDetectChanges(fixture);
    //   expect(fixture.componentInstance.selectedItem.length).toBe(1);
    //   let selItem = fixture.componentInstance.cities[index];
    //   expect(fixture.componentInstance.selectedItem[0]).toEqual(selItem);

    //   index = 3;
    //   selCheckBoxes[index].click();
    //   tickAndDetectChanges(fixture);
    //   expect(fixture.componentInstance.selectedItem.length).toBe(1);
    //   selItem = fixture.componentInstance.cities[index];
    //   expect(fixture.componentInstance.selectedItem[0]).toEqual(selItem);

    //   index = 4;
    //   selCheckBoxes[index].click();
    //   tickAndDetectChanges(fixture);
    //   expect(fixture.componentInstance.selectedItem.length).toBe(1);
    //   selItem = fixture.componentInstance.cities[index];
    //   expect(fixture.componentInstance.selectedItem[0]).toEqual(selItem);
    // }));

    it('should dropdown gets close once item is selected', fakeAsync(() => {
      tickAndDetectChanges(fixture);
      const selDropdown: HTMLElement = fixture.nativeElement.querySelector(
        '.multiselect-dropdown'
      );
      selDropdown.click();
      tickAndDetectChanges(fixture);
      expect(fixture.componentInstance.select._settings.defaultOpen).toBe(
        false
      );
    }));

    it('selected item should be correct', fakeAsync(() => {
      expect(fixture.componentInstance.selectedItem.length).toBe(2);
      // const selItem = fixture.componentInstance.cities[3];
      // expect(fixture.componentInstance.selectedItem[0]).toEqual(selItem);
    }));
    it('should have default placeholder as "Select"', () => {
      const de: DebugElement = fixture.debugElement.query(
        By.css('.dropdown-btn>span')
      );
      const el = de.nativeElement;
      expect(el.textContent).toContain('Select');
    });
    it('should have default placeholder for search textbox as "Search"', () => {
      const de: DebugElement = fixture.debugElement.query(
        By.css('.filter-textbox>input')
      );
      const el = de.nativeElement;
      expect(el.placeholder).toBe('Search');
    });
    it('close dropdown if opened and clicked outside dropdown container', fakeAsync(() => {
      fixture.componentInstance.select.isDropdownOpen = true;
      const de: DebugElement = fixture.debugElement.query(By.css('.container'));
      const el = de.nativeElement;
      el.click();
      tickAndDetectChanges(fixture);
      expect(fixture.componentInstance.select._settings.defaultOpen).toBe(
        false
      );
    }));

    it('should have custom placeholder for "select all text" button', () => {
      const de: DebugElement = fixture.debugElement.query(
        By.css('.item1>li>div')
      );
      const el = de.nativeElement;
      expect(el.textContent).toContain('Select All');
    });
  });
});
