const func = () => {
  const { gig_name, start_time, another } = {gig_name: 'name'};
  const newGig = { gig_name, start_time, another };

  console.log(newGig);

  const fields = Object.entries(newGig)
  const keyError = fields.find(([key, value]) => (value === undefined && key))

  if (keyError) return console.log('error: ', keyError)
  return console.log('pass');
}

func()