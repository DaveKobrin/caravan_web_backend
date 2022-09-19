# caravan_web_backend
database access and API for full-stack MERN web app version of the card game from Fallout New Vegas


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
