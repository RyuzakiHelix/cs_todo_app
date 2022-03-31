import { Directive, Output, EventEmitter, HostListener } from '@angular/core';
import { filter, interval, Observable, Subject, takeUntil, tap } from 'rxjs';


@Directive({
  selector: '[appHoldable]'
})
export class HoldableDirective {

  @Output() HoldTime: EventEmitter<number> = new EventEmitter();

  state: Subject<string> = new Subject();

  cancel: Observable<string>;

  constructor() {

   this.cancel = this.state.pipe(
      filter(v => v === 'cancel'),
      tap(v => {
        this.HoldTime.emit(0)
      })
    );
  }

  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  onExit() {
    this.state.next('cancel')
  }

  @HostListener('mousedown', ['$event']) 
  onHold() {
    this.state.next('start')
    const n = 100;
    interval(n).pipe(
      takeUntil(this.cancel),
      tap(v => {
        this.HoldTime.emit(v * n)
      }),
    )
    .subscribe();
  }

}
