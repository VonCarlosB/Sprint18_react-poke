import { useEffect, useState } from 'react';
import './App.css';

function App () {
  const [name, setName] = useState('')
  const [pokemon, setPokemon] = useState({})

  const pokemonContainer = () => {
    if(pokemon.id != undefined){
      return(
      <div>
        <h2><b>{pokemon.id}.</b> {pokemon.name}</h2>
        <img src={pokemon.sprites.front_default} />
      </div>
      )
    }else{
      return(
        <div>
          <h2>{pokemon.name}</h2>
        </div>
      )
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getPokemon(name)
  }

  const getPokemon = async (pokemonName) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    try {
      if(!res.ok){
        throw new Error ('No se ha podido acceder a la API')
      }
      const data = await res.json()
      setPokemon(data)
    } catch (error) {
      setPokemon({name:'Enter your pokemon'})
    }
  }

  useEffect(() => {
    getPokemon(name)
  }, [name])

  return(
    <>
      {pokemonContainer()}
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Pokemon ID or name: </label>
        <input type='text' name='name' id='name' value={name} onChange={(e) => setName(e.target.value)}></input>
      </form>
    </>
  )
}

export default App;
