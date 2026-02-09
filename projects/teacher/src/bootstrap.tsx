import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { PrimeReactProvider } from 'primereact/api';

export function mount(el: HTMLElement) {
    const root = createRoot(el);
    root.render(
        <StrictMode>
            <PrimeReactProvider>
                <App />
            </PrimeReactProvider>
        </StrictMode>,
    );
    return () => root.unmount();
}
