import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appPromotion]'
})
export class PromotionDirective implements OnInit {

  @Input('appPromotion') promotionDate: string;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    // Convertir la date promotion en format Date
    const promotionDate = new Date(this.promotionDate.split('/').reverse().join('/'));

    // Vérifier si la promotion est encore valide
    const currentDate = new Date();
    const isPromotionValid = promotionDate >= currentDate;

    // Ajouter le style CSS si la promotion est valide
    if (isPromotionValid) {
        this.el.nativeElement.style.backgroundColor = '#FF5733';
        this.el.nativeElement.style.color = 'white';
        this.el.nativeElement.style.fontWeight = 'bold';
        this.el.nativeElement.style.padding = '10px';
        this.el.nativeElement.style.borderRadius = '10px';
        this.el.nativeElement.style.display = 'flex';
        this.el.nativeElement.style.flexDirection = 'column';
        this.el.nativeElement.style.justifyContent = 'center';
        this.el.nativeElement.style.alignItems = 'center';
        this.el.nativeElement.style.width = "70%"
      }
  }
}
