# Thinkful Capstone Project - Flashcard-o-Matic
#### A capstone project as part of Thinkful's Engineering Immersion.  

The assignment for this project is to create a web application using React.  This project tests our ability to manage state across various modules and routes,
as well as handle various CRUD requests.  
### / - Homepage



The homepage will display a list of all decks currently saved in the API, and the option to create a new deck.  Each deck listed will have the option to study, edit,
or delete that deck.

### /decks/:deckId - View a selected deck


When viewing a particular deck, the cards associated with the deck will be displayed.  Additionally, options to edit a deck, delete a deck, study a deck, and create a new card will be visible.  Each card will have the option to either delete or edit the card.

### /decks/new - Create a new deck


The same form component is used to create a deck and to edit a deck.

### /decks/:deckId/edit - Edit an existing deck


### /decks/:deckId/study - Do a study session of the selected deck



You flip through each card in the deck until you read the entire deck.  You are then prompted if you want to restart the session.  If no, you return to the home page.

You can only perform a study session if the deck has at least 3 cards.  If you do not, the application instead directs you to add more cards to the deck.


### /decks/:deckId/cards/new


The same form is used to both add a card and to edit a card.

### /decks/:deckId/cards/:cardId/edit



API is a data file run on localhost:5000, all API calls were prebuilt for this assignment.

## Rubric

* All tests are passing in Qualified.
* All the props are treated as read-only.
* State is never directly mutated; it's only updated via setState().
* The Edit Card and Create Card screens share the same form component.
* The useEffect() hooks have the appropriate dependencies listed in the dependency array.
* State is "lifted up" to the parent component where appropriate.
* All inputs are controlled. Generally, there is a warning on the console when you type into the input box and it changes from uncontrolled to controlled. The warning looks like this: "Warning: Input is changing an uncontrolled input of type <text|number|etc.> to be controlled." This is often the result of initializing the state to null or undefined.


## Technology
#### Built with:
  * React, utilizing useState, useEffect, useParams, useHistory, useRouteMatch, Router
  * Bootstrap
