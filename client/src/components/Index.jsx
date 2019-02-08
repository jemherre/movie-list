// render your app here in this component
var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios');
var movies = [];

/***** App Components *********/
function AddMovie(props){
  return(
  <form onSubmit={props.add}>
    <input type='text' placeholder='Add movie title here'/>
    <input className='addMovie' type='submit' value='Add'/>
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
        <input className='search' type="submit" value="Go!" />
      </form>
    </span>
  );
}

function MovieList(props){
  if(props.movies.length > 0){
    return (
      <ul > {
        props.movies.map((movie)=>{
        return <li key={movie.title}>
        {movie.title} <button className='watch' id={movie.title} onClick={(e)=>{props.onclick(e)}}>watched</button>
        </li> 
        })
      } </ul>
    );
  } else {
    return <div> No movie exist! </div> ;
  }
}

/*************************/

function getQuery(endpoint, opt, state){
  axios.get(endpoint, {
    params: opt
  })
  .then(function (response) {
    console.log(response);
    state.setState({selectedMV: response.data});
  })
  .catch(function (error) {
    console.log(error);
  });
}

class MainList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMV: []
    };
  }

  selectList(e){
    if(e === 'main') {
      var list = e; 
    } else{ 
      var list = e.target.id;
    }
    var state = this;
    getQuery('/movie_list', {type: list}, state);
  }

  mvWatched(e){
    state = this;
    var name = e.target.id;
    getQuery('/movie_watched',{ title: name, currStatus:'watch'}, state);
  }

  addMV(e){
    e.preventDefault();
    var state = this;
    var name = e.target[0].value;
    e.target[0].value = '';
    
    axios.post('/movie_add', {
      title: name, 
      status: 'watch'
    })
    .then(function (response) {
      console.log('res: ', response);
      state.setState({selectedMV: response.data});
    })
    .catch(function (error) {
      console.log(error);
    });
  
  }

  searchCLK(e){
    e.preventDefault();
    var state = this;
    var name = e.target[0].value;
    e.target[0].value = ''; //clear value
    getQuery('/movie_search',{ title: name}, state);
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