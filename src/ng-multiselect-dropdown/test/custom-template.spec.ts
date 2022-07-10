import { Component, ViewChild, DebugElement } from "@angular/core";
import { ComponentFixture, fakeAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { MultiSelectComponent } from "./../src/multiselect.component";
import { createTestingModule, tickAndDetectChanges } from "./helper";

@Component({
  template: ``,
})
class Ng2MultiSelectDropdownSingleSelect {
  @ViewChild(MultiSelectComponent)
  select: MultiSelectComponent;
  cities = [
    { item_id: 1, item_text: "Mumbai" },
    { item_id: 2, item_text: "Bangalore" },
    { item_id: 3, item_text: "Pune", isDisabled: true },
    { item_id: 4, item_text: "Navsari" },
    { item_id: 5, item_text: "New Delhi" },
  ];
  selectedItem = [{ item_id: 4, item_text: "Navsari" }];
  dropdownSettings = {
    singleSelection: true,
    idField: "item_id",
    textField: "item_text",
    selectAllText: "Select All",
    unSelectAllText: "UnSelect All",
    badgeShowLimit: 3,
    disabled: false,
    allowSearchFilter: false,
    closeDropDownOnSelection: true,
  };
}
@Component({
  template: ``,
})
class Ng2MultiSelectDropdownMultipleSelect {
  @ViewChild(MultiSelectComponent)
  select: MultiSelectComponent;
  cities = [
    { item_id: 1, item_text: "Mumbai" },
    { item_id: 2, item_text: "Bangalore" },
    { item_id: 3, item_text: "Pune" },
    { item_id: 4, item_text: "Navsari" },
    { item_id: 5, item_text: "New Delhi" },
  ];
  selectedItem = [
    { item_id: 1, item_text: "Mumbai" },
    { item_id: 4, item_text: "Navsari" },
  ];
  dropdownSettings = {
    singleSelection: false,
    idField: "item_id",
    textField: "item_text",
    selectAllText: "Select All",
    unSelectAllText: "UnSelect All",
    badgeShowLimit: 3,
    disabled: false,
    allowSearchFilter: true,
    closeDropDownOnSelection: true,
  };
}
describe("custom-template", function () {
  describe("Multiple Selection", () => {
    let fixture: ComponentFixture<Ng2MultiSelectDropdownMultipleSelect>;
    beforeEach(fakeAsync(() => {
      fixture = createTestingModule(
        Ng2MultiSelectDropdownMultipleSelect,
        `<div class='container'>
            <ng-multiselect-dropdown name="city"
                [data]="cities"
                [(ngModel)]="selectedItem"
                [settings]="dropdownSettings"
                (onSelect)="onItemSelect($event)"
                [disabled]="disabled">
                <ng-template #optionTemplate let-item let-option="option" let-id="id" let-isSelected="isSelected">
                <div style="padding:6px 10px">
                    <label style="color: #333;min-width: 130px;">{{option}}</label>
                </div>
            </ng-template>   
            </ng-multiselect-dropdown>
        </div>`
      );
    }));

    it("should dropdown gets close once item is selected", fakeAsync(() => {
      tickAndDetectChanges(fixture);
      const selDropdown: HTMLElement = fixture.nativeElement.querySelector(
        ".multiselect-dropdown"
      );
      selDropdown.click();
      tickAndDetectChanges(fixture);
      expect(fixture.componentInstance.select._settings.defaultOpen).toBe(
        false
      );
    }));

    it("selected item should be correct", fakeAsync(() => {
      expect(fixture.componentInstance.selectedItem.length).toBe(2);
    }));
    it('should have default placeholder as "Select"', () => {
      const de: DebugElement = fixture.debugElement.query(
        By.css(".dropdown-btn>span")
      );
      const el = de.nativeElement;
      expect(el.textContent).toContain("Select");
    });
    it('should have default placeholder for search textbox as "Search"', () => {
      const de: DebugElement = fixture.debugElement.query(
        By.css(".filter-textbox>input")
      );
      const el = de.nativeElement;
      expect(el.placeholder).toBe("Search");
    });
    it("close dropdown if opened and clicked outside dropdown container", fakeAsync(() => {
      fixture.componentInstance.select.isDropdownOpen = true;
      const de: DebugElement = fixture.debugElement.query(By.css(".container"));
      const el = de.nativeElement;
      el.click();
      tickAndDetectChanges(fixture);
      expect(fixture.componentInstance.select._settings.defaultOpen).toBe(
        false
      );
    }));
  });
});
