const express = require("express");
const app = express();

const { insertarCancion, recuperarCanciones, editarCancion, borrarCancion} = require("./consulta");

app.listen(3000, console.log("Servidor en linea"))

app.use(express.json())

app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/index.html");
})

app.post("/cancion", async (req, res) => {
    
    try {
        const data = Object.values(req.body);
        const respuesta = await insertarCancion(data);
        res.status(200).send(respuesta);
    } catch (error) {
        res.status(500).send("algo salio mal 😢...")
    }
});

app.get("/canciones", async (req, res) => {
    try {
        const respuesta = await recuperarCanciones();
        res.status(200).send(respuesta);
    } catch (error) {
        res.status(500).send("algo salio mal 😢...")
    }
});

app.put("/cancion/:id", async (req, res) => {    
    try {
        const { id } = req.params;
        const data = Object.values(req.body);
        const respuesta = await editarCancion(id, data);
        res.status(200).send(respuesta);
    } catch (error) {
        res.status(500).send("algo salio mal 😢...")
    }
});

app.delete("/cancion", async (req, res) => {
    try {
        const { id } = req.query;
        const respuesta = await borrarCancion(id);
        res.status(200).send(respuesta);
    } catch (error) {
        res.status(500).send("algo salio mal 😢...")
    }

})




