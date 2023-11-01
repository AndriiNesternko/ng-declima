import { Component, Input } from '@angular/core';

import { IAir } from 'src/app/interfaces/air';

@Component({
  selector: 'air-pollution',
  templateUrl: './air-pollution.component.html',
  styleUrls: ['./air-pollution.component.css'],
})
export class AirPollutionComponent {
  @Input() air!: IAir;
}
