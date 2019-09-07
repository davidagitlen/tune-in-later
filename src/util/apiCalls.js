export const landingFetch = () => {
  const romanceFetch = fetch('https://itunes.apple.com/search?media=audiobook&term=romance');
  const fantasyFetch = fetch('https://itunes.apple.com/search?media=audiobook&term=fantasy');
  const biographyFetch = fetch('https://itunes.apple.com/search?media=audiobook&term=biography');
  const historyFetch = fetch('https://itunes.apple.com/search?media=audiobook&term=history');
  const horrorFetch = fetch('https://itunes.apple.com/search?media=audiobook&term=horror');

  return Promise.all([romanceFetch, fantasyFetch, biographyFetch, historyFetch, horrorFetch])
    .then(responses => Promise.all(responses.map(response => response.json())))
    .catch(err => console.log(err, 'error in apiCalls landingFetch'))

}

export const authorFetch = (authorFirstName, authorLastName) => {

  return fetch(`https://itunes.apple.com/search?media=audiobook&term=${authorFirstName+authorLastName}`)
    .then(response => response.json())
    .catch(err => console.log(err, 'error in apiCalls authorFetch'))

}

export const loginUser = (email, password) => {
  const user = {
    "email": email,
    "password": password
  };

  const options = {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    }
  }

  return fetch('http://localhost:3001/api/v1/login/', options)
    
}