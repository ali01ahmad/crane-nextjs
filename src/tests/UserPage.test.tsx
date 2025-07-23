// ✅ MOCK useRouter from App Router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));
import { render, screen, waitFor } from '@testing-library/react';
import UserPage from '@/app/users/page';
import { MockedProvider } from '@apollo/client/testing';
import { GET_USERS } from '@/service/graphql/user';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/store';
import { SessionProvider } from 'next-auth/react'; // ✅ Import SessionProvider

const mocks = [
  {
    request: {
      query: GET_USERS,
    },
    result: {
      data: {
        users: [
          {
            id: 1,
            name: 'Admin New',
            email: 'new@example.com',
          },
        ],
      },
    },
  },
];

describe('UserPage', () => {
  it('renders user table with data', async () => {
    render(
      <SessionProvider session={null}> {/* ✅ Wrap in SessionProvider */}
        <ReduxProvider store={store}>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UserPage />
          </MockedProvider>
        </ReduxProvider>
      </SessionProvider>
    );

    // Wait for the query to resolve
    await waitFor(() => {
      expect(screen.getByText('new@example.com')).toBeInTheDocument();
      expect(screen.getByText('Admin New')).toBeInTheDocument();
    });
  });
});
