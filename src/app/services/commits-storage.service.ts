import { Injectable } from '@angular/core';
import { CommitDetails } from '../commitsModule/models/commit.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommitsStorageService {

  private _dFrontCommit: CommitDetails = {
    sha: '',
    author: '',
    email: '',
    date: '',
    message: '',
    avatar: '',
    gh_url: ''
  };
  private frontCommit = new BehaviorSubject<CommitDetails>({
    sha: '',
    author: '',
    email: '',
    date: '',
    message: '',
    avatar: '',
    gh_url: ''
  })

  private _dBackCommit: CommitDetails = {
    sha: '',
    author: '',
    email: '',
    date: '',
    message: '',
    avatar: '',
    gh_url: ''
  };
  private backCommit = new BehaviorSubject<CommitDetails>({
    sha: '',
    author: '',
    email: '',
    date: '',
    message: '',
    avatar: '',
    gh_url: ''
  });

  private frontCommits = new BehaviorSubject<CommitDetails[]>([]);
  private backCommits = new BehaviorSubject<CommitDetails[]>([]);

  private frontState = new BehaviorSubject<boolean>(false);
  private backState = new BehaviorSubject<boolean>(false);

  frontCommit$ = this.frontCommit.asObservable();
  backCommit$ = this.backCommit.asObservable();
  frontState$ = this.frontState.asObservable();
  backState$ = this.backState.asObservable();
  frontCommits$ = this.frontCommits.asObservable();
  backCommits$ = this.backCommits.asObservable();

  getFrontCommit() {
    return this._dFrontCommit;
  }
  getBackCommit() {
    return this._dBackCommit;
  }

  setFrontCommit(commit: CommitDetails) {
    this._dFrontCommit.sha = commit.sha;
    this._dFrontCommit.author = commit.author;
    this._dFrontCommit.email = commit.email;
    this._dFrontCommit.date = commit.date;
    this._dFrontCommit.message = commit.message;
    this._dFrontCommit.avatar = commit.avatar;
    this._dFrontCommit.gh_url = commit.gh_url;

    this.frontCommit.next(this._dFrontCommit);

    this.frontState.next(true);
  }

  setBackCommit(commit: CommitDetails) {
    this._dBackCommit.sha = commit.sha;
    this._dBackCommit.author = commit.author;
    this._dBackCommit.email = commit.email;
    this._dBackCommit.date = commit.date;
    this._dBackCommit.message = commit.message;
    this._dBackCommit.avatar = commit.avatar;
    this._dBackCommit.gh_url = commit.gh_url;

    this.backCommit.next(this._dBackCommit);

    this.backState.next(true);
  }

  setFrontCommits(commits: CommitDetails[]) {
    this.frontCommits.next(commits);
  }

  setBackCommits(commits: CommitDetails[]) {
    this.backCommits.next(commits);
  }

}
