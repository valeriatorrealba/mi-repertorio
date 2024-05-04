const { Pool } = require("pg");

const config = {
    host: "localhost",
    port: 5432,
    database: "repertorio",
    user: "postgres",
    password: "0000",
};

const pool = new Pool(config);

const insertarCancion = async(datos) =>{
    const consulta = {
        text: "insert into canciones (titulo,artista,tono) values ($1, $2, $3) returning *",
        values: datos,
    }
    const result = await pool.query(consulta);
    return result.rows;
};

const recuperarCanciones = async() =>{
    const consulta = {
        text: "select * from canciones",
    }
    const result = await pool.query(consulta);
    return result.rows;
};

const editarCancion = async(id, datos) =>{
    const consulta = {
        text: "update canciones set titulo = $1, artista = $2, tono = $3 WHERE id = $4 returning *",
        values: [datos[0], datos[1], datos[2], id],
    }
    const result = await pool.query(consulta);
}

const borrarCancion = async(id) =>{
    const consulta = {
        text:"delete from canciones where id = $1 returning *",
        values:[id],
    }
    const result = await pool.query(consulta);
}

module.exports = { insertarCancion, recuperarCanciones, editarCancion, borrarCancion};
