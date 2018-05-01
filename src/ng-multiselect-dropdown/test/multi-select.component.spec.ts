import { Component, ViewChild } from '@angular/core';
import { NgMultiSelectDropDownModule } from './../src/ng-multiselect-dropdown.module';
import { MultiSelectComponent } from './../src/multiselect.component';
import { ClickOutsideDirective } from '../src/click-outside.directive';
import { ListFilterPipe } from '../src/list-filter.pipe';

import { initContext, TestContext } from './test-context';

@Component({
  template: `
  <ng-multiselect-dropdown name="city" [data]="cities"
        [(ngModel)]="selectedItem" [settings]="dropdownSettings"
        (onSelect)="onItemSelect($event)"
        [disabled]="disabled">
      </ng-multiselect-dropdown>
  `
})
class HostComponent {
  @ViewChild(MultiSelectComponent) select: MultiSelectComponent;
    cities = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangalore' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    selectedItems = [{ item_id: 3, item_text: 'Pune' }, { item_id: 4, item_text: 'Navsari' }];
    dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      badgeShowLimit: 3,
      allowSearchFilter: false
    };
}
@Component({
  template: ``
})

describe('<ng-multiselect-dropdown/>',()=>{
  it('santy check',()=>{
    expect(1).toBe(1);
  });

  describe('Single Selection Mode', () => {
    const moduleMetaData= {
      declarations:[MultiSelectComponent, ClickOutsideDirective, ListFilterPipe]
    };
    type Context = TestContext<MultiSelectComponent, HostComponent>;
    initContext(MultiSelectComponent, HostComponent, moduleMetaData);

    it('offers a [name] input', function(this: Context) {
      expect(this.fixture.componentInstance).toBeDefined();
    });

  });
});

