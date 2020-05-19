import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CastTmdb } from 'src/app/models/castTmdb.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cast-list',
  templateUrl: './cast-list.page.html',
  styleUrls: ['./cast-list.page.scss']
})
export class CastListPage implements OnInit {
  @Input() casts: CastTmdb;
  @Input() title: string;
  profilePicUrl = `${environment.TMDB.images.base_url}${environment.TMDB.images.profile_sizes.w185}/`;
  constructor(private modalCtrl: ModalController, private router: Router) {}

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
