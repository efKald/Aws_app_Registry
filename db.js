import mysql from 'mysql'

let connection = mysql.createConnection({
    host: "db-instance.cp0e2uuaanc9.us-east-2.rds.amazonaws.com",
    database: "db_registro",
    user: "admin",
    password: "carrovolador#"
})

export function connect_SQL() {
    if(!connection){
    connection.connect(function(err){
        if(err){
            console.log(err)
        }
        else {
            console.log("Successful connection to the Database.")
        }
    })
}
}

export function log_user(user, password){
   return new Promise((resolve, reject) => {
    let instruction_SQL = "SELECT * FROM user_data WHERE usuario=? AND contraseña=?"
        connection.query(instruction_SQL, [user, password], function(err, result) {
            if(err) {
                console.log(err)
                reject(err);
            }
            else {
                console.log("Successful query")
                console.log(result)
                const loginResult = {
                    success: result.length > 0,
                    id: result.length > 0 ? result[0].id : null,
                }
                resolve(loginResult)
            }
        })
   });
}
//result returns an array of RowDataPacket objects
//contraseña column name retreived by the db is in '' because it has non standard ASCII character ñ so they're required for the JS engine to interpret it correctly.

export function insert_data(id, hora_inicial, hora_final, actividad, descripcion){
    return new Promise((resolve, reject) => {
        let instruction_SQL = "INSERT INTO actividad_usuario (id, hora_inicial, hora_final, actividad, descripcion) VALUES (?, ?, ?, ?, ?)"
        connection.query(instruction_SQL, [id, hora_inicial, hora_final, actividad, descripcion], function(err, result) {
            if (err){
                console.log(err)
                reject(err);
            } else {
                console.log("successful query")
                console.log(result)
                const successResult = {
                    successInsert: result.affectedRows > 0,
                }
                resolve(successResult)
            }
            
        })
        
    });
}

export function search_data (user) {
    return new Promise((resolve, reject) => {
        let instruction_SQL = "SELECT * FROM user_data  WHERE usuario=?"
        //let instruction_SQL = "SELECT * FROM actividad_usuario  WHERE "
        connection.query(instruction_SQL, [user], function(err, result) {
            if(err){
                console.log(err)
                reject(err);
            } else {
                console.log("user found")
                console.log(result)
                const search_by = result.length > 0 ? result[0].id : null;
                let select_SQL = "SELECT * FROM actividad_usuario  WHERE id=?"
                connection.query(select_SQL, [search_by], function(error, selectResult) {
                    if(error){
                        console.log(error)
                        reject(error)
                    } else {
                        console.log("successful select")
                        console.log(selectResult)
                        const total_rows = selectResult.length
                        console.log(total_rows)
                        const array =[];
                        for (let i = 0; i < total_rows; i++){
                            array.push({
                            hora_inicial: selectResult[i].hora_inicial,
                            hora_final: selectResult[i].hora_final,
                            actividad: selectResult[i].actividad,
                            descripcion: selectResult[i].descripcion,
                            });
                        }
                        
                        console.log(array)
                        resolve(array)
                    }
                })
            }
        })
    })
}