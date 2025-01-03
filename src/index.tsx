import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

if (localStorage.getItem('darkMode') === 'true') {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />); 