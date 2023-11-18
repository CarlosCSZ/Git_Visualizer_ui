import { Component, OnInit } from '@angular/core';
import { CommitDetails } from 'src/app/commitsModule/models/commit.model';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    //
  }

  showFrontCommit(commit: CommitDetails) {
    console.log(commit)
  }
}
