import { ElementRef, Input, OnInit, OnChanges, Component, ViewEncapsulation, ViewChild, AfterViewChecked, SimpleChanges } from '@angular/core';

declare let hljs: any;

@Component({
    selector: 'sh-code-viewer',
    template: `
    <pre>
        <code #codeView [className]="language" [innerHTML]="code"></code>
    </pre>
`,
    encapsulation: ViewEncapsulation.None,
    styles: [
        `
pre{
padding: 0;
margin: 0;
}
code{
margin: 0;
padding-top: 0;
}
/*

Monokai Sublime style. Derived from Monokai by noformnocontent http://nn.mit-license.org/

*/

.hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  background: #23241f;
}

.hljs,
.hljs-tag,
.hljs-subst {
  color: #f8f8f2;
}

.hljs-strong,
.hljs-emphasis {
  color: #a8a8a2;
}

.hljs-bullet,
.hljs-quote,
.hljs-number,
.hljs-regexp,
.hljs-literal,
.hljs-link {
  color: #ae81ff;
}

.hljs-code,
.hljs-title,
.hljs-section,
.hljs-selector-class {
  color: #a6e22e;
}

.hljs-strong {
  font-weight: bold;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-name,
.hljs-attr {
  color: #f92672;
}

.hljs-symbol,
.hljs-attribute {
  color: #66d9ef;
}

.hljs-params,
.hljs-class .hljs-title {
  color: #f8f8f2;
}

.hljs-string,
.hljs-type,
.hljs-built_in,
.hljs-builtin-name,
.hljs-selector-id,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-addition,
.hljs-variable,
.hljs-template-variable {
  color: #e6db74;
}

.hljs-comment,
.hljs-deletion,
.hljs-meta {
  color: #75715e;
}
`
    ]
})
export class CodeViewerComponent implements OnInit, OnChanges, AfterViewChecked {
    @Input() useBr: boolean;
    @Input() code: string;
    @Input() language: string;
    @ViewChild('codeView') codeView: ElementRef;
    private needUpdate: boolean;

    constructor(private elementRef: ElementRef) {}

    ngOnInit() {
        if (this.useBr) {
            hljs.configure({ useBR: true });
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['code'] && changes['code'].currentValue) {
            this.needUpdate = true;
        }
    }

    ngAfterViewChecked() {
        if (!this.needUpdate) {
            return;
        }
        this.needUpdate = false;

        if (this.codeView.nativeElement.innerHTML) {
            hljs.highlightBlock(this.codeView.nativeElement);
        }
    }
}
