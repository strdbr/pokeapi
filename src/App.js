import './App.css';
import React from 'react';
import {Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';
import {Helmet} from 'react-helmet';

const apiData ={
  apiUrl: 'https://pokeapi.co/api/v2/',
  endpoint: 'pokemon/'
}

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      pokeName: '',
      pokeImg: ''
    }
  }


  componentDidMount(){
    var pokemonRand = Math.floor(Math.random() * 898) + 1;
    const url = apiData.apiUrl + apiData.endpoint + pokemonRand;
    fetch(url)
        .then((data) => data.json())
        .then((pokemon) => {
            this.setState({
              pokeName: pokemon.name,
              pokeImg: pokemon.sprites.front_default
            })
            console.log(pokemon.name, pokemon.sprites.front_default)
        })
        .catch((err) => {
            console.error(err);
        })
  }

  myInput = React.createRef();
  takeNumber = (e) => {
    e.preventDefault();
    console.log(this.myInput.current.value);
    const url = apiData.apiUrl + apiData.endpoint + this.myInput.current.value;
    fetch(url)
        .then((data) => data.json())
        .then((pokemon) => {
            this.setState({
              pokeName: pokemon.name,
              pokeImg: pokemon.sprites.front_default
            })
            console.log(pokemon.name, pokemon.sprites.front_default)
        })
        .catch((err) => {
            console.error(err);
        })
  }
  render(){

    /*function findPokemon(id){
      const url = apiData.apiUrl + apiData.endpoint + id;
      fetch(url)
          .then((data) => data.json())
          .then((pokemon) => {
              this.setState({
                pokeName: pokemon.name,
                pokeImg: pokemon.sprites.front_default
              })
              console.log(pokemon.name, pokemon.sprites.front_default)
          })
          .catch((err) => {
              console.error(err);
          })
    }*/
    return(
      <div className='container'>
        <Helmet>
          <style>{'body { background: linear-gradient(to right, #A74CF2, #617BFB); }'}</style>
        </Helmet>
        <div className='row row-cols-6'>
        <Modal.Dialog>
          <div className='col align-self-center'>
            <Modal.Body>
              <h1 className='text-center'>Poke Finder!</h1>
              <h1 className='fs-5 badge bg-primary text-wrap'>Ingresa un numero de Pokemon y descubre sus datos</h1>
              <Form onSubmit={this.takeNumber}>
                <Form.Group className="mb-3 p-1" controlId="formBasicPassword">
                  <Form.Label>¡Ingresa el Pokemon que deseas conocer!</Form.Label>
                  <Form.Control type="text" ref={this.myInput} placeholder="" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Modal.Body>
          </div>
        </Modal.Dialog>
        <Modal.Dialog>
          <div className='col align-self-center'>
            <Modal.Body>
              <img src={this.state.pokeImg} className='card imgSize' />
              <p className="fs-3 text-center pokemonName text-capitalize">{this.state.pokeName}</p>
            </Modal.Body>
          </div>
        </Modal.Dialog>
        </div>
      </div>
    );
  };
};

export default App;
