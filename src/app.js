require('./db/connection');
const yargs = require('yargs');
const mongoose = require('mongoose');
const { createMovie, readMovies, updateMovie, deleteMovie } = require('./movie/functions');
const { createShow, readShows, updateShow, deleteShow } = require('./show/functions');
const {} = require('./show/functions')

const app = async (yargsObj) => {
    if (yargsObj.create) {
        if(yargsObj.movie){
            await createMovie({title: yargsObj.title, actor: yargsObj.actor})
        } else if (yargsObj.show){
            await createShow({title: yargsObj.title, episodes: yargsObj.episodes, seasons: yargsObj.seasons})
        } else {
            console.log('Please specify whether you are creating a --movie or a --show.')
        }
    } else if (yargsObj.read) {
        if(yargsObj.movie){
            await readMovies({title: yargsObj.title, actor: yargsObj.actor})
        } else if (yargsObj.show){
            await readShows({title: yargsObj.title, episodes: yargsObj.episodes, seasons: yargsObj.seasons})
        } else {
            console.log('Please specify a collection: --movie or --show.')
        }
        
    } else if (yargsObj.update) {
        if(yargsObj.movie){
            await updateMovie({title: yargsObj.title, actor: yargsObj.actor})
        } else if (yargsObj.show){
            await updateShow({title: yargsObj.title, episodes: yargsObj.episodes, seasons: yargsObj.seasons})
        } else {
            console.log('Please specify whether you are updating a --movie or a --show.')
        }
    } else if (yargsObj.delete) {
        if(yargsObj.movie){
            await deleteMovie({title: yargsObj.title})
        } else if (yargsObj.show){
            await deleteShow({title: yargsObj.title})
        } else {
            console.log('Please specify whether you are deleting a --movie or a --show.')
        }
        
    } else {
        console.log('No valid command detected (--create --read --update --delete)')
    }
    await mongoose.disconnect();
}
app(yargs.argv);