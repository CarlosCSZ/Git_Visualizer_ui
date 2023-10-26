import { Component, Input, OnInit } from '@angular/core';
import { CommitDetails } from 'src/app/models/commit.model';
import { CommitsStorageService } from 'src/app/services/commits-storage.service';

@Component({
  selector: 'app-commit-details',
  templateUrl: './commit-details.component.html',
  styleUrls: ['./commit-details.component.scss']
})
export class CommitDetailsComponent implements OnInit {
  commit: CommitDetails = {
    sha: '',
    author: '',
    email: '',
    date: '',
    message: '',
    avatar: '',
    tree: ''
  };
  render: boolean = false;

  constructor(
    private commitsStorageService: CommitsStorageService,
  ) {}

  ngOnInit(): void {
    this.commit = this.commitsStorageService.getBackCommit();
    this.commitsStorageService.backState$.subscribe((state) => {
      this.render = state;
    });
  }
}
