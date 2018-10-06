import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor() {
    window.location.href = 'https://vomum.000webhostapp.com/stats/stats.html';

  }

  ngOnInit() {
  }

}
