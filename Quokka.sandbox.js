const func = () => {
  const { gig_name, start_time, another } = { gig_name: 'name', another: 'one' }
  const newGig = { gig_name, another }

  const fields = Object.entries(newGig)
  const keyError = fields.find(([key, value]) => value === undefined && key)

  if (keyError) return console.log('error: ', keyError)
  return console.log('pass')
}

func()

const next = res => {
  console.log(res.song)
}

// const checkIfExists = async (res = {}) => {
//   try {
//     const store = ['one', 'two', 'three']
//     const song = store.find(item => item === '')

//     x++
//     if (!song) return console.log('error')

//     res.song = song
//     console.log(res);
//     next(res)
//   } catch (error) {
//     console.log(error);
//     next(error)
//   }
// }

checkIfExists()

async function checkIfExists(res = {}) {
  try {
    const store = ['one', 'two', 'three']
    const song = store.find((item) => item === '')

    if (!song) return console.log('error')

    res.song = song
    console.log(res);
    next(res)
  } catch (error) {
    console.log(error);
    next(error)
  }
}
