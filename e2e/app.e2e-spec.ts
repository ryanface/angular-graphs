import { GifsPage } from './app.po';

describe('gifs App', () => {
  let page: GifsPage;

  beforeEach(() => {
    page = new GifsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
