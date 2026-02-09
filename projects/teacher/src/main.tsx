import { mount } from './bootstrap';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './index.css';

// Desarrollo local
const rootElement = document.getElementById('root');
if (rootElement) {
  mount(rootElement);
}
