const socketDevEndpoint = 'http://localhost:8080';
const socketProdEndpoint = 'https://geluhorotancom-horotangelu17.b4a.run';

export const socketEndpoint =
  process.env.NODE_ENV === 'production'
    ? socketProdEndpoint
    : socketDevEndpoint;
