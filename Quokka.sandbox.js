const func = () => {
  const { gig_name, start_time, another } = {gig_name: 'name'};
  const newGig = { gig_name, start_time };;

  const fields = Object.entries(newGig)
  const keyError = fields.find(([key, value]) => (value === undefined && key))

  if (keyError) return console.log('error: ', keyError)
  return console.log('pass');
}

func()

const next = (res) => {
  console.log(res.song);
}

// const checkIfExists = async (res={}) => {
//   try {
//     const song = {song: 'song_name'}
//     // x++
//     if (!song) return console.log('error');
//     res.song = song;
//   } catch (error) {
//     next(error);
//   }

//   return next(res);
// };

checkIfExists()

async function checkIfExists(res={}) {
  try {
    const song = {song: 'song_name'}
    // x++
    if (!song) return console.log('error');
    res.song = song;
  } catch (error) {
    next(error);
  }

  return next(res);
};