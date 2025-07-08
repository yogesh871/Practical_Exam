# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


Blog App Project Outline Instruction/Text linked with this question​



Reference Link: https://www.blogtyrant.com/wp-content/uploads/2016/06/bestof.png



1. Project Setup​- Set up a new React project using Create React App.​- Install required dependencies: react-router-dom, redux, react-redux, redux-thunk, @ Bootstrap i/core, json-server, etc.​

2. Component Structure- Create the necessary components:- PostList- PostForm- PostDetails- PrivateRoute- Navbar- Implement the basic component structure for the blog app.

3. Redux Setup (5 points)- Set up the Redux store with actions, reducers, and thunks.- Define actions for fetching, adding, updating, and deleting blog posts.- Implement thunks for asynchronous operations.


4. JSON Server Setup (5 points)- Set up a JSON Server to act as a backend for storing blog post data.- Create a db.json file to store initial post data.- Define routes for CRUD operations (e.g., /posts).


5. Fetching and Displaying Posts (5 points)- Implement the fetchPosts function in the PostList component.- Display posts dynamically using the PostDetails component.- Connect the PostList component to the Redux store to fetch post data from the server.


6. Adding Posts (5 points)- Implement the addPost function in the PostForm component.- Validate that the post title and content are provided before adding a post.- Dispatch a Redux action and thunk to add the post to the server and store.

(TItle, description, date, image, category)


7. Updating Posts (5 points)- Develop the updatePost function in the PostDetails component to allow users to edit existing posts.- Identify a unique identifier for each post to ensure accurate updating.- Dispatch a Redux action and thunk to update the post on the server and in the store.


8. Deleting Posts (5 points)- Implement the deletePost function in the PostDetails component to allow users to remove posts.- Dispatch a Redux action and thunk to delete the post from the server and store.


9. Sorting and Filtering (10 points)- Implement sorting feature by date or popularity in the PostList component.- Implement filtering feature by category or author in the PostList component.


10. User Authentication (5 points)- Implement a simple user authentication mechanism.- Allow users to sign in to create, edit, and delete their own posts.- Restrict access to post-related operations based on user authentication status.


11. Navbar- Create a Navbar component to provide navigation within the application.- Include links to the post list, post form, user profile, and a sign-out option (if applicable).- Ensure the Navbar is responsive and visually appealing.


12. Bootstrap I Styling (5 points)- Utilize Bootstrap I components for a modern and clean UI.- Apply styling and theming to enhance the overall look and feel of the application.