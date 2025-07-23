import reducer, { setUsers, addUser, clearUsers } from '../userSlice';

const initialState = { users: [] };

describe('userSlice reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle setUsers', () => {
    const mockUsers = [
      { id: '1', name: 'Alice', email: 'alice@example.com' },
      { id: '2', name: 'Admin New', email: 'new@example.com' },
    ];
    const nextState = reducer(initialState, setUsers(mockUsers));
    expect(nextState.users).toEqual(mockUsers);
  });

  it('should handle addUser', () => {
    const newUser = { id: '3', name: 'Charlie', email: 'charlie@example.com' };
    const nextState = reducer(initialState, addUser(newUser));
    expect(nextState.users).toContainEqual(newUser);
  });

  it('should handle clearUsers', () => {
    const populatedState = {
      users: [{ id: '1', name: 'Test', email: 'test@test.com' }],
    };
    const nextState = reducer(populatedState, clearUsers());
    expect(nextState.users).toEqual([]);
  });
});
