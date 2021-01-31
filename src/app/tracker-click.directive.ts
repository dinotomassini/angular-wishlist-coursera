import { Directive, ElementRef } from '@angular/core';
import {fromEvent} from 'rxjs';

@Directive({
  selector: '[appTrackerClick]'
})
export class TrackerClickDirective {
  private element: HTMLInputElement;

  constructor(private elRef: ElementRef) {
    this.element = elRef.nativeElement;
    fromEvent(this.element, 'click').subscribe( evento => this.track(evento) );
  }

  track(evento: Event) {
    const elemTags = this.element.attributes.getNamedItem('data-tracker-tags').value.split(' ');
    console.log(`|||||||| track evento: ${elemTags}`);
  }

}
