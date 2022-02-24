import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-foooter',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FoooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  thisYear = new Date().getFullYear()
}
