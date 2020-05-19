import {
  Directive,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appModifyHeader]',
})
export class ModifyHeaderDirective implements OnInit {
  @Input() toolbar: any;
  @Input() ionTitle: any;
  @Input() title: string;
  @HostListener('ionScroll', ['$event'])
  onWindowScroll($event) {
    if ($event.detail.scrollTop > 290) {
      this.domCtrl.write(() => {
        this.renderer.setStyle(this.toolbar, 'background', '#131722');
        this.renderer.setStyle(this.ionTitle, 'opacity', '100%');
      });
    } else {
      this.domCtrl.write(() => {
        this.renderer.setStyle(this.toolbar, 'background', 'transparent');
        this.renderer.setStyle(this.ionTitle, 'opacity', '0');
      });
    }
  }

  constructor(private renderer: Renderer2, private domCtrl: DomController) {}

  ngOnInit() {
    this.initStyles();
    this.toolbar = this.toolbar.el;
    this.ionTitle = this.ionTitle.el;
    this.domCtrl.write(() => {
      const text = this.renderer.createText(this.title);
      this.renderer.appendChild(this.ionTitle, text);
    });
  }
  initStyles() {
    this.domCtrl.write(() => {
      this.renderer.setStyle(this.ionTitle, 'opacity', '0');
    });
  }
}
