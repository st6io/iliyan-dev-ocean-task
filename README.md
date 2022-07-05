# DevOcean React Task

Production deployment at https://iliyan-dev-ocean-task.pages.dev

The goal of this task is to create a very basic business directory.

## Requirements:

- The following API will be used to retrieve the data:
  https://feinterviewtask.azurewebsites.net/b/6231abada703bb67492d2b8f
- Design is available using the following link: https://zpl.io/scene/a8elJGQ
  You are to attempt to match each view as closely as possible to the provided designs
- The Application will have 2 views. The list view will include a list of businesses, with the business name and description. By clicking any business in this list, the user will be taken to an Item view which will display more information about the selected business
- Each view must have its own URL/route
- The list view must contain the following information
  - Business Name
  - Business Description
- The Item view must contain the following information
  - Business address
  - Business contact information, including name and phone number
  - Nearby Places: a list of other businesses with the same city as the selected business
- The image used in the item view is provided in the same HTTP call as the rest of the business information

### Nice to Haves:

- Handling edge cases is a bonus
- The front-end technology stack at Moody’s includes state management libraries and Typescript. It is therefore highly recommended that you use a state management library of your choice (React-query, Apollo, etc.) to manage the application state in this task.
- It would also be good to demonstrate any proficiency with Typescript you already have.

## Development

### `yarn start`

Runs the app in the development mode with hot-reload.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.
The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
