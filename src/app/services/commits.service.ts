import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommitDetails } from '../models/commit.model';


@Injectable({
  providedIn: 'root'
})
export class CommitsService {

  constructor(private http: HttpClient) { }

  getAllCommits() {
    return new Promise((resolve, reject) => {
      this.http.get<CommitDetails[]>('http://localhost:3001/api/octo')
      .subscribe(
        (data) => resolve(data),
        (error) => reject(error)
      )
    });
  }
}
