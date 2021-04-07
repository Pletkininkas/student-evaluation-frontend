import { Directive, ElementRef, HostListener, Input, Output, Renderer2, EventEmitter } from '@angular/core';
import { Student } from '../model/student';
import { Sort } from '../shared/sort';
import { get as lodashGet } from 'lodash';

@Directive({
  selector: '[appSort]',
})
export class SortDirective {
  @Input() appSort: Student[];
  @Input() appSortKey: string;
  @Output() appSortKeyEmit: EventEmitter<string> = new EventEmitter<string>();

  constructor(private renderer: Renderer2, private targetElem: ElementRef) {}

  @HostListener('click')
  sortdata() {
    const elem = this.targetElem.nativeElement;
    const order = elem.getAttribute('data-order');
    const property = elem.getAttribute('data-name');

    const dir = +order === -1 ? 1 : -1;
    this.appSort.sort((a, b) => (lodashGet(a, property) < lodashGet(b, property) ? -1 * dir : 1 * dir));

    if (+order === -1) {
      elem.setAttribute('data-order', 1);
    } else {
      elem.setAttribute('data-order', -1);
    }

    const emitString = `${this.appSortKey}-${dir === 1 ? 'asc' : 'desc'}`;
    this.appSortKeyEmit.emit(emitString);
  }
}
