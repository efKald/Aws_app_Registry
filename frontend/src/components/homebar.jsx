import React from "react";

//Class name must be upercase.
class Homebar extends React.Component {
    render(){
        function home_view(){
            window.location = '/'
        }
        let login_view = () => { //This is the same as the above function.
            window.location = 'login'
        }
        let registerActivity_view = () => {
            window.location = 'register'
        }
        let searchActivity_view = () => {
            window.location = 'search'
        }
        return(
            <div id="home-nav">
                <li className="items-nav">
                    <button className="btn-nav" onClick={home_view}> Inicio </button>
                </li>
                <p className="par-nav">3D World - Actividades Diarias</p>
                <li className="items-nav">
                    <button className="btn-nav" onClick={login_view}> Ingresar </button>
                </li>
                <li className="items-nav">
                    <button className="btn-nav" onClick={registerActivity_view}> Registrar Actividad </button>
                </li>
                <li className="items-nav">
                    <button className="btn-nav" onClick={searchActivity_view}> Buscar Actividad </button>
                </li>
            </div>
        )
    }
}

export {Homebar}