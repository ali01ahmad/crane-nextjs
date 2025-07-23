import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CranePage from '@/app/crane/page';
import { Provider as ReduxProvider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import craneReducer from '@/store/slices/useCrane';
import { SessionProvider } from 'next-auth/react';

// ✅ Don't import useCraneModule here — we'll use requireMock later

// ✅ Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: { user: { name: 'Test User' } },
    status: 'authenticated',
  }),
  SessionProvider: ({ children }: any) => children,
}));

// ✅ Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// ✅ Mock useCranes
jest.mock('@/hook/useCrane', () => ({
  useCranes: jest.fn(),
}));

const mockCraneData = [
  {
    id: '1',
    serial_number: 'CRANE-001',
    model: 'Model X',
    location: 'Site A',
    status: 'Active',
  },
];

describe('CranePage Component', () => {
  const store = configureStore({
    reducer: {
      crane: craneReducer,
    },
    preloadedState: {
      crane: {
        cranes: mockCraneData,
      },
    },
  });

  // ✅ Use mocked version only after jest.mock
  let mockUseCranes: jest.Mock;

  beforeEach(() => {
    const mockedModule = jest.requireMock('@/hook/useCrane');
    mockUseCranes = mockedModule.useCranes;
    mockUseCranes.mockReturnValue({
      cranes: mockCraneData,
      loading: false,
      error: null,
    });
  });

  it('renders the crane table with data', async () => {
    render(
      <SessionProvider session={null}>
        <ReduxProvider store={store}>
          <CranePage />
        </ReduxProvider>
      </SessionProvider>
    );

    expect(await screen.findByText('CRANE-001')).toBeInTheDocument();
    expect(screen.getByText('Model X')).toBeInTheDocument();
    expect(screen.getByText('Site A')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('opens modal when clicking the Open modal button', async () => {
    render(
      <SessionProvider session={null}>
        <ReduxProvider store={store}>
          <CranePage />
        </ReduxProvider>
      </SessionProvider>
    );

    const button = screen.getByRole('button', { name: /Open modal/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Open modal/i)).toBeInTheDocument();
    });
  });

  it('shows loading indicator when cranes are loading', () => {
    mockUseCranes.mockReturnValue({
      cranes: [],
      loading: true,
      error: null,
    });

    render(
      <SessionProvider session={null}>
        <ReduxProvider store={store}>
          <CranePage />
        </ReduxProvider>
      </SessionProvider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('shows error message when there is an error', () => {
    mockUseCranes.mockReturnValue({
      cranes: [],
      loading: false,
      error: new Error('Fetch failed'),
    });

    render(
      <SessionProvider session={null}>
        <ReduxProvider store={store}>
          <CranePage />
        </ReduxProvider>
      </SessionProvider>
    );

    expect(screen.getByText(/fetch failed/i)).toBeInTheDocument();
  });

  it('shows empty message when no cranes are returned', () => {
  // 👇 Override mock to return empty cranes array
  (mockUseCranes as jest.Mock).mockReturnValue({
    cranes: [],
    loading: false,
    error: null,
  });

  render(
    <SessionProvider session={null}>
      <ReduxProvider store={store}>
        <CranePage />
      </ReduxProvider>
    </SessionProvider>
  );

  expect(screen.getByText(/no cranes found/i)).toBeInTheDocument();
});

  it('submits form to create a crane', async () => {
    const createMock = jest.fn().mockResolvedValue({ id: '2' });

    mockUseCranes.mockReturnValue({
      cranes: [],
      loading: false,
      error: null,
      createCrane: createMock,
    });

    render(
      <SessionProvider session={null}>
        <ReduxProvider store={store}>
          <CranePage />
        </ReduxProvider>
      </SessionProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: /open modal/i }));

    fireEvent.change(screen.getByLabelText(/serial number/i), {
      target: { value: 'CRANE-002' },
    });

    fireEvent.change(screen.getByLabelText(/model/i), {
      target: { value: 'Model Y' },
    });

    fireEvent.change(screen.getByLabelText(/location/i), {
      target: { value: 'Site B' },
    });

    fireEvent.mouseDown(screen.getByLabelText(/status/i));
    await waitFor(() => screen.getByRole('option', { name: 'Inactive' }));
    fireEvent.click(screen.getByRole('option', { name: 'Inactive' }));

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() =>
      expect(createMock).toHaveBeenCalledWith({
        serial_number: 'CRANE-002',
        model: 'Model Y',
        location: 'Site B',
        status: 'Inactive',
      })
    );
  });
});
