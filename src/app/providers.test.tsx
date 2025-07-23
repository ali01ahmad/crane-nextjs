import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppProviders } from './providers';

// ✅ Mock Apollo Client to avoid instantiating it (which causes crash in Jest)
jest.mock('../lib/apolloClient', () => ({
  client: {},
}));

describe('Providers wrapper', () => {
  it('renders children without crashing', () => {
    render(
      <AppProviders>
        <>Hello Providers</>
      </AppProviders>
    );
    expect(screen.getByText('Hello Providers')).toBeInTheDocument();
  });
});