import { storiesOf } from '@storybook/angular'
import { withNotes } from '@storybook/addon-notes';
import { array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgMultiSelectDropDownModule, IDropdownSettings } from 'ng-multiselect-dropdown'

const cities = [
    { item_id: 1, item_text: 'New Delhi' },
    { item_id: 2, item_text: 'Mumbai' },
    { item_id: 3, item_text: 'Bangalore' },
    { item_id: 4, item_text: 'Pune' },
    { item_id: 5, item_text: 'Chennai' },
    { item_id: 6, item_text: 'Navsari' }
];
const cities1=['navsari','surat']
const dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text'
}
// 
storiesOf('MultiSelectComponent', module).add('with default name', withNotes('testing')(() => ({
    template:
        `
    <div style="width:40%">
        <ng-multiselect-dropdown name="city" [data]="cities" [settings]="dropdownSettings">
        </ng-multiselect-dropdown>
    </div>
    `,
    props: {
        placeholder: "select city",
        data: array('dt',cities1),
        settings: dropdownSettings
    },
    moduleMetadata: {
        imports: [
            FormsModule,
            ReactiveFormsModule,
            NgMultiSelectDropDownModule
        ]
    }
})));