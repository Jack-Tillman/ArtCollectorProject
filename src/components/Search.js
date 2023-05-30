import React, { useEffect, useState } from "react";

/**
 * Don't touch these imports!
 */
import {
  fetchAllCenturies,
  fetchAllClassifications,
  fetchQueryResults,
} from "../api";

const Search = ({ setIsLoading, setSearchResults }) => {
  // ({setIsLoading, setSearchResults}) is the same as doing const {setIsLoading, setSearchResults} = props;

  const [centuryList, setCenturyList] = useState([]);
  const [classificationList, setClassificationList] = useState([]);
  const [queryString, setQueryString] = useState("");
  const [century, setCentury] = useState("any");
  const [classification, setClassification] = useState("any");

  useEffect(() => {
    Promise.all([fetchAllCenturies(), fetchAllClassifications()])

      .then(([centuries, classifications]) => {
        setCenturyList(centuries);
        setClassificationList(classifications);
      })
      .catch(console.error);
  }, []);

  return (
    <form
      id="search"
      onSubmit={async (event) => {
        // write code here
        event.preventDefault();
        setIsLoading(true);

        try {
          let queryResults = await fetchQueryResults({
            century,
            classification,
            queryString,
          });
          setSearchResults(queryResults);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }}
    >
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
        <label htmlFor="select-classification">
          Classification{" "}
          <span className="classification-count">
            ({classificationList.length})
          </span>
        </label>
        <select
          name="classification"
          id="select-classification"
          value={classification}
          onChange={(e) => setClassification(e.target.value)}
        >
          <option value="any">Any</option>
          {classificationList.map((classification, index) => {
            return (
              <option
                key={`${index}classifications`}
                value={classification.name}
              >
                {classification.name}
              </option>
            );
          })}
        </select>
      </fieldset>

      <fieldset>
        <label htmlFor="select-century">
          Century <span className="century-count">({centuryList.length})</span>
        </label>
        <select
          name="century"
          id="select-century"
          value={century}
          onChange={(e) => setCentury(e.target.value)}
        >
          <option value="any">Any</option>
          {centuryList.map((century, index) => {
            return (
              <option key={`${index}centuries`} value={century.name}>
                {century.name}
              </option>
            );
          })}
        </select>
      </fieldset>

      <button>SEARCH</button>
    </form>
  );
};

export default Search;
