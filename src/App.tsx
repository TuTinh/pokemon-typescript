import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import PokemonCollection from './components/PokemonCollection';
import { IDetail, IPokemon, IPokemons } from './interface';



const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [viewDetail, setDetail] = useState<IDetail>({
    id: 0,
    isOpen: false
  });

  const getPokemon = async () => {
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20');
    setNextUrl(res.data.next);
    res.data.results.forEach(async (pokemon: IPokemons) => {
      const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
      setPokemons((prev) => [...prev, poke.data]);
      setIsLoading(false);
    });
  }
  useEffect(() => {
    getPokemon();
  }, [])

  const handlLoadMore = async () => {
    setIsLoading(true);
    const res = await axios.get(nextUrl);
    setNextUrl(res.data.next);
    res.data.results.forEach(async (pokemon: IPokemons) => {
      const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
      setPokemons((prev) => [...prev, poke.data])
      setIsLoading(false);
    });
  }

  const handleReset = () => {
    setPokemons([]);
    getPokemon();
  }

  return (
    <div className="App">
      <div className='container'>
        <header className="pokemon-header">
          Pokemon
        </header>
        <PokemonCollection pokemons={pokemons}
          viewDetail={viewDetail}
          setDetail={setDetail}
        />
        {!viewDetail.isOpen && (
          <div className="btn">
            <button onClick={handlLoadMore}>
              {isLoading ? "Loading..." : "Load more"}{" "}
            </button>
            <button onClick={handleReset}>
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
