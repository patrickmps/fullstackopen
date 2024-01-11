import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { NotificationContextProvider } from './contexts/NotificationContext.jsx';
import { UserContextProvider } from './contexts/UserContext.jsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <NotificationContextProvider>
          <App />
        </NotificationContextProvider>
      </QueryClientProvider>
    </UserContextProvider>
  </BrowserRouter>
);
