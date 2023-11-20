import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommitDetails } from '../models/commit.model';
import { environment } from '../../environments/environment';
import { Observable, delay, retry, RetryConfig } from 'rxjs';
import { PrivateRepoDetails } from '../models/privateCommits.model';


@Injectable({
  providedIn: 'root'
})
export class CommitsService {
  private baseUrl: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  getAllCommits(repo: string): Observable<CommitDetails[]> {
    const retryConfig: RetryConfig = {
      count: 2,
      delay: 3000
    };

    return this.http.get<CommitDetails[]>(`${this.baseUrl}/commits`, {
      params: {
        repo
      }
    })
    .pipe(
      retry(retryConfig)
    );
  }

  getPrivateCommits(privateRepoDetails: PrivateRepoDetails): Observable<CommitDetails[]> {
    const retryConfig: RetryConfig = {
      count: 2,
      delay: 3000
    };

    return this.http.get<CommitDetails[]>(`${this.baseUrl}/commits/private`, {
      params: {
        ...privateRepoDetails
      }
    })
    .pipe(
      retry(retryConfig)
    );
  }
}
