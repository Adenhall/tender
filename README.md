# Tender

For all of your dating needs

**Disclaimer** This is a project for fun only, no monetization allowed (Not now at least)

### Tech stack

This frontend part of the project uses the React.js with Typescript. Other than that, we have:

- Redux Thunk (For state management)
- Material UI (For the Google's fancy UI components)
- React spring (For making bouncy animations)
- Next.js (I'll think about it)

### Start developing by making changes to these files in `src`

```
|--api (Holds the API callers and methods)
|
|--components (Stores all the components that can be reused throughout the app)
|
|--contexts (Using React context to globally provide effects and states to the app)
|
|--hoc (Refer to this doc: https://reactjs.org/docs/higher-order-components.html)
|
|--pages (Holds the main components of every page defined in App.tsx)
|
|--types (Exports all the types for Typescript)
|
|--App.tsx (The top order component that defines the routes and pages)

```
Folders | Guide
--------|-------
`api`|In here you declare the methods to do API requests which return responses.<br/> Export the methods so developers can import them from another file to request<br /> the API without having to write up a long sequence of code, again.<br /><br /> **For example**: files `auth.ts` and `user.ts` have names representing the API<br /> endpoint `/auth/**` and `/user/**`. Having being named like this, developers<br/> will locate the method they need to use faster. Developers can import<br/> `loginWithUsername` in their working file to request that specific API
`components`|You should store your components in the same `pages` subfolder that you're<br /> working on. But if there is, for example, an input field that may be used again<br/> somewhere in the app, create and export it from this folder
`contexts`|This folder holds the context and its provider which can be imported to wrap <br/>around the component you wish to provide the context<br/><br/> **For example**: The `AuthContext.tsx` stores the authentication logic that exports<br/>`<AuthProvider>` to wrap around the `<App>` in `index.tsx` in order to provide all<br/>of the authentication effects to the app
`hoc`|This folder contains React HOCs which can be used to create Layout for the app
`pages`|These components are the entry points for the pages and routes defined in `App.tsx`<br/>
`types`| Type definitions for working with Typescript

### How to start locally
- Create an .env file at root following .env.template (Skip this one if you're running BE locally)
- Do `yarn install`
- Do `yarn start`

### QA, test account
- username: 'adenhall'
- password: '123'

### To do
- Add distance meter between users
- Sessions and token storage
- Full matchmaking
