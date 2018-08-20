import { Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TestBed, ComponentFixture, tick } from '@angular/core/testing';
import { NgMultiSelectDropDownModule } from './../src/ng-multiselect-dropdown.module';

export function newEvent(eventName: string, bubbles = false, cancelable = false) {
    let evt = document.createEvent('CustomEvent'); // MUST be 'CustomEvent'
    evt.initCustomEvent(eventName, bubbles, cancelable, null);
    return evt;
}

export function createTestingModule<T>(cmp: Type<T>, template: string): ComponentFixture<T> {
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

export function tickAndDetectChanges(fixture) {
    fixture.detectChanges();
    tick();
}
