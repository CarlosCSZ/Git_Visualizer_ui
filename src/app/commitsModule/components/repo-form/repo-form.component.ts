import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-repo-form',
  templateUrl: './repo-form.component.html',
  styleUrls: ['./repo-form.component.scss']
})
export class RepoFormComponent {
  formulario!: FormGroup;

  constructor(private form: FormBuilder) {
    this.formulario = this.form.group({

    })
  }
}
