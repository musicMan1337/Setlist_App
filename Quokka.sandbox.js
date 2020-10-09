const func = () => {
  const { gig_name, start_time, another } = {
    gig_name: 'name',
    start_time: null,
    another: '',
  }
  const newGig = { gig_name, start_time, another }

  console.log(newGig.another === '');

  const fields = Object.entries(newGig)
  const keyError = fields.find(([key, value]) => value === undefined && key)

  if (keyError) return console.log('error: ', keyError)
  return console.log('pass')
}

func()

const next = res => {
  console.log(res)
}

const checkIfExists = async (res = {}) => {
  try {
    const store = ['one', 'two', 'three']
    const song = store.find(item => item === 'one')

    if (!song) return console.log('error')

    res.song = song
    console.log(res)
    next(res)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

checkIfExists()
checkIfExistsAsync()

async function checkIfExistsAsync(res = {}) {
  try {
    const store = ['one', 'two', 'three']
    const song = store.find(item => item === 'two')

    if (!song) return console.log('error')

    res.song = song
    console.log(res)
    next(res)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const NULLABLE = ['one', 'two']

const errorHandler = {
  generator(res, key) {
    let error = null
    if (NULLABLE.includes(key))
      error = { error: `Field '${key}' requires content or 'null'` }
    res.json = (
      error || {
        error: `Missing '${key}' in request body`,
      }
    )
    return res
  },
}

const check = errorHandler.generator((res = {}))

console.log(check);


const valid = () => {
  const a = true
  const b = true
  return a && b
}

if (valid()) console.log('yes');