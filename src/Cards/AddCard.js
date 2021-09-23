import React, { useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import CardForm from "./CardForm";
import { readDeck } from "../utils/api";

export default function AddCard({ selectedDeck, setSelectedDeck }) {
  const { params } = useRouteMatch();
  const { deckId } = params;

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setSelectedDeck);
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
            Add Card
          </li>
        </ol>
      </nav>
      <h3>{selectedDeck.name}: Add Card</h3>
      <CardForm />
    </div>
  );
}
