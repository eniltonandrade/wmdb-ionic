import { Component, OnInit, Input, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { IonContent, DomController, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-shrinking-segment-header',
  templateUrl: './shrinking-segment-header.component.html',
  styleUrls: ['./shrinking-segment-header.component.scss'],
})
export class ShrinkingSegmentHeaderComponent implements OnInit, AfterViewInit {
  @Input() scrollArea: IonContent;
  @Input() toolbar: any;
  @Input() title: any;
  @Input() headerHeight: number;

  newHeaderHeight: any;
  currentScrollTop = 0;

  constructor(public element: ElementRef, public renderer: Renderer2, private domCtrl: DomController) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.renderer.setStyle(this.element.nativeElement, 'height', this.headerHeight + 'px');
    this.domCtrl.write(() => {
      this.renderer.setStyle(this.toolbar.el, 'position', 'absolute');
      this.renderer.setStyle(this.title.el, 'display', 'none');
    });

    this.scrollArea.ionScroll.subscribe((ev) => {
      this.resizeHeader(ev);
    });
  }

  resizeHeader(ev) {
    // console.log('ev', ev);
    // console.log('ev.detail.scrollTop', ev.detail.scrollTop);
    // console.log('ev.detail.currentY', ev.detail.currentY);
    // console.log('ev.detail.deltaY', ev.detail.deltaY);

    this.newHeaderHeight = this.headerHeight - ev.detail.scrollTop;

    if (this.newHeaderHeight < 51) {
      this.newHeaderHeight = 0;
    }

    if (this.newHeaderHeight < 50) {
      this.domCtrl.write(() => {
        this.renderer.removeStyle(this.toolbar.el, 'position');
        this.renderer.setStyle(this.title.el, 'display', 'block');
        this.renderer.setStyle(this.toolbar.el, 'background', '#131722');
      });
    }
    if (this.newHeaderHeight > 50) {
      this.domCtrl.write(() => {
        this.renderer.setStyle(this.toolbar.el, 'position', 'absolute');
        this.renderer.setStyle(this.toolbar.el, 'background', 'transparent');
        this.renderer.setStyle(this.title.el, 'display', 'none');
      });
    }

    this.domCtrl.write(() => {
      this.renderer.setStyle(this.element.nativeElement, 'height', this.newHeaderHeight + 'px');
    });
  }
}
