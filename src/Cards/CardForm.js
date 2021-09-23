import React, { useState, useEffect } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { createCard, updateCard, readCard } from "../utils/api/index";

export default function CardForm() {
  const history = useHistory();
  const { path, params } = useRouteMatch();
  const { deckId, cardId } = params;

  const initialFormData = {
    front: "",
    back: "",
  };

  const abortController = new AbortController();
  const signal = abortController.signal;

  const [formData, setFormData] = useState({});

  useEffect(() => {
    cardId
      ? readCard(cardId, signal).then(setFormData)
      : setFormData({ ...initialFormData });
    return () => abortController.abort();
  }, [cardId]);

  const handleFormChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  return (
    <form
      onSubmit={() => {
        if (path === `/decks/${deckId}/cards/new`) {
          createCard(deckId, formData, signal).then(
            setFormData({ ...initialFormData })
          );
        } else {
          updateCard(formData).then(history.push(`/decks/${deckId}`));
          //setFormData({ ...initialFormData });
          //history.push(`/decks/${deckId}`).go(0);
        }
      }}
    >
      <div className="row mb-3">
        <div className="col-6 form-group">
          <label className="form-label" htmlFor="front">
            Front
          </label>
          <textarea
            className="form-control"
            id="front"
            name="front"
            value={formData.front}
            onChange={handleFormChange}
            placeholder="Front side of card"
            rows="2"
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-6 form-group">
          <label className="form-label" htmlFor="back">
            Back
          </label>
          <textarea
            className="form-control"
            id="back"
            name="back"
            value={formData.back}
            onChange={handleFormChange}
            placeholder="Back side of card"
            rows="2"
          />
        </div>
      </div>
      {path === "/decks/:deckId/cards/new" ? (
        <div>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setFormData({ ...initialFormData });
              history.push(`/decks/${deckId}`).go(0);
            }}
          >
            Done
          </button>
          <button className="btn btn-primary mx-2" type="submit">
            Save
          </button>
        </div>
      ) : (
        <div>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setFormData({ ...initialFormData });
              history.push(`/decks/${deckId}`);
            }}
          >
            Cancel
          </button>
          <button className="btn btn-primary mx-2" type="submit">
            Submit
          </button>
        </div>
      )}
    </form>
  );
}
