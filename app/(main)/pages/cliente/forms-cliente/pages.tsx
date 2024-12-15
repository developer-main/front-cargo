import React, { useEffect, useState,useMemo } from 'react';
import type { Cliente } from '@/types';
import { Steps } from "primereact/steps";
import { Toast } from "primereact/toast";
import { RadioButton } from "primereact/radiobutton";
import { InputTextarea } from "primereact/inputtextarea";
import { ListBox } from "primereact/listbox";
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { PanelMenu } from 'primereact/panelmenu';

import "./styles.css"; // Importa tu archivo de estilos personalizados





interface DropdownItem {
    name: string;
    code: string;
}

interface InputValue {
    name: string;
    code: string;
}


const FomrsCliente = ()=>{

    const [dropdownItem, setDropdownItem] = useState<DropdownItem | null>(null);
    const dropdownItems: DropdownItem[] = useMemo(
        () => [
            { name: 'Option 1', code: 'Option 1' },
            { name: 'Option 2', code: 'Option 2' },
            { name: 'Option 3', code: 'Option 3' }
        ],
        []
    );

    const [radioValue, setRadioValue] = useState(null);

    const listboxValues: InputValue[] = [
        { name: "New York", code: "NY" },
        { name: "Rome", code: "RM" },
        { name: "London", code: "LDN" },
        { name: "Istanbul", code: "IST" },
        { name: "Paris", code: "PRS" },
    ];

    const panelMenuitems = [
        {
            label: 'Fiscales',
            //icon: 'pi pi-fw pi-table',
            items: [
            ]
        },
        {
            label: 'Importación de mercancías',
            //icon: 'pi pi-fw pi-shopping-cart',
            items: ['<h1>hola</h1>'
            ]
        }
    ];


    const [listboxValue, setListboxValue] = useState(null);

    useEffect(() => {
        setDropdownItem(dropdownItems[0]);
    }, [dropdownItems]);


   


    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      age: "",
    });
    const toast = React.useRef(null);
  
    const steps = [
      { label: "Datos generales" },
      { label: "Datos fiscales" },
      { label: "Documentos" },
    ];
  
    const handleNext = () => {
      if (activeStep < steps.length - 1) {
        setActiveStep((prev) => prev + 1);
      } else {
        toast.current.show({
          severity: "success",
          summary: "Formulario enviado",
          detail: "Todos los pasos completados",
        });
        console.log("Datos finales:", formData);
      }
    };
  
    const handleBack = () => {
      if (activeStep > 0) {
        setActiveStep((prev) => prev - 1);
      }
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };



    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">

                    <div>
                        <Toast ref={toast} />
                        <Steps model={steps} activeIndex={activeStep} />
                               {activeStep === 0 && (
                                <div>
                                    <div className='grid'>
                                        <div className="col-12 md:col-12">
                                            <br></br>
                                            <div className="p-fluid">
                                                    <div className="field">
                                                        <label htmlFor="nombre">Nombre</label>
                                                        <InputText id="nombre" type="text" />
                                                    </div>
                                                    
                                            </div>
                                        </div>

                                        <div className="col-12 md:col-4">
                                            <div className="p-fluid">
                                                    <div className="field">
                                                        <label htmlFor="name1">Representante</label>
                                                        <InputText id="name1" type="text" />
                                                    </div>

                                                    <div className="field">
                                                        <label htmlFor="state">Giro de la empresa</label>
                                                        <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
                                                    </div>
                                                    <div className="field">
                                                        <label htmlFor="colonia">Colonia</label>
                                                        <InputText id="colonia" type="text" />
                                                    </div>

                                                    <div className="field">
                                                        <label htmlFor="estado">Estado</label>
                                                        <InputText id="estado" type="text" />
                                                    </div>
                                                    <div className="field">
                                                        <label htmlFor="num_int">No. ext.</label>
                                                        <InputText id="num_int" type="text" />
                                                    </div>
                                            </div>
                                        </div>
                                        <div className="col-12 md:col-4">
                                            
                                            <div className="p-fluid">
                                                    
                                                    <div className="field">
                                                        <label htmlFor="email1">Correo</label>
                                                        <InputText id="email1" type="email" />
                                                    </div>

                                                    <label>Tipo de operación</label>
                                                    <div className="grid">

                                                        <div className="col-12 md:col-4">
                                                            <br></br>
                                                            <div className="field-radiobutton">
                                                                <RadioButton
                                                                    inputId="option1"
                                                                    name="option"
                                                                    value="Exportador"
                                                                    checked={radioValue === "Exportador"}
                                                                    onChange={(e) => setRadioValue(e.value)}
                                                                />
                                                                <label htmlFor="option1">Exportador</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 md:col-4">
                                                            <br></br>
                                                            <div className="field-radiobutton">
                                                                <RadioButton
                                                                    inputId="option2"
                                                                    name="option"
                                                                    value="Importador"
                                                                    checked={radioValue === "Importador"}
                                                                    onChange={(e) => setRadioValue(e.value)}
                                                                />
                                                                <label htmlFor="option2">Importador</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 md:col-4">
                                                            <br></br>
                                                            <div className="field-radiobutton">
                                                                <RadioButton
                                                                    inputId="option3"
                                                                    name="option"
                                                                    value="Ambos"
                                                                    checked={radioValue === "Ambos"}
                                                                    onChange={(e) => setRadioValue(e.value)}
                                                                />
                                                                <label htmlFor="option3">Ambos</label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="field">
                                                        <label htmlFor="ciudad">Ciudad</label>
                                                        <InputText id="ciudad" type="text" />
                                                    </div>

                                                    <div className="field">
                                                        <label htmlFor="calle">Calle</label>
                                                        <InputText id="calle" type="text" />
                                                    </div>

                                            </div>
                                        </div>
                                        <div className="col-12 md:col-4">
                                            <div className="p-fluid">
                                                    
                                                    <div className="field">
                                                        <label htmlFor="age1">Teléfono</label>
                                                        <InputText id="age1" type="number" />
                                                    </div>

                                                    <div className="field">
                                                        <label htmlFor="codigo_postal">Código postal</label>
                                                        <InputText id="codigo_postal" type="number" minLength={3} maxLength={4}/>
                                                    </div>
                                                    <div className="field">
                                                        <label htmlFor="municipio">Municipio</label>
                                                        <InputText id="municipio" type="text" />
                                                    </div>
                                                    <div className="field">
                                                        <label htmlFor="num_int">No. int.</label>
                                                        <InputText id="num_int" type="text" />
                                                    </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                               
                               )}

                                {activeStep === 1 && (
                                <div>
                                    <div className='grid'>
                                        <div className="col-12 md:col-8">
                                            <br></br>
                                            <div className="p-fluid">
                                                    <div className="field">
                                                        <label htmlFor="nombre">Nombre</label>
                                                        <InputText id="nombre" type="text" />
                                                    </div>
                                                    
                                            </div>
                                        </div>

                                        <div className="col-12 md:col-4">
                                            <br></br>
                                            <div className="p-fluid">
                                                    <div className="field">
                                                        <label htmlFor="rfc">RFC</label>
                                                        <InputText id="rfc" type="text" />
                                                    </div>
                                                    
                                            </div>
                                        </div>



                                        <div className="col-12 md:col-6">
                                            
                                            <div className="p-fluid">                                                  
                                                    <div className="field">
                                                        <label htmlFor="regimen_fiscal">Regimen Fiscal</label>
                                                        <InputTextarea
                                                            placeholder=""
                                                            rows={11}
                                                            cols={30}
                                                        />                                                    </div>
                                            </div>
                                        </div>

                                        <div className="col-12 md:col-6">
                                            
                                            <div className="p-fluid">
                                                    <div className="field">
                                                        <label htmlFor="buscar">Buscar</label>
                                                        <ListBox
                                                            value={listboxValue}
                                                            onChange={(e) => setListboxValue(e.value)}
                                                            options={listboxValues}
                                                            optionLabel="name"
                                                            filter
                                                            style={{ maxHeight: '200px', overflowY: 'auto' }}
                                                        />                                                    
                                                    </div>
                                            </div>
                                        </div>

                                        <div className="col-12 md:col-4">
                                            <div className="p-fluid">
                                                    <div className="field">
                                                        <label htmlFor="email1">Correo</label>
                                                        <InputText id="email1" type="email" />
                                                    </div>
                                                    

                                                    
                                                    <div className="field">
                                                        <label htmlFor="ciudad">Ciudad</label>
                                                        <InputText id="ciudad" type="text" />
                                                    </div>
                                                    

                                                    <div className="field">
                                                        <label htmlFor="calle">Calle</label>
                                                        <InputText id="calle" type="text" />
                                                    </div>
                                            </div>
                                        </div>

                                        <div className="col-12 md:col-4">
                                            
                                            <div className="p-fluid">
                                                    
                                                    <div className="field">
                                                        <label htmlFor="codigo_postal">Código postal</label>
                                                        <InputText id="codigo_postal" type="number" minLength={3} maxLength={4}/>
                                                    </div>
                                                    <div className="field">
                                                        <label htmlFor="municipio">Municipio</label>
                                                        <InputText id="municipio" type="text" />
                                                    </div>
                                                    
                                                    <div className="field">
                                                        <label htmlFor="num_int">No. ext.</label>
                                                        <InputText id="num_int" type="text" />
                                                    </div>

                                            </div>
                                        </div>
                                        <div className="col-12 md:col-4">
                                            <div className="p-fluid">
                                                    

                                                    <div className="field">
                                                        <label htmlFor="colonia">Colonia</label>
                                                        <InputText id="colonia" type="text" />
                                                    </div>
                                                    <div className="field">
                                                        <label htmlFor="estado">Estado</label>
                                                        <InputText id="estado" type="text" />
                                                    </div>
                                                    <div className="field">
                                                        <label htmlFor="num_int">No. int.</label>
                                                        <InputText id="num_int" type="text" />
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                           
                                )}
                                {activeStep === 2 && (
                                    <div>
                                    <div className='grid'>
                                        <div className="col-12 md:col-12">
                                            <br></br>
                                            <PanelMenu model={panelMenuitems} />

                                        </div>
                                    </div>

                                    </div>
                                )}

                                <div className="col-12 md:col-12">
                                    <div className='grid'>
                                         <div className="col-12 md:col-4">
                                            <Button
                                                label="Anterior"
                                                icon="pi pi-chevron-left"
                                                onClick={handleBack}
                                                disabled={activeStep === 0}
                                                className=""
                                            />
                                         </div>
                                         <div className="col-12 md:col-4">
                                         </div>
                                         <div className="col-12 md:col-4"  style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <Button
                                                label={activeStep === steps.length - 1 ? "Enviar" : "Siguiente"}
                                                icon="pi pi-chevron-right"
                                                onClick={handleNext}
                                                className="d-flex justify-content-end"

                                            />
                                        </div>
                                    </div>
                                </div>

                    </div>





                </div>
            </div>
        </div>
    )


}

export default FomrsCliente;
