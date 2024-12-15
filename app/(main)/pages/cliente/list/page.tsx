'use client';
import { ClienteService } from '../../../../../demo/service/ClienteService';
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
import { Toolbar } from 'primereact/toolbar';

import React, { useEffect, useState,useMemo } from 'react';

import FomrsCliente from '../forms-cliente/pages';





const Cliente = () => {
    const [clientes, setClientes] = useState<Cliente.Cliente[]>([]);
    const [filters, setFilters] = useState<DataTableFilterMeta>({});
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const [visibleForm, setVisibleForm] = useState(0);


    const clearFilter = () => {
        initFilters();
    };

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters};
        (_filters['global'] as any).value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    }; 

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Limpiar filtro" outlined onClick={clearFilter} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Enter para buscar" />
                </span>
            </div>
        );
    };

    useEffect(() => {

        ClienteService.getCliente().then((data) => {
            setClientes(getClientes(data));
            setLoading(false);
        });
        initFilters();
    }, []);

    const getClientes = (data: Cliente.Cliente[]) => {
        return [...(data || [])];
    };



    const initFilters = () => {
        setFilters({
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
        setGlobalFilterValue('');
    };


    const filterClearTemplate = (options: ColumnFilterClearTemplateOptions) => {
        return <Button type="button" icon="pi pi-times" onClick={options.filterClearCallback} severity="secondary"></Button>;
    };

    const filterApplyTemplate = (options: ColumnFilterApplyTemplateOptions) => {
        return <Button type="button" icon="pi pi-check" onClick={options.filterApplyCallback} severity="success"></Button>;
    };

    // 
    //onClick={() => confirmDeleteProduct(rowData)}
    const actionBodyTemplate = (rowData: Cliente.Cliente) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editProduct(1)} />
                <Button icon="pi pi-trash" rounded severity="warning"  />
            </>
        );
    };

    const leftToolbarNew = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Agregar cliente" icon="pi pi-plus" severity="success" className=" mr-2" onClick={()=>openNew(1)} />
                </div>
            </React.Fragment>
        );
    };

    const leftToolbarCancelar= () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Cancelar" icon="pi pi-trash" severity="danger" className=" mr-2" onClick={()=>openNew(0)} />
                </div>
            </React.Fragment>
        );
    };

    const editProduct = (value:any) => {
        // Alterna la visibilidad del fragmento de código
        setVisibleForm(visibleForm === value ? 0: value);
    };

    const openNew = (value:any) => {
        //setProduct(emptyProduct);
        //setSubmitted(false);
        setVisibleForm(value);
    };


    const header = renderHeader();



    return (

        <div className="grid">
            <div className="col-12">

                <div className="card">

                    {visibleForm ===0 && (
                    <Toolbar className="mb-4" left={leftToolbarNew}></Toolbar>
                    )}



                    {visibleForm ===0 && (
                        <h5>Clientes</h5>
                    )}
                    {visibleForm ===0 && (
                        <DataTable
                            value={clientes}
                            paginator
                            className="p-datatable-gridlines"
                            showGridlines
                            rows={5}
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
                    )}

                    {visibleForm ===1 && (
                    <Toolbar className="mb-4" left={leftToolbarCancelar}></Toolbar>
                    )}

                    {visibleForm ===1 && (
                    <FomrsCliente/>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cliente;
