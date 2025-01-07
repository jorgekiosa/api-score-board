const database = require("../database/connection");
const apiResponse = require("../helpers/apiResponse");

class TaskController {
  register(req, res) {
    try {
      const { id, code, name, description, sport_type,status } = req.body;
      database
        .insert({ id, code, name, description,sport_type,status })
        .table("scoreboard")
        .then((data) => {
          apiResponse.CreateSuccess(res, "Created successfully");
        })
        .catch((error) => {
          apiResponse.ErrorResponse(
            res,
            "An error has occurred",
            error.message
          );
        });
    } catch (error) {
      apiResponse.ErrorResponse(res, "An error has occurred", error.message);
    }
  }

  getAll(req, res) {
    try {
      database
        .select("*")
        .table("scoreboard")
        .then((data) => {
          apiResponse.successResponseWithData(
            res,
            "Operation successfully completed",
            data
          );
        })
        .catch((error) => {
          apiResponse.ErrorResponse(
            res,
            "An error has occurred",
            error.message
          );
        });
    } catch (error) {
      apiResponse.ErrorResponse(res, "An error has occurred", error.message);
    }
  }

  async getOne(req, res) {
    try {
      const id = req.params.id;
      await database
        .select("*")
        .table("scoreboard")
        .where({ id: id })
        .then((data) => {
          apiResponse.successResponseWithData(
            res,
            "Operation successfully completed",
            data
          );
        })
        .catch((error) => {
          apiResponse.ErrorResponse(
            res,
            "An error has occurred",
            error.message
          );
        });
    } catch (error) {
      apiResponse.ErrorResponse(res, "An error has occurred", error.message);
    }
  }

  update(req, res) {
    try {
      const id = req.params.id;
      const { code, name, description, sport_type,status } = req.body;

      database
        .where({ id: id })
        .update({
          code: code,
          name: name,
          description: description,
          sport_type: sport_type,
          status: status,
        })
        .table("scoreboard")
        .then((data) => {
          apiResponse.successResponse(res, "Updated successfully");
        })
        .catch((error) => {
          apiResponse.ErrorResponse(
            res,
            "An error has occurred",
            error.message
          );
        });
    } catch (error) {
      apiResponse.ErrorResponse(res, "An error has occurred", error.message);
    }
  }

  delete(req, res) {
    try {
      const id = req.params.id;
      database
        .where({ id: id })
        .del()
        .table("scoreboard")
        .then((data) => {
          apiResponse.successResponse(res, "Removed successfully");
        })
        .catch((error) => {
          apiResponse.ErrorResponse(
            res,
            "An error has occurred",
            error.message
          );
        });
    } catch (error) {
      apiResponse.ErrorResponse(res, "An error has occurred", error.message);
    }
  }
}

module.exports = new TaskController();
