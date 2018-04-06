import { Component, Type, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Ng2MultiSelectDropDownModule } from './../src/ng-multiselect-dropdown.module';
import { MultiSelectComponent } from './../src/multiselect.component';

function createTestingModule<T>(cmp: Type<T>, template: string): ComponentFixture<T> {
  TestBed.configureTestingModule({
    imports: [FormsModule, Ng2MultiSelectDropDownModule],
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
    allowSearchFilter: false
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
    it(
      'should update internal model on ngModel change',
      fakeAsync(() => {
        const sel = document.querySelector('.multiselect-item-checkbox') as HTMLElement;
        sel.click();
        tickAndDetectChanges(fixture);
        expect(fixture.componentInstance.selectedItem.length).toBe(1);
        const selItem = fixture.componentInstance.cities[0];
        expect(fixture.componentInstance.selectedItem[0]).toEqual(selItem);
      })
    );

    it('close dropdown if opened and clicked outside dropdown container', () => {
      fixture.whenStable().then(() => {
        fixture.componentInstance.select.isDropdownOpen = true;
        (document.querySelector('.container') as HTMLElement).click();
        expect(fixture.componentInstance.select.isDropdownOpen).toBe(false);
      });
    });
  });
});
