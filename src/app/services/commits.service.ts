import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommitDetails } from '../models/commit.model';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CommitsService {
  private baseUrl: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  getAllCommits(repo: string) {
    return new Promise((resolve, reject) => {
      this.http.post<CommitDetails[]>(`${this.baseUrl}/commits`, {
        repo,
      })
      .subscribe(
        (data) => resolve(data),
        (error) => reject(error)
      )
    });
  }
}
