import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'comp-a',
    template: `
    hola {{name}}!<br/>
    <input [(ngModel)]="name" /><br/>
    <button (click)="callme()">ok</button>`
})

export class CompAComponent {
    name = 'Nilesh Patel';
    @Output('onClick') onClick: EventEmitter<string> = new EventEmitter<string>();

    callme() {
        this.onClick.emit(this.name)
        console.log('hi')
    }
}