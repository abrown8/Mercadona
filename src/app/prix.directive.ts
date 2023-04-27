import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appPrix]'
})
export class PrixDirective {

  constructor(private el : ElementRef) { 

  }

  @Input('appPrix') pourcentage_remise: number|string;

}
