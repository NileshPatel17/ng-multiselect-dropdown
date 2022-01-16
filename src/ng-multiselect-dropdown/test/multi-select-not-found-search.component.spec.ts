import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MultiSelectComponent } from '../src';
import { createTestingModule, tickAndDetectChanges } from './helper';

@Component({
    template: ``
})
class Ng2MultiSelectDropdownNotFoundSearchComponent {
    @ViewChild(MultiSelectComponent, { static: false })
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

describe('ng-multiselect-component: not found search', () => {
    let fixture: ComponentFixture<Ng2MultiSelectDropdownNotFoundSearchComponent>;
    beforeEach(fakeAsync(() => {
      fixture = createTestingModule(
        Ng2MultiSelectDropdownNotFoundSearchComponent,
        `<div class='container'>
            <ng-multiselect-dropdown name="city" [data]="cities"
                [(ngModel)]="selectedItem" [settings]="dropdownSettings"
                (onSelect)="onItemSelect($event)"
                [disabled]="disabled">
            </ng-multiselect-dropdown>
        </div>`
      );
    }));

    it('should disabled "Select All" button when search result not found', fakeAsync(() => {
        const searchInputEl = fixture.debugElement.query(By.css('.filter-textbox input[type="text"]')).nativeElement;
        searchInputEl.value = 'asdfasdk';
        searchInputEl.dispatchEvent(new Event('input'));
        const selectAllCheckboxEl = fixture.debugElement.queryAll(By.css('.multiselect-item-checkbox input[type="checkbox"]'))[0]
                                    .nativeElement;
        tickAndDetectChanges(fixture);
        expect(fixture.componentInstance.select.filter.text).toContain('asdfasdk');
        expect(fixture.componentInstance.select.isAllItemsSelected()).toBe(false);
        expect(selectAllCheckboxEl.disabled).toBe(true);
    }));

    it('should be contain "Select All" as wording "Select All" button when search result not found', fakeAsync(() => {
        const searchInputEl = fixture.debugElement.query(By.css('.filter-textbox input[type="text"]')).nativeElement;
        searchInputEl.value = 'asdfasdk';
        searchInputEl.dispatchEvent(new Event('input'));
        const selectAllWording = fixture.debugElement.queryAll(By.css('.multiselect-item-checkbox div'))[0]
                                    .nativeElement;
        tickAndDetectChanges(fixture);
        expect(selectAllWording.textContent).toContain('Select All');
    }));
});
