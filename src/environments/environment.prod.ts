export const environment = {
  production: true,
  api_url: 'http://wmdb-backend.herokuapp.com/api/',
  TMDB: {
    apiUrl: 'https://api.themoviedb.org/3/',
    apiKey: 'ccb20a13769db99a9b2bc55cb645c989',
    apiLang: '&language=pt-BR',
    images: {
      base_url: 'http://image.tmdb.org/t/p/',
      secure_base_url: 'https://image.tmdb.org/t/p/',
      backdrop_sizes: {
        w300: 'w300',
        w780: 'w780',
        w1280: 'w1280',
        original: 'original'
      },
      logo_sizes: ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original'],
      poster_sizes: {
        w92: 'w92',
        w154: 'w154',
        w185: 'w185',
        w342: 'w342',
        w500: 'w500',
        w780: 'w780',
        original: 'original'
      },
      profile_sizes: {
        w45: 'w45',
        w185: 'w185',
        h632: 'h632',
        original: 'original'
      },
      still_sizes: ['w92', 'w185', 'w300', 'original']
    }
  }
};
