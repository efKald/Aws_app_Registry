import image1 from './color_folders.png'
import React from 'react';

function RegisterActivity () {
    const params = new URLSearchParams(window.location.search);
    const loginSuccess = params.get('loginSuccess');
    React.useEffect(() => {
        if (loginSuccess === 'true') {
            alert('Datos insertados correctamente');
        } else if (loginSuccess === 'false'){
            alert('Error al intentar insertar los datos.')
        }
    }, [loginSuccess]);
    return(
        <div>
            <h1>Registro de Actividades Diarias</h1>
            <br/><br/>
            <form action="/data_insersion" method="post">
                <table className="table-register">
                    <thead>
                        <tr>
                            <th colSpan="4">
                                <h2>Ingrese la Actividad</h2>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <p>Hora Inicial</p>
                            </td>
                            <td>
                                <p>Hora  Final</p>
                            </td>
                            <td>
                                <p>Actividad</p>
                            </td>
                            <td>
                                <p>Descripción</p>                      
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input name="hora_inicial"/>
                            </td>
                            <td>
                                <input name="hora_final"/>
                            </td>
                            <td>
                                <input name="actividad"/>
                            </td>
                            <td>
                                <input name="descripcion"/>
                            </td>
                        </tr>
                    </tbody>
                </table>              
                <button> Registrar Actividad </button><br/><br/>
                <img src={image1} alt='color_folders' width="300" height="300"></img>
            </form>
            <form action="/logout_user" method="post">
                <button> Salir </button>
            </form>
        </div>
    )
}

export {RegisterActivity}