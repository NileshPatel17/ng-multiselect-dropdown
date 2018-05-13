import { Component, Type, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgMultiSelectDropDownModule } from './../src/ng-multiselect-dropdown.module';
import { MultiSelectComponent } from './../src/multiselect.component';

function newEvent(eventName: string, bubbles = false, cancelable = false) {
  let evt = document.createEvent('CustomEvent'); // MUST be 'CustomEvent'
  evt.initCustomEvent(eventName, bubbles, cancelable, null);
  return evt;
}

function createTestingModule<T>(cmp: Type<T>, template: string): ComponentFixture<T> {
  TestBed.configureTestingModule({
    imports: [FormsModule, NgMultiSelectDropDownModule],
    declarations: [cmp]
  })
    .overrideComponent(cmp, {
      set: {
        template: template
      }
    })
    .compileComponents();
  const fixture = TestBed.createComponent(cmp);
  fixture.detectChanges();
  return fixture;
}

function tickAndDetectChanges(fixture) {
  fixture.detectChanges();
  tick();
}

@Component({
  template: ``
})
class Ng2MultiSelectDropdownSingleSelect {
  @ViewChild(MultiSelectComponent) select: MultiSelectComponent;
  cities = [
    { item_id: 1, item_text: 'Mumbai' },
    { item_id: 2, item_text: 'Bangalore' },
    { item_id: 3, item_text: 'Pune' },
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
  @ViewChild(MultiSelectComponent) select: MultiSelectComponent;
  cities = [
    { item_id: 1, item_text: 'Mumbai' },
    { item_id: 2, item_text: 'Bangalore' },
    { item_id: 3, item_text: 'Pune' },
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
    allowSearchFilter: false,
    closeDropDownOnSelection: true
  };
}
describe('ng-multiselect-component', function() {
  describe('Single Selection', () => {
    let fixture: ComponentFixture<Ng2MultiSelectDropdownSingleSelect>;
    beforeEach(
      fakeAsync(() => {
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
      })
    );
    it('should update internal model on select an item', () => {
      fixture.whenStable().then(() => {
        let index = 4;
        let selCheckBoxes: HTMLLIElement[];
        const sel = fixture.nativeElement.querySelectorAll('.multiselect-item-checkbox');
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
      });
    });

    it(
      'should dropdown gets close once item is selected',
      fakeAsync(() => {
        tickAndDetectChanges(fixture);
        const selDropdown: HTMLElement = fixture.nativeElement.querySelector('.multiselect-dropdown');
        selDropdown.click();
        tickAndDetectChanges(fixture);
        expect(fixture.componentInstance.select.isDropdownOpen).toBe(false);
      })
    );

    it(
      'selected item should be correct',
      fakeAsync(() => {
        expect(fixture.componentInstance.selectedItem.length).toBe(1);
        const selItem = fixture.componentInstance.cities[3];
        expect(fixture.componentInstance.selectedItem[0]).toEqual(selItem);
      })
    );
    it('should have default placeholder as "Select"', () => {
      const sel = document.querySelector('.dropdown-btn') as HTMLElement;
      expect(sel.innerText).toBe('Select');
    });

    it('close dropdown if opened and clicked outside dropdown container', () => {
      fixture.whenStable().then(() => {
        fixture.componentInstance.select.isDropdownOpen = true;
        (document.querySelector('.container') as HTMLElement).click();
        expect(fixture.componentInstance.select.isDropdownOpen).toBe(false);
      });
    });

    // it('search filter should work', () => {
    //   const inputSearch = fixture.nativeElement.query(By.css('input[type=text]')) as HTMLInputElement;
    //   inputSearch.value = 'navsari';
    //   inputSearch.dispatchEvent(newEvent('input'));
    //   tickAndDetectChanges(fixture);
    //   const selItems: HTMLLIElement[] = Array.from(document.querySelectorAll('.multiselect-item-checkbox'));
    //   expect(selItems.length).toBe(1);
    // });
    it('dropdown should not open when component is disabled', () => {
      fixture.whenStable().then(() => {
        fixture.componentInstance.select.isDropdownOpen = false;
        fixture.componentInstance.dropdownSettings.disabled = true;
        (document.querySelector('.dropdown-btn') as HTMLElement).click();
        tickAndDetectChanges(fixture);
        expect(fixture.componentInstance.select.isDropdownOpen).toBe(false);
      });
    });
  });
  describe('Multiple Selection', () => {
    let fixture: ComponentFixture<Ng2MultiSelectDropdownMultipleSelect>;
    beforeEach(
      fakeAsync(() => {
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
      })
    );
    it('should update internal model on select an item', () => {
      fixture.whenStable().then(() => {
        let index = 4;
        let selCheckBoxes: HTMLLIElement[];
        const sel = fixture.nativeElement.querySelectorAll('.multiselect-item-checkbox');
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
      });
    });

    it(
      'should dropdown gets close once item is selected',
      fakeAsync(() => {
        tickAndDetectChanges(fixture);
        const selDropdown: HTMLElement = fixture.nativeElement.querySelector('.multiselect-dropdown');
        selDropdown.click();
        tickAndDetectChanges(fixture);
        expect(fixture.componentInstance.select.isDropdownOpen).toBe(false);
      })
    );

    it(
      'selected item should be correct',
      fakeAsync(() => {
        expect(fixture.componentInstance.selectedItem.length).toBe(1);
        const selItem = fixture.componentInstance.cities[3];
        expect(fixture.componentInstance.selectedItem[0]).toEqual(selItem);
      })
    );
    it('should have default placeholder as "Select"', () => {
      const sel = document.querySelector('.dropdown-btn') as HTMLElement;
      expect(sel.innerText).toBe('Select');
    });

    it('close dropdown if opened and clicked outside dropdown container', () => {
      fixture.whenStable().then(() => {
        fixture.componentInstance.select.isDropdownOpen = true;
        (document.querySelector('.container') as HTMLElement).click();
        expect(fixture.componentInstance.select.isDropdownOpen).toBe(false);
      });
    });

    it('should have custom placeholder for "select all text" button', () => {
      fixture.whenStable().then(() => {
        const sel = document.querySelector('.select-all-text') as HTMLElement;
        expect(sel.innerText).toContain('dfjdhfd');
        // expect(1).toBe(3)
      });
    });
  });
});
