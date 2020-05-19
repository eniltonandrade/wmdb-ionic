import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  constructor(private homeSrvc: HomeService) {}

  ngOnInit() {
    this.homeSrvc.getList(5).subscribe((data) => {
      console.log(data);
    });
  }
}
