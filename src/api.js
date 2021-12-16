// const baseUrl = "http://localhost:8000/"
// const baseUrl = "http://192.168.0.113:8000/"
const baseUrl = "https://movieplusback.herokuapp.com/"

const api = {
    // movies
    films: baseUrl + 'api/movies/films',
    crew: baseUrl + 'api/movies/crewmembers',
    cast: baseUrl + 'api/movies/castmembers',    
    series: baseUrl + 'api/movies/series',
    ratings: baseUrl + 'api/movies/ratings',
    genres: baseUrl + 'api/movies/genres',
    productions: baseUrl + 'api/movies/productions',
    occupations: baseUrl + 'api/movies/occupations',            
    artists: baseUrl + 'api/movies/artists',        
    reviews: baseUrl + 'api/movies/reviews',
    theaters: baseUrl + 'api/movies/theaters',
    platforms: baseUrl + 'api/movies/platforms',
    // articles
    categories: baseUrl + 'api/articles/categories',   
    articleComments: baseUrl + 'api/articles/comments',
    articles: baseUrl + 'api/articles/articles',   
    // reviews: baseUrl + 'api/articles/reviews',        
    // users
    users: baseUrl + 'api/users',
    authFacebook: baseUrl + 'rest-auth/facebook/',
    authGoogle: baseUrl + 'rest-auth/google/',
    profile: baseUrl + 'rest-auth/user/',
    // mediaItems: baseUrl + 'media/items',
    // mediaUsers: baseUrl + 'media/users',    
    // mediaUploads: baseUrl + 'media/uploads',
    ckeditor: baseUrl + 'ckeditor/',
}

export default api;