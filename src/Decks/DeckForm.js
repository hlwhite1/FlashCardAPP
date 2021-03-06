import React, { useState, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { createDeck, updateDeck, readDeck } from "../utils/api/index";

export default function DeckForm({ handleCancel }) {
  const history = useHistory();
  const { path, params } = useRouteMatch();
  const { deckId } = params;

  const initialFormData = {
    name: "",
    description: "",
  };

  const [formData, setFormData] = useState({ ...initialFormData });

  const abortController = new AbortController();
  const signal = abortController.signal;

  useEffect(() => {
    deckId
      ? readDeck(deckId, signal).then(setFormData)
      : setFormData({ ...initialFormData });
  }, [deckId]);

  const handleFormChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async () => {
    path === "/decks/new"
      ? await createDeck(formData, signal)
      : await updateDeck(formData, signal);
  };

  return (
    <form
      onSubmit={() => {
        if (path === "/decks/new") {
          handleSubmit();
          setFormData({ ...initialFormData });
          history.push("/").go(0);
        } else {
          handleSubmit();
          setFormData({ ...initialFormData });
          history.push(`/decks/${deckId}`).go(0);
        }
      }}
    >
      <div className="row mb-3">
        <div className="col-6 form-group">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input
            className="form-control"
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleFormChange}
            placeholder="Deck Name"
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-6 form-group">
          <label className="form-label" htmlFor="description">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            placeholder="Brief description of the deck"
          />
        </div>
      </div>
      <div>
        <button
          className="btn btn-secondary"
          onClick={() => {
            handleCancel();
            setFormData({ ...initialFormData });
          }}
        >
          Cancel
        </button>
        <button className="btn btn-primary mx-2" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}
