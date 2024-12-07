//import { Demo } from '@/types';
import * as config from "../../../app/api/config";
import { Catalogo }  from '@/types';



var urlEndpoint = config.urlEndpoint;

export const ClienteService = {



    getCliente() {
        return fetch( `${urlEndpoint}cliente/`, { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json()  )
            .then((d) => d as Catalogo.Cliente[]);

            
    }
};
