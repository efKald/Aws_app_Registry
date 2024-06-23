import React from 'react';

function Home () {
    const params = new URLSearchParams(window.location.search);
    const loginSuccess = params.get('loginSuccess');
        React.useEffect(() => {
        if (loginSuccess === 'true') {
            alert('Ingreso Exitoso!');
        } 
        else if (loginSuccess === 'false') {
            alert('Contraseña o usuario incorrectos');
        }
    }, [loginSuccess]);
    return(

        <div id='background'> 
        <p className="par-home">Durante el último trimestre, nuestro equipo ha logrado importantes avances en varios proyectos clave. En primer lugar, completamos la implementación del nuevo sistema de gestión de inventarios, lo que ha optimizado significativamente nuestros procesos logísticos. Además, lanzamos una campaña de marketing digital que incrementó la visibilidad de nuestra marca en un 25% y generó un notable aumento en las interacciones con los clientes en nuestras plataformas en línea. Por último, hemos establecido nuevas alianzas estratégicas con proveedores locales, lo que no solo ha reducido costos, sino que también ha mejorado la calidad de los productos ofrecidos. En conjunto, estas actividades han contribuido de manera sustancial al crecimiento y la eficiencia de la empresa.</p>
        </div>
    )
}

export {Home}