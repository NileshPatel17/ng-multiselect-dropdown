import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiSelectComponent } from './multiselect.component';
import { ClickOutsideDirective } from './click-outside.directive';
import { ListFilterPipe } from './list-filter.pipe';
import { IDropdownSettings } from './multiselect.model';
import { NgMultiSelectDefaultConfig } from './ng-multiselect-default-config';

const DEFAULT_CONFIGS = {
  singleSelection: false,
  idField: 'id',
  textField: 'text',
  disabledField: 'isDisabled',
  enableCheckAll: true,
  selectAllText: 'Select All',
  unSelectAllText: 'UnSelect All',
  allowSearchFilter: false,
  limitSelection: -1,
  clearSearchFilter: true,
  maxHeight: 197,
  itemsShowLimit: 999999999999,
  searchPlaceholderText: 'Search',
  noDataAvailablePlaceholderText: 'No data available',
  closeDropDownOnSelection: false,
  showSelectedItemsAtTop: false,
  defaultOpen: false
};

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [MultiSelectComponent, ClickOutsideDirective, ListFilterPipe],
  exports: [MultiSelectComponent]
})
export class NgMultiSelectDropDownModule {
    static forRoot(config?: IDropdownSettings): ModuleWithProviders {
      return {
        ngModule: NgMultiSelectDropDownModule,
        providers: [{
          provide: NgMultiSelectDefaultConfig,
          useValue: Object.assign(DEFAULT_CONFIGS, config)
        }]
      };
    }
}
