const MovieService = require("../../services/admin/Movie.service");
const MovieValidation = require('../../validation/admin/movie.validation');
const Helper = require("../../helper/Helper");
const MovieModel = require("../../model/Movie.model");
const Config = require('../../config/config');
const _ = require('lodash');
const ObjectId = require('mongoose').Types.ObjectId;

exports.index = async (req, res) => {
  try {
    console.log(req.body);
    let response = await MovieService.index(req);
    return res.send({ 'status': true, 'message': 'Data Found', 'data': response, 'totalCount': response.length });
  } catch (error) {
    console.log(error)
    return res.send({ 'status': false, 'message': error });
  }
}

exports.store = async (req, res) => {
  try {
    // validtion input
    let validation = await MovieValidation(req.body);
   
    if (validation.fails()) {
      let err_msg_all = "";
      let kd = '';
      _.each(validation.errors.errors, (err_msg, key) => {
        error = true;
        kd = key;
        err_msg_all = err_msg;
      });

      return res.status(200).send({ status: false, message: validation.errors.first(kd) });
    }

    const query = { title: validation.input.title, is_deleted: { $ne: 1 } };
    const movie = await MovieModel.findOne(query);
    if (movie) {
      return res.send({ 'status': false, 'message': "movie alrady exists" });
    }
    else {
      let response = await MovieService.store(validation.input);
      Helper.moveFileFromFolder(response.image, 'movies');

      return res.send({ 'status': true, 'message': 'Movie created', 'data': response });
    }

    // create user account


  } catch (err) {
    return res.send({ 'status': false, 'message': err });
  }
}

exports.view = async (req, res) => {
  try {
    let response = await MovieService.view(req.params);
    // response.image = Config.baseUrl + "movies/" + response.image;
    return res.send({ 'status': true, 'message': 'Data Found', 'data': response });
  } catch (err) {
    console.log(err)
    return res.send({ 'status': false, 'message': err });
  }
}


exports.update = async (req, res) => {

  try {
    // validtion input
    let validation = await MovieValidation(req.body);
    if (validation.fails()) {
      let err_msg_all = "";
      let kd = '';
      _.each(validation.errors.errors, (err_msg, key) => {
        error = true;
        kd = key;
        err_msg_all = err_msg;
      });

      return res.status(200).send({ status: false, message: validation.errors.first(kd) });
    }

    const MovieId = new ObjectId(req.params.id)
    const movie = await MovieModel.findOne({ _id: { $ne: MovieId }, title: req.body.title, is_deleted: 0 });
    if (movie) {
      return res.send({ 'status': false, 'message': "movie alrady exists" });
    }
    else {
      let response = await MovieService.update(MovieId, req.body);
      Helper.moveFileFromFolder(response.image, 'movies');
      return res.send({ 'status': true, 'message': 'movie updated', 'data': response });
    }
  } catch (error) {
    return res.send({ 'status': false, 'message': error });
  }
}

 
 

 


