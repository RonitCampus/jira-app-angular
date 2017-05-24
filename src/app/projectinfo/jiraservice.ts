import { Http } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class JiraService {

  private serverIp: String;

  constructor(private _http: Http) {
    this.serverIp = 'http://10.10.11.50:8080';
    //this.serverIp = 'http://192.168.1.245:8080';
  }

  public getServerString(): String {
    return this.serverIp;
  }
  public getProjectsInfo() {
    return this._http.get(this.serverIp + '/GetAllProjects')
      .map(data => data.json());
  }

  public getIssuesforProjct(projectId: Number) {
    return this._http.get(this.serverIp + '/getAllissueDetailsforProject/' + projectId)
      .map(data => data.json());
  }

  public getIssueDetails(issueId: Number) {
    return this._http.get(this.serverIp + '/GetIssueDetails/' + issueId)
      .map(data => data.json());
  }

}
