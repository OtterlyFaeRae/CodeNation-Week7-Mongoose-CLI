const Show = require('./model');

exports.createShow = async (showObj) => {
    try {
        let dupCheck = await Show.findOne({title: showObj.title});
        if (dupCheck === null) {
            dupCheck = {title: 'None'}
        }
        if ((showObj.title && showObj.episodes) && showObj.title != dupCheck.title){
            await Show.create(showObj);
        } else if (showObj.title === dupCheck.title) {
            console.log(`${showObj.title} exists in database already. --title must be unique.`)
        } else {
            console.log('Please enter a --title and a number of --episodes.');
        };
    } catch (error) {
        console.log(error);
    };
};

exports.readShows = async (showObj) => {
    try {
        if (showObj.title){
            console.log(await Show.findOne({title: showObj.title}, 'title episodes seasons'));
        } else if (showObj.episodes) {
            console.log('Finding by episodes', showObj.episodes);
            console.log(await Show.find({episodes: showObj.episodes}, 'title episodes seasons'));
        } else if (showObj.seasons) {
            console.log('Finding by seasons', showObj.seasons);
            console.log(await Show.find({seasons: showObj.seasons}, 'title episodes seasons'));
        } else {
            console.log(await Show.find({}, 'title episodes seasons').exec());
        };
    } catch (error) {
        console.log(error);
    };
};

exports.updateShow = async (showObj) => {
    try {
        if (showObj.title && (showObj.episodes || showObj.seasons)) {
            await Show.updateOne({title: showObj.title}, {episodes: showObj.episodes, seasons: showObj.seasons});
            console.log(`${showObj.title} updated.`);
        } else {
            console.log('Command must include --title of your entry and value (--episodes or --seasons) that you wish to update.');
        };
    } catch (error) {
        console.log(error);
    };
};

exports.deleteShow = async(showObj) => {
    try {
        if (showObj.title){
            await Show.deleteOne({title: showObj.title}).exec();
            console.log(`${showObj.title} deleted.`);
        } else {
            console.log('Command must include --title of entry to delete.');
        };
    } catch (error) {
        console.log(error);
    };
};