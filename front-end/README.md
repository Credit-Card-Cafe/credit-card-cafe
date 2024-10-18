# CreditCardDB
A easy-to-use collection of all available information about every Credit Card offered to the United States of America financial market. 

## Credit Cards
Each Credit Card Page displays available information to the user. 
- All the appropriate fields a card may have will be stored in one file, currently src/lib/fields.ts
- Cards may have modifiers which will allow specific fields to change values
- Cards may have custom rewards. Users may select [however many the card allows] reward(s) to view the rewards in the card page and user page

## User Page / Account Page / My Cards
View all the cards in your wallet, cards you are tracking, and potentially other necessary information about your account. 

## Search
Easily search through our database of Credit Cards. Search paramaters include Name, Bank, Brand, Bank Nick-Name, etc... 
Click on a card to view information and get the application link. 

## Add / Update (User Only)
See something wrong or hear something new? Submit a new card, bank, or an update to add to the database.
- Users without admin privledges will only be able to submit to the "Submissions" collection in firebase. From there, users with Admin privledges can open their "Submissions" tab in the website and see present and new submissions, where they can approve or reject the submissions. On approval, the submission will become valid data to add to the correct respective database.

## Wallet + Tracking (Wallet for Users Only)
Track information about your Credit Cards, get notified when any update occurs to your cards.
- Users have the option, under the credit card, to add cards to their wallet, or track cards. When you track or add a card to your wallet, any major to the card, or Selected Updates* will issue a notification to your account, or an email, explaining the changes.
  - [Potential Feature] *Selected upates will include All updates, Sign up Bonus updates, Card basic information updates, Card Reward upates, card bonus / bonus credit updates, etc...
### Wallet 
- The Primary purpose of the wallet is for reccomendations and reccomending to users.
- This means, If many users have cards A, B, and C in their wallet, and you have cards A and B, the website will reccomend that others users with your wallet also have card C.
- This will be helpful for users looking to apply to new cards.
- We will field the user with questions regarding their experience applying and reasons. Will have an "exit interview" if they remove the card from the wallet. This may prevent excessive usage of adding cards to wallet. 
### Tracking
- Tracking is simply to store cards you feel interested in, for whatever reason the user deems worthy. If you simply want to recieve udpates, if you are waiting for a sign up bonus to increase, if you are thinking of applying to some cards, or if you want to make a mock-wallet, are all good reasons to track cards.
- As of now, it has not been determined whether or not is is useful to reccomend cards to users based off cards they are tracking.
- Will highlight overlaping reward categories, for both other cards in tracking, and your cards in wallet. 

## Table 
The information from cards in Tracking, and cards in Wallet for Users, will be displayed in a table. This information will include all information cruicial to the card. 
- There will be a switch to view cards from only Tracking, cards from only Wallet, or both.
- adding the collection name to the url (eg. /table/my-collection-name) will show the cards in that collection, and will remove the Tracking/Wallet view switch 
 
## Modifiers 
Some cards may have special customer / relation bonuses that improve the card's details. Mostly bonus cash-back, but other cases include waiving annual fee. 
- Report on the Card's page "This card has modifiers" 
- Select the modifier from the bank or brand that issues the relation bonus 
- Will update all instances of the card [Tables, Wallet / Tracking View, Card Page]

## Banks / Brand
Finding the landing page for a Bank / Brand is easy, search for the bank / brand in the search bar, or click on the hyperlink to a bank / brand from a Credit Card's info page. In the bank / brand landing page there will be a short information paragraph about the bank / brand, then a list of every card that the bank / brand offers. 
### Banks 
- Users will have the ability to rate each bank on a scale from 1-5 based on factors such as:
  - "Ease of Use"
  - "Customer Service"
- The Bank landing page will also feature typical rules / tendencies about the bank. These rules will often feature but not limited to information about applications, such as:
  - How many cards you can apply for within a given time frame
  - Can you apply for the same card twice?
  - Can you upgrade / downgrade cards easily?
  - Does this bank require membership?
  - Does this bank offer global bonuses for credit cards?
### Brands
- Brands will look similar to the Bank page. Brands will contain all the 

## Submissions 
For users with autorization. Read "Add / Update (User Only)" [Unnecessary Feature]

## Login 
All users will be able to log in / sign up using the following: 
- Google
- Apple
- Email / Password 

# Phase Two Additions

## Data Points
Read charts and graphs generated by user's submitted information to determine and estimate variable information on credit cards. 

## Recommended Cards 
For users who are logged in an have cards in their wallet, we will recommend cards to them based on other cards that users have who also have the same cards. 

## Error Reporting 
Users who are logged in may report a card, bank, or brand for data inaccuracy. These reports will be collected and viewed by admins who may manually determine if the report needs to be fixed.  

## Credit Card Rating
Users who are logged in may rate a credit card out of 5 stars. This rating will be seen by all users.