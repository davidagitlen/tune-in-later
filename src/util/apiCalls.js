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
    .then(resp => {
      if (!resp.ok) {
        throw Error('Error logging in')
      }
      return resp.json();
    })
    .catch(err => err)
}

export const addFavoriteToApi = (book, userId) => {
  const favoriteBook = {
    "book_id": book.id,
    "author_name": book.artist,
    "book_name": book.title,
     "artwork_url": book.image,
    "release_date": book.date,
    "description": book.description,
    "primary_genre_name": book.genre
  }
  const options = {
    method: "POST",
    body: JSON.stringify(favoriteBook),
    headers: {
      "Content-Type": "application/json"
    }
  }
  return fetch(`http://localhost:3001/api/v1/users/${userId}/bookfavorites`, options)
    .then(resp => {
      if (!resp.ok) {
        throw Error('Error posting favorite');
      }
      return resp.json();
    })
    .catch(err => err)
} 

export const deleteFavoriteFromApi = (book, userId) => {
  const bookId = book.id
  const options = {
    method: "DELETE"
  }

  return fetch(`http://localhost:3001/api/v1/users/${userId}/bookfavorites/${bookId}`, options)
    .then(resp => {
      if (!resp.ok) {
        throw Error('Error posting favorite');
      }
      return resp.json();
    })
    .catch(err => err)
}

export const fetchSearch = searchTerm => {
  const searchURL = searchTerm.split(' ').join('+')
  return fetch(`https://itunes.apple.com/search?media=audiobook&term=${searchURL}`)
    .then(resp => {
      if (!resp.ok) {
        throw Error('Error getting search results')
      }
      return resp.json();
    })
    .catch(err => err)
}

export const getUserFavoritesFromApi = userId => {
  return fetch(`http://localhost:3001/api/v1/users/${userId}/bookfavorites/`)
  .then (resp => {
    if (!resp.ok) {
      throw Error('Error getting favorites')
    }
    return resp.json();
  })
  .catch(err => err)
}