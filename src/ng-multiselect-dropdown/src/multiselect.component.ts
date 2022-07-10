import {
  Component,
  HostListener,
  forwardRef,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
  ContentChild,
  TemplateRef,
} from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { ListItem, IDropdownSettings } from "./multiselect.model";
import { ListFilterPipe } from "./list-filter.pipe";

export const DROPDOWN_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MultiSelectComponent),
  multi: true,
};
const noop = () => { };

@Component({
  selector: "ng-multiselect-dropdown",
  templateUrl: "./multi-select.component.html",
  styleUrls: ["./multi-select.component.scss"],
  providers: [DROPDOWN_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MultiSelectComponent implements ControlValueAccessor {
  public _settings: IDropdownSettings;
  public _data: Array<ListItem> = [];
  public selectedItems: Array<ListItem> = [];
  public isDropdownOpen = true;
  _placeholder = "Select";
  private _sourceDataType = null; // to keep note of the source data type. could be array of string/number/object
  private _sourceDataFields: Array<String> = []; // store source data fields names
  filter: ListItem = new ListItem(this.data);
  defaultSettings: IDropdownSettings = {
    singleSelection: false,
    idField: "id",
    textField: "text",
    disabledField: "isDisabled",
    enableCheckAll: true,
    selectAllText: "Select All",
    unSelectAllText: "UnSelect All",
    allowSearchFilter: false,
    limitSelection: -1,
    clearSearchFilter: true,
    maxHeight: 197,
    itemsShowLimit: 999999999999,
    searchPlaceholderText: "Search",
    noDataAvailablePlaceholderText: "No data available",
    noFilteredDataAvailablePlaceholderText: "No filtered data available",
    closeDropDownOnSelection: true,
    showSelectedItemsAtTop: false,
    defaultOpen: false,
    allowRemoteDataSearch: false,
  };

  @Input()
  public set placeholder(value: string) {
    if (value) {
      this._placeholder = value;
    } else {
      this._placeholder = "Select";
    }
  }
  @Input()
  disabled = false;

  @Input()
  public set settings(value: IDropdownSettings) {
    if (value) {
      this._settings = Object.assign(this.defaultSettings, value);
    } else {
      this._settings = Object.assign(this.defaultSettings);
    }
  }

  @Input()
  public set data(value: Array<any>) {
    if (!this._settings) {
      console.log('Settings is not defined ot it needs to put it before data prop')
    }
    if (!value) {
      this._data = [];
    } else {
      const firstItem = value[0];
      this._sourceDataType = typeof firstItem;
      this._sourceDataFields = this.getFields(firstItem);
      this._data = value.map((item: any) =>
        typeof item === "string" || typeof item === "number"
          ? new ListItem(item)
          : new ListItem({
            id: item[this._settings.idField],
            text: item[this._settings.textField],
            isDisabled: item[this._settings.disabledField],
          })
      );
    }
  }

  @ContentChild("optionsTemplate")
  optionsTemplateRef: TemplateRef<any>;

  @ContentChild("optionSelectedTemplate")
  optionSelectedTemplateRef: TemplateRef<any>;

  @Output("onFilterChange")
  onFilterChange: EventEmitter<ListItem> = new EventEmitter<any>();
  @Output("onDropDownClose")
  onDropDownClose: EventEmitter<ListItem> = new EventEmitter<any>();

  @Output("onSelect")
  onSelect: EventEmitter<ListItem> = new EventEmitter<any>();

  @Output("onDeSelect")
  onDeSelect: EventEmitter<ListItem> = new EventEmitter<any>();

  @Output("onSelectAll")
  onSelectAll: EventEmitter<Array<ListItem>> = new EventEmitter<Array<any>>();

  @Output("onDeSelectAll")
  onDeSelectAll: EventEmitter<Array<ListItem>> = new EventEmitter<Array<any>>();

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  onFilterTextChange($event) {
    this.onFilterChange.emit($event);
  }

  constructor(
    private listFilterPipe: ListFilterPipe,
    private cdr: ChangeDetectorRef
  ) { }

  onItemClick($event: any, item: ListItem) {
    if (this.disabled || item.isDisabled) {
      return false;
    }

    if (this._settings.singleSelection) {
      if (item.id !== this.selectedItems[0].id) {
        this.addSelected(item);
      }
    } else {
      const found = this.isSelected(item);
      console.log({ item, selectedItems: this.selectedItems })
      const allowAdd =
        this._settings.limitSelection === -1 ||
        (this._settings.limitSelection > 0 &&
          this.selectedItems.length < this._settings.limitSelection);
      if (!found) {
        if (allowAdd) {
          this.addSelected(item);
        }
      } else {
        this.removeSelected(item);
      }
    }
    if (
      this._settings.singleSelection &&
      this._settings.closeDropDownOnSelection
    ) {
      this.closeDropdown();
    }
  }

  writeValue(value: any) {
    if (value !== undefined && value !== null && value.length > 0) {
      if (this._settings.singleSelection) {
        try {
          if (value.length >= 1) {
            const firstItem = value[0];
            this.selectedItems = [
              typeof firstItem === "string" || typeof firstItem === "number"
                ? new ListItem(firstItem)
                : new ListItem({
                  id: firstItem[this._settings.idField],
                  text: firstItem[this._settings.textField],
                  isDisabled: firstItem[this._settings.disabledField],
                }),
            ];
          }
        } catch (e) {
          // console.error(e.body.msg);
        }
      } else {
        const _data = value.map((item: any) =>
          typeof item === "string" || typeof item === "number"
            ? new ListItem(item)
            : new ListItem({
              id: item[this._settings.idField],
              text: item[this._settings.textField],
              isDisabled: item[this._settings.disabledField],
            })
        );
        if (this._settings.limitSelection > 0) {
          this.selectedItems = _data.splice(0, this._settings.limitSelection);
        } else {
          this.selectedItems = _data;
        }
      }
    } else {
      this.selectedItems = [];
    }
    this.onChangeCallback(value);

    this.cdr.markForCheck();
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  // Set touched on blur
  @HostListener("blur")
  public onTouched() {
    // this.closeDropdown();
    this.onTouchedCallback();
  }

  trackByFn(index, item) {
    return item.id;
  }

  isSelected(clickedItem: ListItem) {
    let found = false;
    this.selectedItems.forEach((item) => {
      if (clickedItem.id === item.id) {
        found = true;
      }
    });
    return found;
  }

  isLimitSelectionReached(): boolean {
    return this._settings.limitSelection === this.selectedItems.length;
  }

  isAllItemsSelected(): boolean {
    // get disabld item count
    let filteredItems = this.listFilterPipe.transform(this._data, this.filter);
    const itemDisabledCount = filteredItems.filter((item) => item.isDisabled)
      .length;
    // take disabled items into consideration when checking
    if (
      (!this.data || this.data.length === 0) &&
      this._settings.allowRemoteDataSearch
    ) {
      return false;
    }
    return (
      filteredItems.length === this.selectedItems.length + itemDisabledCount
    );
  }

  showButton(): boolean {
    if (!this._settings.singleSelection) {
      if (this._settings.limitSelection > 0) {
        return false;
      }
      // this._settings.enableCheckAll = this._settings.limitSelection === -1 ? true : false;
      return true; // !this._settings.singleSelection && this._settings.enableCheckAll && this._data.length > 0;
    } else {
      // should be disabled in single selection mode
      return false;
    }
  }

  itemShowRemaining(): number {
    return this.selectedItems.length - this._settings.itemsShowLimit;
  }

  addSelected(item: ListItem) {
    if (this._settings.singleSelection) {
      this.selectedItems = [];
      this.selectedItems.push(item);
    } else {
      this.selectedItems.push(item);
    }
    this.onChangeCallback(this.emittedValue(this.selectedItems));
    this.onSelect.emit(this.emittedValue(item));
  }

  removeSelected(itemSel: ListItem) {
    this.selectedItems.forEach((item) => {
      if (itemSel.id === item.id) {
        this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
      }
    });
    this.onChangeCallback(this.emittedValue(this.selectedItems));
    this.onDeSelect.emit(this.emittedValue(itemSel));
  }

  emittedValue(val: any): any {
    const selected = [];
    if (Array.isArray(val)) {
      val.map((item) => {
        selected.push(this.objectify(item));
      });
    } else {
      if (val) {
        return this.objectify(val);
      }
    }
    return selected;
  }

  objectify(val: ListItem) {
    if (this._sourceDataType === "object") {
      const obj = {};
      obj[this._settings.idField] = val.id;
      obj[this._settings.textField] = val.text;
      if (this._sourceDataFields.includes(this._settings.disabledField)) {
        obj[this._settings.disabledField] = val.isDisabled;
      }
      return obj;
    }
    if (this._sourceDataType === "number") {
      return Number(val.id);
    } else {
      return val.text;
    }
  }

  toggleDropdown(evt) {
    evt.preventDefault();
    if (this.disabled && this._settings.singleSelection) {
      return;
    }
    this._settings.defaultOpen = !this._settings.defaultOpen;
    if (!this._settings.defaultOpen) {
      this.onDropDownClose.emit();
    }
  }

  closeDropdown() {
    this._settings.defaultOpen = false;
    // clear search text
    if (this._settings.clearSearchFilter) {
      this.filter.text = "";
    }
    this.onDropDownClose.emit();
  }

  toggleSelectAll() {
    if (this.disabled) {
      return false;
    }
    if (!this.isAllItemsSelected()) {
      // filter out disabled item first before slicing
      this.selectedItems = this.listFilterPipe
        .transform(this._data, this.filter)
        .filter((item) => !item.isDisabled)
        .slice();
      this.onSelectAll.emit(this.emittedValue(this.selectedItems));
    } else {
      this.selectedItems = [];
      this.onDeSelectAll.emit(this.emittedValue(this.selectedItems));
    }
    this.onChangeCallback(this.emittedValue(this.selectedItems));
  }

  getFields(inputData) {
    const fields = [];
    if (typeof inputData !== "object") {
      return fields;
    }
    // tslint:disable-next-line:forin
    for (const prop in inputData) {
      fields.push(prop);
    }
    return fields;
  }

}
