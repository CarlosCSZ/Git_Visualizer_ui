import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { environment } from 'src/app/environments/environment';
import { CommitsService } from 'src/app/commitsModule/services/commits.service';
import { CommitsStorageService } from 'src/app/commitsModule/services/commits-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [''],
})
export class HomeComponent implements OnInit{
  frontRepo = environment.FRONT_REPO;
  backRepo = environment.BACK_REPO;
  frontError: boolean = false;
  backError: boolean = false;

  constructor(
    private commitsService: CommitsService,
    private commitsStorageService: CommitsStorageService,
    private mensaje: ToastrService
  ) {}

  ngOnInit(): void {
    this.commitsService.getAllCommits(this.frontRepo)
    .subscribe({
      next: (data) => {
        this.commitsStorageService.setFrontCommits(data);
        this.frontError = false;
      },
      error: (error) => {
        console.error('Front Error: ', error.message);
        this.frontError = true;
        this.mensaje.error(`No se pudo encontrar commits de ${this.frontRepo}. Intentelo mas tarde.`);
      }
    });

    this.commitsService.getAllCommits(this.backRepo)
    .subscribe({
      next: (data) => {
        this.commitsStorageService.setBackCommits(data);
        this.backError = false;
      },
      error: (error) => {
        console.error('Back Error: ', error.message);
        this.backError = true;
        this.mensaje.error(`No se pudo encontrar commits de ${this.backRepo}. Intentelo mas tarde.`);
      }
    });

    this.commitsStorageService.setPrivateCommits([], '');
  }
}
