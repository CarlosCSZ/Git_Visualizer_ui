import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { CommitsStorageService } from 'src/app/commitsModule/services/commits-storage.service';
import { PrivateRepoDetails } from '../../models/privateCommits.model';
import { CommitsService } from 'src/app/commitsModule/services/commits.service';

@Component({
  selector: 'app-repo-form',
  templateUrl: './repo-form.component.html',
  styleUrls: ['./repo-form.component.scss'],
})
export class RepoFormComponent {
  commitsFrom!: FormGroup;

  constructor(
    private form: FormBuilder,
    private commitsService: CommitsService,
    private commitsStorageService: CommitsStorageService,
    private mensaje: ToastrService
  ) {
    this.commitsFrom = this.form.group({
      'owner': ['', [Validators.required]],
      'repo': ['', [Validators.required]],
      'token': ['', [Validators.required]],
    });
  }

  requestCommits() {
    if(this.commitsFrom.valid) {
      const details: PrivateRepoDetails = {
        owner: this.commitsFrom.get('owner')?.value,
        repo: this.commitsFrom.get('repo')?.value,
        token: this.commitsFrom.get('token')?.value
      };

      this.commitsService.getPrivateCommits(details)
      .subscribe({
        next: (data) => {
          this.commitsStorageService.setPrivateCommits(data, details.repo);
          this.mensaje.success('Commits requested successfully');
        },
        error: (error) => {
          console.error('From commits service: ', error);
          this.mensaje.error("Check the correct spelling of the repository's name and owner. Verify your token");
        }
      })
    } else {
      this.mensaje.error('All Fields are required in order to request commits');
    }
  }
}
