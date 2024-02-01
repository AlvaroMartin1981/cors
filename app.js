const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const urlBase = 'https://rickandmortyapi.com/api/character/'
app.use(cors())
app.get('/', (req, res) => {
    res.send('COCRETAS')
})
app.get('/characters', async (req, res) => {
    /*const characters = req.query.characters
    const url = 'https://rickandmortyapi.com/api/character/'

    try{
        const response = await axios.get(url)
        res.json(response.data)
    } catch(ERROR) {
        res.status(500).json({mensaje:'El servidor se ha estropeado cocretamente'})
    }*/
    try{
        const response =await axios.get(urlBase)
        const characters =response.data.results

        res.json(characters)

    } catch(err) {
        res.status(500).json({mensaje: 'el servidor se ha estropeado cocretamente'})
    }
})





app.get('/characters/:name', async (req, res) => {
    //const characterName = decodeURIComponent(req.params.name)
    //const url = `https://rickandmortyapi.com/api/character/?name=${characterName}`
    const name = req.params.name
    const urlCharacter = `${urlBase}?name=${name}`
    try{
        const response = await axios.get(urlCharacter)
        const {name, status, species, gender, origin: {name: originName}, image} = response.data.results[0] //{name:originName} cambia el nombre a name del origin para que no coincida con name
        res.json({name, status, species, gender, originName, image})

    } catch (ERROR){
        res.status(500).json({mensaje: 'el servidor se ha estropeado cocretamente'})
    }    
})




app.listen(3000, () => {
    console.log('Express esta escuchando en http://localhost:3000')
})