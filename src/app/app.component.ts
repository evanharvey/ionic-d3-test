import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data = [
    {Country: '일', Value: Math.random() * 10000},
    {Country: '월', Value: Math.random() * 10000},
    {Country: '화', Value: Math.random() * 10000},
    {Country: '수', Value: Math.random() * 10000},
    {Country: '목', Value: Math.random() * 10000},
    {Country: '금', Value: Math.random() * 10000},
    {Country: '토', Value: Math.random() * 10000}
  ]

  ngOnInit() {
  }
}
