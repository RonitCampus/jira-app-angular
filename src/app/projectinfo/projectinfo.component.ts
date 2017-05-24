import { OnInit } from '@angular/core/core';
import { Component } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { JiraService } from './jiraservice';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-projectinfo',
  templateUrl: './projectinfo.component.html',
  styleUrls: ['./projectinfo.component.css'],
  providers: [JiraService]
})
export class ProjectinfoComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  public options = {
    position: ['bottom', 'right'],
    timeOut: 5000,
    lastOnBottom: true
  }

  projects: Object[];
  IssuesForProject: object[];
  selectedProject: number;
  selectedProjectName: String;
  serverAddress: String;

  constructor(private _jiraService: JiraService, private _notificationService: NotificationsService) {
    this.IssuesForProject = [];
    this.selectedProject = 0;
    this.serverAddress = this._jiraService.getServerString();
  }

  public ngOnInit(): void {
    this.blockUI.start('Please wait fetching Projects info...');
    this._jiraService.getProjectsInfo()
      .subscribe(
      (data) => {
        this.projects = data;
        this.blockUI.stop();
      },
      (err) => {
        this.errorHandler(err);
      });
  }

  getClass(issueType: String): String {
    if (issueType === 'epic') {
      return 'danger';
    } else if (issueType === 'story') {
      return 'success';
    }
  }

  check(issueType: String): String {
    if (issueType === 'epic') {
      return 'text-warning text-left text-uppercase';
    } else if (issueType === 'story') {
      return 'text-primary text-center text-uppercase';
    } else {
      return 'text-success text-right text-uppercase';
    }
  }


  public onProjectChange(event: any) {
    this.selectedProjectName = event.target.options[event.target.selectedIndex].text
    if (event.target.value === 0) { this.selectedProject = 0; return; }
    this.selectedProject = event.target.value
    this.blockUI.start('Please wait fetching data...');
    this._jiraService.getIssuesforProjct(event.target.value)
      .subscribe((data) => {
        this.IssuesForProject = data;
        this.blockUI.stop();
      },
      (err) => {
        this.errorHandler(err);
      });
  }

  public getFlagForIssue(issue: any): String {
    const timeoriginalestimate: number = issue.timeoriginalestimate === NaN ? 0 : issue.timeoriginalestimate;
    const timespent: number = issue.timespent === NaN ? 0 : issue.timespent;
    const timeestimate: number = issue.timeestimate === NaN ? 0 : issue.timeestimate;
    //console.log('issueid :' + issue.id + '\t' + 'timespent : ' + timespent + '\t' + 'timeorignalestimate : ' + timeoriginalestimate);
    //console.log(issue);

    if (timespent <= timeoriginalestimate) {
      return 'flag-color-green';
    } else if (timespent > timeoriginalestimate) {
      console.log(issue);
      //console.log('issueid :' + issue.id + '\t' + 'timespent : ' + timespent + '\t' + 'timeorignalestimate : ' + timeoriginalestimate + '\t' + 'timeestimate : ' + timeestimate);
      return 'flag-color-red';
    }
  }

  public errorHandler(err: any): void {
    this.blockUI.stop();
    this._notificationService.error('Error fetching data from server', err);
  }

}
