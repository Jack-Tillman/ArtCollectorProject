import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// These imports won't work until you fix ./components/index.js
import {
  Feature,
  Loading,
  Preview,
  Search,
  Title
} from './components'; 
// Kaleb commented line 4-12 out
//Jack uncommented line 6 and 9 out - 05/27/23
//uncomment out the above import statements as we finish each component, as well as the actual components themselves rendered down below

const App = () => {
  /**
   * We are at the App level component, which is top-most. Any state which needs to be shared between immediate children should
   * be made here, so create state pairs using useState() for:
   * 
   * searchResults, setSearchResults (default should be this object:  {info: {}, records: []} )
   * featuredResult, setFeaturedResult (default should be null)
   * isLoading, setIsLoading (default should be false)
   */
  
  
  /* 5/28 Kaleb: I think these are declared correctly. Search Results and isLoading are being used and funtioning...
  setSearchResults, setFeaturedResult, and setIsLoading are "declared but value is never read" VSCode actually recognizes 
  these are functions up until this point.
  
  If the problem is here this may be useful to troubleshoot;
  What is not a function error in react?
  The React. js "Uncaught TypeError: X is not a function" occurs when we try to call a value that is not a function
  as a function, e.g. calling the props object instead of a function. To solve the error, console. log the value you
  are calling and make sure it is a function.*/

  const [ searchResults, setSearchResults ] = useState({info:{}, records:[]});
  const [ featuredResult, setFeaturedResult ] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // console.log(setIsLoading);
 
  return (<div className="app">

    <Title /> 
    <Search 

   /* 5/28 Kaleb: Bug fixed! I realized we were passing down boolean values instead of the actual functions. We were setting setIsLoading
   and setSearchResults to the state and not the funciton that updates the state */

    setIsLoading={setIsLoading} 
    setSearchResults={setSearchResults}
     />
    {/* Commented out by Jack on 05/27/23 to prevent errors. Uncommented out when we finish these components
    <Preview searchResults={searchResults} setIsLoading={isLoading} setSearchResults={searchResults} setFeaturedResult={featuredResult}/>
    <Feature featuredResult={featuredResult} setIsLoading={isLoading} setSearchResults={searchResults} /> */}

    <Loading isLoading={isLoading} />
 
    <Preview
    searchResults={searchResults} 
    setIsLoading={setIsLoading}
    setSearchResults={setSearchResults} 
    setFeaturedResult={setFeaturedResult}
    />

    {/* <Title /> is static, doesn't need any props*/
    /*{/* <Search /> needs props for setIsLoading and setSearchResults (trigger <Loading /> on search start/end, and transfer results to preview) */} 
    {/* <Search />
    {/* <Preview /> needs props for searchResults, setIsLoading and setSearchResults (clicking prev/next buttons), and setFeaturedResult (clicking a preview) */}
    
    {/* <Feature /> needs props for featuredResult, as well as setIsLoading and setSearchResults (clicking on searchable properties) */}
    {/* <Feature /> */}
    {/* <Loading />  */}
    {/* is static, but should only render when isLoading is true */}
    {/* <Loading /> use a ternary and render null if isLoading is false */}

  </div>)
}

/**
 * Boostrap the <App /> component into the '#app' element in the DOM,
 * using ReactDOM.render();
 */

ReactDOM.render(
  <App />,
  document.getElementById('app')
  );

