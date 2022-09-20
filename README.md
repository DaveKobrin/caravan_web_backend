# caravan_web_backend
database access and API for full-stack MERN web app version of the card game from Fallout New Vegas

## THE GAME
- New to the game?
    - Create a user account

    - Collect playing cards to build your deck
        - Each new user will get a starter set of 54 cards
        - Buy more with the caps you will earn by winning
        - There are 6 sets of cards to collect.
        - You can own duplicate cards, but may not use them together in your deck

    - Build your deck
        - Your deck must contain at least 30 cards
        - You can have multiple cards of the same suit and value, but they must be of different sets
        - Click on the card face in the lower carousel to add it to your deck
        - Click on the card face in the upper carousel to remove it from your deck

    - Betting
        - One player will begin by placing a bet from their balance of caps
        - The next player can match or raise the bet from their own balance of caps
        - The game continues after the bet is matched

    - Starting to play
        - Each player draws 8 cards from their shuffled deck
        - The first 3 rounds are setting up the caravans by playing a number card from their hand into each caravan slot
            1. Dayglow
            2. Boneyard
            3. New Reno
            4. Redding
            5. The Hub
            6. Shady Sands
        - If you are have no number cards durring these moves you must discard and draw a new card until you can play a card
    
    - Normal turns
        - You can play a card from your hand, discard a card then draw another card to maintain a 5 card hand, or discard an entire caravan
        - Number cards add the face value *plus any modifiers* to the value of the caravan 
        - Caravans may be ascending or descending depending on the first 2 cards played on them
            - if the first 2 cards are 2 and 5 you can play a 6 or higher of any suit, but not a 5 or lower
            - if the first 2 cards are 9 and 6 you can play a 5 or lower of any suit, but not a 6 or higher
        - Caravans also have a suit which is set by the last number card or Queen played to it
            - You can play any number card of the active suit to the caravan *this does **not** change the direction of the caravan*
        - Face cards and Jokers have special effects and can be played on number cards in play
            - Jack - played on any number card - removes the target card and any modifiers played on it without otherwise affecting the caravan
            - Queen - played on the top number card of a caravan - reverses the direction of the caravan and changes the suit to match the queen
            - King - played on any number card - doubles the current value of that card this effect is stackable 
            - Joker - played on any number card - has different effects when played on an ace vs any other number
                - Played on an ace - removes all number cards of the same suit (and any modifiers on them) as the ace except for that ace
                - Played on any number 2 - 10 - removes all cards of the same number(and any modifiers on them) as the number except for that number card

    - Winning the game
        - The opposing players caravans pair up against each other to win the bid for that slot
            - Dayglow vs Boneyard
            - New Reno vs Redding
            - The Hub vs Shady Sands
        - Complete caravans have a value between 21 and 26
        - Caravans with a value less than 21 are "Under Burdened" and not complete
        - Caravans with a value more than 26 are "Over Burdened" and also not complete
        - Normal turns continue until all three pairs of caravans have a complete caravan and any ties are resolved **OR** a player has run out of cards in their draw pile
        - The winner is the player who has at least 2 of the higher value caravans or the player who still has cards in the draw pile

## Wireframes
> Wireframes with basic page layouts<br />
> Copy and paste or drag and drop your images here.
![building-deck-wireframe](https://user-images.githubusercontent.com/78385644/191106377-bcb55ed9-2351-46b3-bd05-3e61132306a9.png)
![building-deck-wireframe-try2](https://user-images.githubusercontent.com/78385644/191107568-98ec4b09-cef4-4c95-ad1c-c1aa98494146.png)

## Database Schema
user account
- **_id** *unique auto-generated*
- **name** *string*
- **gamertag** *string unique*
- **email** *string unique*
- **password** *string bcrypted*
- **friend list** *[user._id]*
- **balance of caps** *number( >= 0 )*
- **each users' total available cards** *[card._id]*
- **each users' active deck of cards** *[card._id(unique)(>=30 cards)]*

all cards in game (6 * 54 cards)
- **_id** *unique auto-generated*
- **value** *number (0-13(joker, ace - king))*
- **suit** *string*
- **isModifier** *bool*
- **face** *string (link to image src)*
- **back** *string (link to image src)*

## Routes
 | Action | Protocol | Endpoint | Description |
 |--------|----------|----------|-------------|
 | Create | POST | /user/register | add new user into database |
 | Read | GET | /cards/all-cards | return all card data |
 | Read | GET | /user | return complete user data |
 | Update | PUT | /user/:id | update user info |
 | Update | PUT | /user/deck/:id | remove and replace user deck |
 | Update | PUT | /user/friend/:id | remove and replace friends |
 | Destroy | DELETE | /user/:id | delete user account |


## User Stories
> User stories detailing app functionality<br />
> Add user stories following the _As a [type of user], I want [what the user wants], so that [what it helps accomplish]_ format.

  - As a USER I want to be able to create a new account
  - As a USER I want to build a deck to play with
  - As a USER I want my deck to be saved for my next play session
  - As a USER I want to be able to modify my user info
  - As a USER I want to be able to delete my user account
  - As a USER I want to have a gamer tag to share with my friends
  
  - As a USER I want to be able to play a game of Caravan
  - As a USER I want to be able to play against my friend over the web
  - As a USER I want to be able to get more cards in exchange for caps
  - As a USER I want to be able to get more caps by logging in every day
  - As a USER I want to be able to win caps by betting on a hand of Caravan

## MVP Goals
1. Databases
    - users - contain references to cards database (full CRUD)
    - allCards - database of 6 decks worth of unique cards
2. Create User
3. Create a Deck
4. Update Deck & user info
5. API - Express
 
## Stretch Goals
1. Implement full playable game turn based local
2. Change to be playable over web sockets
3. Implement caps system for betting
4. Implement daily login tracking and reward system
5. Implement buy single or small pack of more cards
6. Allow users to trade cards
