function checkFields(object) {
  const fields = Object.entries(object);
  const keyError = fields.find(([key, value]) => value === undefined && key);
  return keyError;
}

const loginBody = (req, res, next) => {
  const { user_name, password } = req.body;
  const loginUser = { user_name, password };

  const keyError = checkFields(loginUser);

  if (keyError)
    return res.status(400).json({
      error: `Missing '${keyError}' in request body`
    });

  res.loginUser = loginUser;
  return next();
};

const songBody = (req, res, next) => {
  const { song_title, composer, arranger, description, user_id } = req.body;
  const newSong = { song_title, composer, arranger, description, user_id };

  const keyError = checkFields(newSong);

  if (keyError)
    return res.status(400).json({
      error: `Missing '${keyError}' in request body`
    });

  res.newSong = newSong;
  return next();
};

const setBody = (req, res, next) => {
  const { set_name, description, user_id } = req.body;
  const newSet = { set_name, description, user_id };

  const keyError = checkFields(newSet);

  if (keyError)
    return res.status(400).json({
      error: `Missing '${keyError}' in request body`
    });

  res.newSet = newSet;
  return next();
};

const gigBody = (req, res, next) => {
  // const { song_title, composer, arranger, user_id } = req.body;
  // const newGig = { song_title, composer, arranger, user_id };

  // const keyError = checkFields(newGig);

  // if (keyError)
  //   return res.status(400).json({
  //     error: `Missing '${keyError}' in request body`
  //   });

  // res.newGig = newGig;
  return next();
};

module.exports = {
  loginBody,
  songBody,
  setBody,
  gigBody
};
