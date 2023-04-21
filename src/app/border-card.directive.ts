import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appBorderCard]'
})
export class BorderCardDirective {

  constructor(private el: ElementRef) {
    this.setBorder("solid 2px #6c757d");
  }

  @Input('appBorderCard') borderColor: string;

  @HostListener('mouseenter') onMouseEnter() {
    this.setBorder("solid 3px black");
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBorder("solid 2px #6c757d");
  }

  private setBorder(border: string){
    this.el.nativeElement.style.border = border;
    this.el.nativeElement.style.cursor = "pointer";

  }
}
