import { useState } from "react"
import { first151Pokemon, getFullPokedexNumber } from "../utils"

const SideNav = ({ selectedPokemon, setSelectedPokemon, showSideMenu, handleCloseMenu }) => {

    const [searchValue, setSearchValue] = useState('')

    const filteredPokemon = first151Pokemon.filter((ele, eleIndex) => {
        // if full pokedex number includes the current search value, return true
        if ((getFullPokedexNumber(eleIndex)).includes(searchValue)) { return true }

        // if the pokemon name includes the current search value, return true
        if (ele.toLowerCase().startsWith(searchValue.toLowerCase())) { return true }

        // otherwise, exclude value from the array
        return false
    })
    return (
        <nav className={' ' + (showSideMenu ? "open" : '')}>
            <div className={"header " + (showSideMenu ? "open" : '')}>
                <button onClick={handleCloseMenu} className="open-nav-button">
                    <i className="fa-solid fa-arrow-left-long"
                    style={{ paddingTop: '.5rem' }}></i>
                </button>
                <h1 className="text-gradient font-bold">Pokédex</h1>
            </div>
            <input placeholder="E.g. 001 or Bulba..." value={searchValue}
                onChange={(e) => { setSearchValue(e.target.value) }}
            />
            {
                filteredPokemon.map((pokemon, pokemonIndex) => {
                    const truePokedexNumber = first151Pokemon.indexOf(pokemon)
                    return (
                        <button key={pokemonIndex}
                            onClick={() => {
                                setSelectedPokemon(truePokedexNumber)
                                handleCloseMenu()
                            }
                            }
                            className={`nav-card ${pokemonIndex === selectedPokemon ? 'nav-card-selected' : ''}`}
                        >
                            <p>{getFullPokedexNumber(truePokedexNumber)}</p>
                            <p>{pokemon}</p>
                        </button>
                    )
                })
            }
        </nav>
    )
}

export default SideNav