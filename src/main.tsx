import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register PWA service worker with autoUpdate
registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log('New content available for ABC Fun Learning');
  },
  onOfflineReady() {
    console.log('ABC Fun Learning is ready to work offline');
  },
});

createRoot(document.getElementById('root')!).render(<App />);
