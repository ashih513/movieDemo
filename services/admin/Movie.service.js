const MovieModel = require("../../model/Movie.model");
const collect = require("collect.js");
const Config = require('../../config/config');
const MovieService = {};


MovieService.index = async (req) => {
    const sort = { is_featured: -1 };
    const search = req.query.search;
    if (Boolean(search) == false) {
        var serachQuery = { is_deleted: 0 }
    } else {
        var serachQuery = {
            is_deleted: 0, $or: [
                { name: { $regex: search, $options: "i" } },
            ],
        }
    }


    const movies = await MovieModel.find(serachQuery).sort(sort);
 
    // const { startIndex, endIndex } = req.pagination;
    // const movies = response.slice(startIndex, endIndex);
    // movies.forEach((item, index) => {
    //     item.image = Config.baseUrl + "movies/" + item.image;
    // })
    var responseData = { 'movies': movies, 'totalCount': movies.length };

    return responseData;
};

MovieService.view = async (req) => {
    var query = { _id: req.id };
    const response = await MovieModel.findOne(query);
    // response.image =Config.baseUrl + "movies/" + response.image;
    return response;
};

MovieService.store = async (input) => {
    let movie_data = collect(input).all();
    const newMovie = new MovieModel(movie_data);
    const res = await newMovie.save();
    return res;
}


MovieService.update = async (id, input) => {
    // remove password_confirmation key from object
    let movie_data = collect(input).all();
    const response = await MovieModel.findOneAndUpdate({ _id: id }, movie_data, { new: true });
    return response;
}


MovieService.delete = async (delType, req) => {
    var query = { _id: req.id };
    let response = false;
    if (delType) {
        response = await MovieModel.deleteOne(query);
    } else {
        response = await MovieModel.findOneAndUpdate(query, {
            is_deleted: 1
        });
    }
    return response;
};

module.exports = MovieService;