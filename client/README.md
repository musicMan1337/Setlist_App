<!--
*** I'm using markdown "reference style" links for readability.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/thinkful-ei-rabbit/Cap1_Server_Derek_Nellis">
    <img src="images/8bit_mammoth_logo.png" alt="Logo" width="100" height="100">
  </a>

  <h3 align="center">Thinkful Capstone 1 - Client</h3>

  <p align="center">
    Client side React-app of the fullstack capstone
    <br />
    <a href="https://github.com/thinkful-ei-rabbit/Cap1_Server_Derek_Nellis"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/thinkful-ei-rabbit/Cap1_Server_Derek_Nellis/issues">Report Bug</a>
    ·
    <a href="https://github.com/thinkful-ei-rabbit/Cap1_Server_Derek_Nellis/issues">Request Feature?</a>
  </p>
</p>

---

<h1 align="center"><a href="https://setlist-app.vercel.app">Set List App</a></h1>

> ---
>
> _This will be a comprehensive README for the sake of both prospective employers and fellow cohort peers, and whomever else would be interested in some of the techniques I've learned creating my frist Fullstack application. As a bonus, this README has some interesting implementations, though I won't address them here. Enjoy!_
>
> ---

---

###### This README will systematically go over the entire app from the top level to the bottom layer, so I'll provide links to various sections for convenience.

# TODO - ADD DIRECTORY LINKS!

---

# Typescript:

## tsconfig.tsxon:

Not much to it here - I opted for '`strict`' mode and '`ESNext`' - don't forget to add `'DOM'` to lib!

I wanted to utilize path aliases, but React doesn't support the `"paths"` option. That said, you can still "alias" the root directory { `"baseUrl": "."` } which will make any import url without ' ./ ' default to the root folder, allowing you to import like this:

```ts
import { Header } from 'src/components';
```

> _This style of destructured import uses "Barrel" exporting, covered at the bottom of the "src:" section of the README!_

## styles.d.tsx:

As a whole, I prefer using namespaces for typing. Because I only needed minimal custom typing, I decided to use the 'Types' namespace to also hold the component 'Props' types. The naming convention I prefer is [ComponentName]Props:

```ts
type HeaderProps = {};
type LoginFormProps = {};
```

I feel this is a good naming convention that prevents confusion as the app grows. Also, there are some other 'namespaced' types used within 'Types' - essentially I approached the typing by funnelling namespaces into a centralized '.d.tsx' that's _actually_ utilized throughout the app.

## constants.d.tsx

While technically redundant, I decided to use 'constants' in the app to prevent typos and overall make the client more tight-knit. I actually use this namespace in '`.../types.d.tsx`' as well as '`.../constants.tsx`' (which iscovered briefly in the 'src:' section below)

## context.d.tsx

Since the context hook is the only place where I need the types, **and** all those types would clutter the actual '`.../context.tsx`', **and** I may want to create more context files, I decided to break these out into their own namespace! Basically, they're types for objects fetched from the Database.

## src/hooks/useFormatState.tsx

This is the only place where I made a conscious decision the declare types in a .tsx file. Here's why:

- All of the types declared here only make sense within the context of the custom hook itself.
- Having the types here helps bring context and comprehension to how the hook actually works (for fresh-eyes or returning to it after an extended time).
  > _The exported types are used in their respective forms. More explanation on how this hook works can be found in the 'Forms' section!_

## React.FC<>
I only put this here because there's been some debate on the built-in React type. TL;DR you only **need** to use this on props that will accept *children* in their return. Here's an example within this app:
```tsx
// ...components/utils.tsx
export const Button: FC<Types.ButtonProps> = ({...}) => (
  <button
    type={type}
    className={['button', className].join(' ')}
    {...children}
  />
);

// ...components/header.tsx
const Header = ({ userName, logout }: Types.HeaderProps) => {
  ...
  return (
    <header className="main-header">
      <nav className="nav-bar">
        {userName ? renderNav : <Link to="/login">Login</Link>}
      </nav>

      <Link to="/">
        <h1 className="headline">SET-LIST APP</h1>
      </Link>
    </header>
  );
}
```
The main takeaway should be that the 'FC' type isn't needed if there won't be rendered child elements ***passed via props***. Though it won't break the typing just throwing it onto every component, consider that the typing will technically be misleading/incorrect, which somewhat dismisses the whole point of using Typescript in the first place 😎

---

## public

The Public folder is nothing special, besides the custom favicon and (as I'll note later) some imported CDNs in the head of index.html for a few Google Fonts.

_As an aside, it's actually faster (from a runtime perspective) to import fonts via CDNs, as apposed to importing them directly into stylesheets_

---

# src:

## config.tsx, index.ts, and setupTests.tsx

**[ config.tsx ]** - this is essentially where I store "environment" variables. One important thing to know is that React has a built-in `NODE_ENV` variable that is set automatically when running scripts:

1. Run **Start**: `NODE_ENV = developement`
1. Run **Build**: `NODE_ENV = production`
   > Knowing this, you can take advantage and set up conditionals based on the already-available `NODE_ENV`. A major advantage is setting up API urls. When exporting like this...
   >
   > ```javascript
   > export default { ...config };
   > ```
   >
   > ... you can access variables like this...
   >
   > ```javascript
   > import config from '.../config.tsx';
   > ...
   >   await fetch(config.API_ENDPOINT)
   > ```
   >
   > **[ index.ts ]** - bog-standard React App-wrapper using BrowserRouter
   > **[ setupTests.tsx ]** - configuration for Enzyme testing

---

## styles:

Fairly straight-forward Sass setup, with a simple reset and global stylesheet imported into the root index file. I won't get into Sass here, but know that I broke-out individual mixins to be used as imports in isolated **[ .scss ]** files

---

###### _I'll briefly cover some global-level stuff before breaking down the App itself_

### jsconfig.tsx:

This is actually at the root level, but it's use is important in understanding the syntax used throughout the app. I won't go too in-depth, but essentially what's goig on is it's creating a global alias for the **[ src/ ]** file directory. The side effect is you can re-factor local imports:

```javascript
// sgList.tsx
import { PostService } from '../../../../../src/services';
...to...
import { PostService } from 'src/services';
```

### constants:

Not strictly necessary, but this can help prevent typos, along with making changes to the database less tedious to update throughout the app.

### services:

This is where the logic for interfacing with the server lives. Each "method" has been broken-out into it's own file. [ token.service.tsx ] is for handling Auth-token processes.

### hooks:

This is where I keep custom hooks used by multiple components, though I only needed 1 for now. This hook handles every form in the app, recieving and updating piped-in form-fields. The major benefit of this kind of hook is that it minimizes the use of `useState` hooks throughout the app.

### context:

Because the scale of this app is so small, I've only created a single context. This is the "hook" way of doing context, both creating the context...

```javascript
export const DatabaseContext = createContext();
```

...and provider...

```jsx
<DatabaseContext.Provider value={value}>
  {props.children}
</DatabaseContext.Provider>
```

...in the same file. To use, you import the provider at the top level...

```jsx
import DatabaseContextProvider from '.../databaseContext';
...
<DatabaseContextProvider>
  (...insert components here!)
</DatabaseContextProvider>
```

...then invoke inside a component and _just use it_:

```jsx
import { useContext } from 'react';
import { DatabaseContext } from '.../databaseContext';
...
const { data, functions, andMore } = useContext(DatabaseContext);
```

### Barrels...

You may have already noticed that there are actually many [ index.ts ] files peppered throughout the app. These are known as "barrel" exports, and have a few advantages when dealing with a complex file-directory. The index file in the [ components ] folder has a short explanation, but I'll also put it here:

```javascript
/*
|------------------------------------------------------
| BARREL EXPORT FILE
|------------------------------------------------------
| How-To barrel-export components:
| export { default as Comp1 } from './comp1/comp1.tsx' (omit .tsx)
|
| Why? Readability and (to an extent) testing:
| import { Comp1, Comp2, Comp3, Comp4 } from './components'
| import { Route1, Route2, Route3, Route4 } from './routes'
*/
export { default as LoginForm } from './loginForm/loginForm'
export { default as Header } from './header/header'
etc...
```

You can see this in action in **[ app.tsx ]**:

```javascript
import { LoginPage, HomePage, SongsPage, SetsPage, GigsPage } from 'src/routes';
```

> _Note that the import doesn't point to the index file. Node perceives **[ index.ts ]** files as points of entry and the default file to grab exports from, essentially making it an implicit file in import statements_

---

## app:

**State**: `userName` is passed down to context and the Header, working as a boolean switch to control the behavior of the app. "If there isn't a name, don't display nav-bar links". This state is also controlled by both...

**useEffect**: Basic "on mount" fetcher that checks local storage for an auth token, improving UX

**Helper Functions**: `handleLoginSuccess` and `handleLogout` do what you'd expect by the name. Once a name is set to _State_, this fires off the context provider to proceed with fetching data from the server and sending the user to the home page.

---

## routes:

There's not much to say here, these essentially just import and render components, acting as entry points to component trees. However, I'll briefly cover...

#### utils:

**1. Private/Public-Routes**: This serves as a UX enhancement, both preventing users not logged in from accessing the app, and already logged in users from accessing the Login page.
**1. PageNotFound**: Standard inclusion, and in the case of this version, you can access this page vie the "Gigs" page as this is a feature not yet implemented.

#### Login Page:

- _Users are sent here by default if no auth-token is saved in memory_

<div align="center">
  <img src="images/login-page.png" alt="Logo" width="300">
</div>

#### Home Page:

- _Basic forms to create songs and sets_

<div align="center">
  <img src="images/home-page.png" alt="Logo" width="400">
</div>

#### Songs Page:

- _View and delete created songs_

<div align="center">
  <img src="images/songs-page.png" alt="Logo" width="400">
</div>

#### Sets Page:

- _View and delete created sets, and assign songs to sets_

<div align="center">
	<img src="images/sets-page.png" alt="Logo" width="400">
</div>

---

## components:

###### _I won't cover every component individually, but take a more broad-stroke approach, mentioning any note-worthy features when necessary_

##### Dynamic Rendering:

I tried to make as many shareable components as possible, and because of this, there were inevitable points where I'd need to render the same html only with different naming conventions per-route. This is the basic approach:

```javascript
const submitButtons = ['Login', 'Register'].map((subType) => (
  <Button
    key={subType}
    type="submit"
    value={subType}
    onClick={changeHandler('submitType')}
    disabled={!activeSubmit}
  >
    {subType}
  </Button>
));
...
return (
  <form>
    (...form stuff here)
    {submitButtons}
  </form>
)
```

Another approach with shared components is conditional rendering:

```javascript
const renderListItems = listTable.map((item) => {
  if (buttonText.includes('Set')) {
    return (...html here)
  }
  (...more conditionals here)
}
...
return <ul>{renderListItems}</ul>;
```

Lastly, conditional rendering based on state:

```javascript
const renderNav = (...html here)
...
return (
  <nav className="nav-bar">
    {userName ? renderNav : <Link to="/login">Login</Link>}
  </nav>
)
```

##### Forms:

As stated earlier, all forms use the custom hook `useFormState` to dynamically update form fields, then pass that state into `handleSubmit()` functions. One thing to note regarding this, normally when using `onChange` on an input, you would pass a function:

```javascript
  onChange={() => changeHandler(e.target.value)}
```

However, when using a function imported from a custom hook (ie it's scope is outside of the component from where it's invoked), you can simply pass the function outright:

```jsx
const { formFields, changeHandler } = useFormState({user_name: ''}
...
<input
  value={formFields.user_name}
  onChange={changeHandler('user_name)}
/>
```

> _Note that the value implementation is specific to this custom hook, but the principle remains the same_

##### PropTypes:

I decided to use PropType validation throughout, and would say that I'm glad I did. PropTypes can really help with early debugging by throwing errors in the console that you wouldn't have caught normally until much later testing. On such example would be if you had a required prop that was, say, a function, if it wasn't properly passed down (by parents, context, conditionals, etc...), then the console would ask why your required function is "undefined", even when you haven't iomplemented said function yet.

##### utils:

I only needed 2 utility components:
**1. HR**: My css reset makes the vanilla tag do odd things
**2. Button**: Basic button styling, with a dynamic `type`, `value`, and the ability to add additional classes

---

## <!-- CONTACT -->

## Contact

#### Github - [musicMan1337][github]

#### LinkedIn - [Derek-8Bit-Nellis][linkedin]

#### Facebook - [Derek Nellis][facebook]

#### Instagram - [@derek.8bit.nellis][instagram]

<!-- MARKDOWN LINKS & IMAGES -->

<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/thinkful-ei-rabbit/Cap1_Server_Derek_Nellis.svg?style=flat-square
[contributors-url]: https://github.com/thinkful-ei-rabbit/Cap1_Server_Derek_Nellis/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/thinkful-ei-rabbit/Cap1_Server_Derek_Nellis.svg?style=flat-square
[forks-url]: https://github.com/thinkful-ei-rabbit/Cap1_Server_Derek_Nellis/network/members
[stars-shield]: https://img.shields.io/github/stars/thinkful-ei-rabbit/Cap1_Server_Derek_Nellis.svg?style=flat-square
[stars-url]: https://github.com/thinkful-ei-rabbit/Cap1_Server_Derek_Nellis/stargazers
[issues-shield]: https://img.shields.io/github/issues/thinkful-ei-rabbit/Cap1_Server_Derek_Nellis.svg?style=flat-square
[issues-url]: https://github.com/thinkful-ei-rabbit/Cap1_Server_Derek_Nellis/issues
[license-shield]: https://img.shields.io/github/license/thinkful-ei-rabbit/Cap1_Server_Derek_Nellis.svg?style=flat-square
[license-url]: https://github.com/thinkful-ei-rabbit/Cap1_Server_Derek_Nellis/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: www.linkedin.com/in/derek-8bit-nellis
[product-screenshot]: images/p10k.png

<!-- project links -->

[p10k]: https://github.com/romkatv/powerlevel10k
[hdoc-guide]: https://tldp.org/LDP/abs/html/here-docs.html
[aliases]: https://github.com/thinkful-ei-rabbit/Cap1_Server_Derek_Nellis/blob/master/ubuntu_zsh_scripts/aliases.zsh

<!-- links to social media accounts -->

[twitter]: http://www.twitter.com/userName
[facebook]: http://www.facebook.com/derek.nellis.9
[googleplus]: https://plus.google.com/+userName
[tumblr]: http://userName.tumblr.com
[dribble]: http://dribbble.com/userName
[linkedin]: https://www.linkedin.com/in/derek-8bit-nellis/
[github]: http://www.github.com/musicMan1337
[instagram]: https://www.instagram.com/derek.8bit.nellis/?hl=en
