import { Component, OnInit, Input, ElementRef, Renderer2, AfterViewInit, OnDestroy } from '@angular/core';
import { IonContent, DomController, IonToolbar } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shrinking-segment-header',
  templateUrl: './shrinking-segment-header.component.html',
  styleUrls: ['./shrinking-segment-header.component.scss'],
})
export class ShrinkingSegmentHeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() scrollArea: IonContent;
  @Input() toolbar: any;
  @Input() title: any;
  @Input() headerHeight: number;
  isTransparent: true;
  scrollAmount = 140;
  private scrollSbuscription: Subscription;

  newHeaderHeight: any;
  currentScrollTop = 0;

  constructor(public element: ElementRef, public renderer: Renderer2, private domCtrl: DomController) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.domCtrl.write(() => {
      this.renderer.setStyle(this.element.nativeElement, 'height', this.headerHeight + 'px');
      this.renderer.setStyle(this.element.nativeElement, 'margin-top', '0px');
      this.renderer.setStyle(this.element.nativeElement, 'transition', 'transform 100ms ease');
      this.renderer.setStyle(this.element.nativeElement, 'opacity', '1');
      this.renderer.setStyle(this.element.nativeElement, 'transition', 'opacity 500ms');
      this.renderer.setStyle(this.toolbar.el, 'position', 'absolute');
      this.renderer.setStyle(this.title.el, 'transform', 'translate3d(0,-42px,0)');
      this.renderer.setStyle(this.title.el, 'transition', 'transform 200ms ease');
    });

    this.scrollSbuscription = this.scrollArea.ionScroll.subscribe((ev) => {
      this.resizeHeader(ev);
      this.changeOpacity(ev.detail.scrollTop);
    });
  }

  ngOnDestroy() {
    if (this.scrollSbuscription) {
      this.scrollSbuscription.unsubscribe();
    }
  }

  resizeHeader(ev) {
    // console.log('ev', ev);
    // console.log('ev.detail.scrollTop', ev.detail.scrollTop);
    // console.log('ev.detail.currentY', ev.detail.currentY);
    // console.log('ev.detail.deltaY', ev.detail.deltaY);

    let scroll = ev.detail.scrollTop;
    if (scroll > 167) {
      scroll = 230;
      this.domCtrl.write(() => {
        this.renderer.removeStyle(this.toolbar.el, 'position');
        this.renderer.setStyle(this.title.el, 'transform', 'translate3d(0,0,0)');
        this.renderer.setStyle(this.toolbar.el, 'background', '#131722');
      });
    }

    if (scroll < 167) {
      this.domCtrl.write(() => {
        this.renderer.setStyle(this.toolbar.el, 'position', 'absolute');
        this.renderer.setStyle(this.toolbar.el, 'background', 'transparent');
        this.renderer.setStyle(this.title.el, 'transform', 'translate3d(0,-42px,0)');
      });
    }

    this.domCtrl.write(() => {
      this.renderer.setStyle(this.element.nativeElement, 'margin-top', '-' + scroll + 'px');
    });
  }

  changeOpacity(scrollTop: number) {
    let amount =
      ((this.isTransparent ? 1 : 2) - (scrollTop + this.scrollAmount) / this.scrollAmount) *
      (this.isTransparent ? -1 : 1);

    if (amount > 1) {
      amount = 1;
    }

    if (amount < 0) {
      amount = 0;
    }
    this.domCtrl.write(() => {
      this.renderer.setStyle(this.element.nativeElement, 'opacity', amount);
    });
  }
}
