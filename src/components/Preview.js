import React from "react";

import { fetchQueryResultsFromURL } from "../api";

const Preview = ({
  searchResults,
  setSearchResults,
  setFeaturedResult,
  setIsLoading,
}) => {
  const { info, records } = searchResults;

  async function fetchPage(pageUrl) {
    setIsLoading(true);
    try {
      const results = await fetchQueryResultsFromURL(pageUrl);
      setSearchResults(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <aside id="preview">
      <header className="pagination">
        <button
          disabled={(info.prev) ? false : true}
          className="previous"
          onClick={() => {
            try{
              fetchPage(info.prev);
            }catch(error){
              console.error(error.message);
            }
          }}
        >
          Previous
        </button>
        <button
          disabled={(info.next) ? false : true}
          className="next"
          onClick={() => {
            try{
              fetchPage(info.next);
            }catch(error){
              console.error(error.message);
            }
          }}
        >
          Next
        </button>
      </header>
      <section className="results">
        {records.map((record, index) => {
          return (
            <div
              key={index}
              className="object-preview"
              onClick={(event) => {
                event.preventDefault();
                setFeaturedResult(record);
              }}
            >
              <a href="#">
                {record.primaryimageurl ? (
                  <img src={record.primaryimageurl} alt={record.description} />
                ) : null}
                {record.title ? <h3>{record.title}</h3> : <h3>MISSING INFO</h3>}
              </a>
            </div>
          );
        })}
      </section>
    </aside>
  );
};

export default Preview;
