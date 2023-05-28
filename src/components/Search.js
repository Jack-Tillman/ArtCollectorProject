import React, { useEffect, useState } from 'react';


/**
 * Don't touch these imports!
 */
import { 
  fetchAllCenturies,
  fetchAllClassifications,
  fetchQueryResults
} from '../api';

const Search = (props) => {
  // Make sure to destructure setIsLoading and setSearchResults from the props
  // const [inputValue, setInputValue] = useState();

  //05/27/23 - I think this is proper destructuring, but I am not 100% certain because of the error that 'setIsLoading' is not a function... 

  /* 5/28 Kaleb: Tried some troubleshooting.. set this const to a literal function and is still not recognized as such
  thinking problem is not here. */ 
  const {setIsLoading, setSearchResults} = props;

  console.log(setIsLoading);

  const [centuryList, setCenturyList] = useState([]);
  const [classificationList, setClassificationList] = useState([]);
  const [queryString, setQueryString] = useState("");
  const [century, setCentury] = useState('any');
  const [classification, setClassification] = useState('any');
  /* 
   * 
   * We are at the Search component, a child of app. This has a form, so we need to use useState for
   * our controlled inputs:
   * 
   * centuryList, setCenturyList (default should be an empty array, [])
   * classificationList, setClassificationList (default should be an empty array, [])
   * queryString, setQueryString (default should be an empty string, '')
   * century, setCentury (default should be the string 'any')
   * classification, setClassification (default should be the string 'any')
   */


  /**
   * Inside of useEffect, use Promise.all([]) with fetchAllCenturies and fetchAllClassifications
   * 
   * In the .then() callback pass the returned lists to setCenturyList and setClassificationList
   * 
   * Make sure to console.error on caught errors from the API methods.
   */
  
  //05/27/23 - I am pretty sure this is correct. If not, we may need another .then() to convert resCenturies into json 
  useEffect(() => {
    Promise.all([
      fetchAllCenturies(),
      fetchAllClassifications()
    ])
    //resCenturies is the returned list of centuries, resClassifications is returned list of classifications from above 
    .then(([resCenturies, resClassifications]) => {
      setCenturyList(resCenturies);
      setClassificationList(resClassifications)
    })
    .catch((error) => {
      console.error(error)
    })
  }, []);

  /**
   * This is a form element, so we need to bind an onSubmit handler to it which:
   * 
   * calls event.preventDefault()
   * calls setIsLoading, set it to true
   * 
   * then, in a try/catch/finally block:
   * 
   * try to:
   * - get the results from fetchQueryResults({ century, classification, queryString })
   * - pass them to setSearchResults
   * 
   * catch: error to console.error
   * 
   * finally: call setIsLoading, set it to false
   */

  /* 05/27/23 Jack 
  This is the current obstacle. When you search something, a TypeError is thrown, saying that 'setIsLoading is not a function'. If that is temporarily resolved, 
  another error is thrown claiming that 'setSearchResults is not a function', so I think the issue lies either in how both methods are passed as props or how they were declared initially

  Potential reasons:
  1) in the root index.js,  setIsLoading + setSearchResults is not declared properly in the return statement for the App component
  2) In this file, Search.js, setIsLoading + setSearchResults is not properly destructured or they were not properly passed into the Search component

  Other potential issues: These may also be potential reasons (but indirectly related) that onSubmit handler doesn't work correctly yet. 
  If the above 2 reasons don't pan out at all, perhaps review the code I highlight below to ensure I didn't do anything improperly

  1) In the onSubmit handler below, it is an asynchronous function, but I am not confident that I have set it up properly. 
  2) onChange (lines 116, 125, 142) may need to be changed. 
  


  */
  return <form id="search" onSubmit={async (event) => {
    // write code here
    event.preventDefault();
    setIsLoading(true);  /*Error here but this looks fine? All of the documentation I have seen has it declared the same */

    try{
      const response = await fetchQueryResults({ century, classification, queryString });
      const queryResults = response.json();
      setSearchResults(queryResults);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }

  }}>
    <fieldset>
      <label htmlFor="keywords">Query</label>
      <input 
        id="keywords" 
        type="text" 
        placeholder="enter keywords..." 
         value={queryString} 
        onChange={(e) => setQueryString(e.target.value)}
        />
    </fieldset>
    <fieldset>
      <label htmlFor="select-classification">Classification <span className="classification-count">({ classificationList.length })</span></label>
      <select 
        name="classification"
        id="select-classification"
        value={classification} 
        onChange={(e) => setClassification(e.target.value)}
        >
        <option value="any">Any</option>
        {/* map over the classificationList, return an <option /> */
        /*if there are any issues with this, on line 133, include other properties from https://github.com/harvardartmuseums/api-docs/blob/master/sections/classification.md */
         classificationList.map(option => {
          return <option key={option.id} value={option.id}>{option.name}</option>
        })}
       
      </select>
    </fieldset>
    <fieldset>
      <label htmlFor="select-century">Century <span className="century-count">({ centuryList.length })</span></label>
      <select 
        name="century" 
        id="select-century"
        value={century} 
        onChange={(e) => setCentury(e.target.value)}
        >
        <option value="any">Any</option>
        {/* map over the centuryList, return an <option /> 
        if there are any issues with this, on line 151, include other properties from https://github.com/harvardartmuseums/api-docs/blob/master/sections/century.md */
        centuryList.map(option => {
          return (
            <option key={option.id} value={option.id}>{option.name}</option>
          )
        })}
        
      </select>
     </fieldset>
    <button>SEARCH</button>
  </form>
}

export default Search;



/*

*/