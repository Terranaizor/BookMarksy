import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './assets/styles/main.css';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { Provider } from 'react-redux';
import { DataProvider } from './context/DataContext.jsx';
import store from './store/store.js';
import { CatalogueDataProvider } from './context/CatalogueDataContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider>
      <Provider store={store}>
        <CatalogueDataProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </CatalogueDataProvider>
      </Provider>
    </DataProvider>
  </StrictMode>
)
