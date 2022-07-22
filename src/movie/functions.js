const Movie = require('./model');

exports.createMovie = async (movieObj) => {
    try {
        const dupCheck = await Movie.findOne({title: movieObj.title});
        if (dupCheck === null) {
            dupCheck = {title: 'None'}
        }
        if (movieObj.title && (movieObj.title != dupCheck.title)) {
            await Movie.create(movieObj);
            console.log(`${movieObj.title} created.`)
        } else if (movieObj.title === dupCheck.title) {
            console.log(`${movieObj.title} exists in database already. --title must be unique.`)
        } else {
            console.log('Command must include --title for your entry.')
        };
    } catch (error) {
        console.log(error);
    };
};

exports.readMovies = async (movieObj) => {
    try {
        if (movieObj.title){
            console.log(await Movie.findOne({title: movieObj.title}, 'title actor'))
        } else if (movieObj.actor) {
            console.log(await Movie.find({actor: movieObj.actor}, 'title actor'))
        } else {
            console.log(await Movie.find({}, 'title actor').exec());
        }
    } catch (error) {
        console.log(error)
    }
}

exports.updateMovie = async (movieObj) => {
    try {
        if (movieObj.title && movieObj.actor) {
            await Movie.updateOne({title: movieObj.title}, {actor: movieObj.actor});
            console.log(`${movieObj.title} updated.`)
        } else {
            console.log('Command must include --title of entry and value (--actor) to update.')
        };
    } catch (error) {
        console.log(error)
    }
}

exports.deleteMovie = async(movieObj) => {
    try {
        if (movieObj.title) {
            await Movie.deleteOne({title: movieObj.title}).exec();
            console.log(`${movieObj.title} deleted.`)
        } else {
            console.log('Command must include --title of entry to be deleted.')
        };
        
    } catch (error) {
        console.log(error)
    }
}