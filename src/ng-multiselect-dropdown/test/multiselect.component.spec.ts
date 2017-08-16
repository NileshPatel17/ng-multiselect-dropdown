import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component  } from '@angular/core';
import { By } from '@angular/platform-browser';

import { Ng2MultiSelectDropDownModule } from '../src';
// import { MultiSelectComponent } from '../src/multiselect.component';

describe('Ng2MultiSelectDropdownComponent', () => {
    let comp: Ng2MultiSelectDropdownDemoComponent;
    let fixture: ComponentFixture<Ng2MultiSelectDropdownDemoComponent>;
    let trigger: any;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                // imports: [FormsModule, Ng2MultiSelectDropDownModule.forRoot()],
                declarations: [Ng2MultiSelectDropdownDemoComponent]
            }).compileComponents();
        })
    );

    beforeEach(done => {
        fixture = TestBed.createComponent(Ng2MultiSelectDropdownDemoComponent);
        comp = fixture.debugElement.componentInstance();
        fixture.detectChanges();
        trigger = fixture.debugElement.query(By.css('multiselect-dropdown')).nativeElement;
        done();
    });

    it('should create test component', () => {
        expect(comp).toBeDefined();
    });
});

@Component({
    template: `
    <div>
       app works!
        <span class="outside"></span>
    </div>
    `
})
class Ng2MultiSelectDropdownDemoComponent {
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
