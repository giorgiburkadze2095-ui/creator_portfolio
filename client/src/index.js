import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext.js';
import { SiteContentProvider } from './context/SiteContentContext.js';
import { MusicProvider } from './context/MusicContext.js';
import reportWebVitals from './reportWebVitals';

// Every internal navigation should land at the top of the new page (see
// RouteTransition), including browser back/forward — so the browser's own
// scroll-position memory for each history entry is turned off here, once,
// rather than left to race against our reset.
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <SiteContentProvider>
          <AuthProvider>
            <MusicProvider>
              <App />
            </MusicProvider>
          </AuthProvider>
        </SiteContentProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
