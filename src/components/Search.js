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
  const { setIsLoading, setSearchResults } = props;
  const [inputValue, setInputValue] = useState();
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

  useEffect(() => {
    Promise.all([
      fetchAllCenturies(),
      fetchAllClassifications()
    ])
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
  return <form id="search" onSubmit={async (event) => {
    // write code here
  }}>
    <fieldset>
      <label htmlFor="keywords">Query</label>
      <input 
        id="keywords" 
        type="text" 
        placeholder="enter keywords..." 
         value={queryString} 
        onChange={setQueryString}
        />
    </fieldset>
    <fieldset>
      <label htmlFor="select-classification">Classification <span className="classification-count">({ classificationList.length })</span></label>
      <select 
        name="classification"
        id="select-classification"
        value={classification} 
        onChange={setClassification}
        >
        <option value="any">Any</option>
        {/* map over the classificationList, return an <option /> */
        /*if there are any issues with this, on line 89, include other properties from https://github.com/harvardartmuseums/api-docs/blob/master/sections/classification.md */
         classificationList.map(option => {
          return <option key={option.id} />
        })}
       
      </select>
    </fieldset>
    <fieldset>
      <label htmlFor="select-century">Century <span className="century-count">({ centuryList.length })</span></label>
      <select 
        name="century" 
        id="select-century"
        value={century} 
        onChange={setCentury}
        >
        <option value="any">Any</option>
        {/* map over the centuryList, return an <option /> 
        if there are any issues with this, on line 106, include other properties from https://github.com/harvardartmuseums/api-docs/blob/master/sections/century.md */
        centuryList.map(option => {
          return <option key={option.id} />
        })}
        
      </select>
     </fieldset>
    <button>SEARCH</button>
  </form>
}

export default Search;


useEffect(() => {
  let promises = [];
  data.forEach((item) => {
    promises.push(
      fetch(
        `https://app.subsocial.network/subid/api/v1/check/${item.name.toLowerCase()}`
      )
    );
  });

  Promise.all(promises)
    .then((responses) => {
      // Take all responses and analyze them with another Promise.all
      return Promise.all(
        responses.map((response) => {
          return response.json();
        })
      );
    })
    .then((data) => {
      // Extracted data
      console.log(data);
    })
    .catch((error) => {
      // Catched errors
      console.log(error);
    });
}, [data]);
/*

*/