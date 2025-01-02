const database = require("../database/connection");
const apiResponse = require("../helpers/apiResponse");

const validateFieldScoreboard = (req, res, next) => {
  const { body } = req;

  const errors = [];
  const fields = [body];
  const requiredFields = Object.keys(fields[0]);

  if (requiredFields.length == 0) {
    return apiResponse.ErrorResponse(res, "All fields are required");
  }
  requiredFields.forEach((field) => {
    if (!body[field] ? String(body[field]).trim() : '') {
      errors.push(`${field} is required and cannot be empty`);
    }
  });

  if (errors.length > 0) {
    return apiResponse.validationErrorWithData(res, "Operation failed", errors);
  }
  next();
};

const validateCodeExist = async (req, res, next) => {
  const id = req.params.id;
  const { code } = req.body;

  try {
    if (id) {
      const score = await database
        .select("*")
        .table("scoreboard")
        .where({ id: id })
        .first();

      if (score && score.code === code) {
        return next();
      } else {
        const codeExist = await database
          .select("*")
          .table("scoreboard")
          .where({ code: code })
          .first();

        if (codeExist) {
          return apiResponse.validationExistData(
            res,
            "Code already registered",
            code
          );
        }
      }
    } else {
      const codeExist = await database
        .select("*")
        .table("scoreboard")
        .where({ code: code })
        .first();

      if (codeExist) {
        return apiResponse.validationExistData(
          res,
          "Code already registered",
          code
        );
      }
    }
    next();
  } catch (error) {
    console.error(error);
    return apiResponse.ErrorResponse(
      res,
      "Error while validating code",
      error
    );
  }
};


const validateScoreboardExist = async (req, res, next) => {
  const id = req.params.id;
  const taskExist = await database
    .select("*")
    .table("scoreboard")
    .where({ id: id })
    .first();

  if (!taskExist) {
    return apiResponse.notFoundResponse(res, "Scoreboard not found");
  }
  next();
};

module.exports = {
  validateCodeExist,
  validateFieldScoreboard,
  validateScoreboardExist,
};
