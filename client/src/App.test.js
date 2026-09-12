import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { AuthProvider } from './context/AuthContext.js';

test('renders the site navigation brand', async () => {
  render(
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
  const brandLinks = await screen.findAllByText(/giorgi burkadze/i);
  expect(brandLinks.length).toBeGreaterThan(0);
});
