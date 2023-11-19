import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent {
  @Input() projectTitle: string = '';
  @Input() projectSide: string = '';

  constructor() {}

}
