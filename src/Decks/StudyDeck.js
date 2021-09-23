import React, { useEffect } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import NotEnoughCards from "../Cards/NotEnoughCards";
import StudySession from "../Cards/StudySession";

export default function StudyDeck({ selectedDeck, setSelectedDeck }) {
  const { params } = useRouteMatch();
  const { deckId } = params;

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function loadDeck() {
      const deckFromAPI = await readDeck(deckId, signal);

      try {
        setSelectedDeck(deckFromAPI);
      } catch (error) {
        if (error !== "AbortError") {
          throw error;
        }
      }
    }
    loadDeck();

    return () => abortController.abort();
  }, [deckId]);

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{selectedDeck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h2>{selectedDeck.name}: Study</h2>
      {selectedDeck.cards.length < 3 ? (
        <NotEnoughCards cardsInDeck={selectedDeck.cards} />
      ) : (
        <StudySession cardsInDeck={selectedDeck.cards} />
      )}
    </div>
  );
}
