import { JiraAppAngularPage } from './app.po';

describe('jira-app-angular App', () => {
  let page: JiraAppAngularPage;

  beforeEach(() => {
    page = new JiraAppAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
