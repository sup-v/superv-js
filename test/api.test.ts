import { init } from '../src/index';

describe('module initialization', () => {
  it('should accept the API key', () => {
    const superv = init({ apiKey: 'foo' });

    expect(superv.count).toBeDefined();
    expect(superv.value).toBeDefined();
    expect(superv.send).toBeDefined();
    expect(superv.getPending).toBeDefined();
  });

  it('should queue things', async () => {
    const superv = init({ apiKey: 'foo' });
    superv.count('a name', 42);
    superv.count('a name', 1, ['A', 'B']);

    expect(superv.getPending()).toContainEqual({ name: 'a name', counter: 42 });
    expect(superv.getPending()).toContainEqual({
      name: 'a name',
      counter: 1,
      tags: ['A', 'B'],
    });
  });
});
