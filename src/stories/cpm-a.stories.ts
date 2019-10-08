import { storiesOf } from '@storybook/angular'
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';

import { CompAComponent } from '../app/components/comp-a/comp-a-component';
storiesOf('Component-A', module).add('with default name', withNotes('testing')(() => ({
    component: CompAComponent,
    props: {
        onClick: action('onClick')
    }
})));