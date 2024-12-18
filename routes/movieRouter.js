import { Router } from 'express'
import { movies } from '../data/moviesData.js'

const movieRouter = Router()

movieRouter.get('/movies', (req, res) => {
    return res.status(200).json(movies)
})

movieRouter.get('/movies', (request, response) => {
    response.json(movies)
})

movieRouter.get('/movie/:id', (req, res) => {
    let {id} = req.params
    try{
        const movieById = movies.find(movie => movie.id == id)
        if(!movieById){
            return res.status(400).json({message: "Movie not found"})
        }
        return res.json(movieById)
    }
    catch(err){
        return res.status(500).json({message : 'Internal server error'})
    }
})

movieRouter.post('/movies', (req, res) => {
    let {title, genre} = req.body
    try{
        if(!title, !genre){
            return res.status(400).json({message: 'All fields are required'})
        }
        const newMovie = {
            id : movies.lenght + 1,
            title,
            genre,
        }
        movies.push(newMovie)
        return res.status(201).json(movies)
    }
    catch(err){
        return res.status(500).json({message : 'Internal server error'})
    }
})

movieRouter.put('movie/:id', (req, res) => {
    let {id} = req.params
    let {title, genre} = req.body
    const movieByID = movies.find(movie => movie.id == id)
    movieByID.title = title || movieByID.title
    movieByID.genre = genre
    return res.status(201).json(movieByID)
})

movieRouter.delete('/movie/:id', (req, res) => {
    let {id} = req.params
    const movieByID = movies.find(movie => movie.id == id)
    const index = movies.indexOf(movieByID)
    movies.splice(index, 1)
    return res.status(203).json({message: "Movie has been deleted"})
})

export default movieRouter