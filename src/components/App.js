import React from "react";
import SearchBar from './SearcBar'
import MovieList from './MovieList'
import axios from 'axios'

class App extends React.Component {
  state = {
    movies: [],
    searchQuery: ""
  }

  async componentDidMount(){
  //  const response=await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=b328754785358675c5243a6b86190c63&language=en-US&page=1")
  const response=await axios.get("https://api.themoviedb.org/3/list/8225975?api_key=b328754785358675c5243a6b86190c63&language=en-US")
   console.log(response)
  //  this.setState({movies:response.data.results})
   this.setState({movies:response.data.items})
  }
  

//AXIOS API
deleteMovie = async (movie) => {
 axios.post(`https://api.themoviedb.org/3/list/8225975/remove_item?session_id=45ed297a9c964ce0b4df9d47ad7f53442f6d7664&api_key=b328754785358675c5243a6b86190c63&media_id=${movie.id}`)
  
  const newMovieList = this.state.movies.filter(
    m => m.id !== movie.id
  )
 
  this.setState(state => ({
    movies: newMovieList
  }))    
}
  searchMovie=(event)=>{
    console.log(event.target.value)
    this.setState({searchQuery:event.target.value})
  }

  render() {
    let filteredMovies = this.state.movies.filter(
      (movie) => {
          return movie.title.toString().toLowerCase().indexOf(this.state.searchQuery.toString().toLowerCase()) !== -1
      }
  ).sort((a, b) => {
      return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
  });

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <SearchBar searchMovieProp={this.searchMovie} />
          </div>
        </div>
        <MovieList
          movies={filteredMovies}
          deleteMovieProp={this.deleteMovie} />
      </div>
    )
  }
}

export default App;