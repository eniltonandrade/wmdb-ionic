import {
  Directive,
  Input,
  AfterViewInit,
  ElementRef,
  Renderer2,
  HostListener,
} from '@angular/core';
import {
  IonToolbar,
  IonContent,
  DomController,
  IonHeader,
} from '@ionic/angular';

@Directive({
  selector: '[appHideHeaderOnscroll]',
})
export class HideHeaderOnscrollDirective implements AfterViewInit {
  @Input() header: any;
  private lastY = 0;

  @HostListener('ionScroll', ['$event'])
  onWindowScroll($event) {
    console.log('client height', this.header.clientHeight);

    console.log('scroll', $event);
    if ($event.detail.scrollTop > 20) {
      this.domCtrl.write(() => {
        this.renderer.setStyle(this.header, 'margin-top', '-56px');
      });
    } else {
      this.domCtrl.write(() => {
        this.renderer.setStyle(this.header, 'margin-top', '0');
      });
    }

    this.lastY = $event.detail.scrollTop;
  }

  constructor(
    public element: ElementRef,
    public renderer: Renderer2,
    private domCtrl: DomController
  ) {}

  ngAfterViewInit() {
    this.header = this.header.el;
    this.domCtrl.write(() => {
      this.renderer.setStyle(this.header, 'transition', 'margin-top 400ms');
    });
  }
}
