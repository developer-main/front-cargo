import { Cliente } from '@/types';

export const ClienteService = {
    getCliente() {
        return fetch('/demo/data/cliente.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as Cliente.Cliente[]);
    },
};
