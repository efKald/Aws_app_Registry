import image2 from './db_report.png'
import React, { useState, useEffect } from 'react';

function SearchActivity () {
    const [array, setArray] = useState([]); // State variable to store the retrieved data
    //using fetch api.
    const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    
    const user = event.target.user.value;
    
        try {
          const response = await fetch('/data_search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user }), // Send user data in the request body for the POST requet.
          });
        
          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status}`);
          }
        
          const data = await response.json(); // Parse(convert to a JS array) the JSON response from the server
          setArray(data); // Update the state with the received data (array)
          console.log("Search View Array:", array)
        } catch (error) {
          console.error('Error:', error);
        }
    };
    return(
        <div>
            <h1>Consulta de Actividades de Usuario</h1>
            <br/><br/>
            <form onSubmit={handleSubmit}>
                <label> Consultar Usuario </label> <input name="user"/>
                <br/><br/>
                <button> Consultar </button>
            </form>
            <br/><br/>
          
          {array.length > 0 && ( // Conditionally render the table only if data exists
            <table className="table-consult">
              <thead>
                <tr>
                  <th colSpan="4">Actividad</th>
                </tr>
                <tr>
                  <th>Hora Inicial</th>
                  <th>Hora Final</th>
                  <th>Actividad</th>
                  <th>Descripción</th>
                </tr>
              </thead>
              <tbody>
                {array.map((activity, index) => (
                  <tr key={index}>
                    <td><p>{activity.hora_inicial}</p></td>
                    <td><p>{activity.hora_final}</p></td>
                    <td><p>{activity.actividad}</p></td>
                    <td><p>{activity.descripcion}</p></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        
            <img src={image2} alt='cdb_report' width="300" height="300"></img>
            <form action="/logout_user" method="post">
                <button> Salir </button>
            </form>
        </div>
    )
}

export {SearchActivity}