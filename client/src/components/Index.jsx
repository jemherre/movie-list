// render your app here in this component
var React = require('react');
var ReactDOM = require('react-dom');

var movies = [];

function AddMovie(props){
  return(
  <form onSubmit={props.add}>
    <input type='text' placeholder='Add movie title here'/>
    <input type='submit' value='Add'/>
  </form>
  );
}

function SearchBar(props){
  return(
    <div>
      <form onSubmit={props.submit}>
        <input type="text" placeholder="Search..."/>
        <input type="submit" value="Go!" />
      </form>
      <button onClick={props.main}> Main List</button>
    </div>
  );
}

//movielist recieves array of movie obj
function MovieList(props){
  if(props.movies.length > 0){
    return (
      <ul onClick={(e)=>{props.onclick(e)}}> {
        props.movies.map((movie)=>{
        return <li key={movie.title}>{movie.title}</li>
      })} </ul>
    );
  } else {
    return <div> No movie by that name found! </div> ;
  }
}

class MainList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMV: []
    };
  }

  mainList(){
    this.setState({selectedMV: movies});
  }

  movieCLK(e){
    // this.setState({selectedMV: 'example'});
  }

  addMV(e){
    e.preventDefault();
    console.log(e.target[0].value);
    movies.push({title: e.target[0].value});
    this.setState({selectedMV: movies});
  }

  searchCLK(e){
    e.preventDefault();
    var result = [];
    for(var i=0; i< movies.length; i++){
      if(movies[i].title === e.target[0].value) result.push(movies[i]);
    }
    e.target[0].value = ''; //clear value
    this.setState({selectedMV: result});
    //later: we want to go to server and get list with specified name from db
  }

  componentDidMount(){
    this.mainList();
  };

  render() {

    return (
    <div>
      <AddMovie add={this.addMV.bind(this)}/>
      <SearchBar submit={this.searchCLK.bind(this)} main={this.mainList.bind(this)}/>
      <MovieList movies={this.state.selectedMV} onclick={this.movieCLK.bind(this)}/>
    </div>
    );
  }
};

ReactDOM.render(<MainList />,document.getElementById('App'));