const ApiError = require('../exceptions/api.error');
const { handleAddBase } = require('../services/tasks.service');

exports.setTaskData = async function (req, res, next) {
  try {
    const { base, decree, figurant, iniciator, main, prosecutor } = req.body;

    // console.log(base, decree, figurant, iniciator, main, prosecutor);
    const result = await handleAddBase(base, figurant, iniciator, decree);
    return res.json(result);
  } catch (error) {
    next(error);
  }
  return false;
};
