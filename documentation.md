# CreditCardDB Documentation
Read the README.md for Project Description

## Packages / Setup
This Project uses the following Packages: 
- Node.js / npm `$ npm install`
- SvelteKit `$ npm create svelte@latest "app-name"`
- TypeScript 
- Firebase (Database, User Authentication, Cloud Storage) `$ npm install firebase`
- Tailwind (Frontend Styling) `$ npm install -D tailwindcss`

Others necessary packages will be automatically installed with the installation of these.

Make sure the `kit{}` object in `svelte.config.js` contains the following: 
- `alias: {'components': './src/components/',}` 
        
# $lib/
- fields.ts: Used as a template for credit card objects to Update and Display. Also includes lists for <Select> drop down menus. 
- functions.ts: Any functions that may need broad access.
- index.js: Unused main javascript file
- state.svelte.ts: Contains user state context functions
- stores.ts: Contains the initialization functions for svelte stores.
- types.ts: Contains typescript types for common reoccuring custom types.
- database/
- - authentication.ts: functions for firebase authentication
- - firebase.ts: functions for initializing firebase
- - read.ts: functions to read from the firebase database
- - write.ts: functions to write to the firebase database 

# routes/
- +error.svelte: Top level error landing page. Will display for any error on the website, unless there is a closer to error +error.svelte page
- +layout.server.ts: Runs scripts on the server before browser. Contains load function to be accessed by ANY page, unless theres a closer +layout.server.ts page.
- +layout.svelte: Layout for entire website
- +page.svelte: Homepage / Index page. Any directory under routes/ with its own +page.svelte will replace it if in directory.
- +page.ts: Script to run before +page.svelte mounts. 


## Update.svelte + fields.ts 
Update.svelte - `src/routes/contribute/update/[slug]/`
fields.ts - `src/lib/fields.ts`
Update.svelte and its components use the data from fields.ts for directions on how to display the information.

When updating a card, the information is added to a svelte store, "newCard" then upon submission, the data from newCard is sent to the database. 
There are many types of components to display different types of data, so here is how each one is used.

Basic Inputs: 

- ColorInput: Displays a color. User selects a color, which the browser sets as hex, then we convert to an RGB array [red, blue, green].
- RadioInput: Displays a radio button menu. User can select any but only one. 
- SelectInput: Very similar to a radio, but a drop-down menu appears. 
- TextInput: Displays a box for users to input text. 
- UploadInput: Displays an upload box for users to upload images.
- NumberInput: Displays a box for users to input numbers.

Layered Inputs: (Use Basic Inputs for data, but display different.)

- DynamicInput: Lets user build a scalable object of inputed data from Basic Inputs.
- ObjectInput: Displays a container of multiple types of Basic inputs for similar information inputs.
- ListInput: Lets user build a scalable array of inputed data from Basic Inputs.

Common variables: **Specific Cases Can alter typical assignment** 
- value: the value of the data stored in the database. 
- field: a string of a field in fields.ts or an object in fields.ts, and the database field or field in an object in the database - to determine how the value is used and set.
- object: the object storing the information 
- objectField: the name of the object which the field is inside. If the field is not in an object, object is undefined
- dynamicObject - an object storing just strings 
- list: the array which the data is read from / set to. The field of the Basic Input will be an index of the list. 
- const defaultValue - stores the original value from the database
- dataField: fields.ts exports dataField as an object. 

## Submissions
- When a user is not an admin or in admin mode, adding a card, adding a bank, or sending an update will be sent to the submisisons colleciton in firebase.
- Admins will then be able to read through the submission and approve the data. The submission will add the following data a new item in the submissions collection: 
  - `obj:` // the object to be reviewed. This may be a new card, new bank, or an update
  - `display: true,` // always set to true, this is what lets admins see the submission in the app. Once an admin deletes the submisssion, this will set to false.
  - `id:` // the id of the object. New cards and banks should have a new id, while updates will have the id of the card
  - `time: Date.now()` // the time the submission is created
  - `type: SubmissionType.x` // this helps the admin select which data to review. Updates can't exist without a card, and cards can't exist without a bank.
  - `user: $user.uid` // the id of the user who submitted.

- the following is an optional paramater: 
  - `image:` // a file containing a new image

- CreditCards in the database store a *boolean* in `image`. If *true*, then the file path to the image is based off the card's id. 
- CreditCards during an update store a *File* in `image`. If the file is valid, then `submission.image` will store the file and properly upload it, while `card.image` returns to a *true*. 
- CreditCard updates viewed from a submission modify `image` to a string *"pending"*. This lets the card know that there exists an image that is valid, but don't display it unless in update from submission.

