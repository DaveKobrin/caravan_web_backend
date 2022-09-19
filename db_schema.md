will need to track 
### Database Schema
user account
- _id _unique auto-generated_
- name _string_
- email _string unique_
- password _string bcrypted_
- friend list _[user._id]_
- balance of caps _number( >= 0 )_
- each users' total available cards _[card._id]_
- each users' active deck of cards _[card._id(unique)(>=30 cards)]_

all cards in game (6 * 54 cards)
- _id _unique auto-generated_
- value _number (1-13)_
- isModifier _bool_
- face _string (link to image src)_
- back _string (link to image src)_



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


  In an active game react side 
  - each users' active deck
  - each users' current cards in hand
  - each users' draw pile
  - balance of caps in the pot




 a way to get more cards into the users total available cards

 a way to get more caps 