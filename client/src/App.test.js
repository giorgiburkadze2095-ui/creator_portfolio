import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { AuthProvider } from './context/AuthContext.js';
import { SiteContentProvider } from './context/SiteContentContext.js';

test('renders the site navigation brand', async () => {
  render(
    <HelmetProvider>
      <BrowserRouter>
        <SiteContentProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </SiteContentProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
  // No backend is available in this test environment, so the brand name
  // falls back to the generic placeholder — this also guards against ever
  // reintroducing a hardcoded personal/brand name into the nav component.
  const brandLinks = await screen.findAllByText(/your name/i);
  expect(brandLinks.length).toBeGreaterThan(0);
});
