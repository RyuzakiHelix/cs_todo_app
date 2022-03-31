import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) {}

  @Input() appHighlight = '';

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('white');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    if(color==="white"){
    this.el.nativeElement.style.backgroundColor = color;
    this.el.nativeElement.style.color = "black";
    }else{
    this.el.nativeElement.style.backgroundColor = "";
    this.el.nativeElement.style.color = "";
    }
  }

}
