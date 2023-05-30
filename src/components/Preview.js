import React from 'react';

/*
 * We need to import fetchQueryResultsFromURL since we will sometimes have urls in info.prev and info.next
 * which are query urls.
 */

import { fetchQueryResultsFromURL } from '../api';

const Preview = ({searchResults, setSearchResults, setFeaturedResult, setIsLoading}) => {
    // const { searchResults, setIsLoading, setSearchResults, setFeaturedResult } = props; 5/30 3:15 edit 

    const {info, records} = searchResults;

  
    // console.log(props.searchResults);
    // console.log(searchResults);
    // console.log(info, records);
    

  /**
   * Destructure setSearchResults, setFeaturedResult, and setIsLoading from props
   * and also destructure info and records from props.searchResults
   * 
   * You need info, records, setSearchResults, setFeaturedResult, and setIsLoading as available constants
   */


  /**
   * Don't touch this function, it's good to go.
   * 
   * It has to be defined inside the Preview component to have access to setIsLoading, setSearchResults, etc...
   */
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
        {/* This button should be disabled if nothing is set in info.prev, and should call fetchPage with info.prev when clicked */}
        <button
          disabled={!info.prev}
          className="previous"
          onClick={() => {
           fetchPage(info.prev)
            }
          }
        >
          Previous
        </button>
        {/* This button should be disabled if nothing is set in info.next, and should call fetchPage with info.next when clicked */}
        <button
          disabled={!info.next}
          className="next"
          onClick={() => {
            fetchPage(info.next)
          }}
        >
          Next
        </button>
      </header>
      <section className="results">
        {
          // Here we should map over the records, and render something like this for each one:
          records.map((record, index) => {
            return (
              <div
                key={index}
                className="object-preview"
                onClick={(event) => {
                  event.preventDefault();
                  //JACK COMMENT 05/29/23 maybe change this.records to records if TypeError issue occurs
                  // console.log(record);
                  // console.log(records);
                  // console.log(data.records);
                  //5/30 maybe change to 'this.record' if dont work 
                  setFeaturedResult(record);
                  // prevent the default
                  // set the featured result to be this record, using setFeaturedResult
                }}
              >
                <a href="#">
                  {
                  (record.primaryimageurl) ? 
                    <img
                      src={ record.primaryimageurl }
                      alt={record.description}
                    />
                   : null
                   }
                  {/* // if the record.primaryimageurl exists, show this: <img src={ record.primaryimageurl } alt={ record.description } />, otherwise show nothing  */}
                  {(record.title) ? 
                    <h3>{ record.title }</h3>
                   : <h3>MISSING INFO</h3>
                  }
                </a>
                <h3>
                    <a href="#"> </a>
                  </h3>
                  {/* // if the record.title exists, add this: <h3>{ record.title }</h3>, otherwise show this: <h3>MISSING INFO</h3> */}
              </div>
            )
          })
        }
      </section>
    </aside>
  );
}

export default Preview;
