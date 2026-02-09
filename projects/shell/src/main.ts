import { initFederation } from '@angular-architects/native-federation';

console.log('--- SHELL BOOTSTRAP START ---');

const remotes = {
  'teacher': 'http://localhost:4202/remoteEntry.json',
  'student': 'http://localhost:4203/remoteEntry.json',
  'admin': 'http://localhost:4204/remoteEntry.json'
};

initFederation(remotes)
  .then(() => console.log('✅ Federation initialized successfully'))
  .catch(err => {
    // Si falla, es probable que student no esté en marcha o devuelva HTML (404)
    console.warn('⚠️ Nota: Algunos remotos no cargaron (ignora esto si estás en desarrollo local):', err.message);
  })
  .finally(() => {
    console.log('🚀 Bootstrapping application...');
    import('./bootstrap');
  });
