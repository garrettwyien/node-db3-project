const db = require('../../data/db-config')

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try{
    const possibleScheme = await db('schemes')
      .where('scheme_id', req.params.scheme_id)
      .first()
    if (!possibleScheme) {
      next({status:404,message:`scheme with scheme_id ${req.params.scheme_id} not found`})
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = async (req, res, next) => {
  try{ 
    if (!req.body.scheme_name || typeof req.body.scheme_name !== 'string'|| req.body.scheme_name.length === 0) {
    next({status:400, message: "invalid scheme_name"})
  } else {
    next()
  }
  } catch (err) {
    next(err)
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  try{ 
    if (!req.body.instructions || typeof req.body.instructions !== 'string'|| req.body.instructions.length === 0 || typeof req.body.step_number !== 'number' || req.body.step_number < 1) {
    next({status:400, message: "invalid step"})
  } else {
    next()
  }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
