import { QuizgiriServerAppPage } from './app.po';

describe('quizgiri-server-app App', () => {
  let page: QuizgiriServerAppPage;

  beforeEach(() => {
    page = new QuizgiriServerAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
