import { securitySearchPipe } from './securitysearch.pipe';

describe('SearchPipe', () => {
  it('create an instance', () => {
    const pipe = new securitySearchPipe();
    expect(pipe).toBeTruthy();
  });
});
