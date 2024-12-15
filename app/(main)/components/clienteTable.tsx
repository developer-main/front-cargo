'use client';
import { ClienteService } from '../../../demo/service/ClienteService';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column, ColumnFilterApplyTemplateOptions, ColumnFilterClearTemplateOptions, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { DataTable, DataTableExpandedRows, DataTableFilterMeta } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { ProgressBar } from 'primereact/progressbar';
import { Rating } from 'primereact/rating';
import { Slider } from 'primereact/slider';
import { ToggleButton } from 'primereact/togglebutton';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { classNames } from 'primereact/utils';
import React, { useEffect, useState } from 'react';
import type { Cliente } from '@/types';



const clienteTable = ({clientes}: {clientes: Cliente.Cliente []}) => {

    return (
<div className="card">
                    <h5>Clientes</h5>
                    <DataTable
                        value={clientes}
                        paginator
                        className="p-datatable-gridlines"
                        showGridlines
                        rows={25}
                        dataKey="id"
                        filters={filters}
                        filterDisplay="menu"
                        loading={loading}
                        responsiveLayout="scroll"
                        emptyMessage="No customers found."
                        header={header}
                    >
                        <Column 
                        field="empresa"
                         header="Empresa"
                         filter
                         filterPlaceholder="Buscar por empresa" 
                         style={{ minWidth: '15rem' }}
                         />

                         <Column 
                         field="representante"
                         header="Representante"
                         filter
                         filterPlaceholder="Buscar por representante" 
                         style={{ minWidth: '15rem' }}
                         />

                        <Column 
                         field="correo"
                         header="Correo"
                         style={{ minWidth: '12rem' }}
                         />
                        <Column 
                         field="telefono"
                         header="Telefono"
                         filterField="telefono"
                         style={{ minWidth: '12rem' }}
                         />
                        
                        <Column field="rfc" header="RFC" style={{ minWidth: '10rem' }} />
                        <Column field="direccion" header="Dirección" style={{ minWidth: '20rem' }}/>
                        <Column header="Acciones" body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }} />

                    </DataTable>
                </div>
    );

};

export default clienteTable;