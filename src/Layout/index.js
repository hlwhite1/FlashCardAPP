import React, { useState, useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import DecksList from "../Decks/DecksList";
import CreateDeck from "../Decks/CreateDeck";
import ViewDeck from "../Decks/ViewDeck";
import StudyDeck from "../Decks/StudyDeck";
import EditDeck from "../Decks/EditDeck";
import AddCard from "../Cards/AddCard";
import EditCard from "../Cards/EditCard";
import { listDecks } from "../utils/api/index";
import { Switch, Route } from "react-router-dom";

function Layout() {
  const [allDecks, setAllDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState({ cards: [] });

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function loadDecks() {
      const decksFromAPI = await listDecks(signal);
      setAllDecks(decksFromAPI);
    }
    loadDecks();

    return () => abortController.abort();
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <DecksList allDecks={allDecks} />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <ViewDeck
              selectedDeck={selectedDeck}
              setSelectedDeck={setSelectedDeck}
            />
          </Route>
          <Route path="/decks/:deckId/study">
            <StudyDeck
              selectedDeck={selectedDeck}
              setSelectedDeck={setSelectedDeck}
            />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck
              selectedDeck={selectedDeck}
              setSelectedDeck={setSelectedDeck}
            />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard
              selectedDeck={selectedDeck}
              setSelectedDeck={setSelectedDeck}
            />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard selectedDeck={selectedDeck} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
