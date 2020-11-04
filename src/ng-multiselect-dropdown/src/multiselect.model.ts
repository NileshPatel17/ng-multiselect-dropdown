export interface IDropdownSettings {
  singleSelection?: boolean;
  idField?: string;
  textField?: string;
  iconField?: string;
  disabledField?: string;
  enableCheckAll?: boolean;
  selectAllText?: string;
  unSelectAllText?: string;
  allowSearchFilter?: boolean;
  clearSearchFilter?: boolean;
  maxHeight?: number;
  itemsShowLimit?: number;
  limitSelection?: number;
  searchPlaceholderText?: string;
  noDataAvailablePlaceholderText?: string;
  closeDropDownOnSelection?: boolean;
  showSelectedItemsAtTop?: boolean;
  defaultOpen?: boolean;
  allowRemoteDataSearch?: boolean;
}

export class ListItem {
  id: String | number;
  text: String | number;
  icon: String;
  isDisabled?: boolean;

  public constructor(source: any) {
    if (typeof source === 'string' || typeof source === 'number') {
      this.id = this.text = source;
      this.icon = '';
      this.isDisabled = false;
    }
    if (typeof source === 'object') {
      this.id = source.id;
      this.text = source.text;
      this.icon = source.icon;
      this.isDisabled = source.isDisabled;
    }
  }
}
