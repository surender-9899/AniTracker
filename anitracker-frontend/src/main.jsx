
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

console.log('main.jsx executing...');

try {
  const rootElement = document.getElementById('root');
  console.log('Root element found:', rootElement);
  
  if (!rootElement) {
    throw new Error('Root element not found!');
  }
  
  const root = ReactDOM.createRoot(rootElement);
  console.log('React root created');
  
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </React.StrictMode>
  );
  
  console.log('App rendered successfully');
} catch (error) {
  console.error('Error in main.jsx:', error);
  document.body.innerHTML = `
    <div style="background: #1f2937; color: white; padding: 20px; font-family: Arial, sans-serif;">
      <h1>Error Loading App</h1>
      <p>There was an error loading the application:</p>
      <pre style="background: #374151; padding: 10px; border-radius: 4px;">${error.message}</pre>
      <button onclick="window.location.reload()" style="background: #3b82f6; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;">Reload Page</button>
    </div>
  `;
}
