// const func = () => {
//   const { gig_name, start_time, another } = {
//     gig_name: 'name',
//     start_time: null,
//     another: '',
//   }
//   const newGig = { gig_name, start_time, another }

//   console.log(newGig.another === '');

//   const fields = Object.entries(newGig)
//   const keyError = fields.find(([key, value]) => value === undefined && key)

//   if (keyError) return console.log('error: ', keyError)
//   return console.log('pass')
// }

// func()

// const next = res => {
//   console.log(res)
// }

// const checkIfExists = async (res = {}) => {
//   try {
//     const store = ['one', 'two', 'three']
//     const song = store.find(item => item === 'one')

//     if (!song) return console.log('error')

//     res.song = song
//     console.log(res)
//     next(res)
//   } catch (error) {
//     console.log(error)
//     next(error)
//   }
// }

// checkIfExists()
// checkIfExistsAsync()

// async function checkIfExistsAsync(res = {}) {
//   try {
//     const store = ['one', 'two', 'three']
//     const song = store.find(item => item === 'two')

//     if (!song) return console.log('error')

//     res.song = song
//     console.log(res)
//     next(res)
//   } catch (error) {
//     console.log(error)
//     next(error)
//   }
// }

// const NULLABLE = ['one', 'two']

// const errorHandler = {
//   generator(res, key) {
//     let error = null
//     if (NULLABLE.includes(key))
//       error = { error: `Field '${key}' requires content or 'null'` }
//     res.json = (
//       error || {
//         error: `Missing '${key}' in request body`,
//       }
//     )
//     return res
//   },
// }

// const check = errorHandler.generator((res = {}))

// console.log(check);

// const valid = () => {
//   const a = true
//   const b = true
//   return a && b
// }

// if (valid()) console.log('yes');

// let z = ""
// if (z) console.log('true');

// const { composer, arranger } = { composer: null, arranger: '' }

// let renderSongInfo = null

// if (composer || arranger) console.log('hey');

// switch(arranger.length) {
//   case 3:
//     renderSongInfo = 1;
//     break

//   case (composer || arranger):
//     renderSongInfo = 2;
//     break

//   default:
//     break
// }

// console.log(composer || 'hey')

// const page = 'sets';

//   let renderCards;

//   switch(page) {
//     case 'songs':
//       console.log('page');
//       break

//     case 'sets':

//     case 'gigs':

//     default: break
//   }

const setContructor = (set, songs, linkages) => {
  linkages = linkages.filter(ids => ids.set_id === set.id)
  songs = songs.filter(song => linkages.includes(song.id))

  console.log(songs);
  console.log(linkages);
}

const set = { id: 1, set_name: 'set 1' }
const songs = [
  { id: 1, song_title: 'song 1' },
  { id: 2, song_title: 'song 2' },
  { id: 3, song_title: 'song 3' },
]
const linkages = [{song_id: 1, set_id: 1}, {song_id: 2, set_id: 1}, {song_id: 3, set_id: 2}]

setContructor(set, songs, linkages)
