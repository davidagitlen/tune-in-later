export const landingFetch = () => {
  const romanceFetch = fetch('https://itunes.apple.com/search?media=audiobook&term=romance');
  const fantasyFetch = fetch('https://itunes.apple.com/search?media=audiobook&term=fantasy');
  const biographyFetch = fetch('https://itunes.apple.com/search?media=audiobook&term=biography');
  const historyFetch = fetch('https://itunes.apple.com/search?media=audiobook&term=history');
  const horrorFetch = fetch('https://itunes.apple.com/search?media=audiobook&term=horror');

  return Promise.all([romanceFetch, fantasyFetch, biographyFetch, historyFetch, horrorFetch])
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(data => {
      return data.map((datum, i) => {
        return datum.results.map(obj => {
          switch (i) {
            case 0:
              return { ...obj, filterType: 'romance' };
            case 1:
              return { ...obj, filterType: 'fantasy' };
            case 2:
              return { ...obj, filterType: 'biography' };
            case 3:
              return { ...obj, filterType: 'history' };
            case 4:
              return { ...obj, filterType: 'horror' };
            default:
              return obj;
          }
          })
        })
      })
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

export const addFavoritesToApi = (book, userId) => {
  const favoriteBook = {
    "book_id": book.id,
    "author_name": book.artist,
    "book_name": book.title,
     "artwork_url": book.image,
    "release_date": book.date,
    "description": book.description
  }
  const options = {
    method: "POST",
    body: JSON.stringify(favoriteBook),
    headers: {
      "Content-Type": "application/json"
    }
  }
  return fetch(`http://localhost:3001/api/v1/users/${userId}/bookfavorites`, options)
}