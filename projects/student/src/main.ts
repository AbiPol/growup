import { initFederation } from '@angular-architects/native-federation';

// Si el host (shell) ya ha cargado Tailwind, no inyectamos el stylesheet.
if (!(window as any).__GROWUP_TAILWIND_LOADED) {
	const existing = document.getElementById('growup-tailwind');
	if (!existing) {
		const link = document.createElement('link');
		link.id = 'growup-tailwind';
		link.rel = 'stylesheet';
		link.href = '/shared/styles/tailwind.css';
		document.head.appendChild(link);
	}
}

initFederation()
	.catch(err => console.error(err))
	.then(_ => import('./bootstrap'))
	.catch(err => console.error(err));
