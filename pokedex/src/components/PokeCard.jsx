/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react'
import { getFullPokedexNumber, getPokedexNumber } from '../utils';
import TypeCard from './TypeCard';
import Modal from './Modal';
import Spinner from './Spinner';

const PokeCard = ({ selectedPokemon }) => {


    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [skill, setSkill] = useState(null);
    const [loadingSkill, setLoadingSkill] = useState(false)

    const { name, height, abilities, stats, types, moves, sprites } = data || {};

    // console.log("moves", moves)

    const sortedMoves = Array.isArray(moves)
        ? [...moves].sort((a, b) => a.move.name.localeCompare(b.move.name))
        : [];

    // console.log("sortedMoves", sortedMoves)


    const imgList = Object.keys(sprites || {}).filter(val => {
        if (!sprites[val]) return false;
        if (['versions', 'other'].includes(val)) return false;
        return true
    })

    async function fetchMoveData(move, moveUrl) {
        if (loadingSkill || !localStorage || !moveUrl) { return }

        // check cache for move
        let c = {}
        if (localStorage.getItem('pokemon-moves')) {
            c = JSON.parse(localStorage.getItem('pokemon-moves'))
        }

        if (move in c) {
            setSkill(c[move])
            console.log('Found move in cache')
            return
        }

        try {
            setLoadingSkill(true)
            const res = await fetch(moveUrl)
            const moveData = await res.json()
            console.log('Fetched move from API', moveData)
            const description = moveData?.flavor_text_entries.filter(val => {
                return val.version_group.name == 'firered-leafgreen'
            })[0]?.flavor_text

            const skillData = {
                name: move,
                description
            }
            setSkill(skillData)
            c[move] = skillData
            localStorage.setItem('pokemon-moves', JSON.stringify(c))
        } catch (err) {
            console.log(err)
        } finally {
            setLoadingSkill(false)
        }
    }

    useEffect(() => {
        // if loading, exit logic
        console.log('selectedPokemon', selectedPokemon)

        if (loading || !localStorage) return;

        // check if the selected pokemon information is available in the cache
        // 1. define the cache

        let cache = {}
        if (localStorage.getItem('pokedex')) {
            cache = JSON.parse(localStorage.getItem('pokedex'))
        }

        // 2. check if the selected pokemon is in the cache, otherwise fetch from the API

        if (selectedPokemon in cache) {
            //read from the cache
            setData(cache[selectedPokemon])
            console.log('Read from cache')
            console.log(cache[selectedPokemon])
            return
        }

        // we passed all the cache stuff to no avail and now need to fetch the data from the api

        async function fetchPokemonData() {
            setLoading(true)
            try {
                const baseUrl = 'https://pokeapi.co/api/v2/'
                const suffix = 'pokemon/' + getPokedexNumber(selectedPokemon)
                const finalUrl = baseUrl + suffix
                const response = await fetch(finalUrl)
                const pokemonData = await response.json()
                setData(pokemonData)
                console.log(pokemonData)
                console.log('Fetched pokemon data')
                cache[selectedPokemon] = pokemonData
                localStorage.setItem('pokedex', JSON.stringify(cache))
            } catch (error) {
                console.log(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchPokemonData()
        // if we fetch from the api, make sure to save the information to the cache for next time

    }, [selectedPokemon])

    if (loading || !data) {
        return (
            <div className="poke-card justify-center items-center">
                <Spinner />
            </div>
        )
    }

    return (
        <div className="poke-card">
            {skill && (
                <Modal handleCloseModal={() => { setSkill(null) }} >
                    <div>
                        <h6 className="font-bold">Name</h6>
                        <h2 className='skill-name font-bold'>{skill.name.replaceAll('-', ' ')}</h2>
                    </div>
                    <div>
                        <h6 className="font-bold">Description</h6>
                        <p>{skill.description}</p>
                    </div>
                </Modal>
            )}

            <div>
                <h4 className="font-bold">#{getFullPokedexNumber(selectedPokemon)}</h4>
                <h2 className="font-bold">{name}</h2>
            </div>
            <div className="type-container">
                {
                    types.map((typeObj, typeIndex) => (
                        <TypeCard key={typeIndex} type={typeObj.type.name}>

                        </TypeCard>
                    ))
                }
            </div>
            <img className='default-img' src={`/pokemon/${getFullPokedexNumber(selectedPokemon)}.png`}
                alt={`${name}-large-image`}
            />

            <div className='img-container'>
                {
                    imgList.map((spriteUrl, spriteIndex) => (
                        <img key={spriteIndex} src={sprites[spriteUrl]} alt={`${name}-img-${spriteUrl}`} />
                    ))
                }
            </div>
            <h3>Stats</h3>
            <div className='stats-card'>
                {stats.map((statObj, statIndex) => {
                    const { stat, base_stat } = statObj
                    return (
                        <div key={statIndex} className='stat-item'>
                            <p>{stat?.name.replaceAll('-', ' ')}</p>
                            <h4>{base_stat}</h4>
                        </div>
                    )
                })}
            </div>
            <h3>Moves</h3>
            <div className='pokemon-move-grid'>
                {sortedMoves.length > 0 ? (
                    sortedMoves.map(({ move }, moveIndex) => (

                        <button className='button-card pokemon-move' key={moveIndex}
                            onClick={() => fetchMoveData(move.name, move.url)}>
                            <p>{move.name.replaceAll('-', ' ')}</p>
                        </button>
                    ))
                ) : (
                    <p>No moves available</p>
                )}
            </div>
        </div>
    )
}

export default PokeCard