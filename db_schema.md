### Database Schema
user account
- **_id** *unique auto-generated*
- **name** *string*
- **email** *string unique*
- **password** *string bcrypted*
- **friend list** *[user._id]*
- **balance of caps** *number( >= 0 )*
- **each users' total available cards** *[card._id]*
- **each users' active deck of cards** *[card._id(unique)(>=30 cards)]*

all cards in game (6 * 54 cards)
- **_id** *unique auto-generated*
- **value** *number (1-13)*
- **isModifier** *bool*
- **face** *string (link to image src)*
- **back** *string (link to image src)*



### Routes
 | Action | Protocol | Endpoint | Description |
 |--------|----------|----------|-------------|
 | Create | POST | /user/register | add new user into database |
 | Read | GET | /cards/all-cards | return all card data |
 | Read | GET | /user | return complete user data |
 | Update | PUT | /user/:id | update user info |
 | Update | PUT | /user/deck/:id | remove and replace user deck |
 | Update | PUT | /user/friend/:id | remove and replace friends |
 | Destroy | DELETE | /user/:id | delete user account |


will need to track 
  In an active game react side 
  - each users' active deck
  - each users' current cards in hand
  - each users' draw pile
  - balance of caps in the pot




 a way to get more cards into the users total available cards

 a way to get more caps 
 