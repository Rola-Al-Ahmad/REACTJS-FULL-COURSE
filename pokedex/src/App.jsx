import { useState } from "react";
import Header from "./components/Header"
import PokeCard from "./components/PokeCard"
import SideNav from "./components/SideNav"

function App() {

  const [selectedPokemon, setSelectedPokemon] = useState(0);
  const [showSideMenu, setShowSideMenu] = useState(false) // this does the opposite of what it should do (ie, when showSideMenu it false, it's actually false)

  function handleToggleMenu() {
    setShowSideMenu(!showSideMenu)

  }

  function handleCloseMenu() {
    setShowSideMenu(false)
  }

  return (
    <>
      <Header handleToggleMenu={handleToggleMenu} />
      <SideNav
        selectedPokemon={selectedPokemon}
        setSelectedPokemon={setSelectedPokemon}
        showSideMenu={showSideMenu}
        handleCloseMenu={handleCloseMenu}
      />
      <PokeCard selectedPokemon={selectedPokemon}/>
    </>
  )
}

export default App
