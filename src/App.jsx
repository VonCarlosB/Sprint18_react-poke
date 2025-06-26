import { useEffect, useState } from 'react';
import './App.css';

function App () {
  const [name, setName] = useState('')
  const [pokemon, setPokemon] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const getPokemon = async (pokemonName) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    try {
      setIsLoading(true)
      if(!res.ok){
        throw new Error ('No se ha podido acceder a la API')
      }
      const data = await res.json()
      data.results ? setPokemon(null) : setPokemon(data)
    } catch (err) {
      setError(err.message)
      console.error(error)
    } finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setError(null)
    setPokemon(null)

    const delay = setTimeout(() => {
      getPokemon(name)
    }, 100)

    return () => clearTimeout(delay)

  }, [name])

  return(
    <>
      <input type='text' value={name} onChange={(e) => setName(e.target.value)}></input>
      <div>{isLoading && <p>Cargando</p>}{error && !pokemon && <p>{error}</p>}</div>
      {pokemon && 
      <div className='content'>
        <div className={`contentPokemon ${pokemon.types[0].type.name}`}>
          <h2>{pokemon.id}. {pokemon.name}</h2>
          <div className='pokemon'>
            <img src={pokemon.sprites?.other['official-artwork']?.front_default} alt={pokemon.name}/>
          </div>
          
        </div>
      </div>
      }
    </>
  )
}

export default App;
