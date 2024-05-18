import React from "react";
import { IDetail, IPokemonDetail } from "../interface";
import PokemonItem from "./PokemonItem";
import './pokemon.css';

interface Props {
    pokemons: IPokemonDetail[],
    viewDetail: IDetail,
    setDetail: React.Dispatch<React.SetStateAction<IDetail>>
}


const PokemonCollection: React.FC<Props> = ({ pokemons, viewDetail, setDetail }) => {

    const selectPokemon = (id: number) => {
        if (!viewDetail.isOpen) {
            setDetail({
                id: id,
                isOpen: true,
            });
        }
    };

    return (
        <section
            className={
                viewDetail.isOpen
                    ? "collection-container-active"
                    : "collection-container"
            }
        >
            {viewDetail.isOpen && (
                <div className="overlay"></div>
            )}
            {pokemons.map((pokemon) => {
                return (
                    <div onClick={() => selectPokemon(pokemon.id)}>
                        <PokemonItem
                            viewDetail={viewDetail}
                            setDetail={setDetail}
                            key={pokemon.id}
                            name={pokemon.name}
                            id={pokemon.id}
                            abilities={pokemon.abilities}
                            image={pokemon.sprites.front_default}
                        />
                    </div>
                );
            })}
        </section>
    )
}

export default PokemonCollection;