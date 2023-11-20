import { Component, OnInit } from '@angular/core';
import { CommitsStorageService } from 'src/app/commitsModule/services/commits-storage.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styles: ['']
})
export class PrivateComponent implements OnInit {
  repo: string = '';

  constructor(private commitsStorageService: CommitsStorageService) {}

  ngOnInit(): void {
    this.commitsStorageService.repoName$
    .subscribe((data) => {
      this.repo = data;
    })
  }
}
