const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors())
app.get('/characters', async (req, res) => {
    const characters = req.query.characters
    const url = 'https://rickandmortyapi.com/api/character/'

    try{
        const response = await axios.get(url)
        res.json(response.data)
    } catch(ERROR) {
        res.status(404).json({mensaje:'Personajes no encontrados'})
    }

})





app.get('/characters/:name', async (req, res) => {
    const characterName = decodeURIComponent(req.params.name)
    const url = `https://rickandmortyapi.com/api/character/?name=${characterName}`
    try{
        const response = await axios.get(url)
        res.json(response.data);

    } catch (ERROR){
        res.status(404).json({mensaje: 'Personaje no encontrado'})
    }    
})




app.listen(3000, () => {
    console.log('Express esta escuchando en http://localhost:3000')
})