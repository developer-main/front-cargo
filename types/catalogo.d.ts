
declare namespace Catalogo {
//Clientes del Servicio
type Cliente = {
    id : number;
    activo : boolean;
    nacional: boolean;
    representante: string;
    limite_credito: number;
    credito_disponible: boolean;
    dias_credito: string;
    monto_credito: number;
    nombre: string;
    numero_interior: string;
    numero_exterior: string;
    colonia: string;
    calle: string;
    telefono: string;
    celular: string;
    tipo_cliente_id: number;
    actividad_preponderante_id: number;
    correo: string;    
   
}
}