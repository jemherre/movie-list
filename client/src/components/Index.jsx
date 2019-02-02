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
    <span>
      <button className='search' id='watched' onClick={props.selectList}> Watched</button>
      <button className='search' id='watch' onClick={props.selectList}> To Watch</button>
      <button className='search' id='main' onClick={props.selectList}> Main List</button>
      <form onSubmit={props.submit}>
        <input type="text" placeholder="Search..."/>
        <input type="submit" value="Go!" />
      </form>
    </span>
  );
}

//movielist recieves array of movie obj to display on client
function MovieList(props){
  if(props.movies.length > 0){
    return (
      <ul > {
        props.movies.map((movie)=>{
        return <li key={movie.title}>
        {movie.title} <button className='watch' id={movie.title} onClick={(e)=>{props.onclick(e)}}>watched</button>
        </li>
      })} </ul>
    );
  } else {
    return <div> No movie exists! </div> ;
  }
}

class MainList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMV: []
    };
  }

  selectList(e){
    if(e === 'main') {var list = e; }
    else{ var list = e.target.id;}
    if(list === 'main') {
      this.setState({selectedMV: movies});
    } else if(list === 'watch' || list === 'watched') {
      //we would want to query db for specified movie status
      var result = [];
      for(var i=0; i< movies.length; i++){
        if(movies[i].status === list) result.push(movies[i]);
      }
      this.setState({selectedMV: result});
    }

  }

  mvWatched(e){
    for(var i=0; i< movies.length; i++){
      if(movies[i].title === e.target.id) movies[i].status = 'watched';
    }
    var result = [];
    for(var i=0; i< movies.length; i++){
      if(movies[i].status === 'watch') result.push(movies[i]);
    }
    this.setState({selectedMV: result});
  }

  addMV(e){
    e.preventDefault();
    //check to see if movie exists already
    movies.push({title: e.target[0].value, status: 'watch'});
    e.target[0].value = '';
    var result = [];
    for(var i=0; i< movies.length; i++){
      if(movies[i].status === 'watch') result.push(movies[i]);
    }
    this.setState({selectedMV: result});
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
    this.selectList('main');
  };

  render() {

    return (
    <div>
      <AddMovie add={this.addMV.bind(this)}/>
      <SearchBar submit={this.searchCLK.bind(this)} selectList={this.selectList.bind(this)}/>
      <MovieList movies={this.state.selectedMV} onclick={this.mvWatched.bind(this)}/>
    </div>
    );
  }
};

ReactDOM.render(<MainList />,document.getElementById('App'));