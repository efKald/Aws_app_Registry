//added
import React from 'react';
//added

function Login () {
        // Use location.search to parse query parameters
    const params = new URLSearchParams(window.location.search);
    const loginSuccess = params.get('loginSuccess');

    // Show an alert based on login success
    React.useEffect(() => {
        if (loginSuccess === 'false') {
            alert('Contraseña o usuario incorrectos');
        } else if(loginSuccess == 1){
            alert('Logged out of session')
        }
    }, [loginSuccess]);
    return(
        <div id='log'>
            <h1>Ingreso</h1>
            <form action="/login_user" method="post">
                <label> Usuario </label> <input name="user"/><br/><br/>
                <label> Contraseña </label> <input type="password" name="password"/><br/><br/>
                <button> Ingresar </button><br/><br/>          
            </form>
        </div>
    )
}

export {Login}