import {resolvers} from './index';

describe('GraphQL Resolvers', () => {
  it('should have Query and Mutation defined', () => {
    expect(resolvers).toHaveProperty('Query');
    expect(typeof resolvers.Query).toBe('object');
  });

  it('should have expected resolver functions', () => {
    // Replace with actual resolver names
    expect(resolvers.Query).toHaveProperty('users');
    expect(typeof resolvers.Query.users).toBe('function');

  });
    it('should have crane expected resolver functions', () => {
    // Replace with actual resolver names
    expect(resolvers.Query).toHaveProperty('cranes');
    expect(typeof resolvers.Query.cranes).toBe('function');

  });
});
