import { NgTest2Page } from './app.po';

describe('ng-test2 App', () => {
  let page: NgTest2Page;

  beforeEach(() => {
    page = new NgTest2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
