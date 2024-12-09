'use client';
import { ClienteService } from '../../../../demo/service/ClienteService';
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

const Cliente = () => {
    const [customers1, setCustomers1] = useState<Cliente.Cliente[]>([]);
    const [filters1, setFilters1] = useState<DataTableFilterMeta>({});
    const [loading1, setLoading1] = useState(true);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');


    const clearFilter1 = () => {
        initFilters1();
    };

    const onGlobalFilterChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters1 = { ...filters1 };
        (_filters1['global'] as any).value = value;

        setFilters1(_filters1);
        setGlobalFilterValue1(value);
    }; 

    const renderHeader1 = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Limpiar filtro" outlined onClick={clearFilter1} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Enter para buscar" />
                </span>
            </div>
        );
    };

    useEffect(() => {

        ClienteService.getCliente().then((data) => {
            setCustomers1(getCustomers(data));
            setLoading1(false);
        });
        initFilters1();
    }, []);


    const getCustomers = (data: Cliente.Cliente[]) => {
        return [...(data || [])];
    };



    const initFilters1 = () => {
        setFilters1({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            empresa: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
            },
            representante: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
            },
            
        });
        setGlobalFilterValue1('');
    };


    const filterClearTemplate = (options: ColumnFilterClearTemplateOptions) => {
        return <Button type="button" icon="pi pi-times" onClick={options.filterClearCallback} severity="secondary"></Button>;
    };

    const filterApplyTemplate = (options: ColumnFilterApplyTemplateOptions) => {
        return <Button type="button" icon="pi pi-check" onClick={options.filterApplyCallback} severity="success"></Button>;
    };

    // onClick={() => editProduct(rowData)}
    //onClick={() => confirmDeleteProduct(rowData)}
    const actionBodyTemplate = (rowData: Cliente.Cliente) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" />
                <Button icon="pi pi-trash" rounded severity="warning"  />
            </>
        );
    };


    const header1 = renderHeader1();

    return (

        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Clientes</h5>
                    <DataTable
                        value={customers1}
                        paginator
                        className="p-datatable-gridlines"
                        showGridlines
                        rows={10}
                        dataKey="id"
                        filters={filters1}
                        filterDisplay="menu"
                        loading={loading1}
                        responsiveLayout="scroll"
                        emptyMessage="No customers found."
                        header={header1}
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
            </div>
        </div>
    );
};

export default Cliente;
