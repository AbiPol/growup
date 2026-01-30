import { initFederation } from '@angular-architects/native-federation';

initFederation({
  'student': 'http://localhost:4201/remoteEntry.json',
  'teacher': 'http://localhost:4202/remoteEntry.json'
})
  .catch(err => console.error('Error inicializando federación:', err))
  .finally(() => import('./bootstrap'))
  .catch(err => console.error(err));
