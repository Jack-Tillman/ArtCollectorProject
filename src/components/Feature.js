import React from "react";

import { fetchQueryResultsFromTermAndValue } from "../api";
//
const Searchable = ({
  searchTerm,
  searchValue,
  setIsLoading,
  setSearchResults,
}) => {
  return (
    <span className="content">
      <a
        href="#"
        onClick={async (e) => {
          e.preventDefault();
          setIsLoading(true);
          try {
            let results = await fetchQueryResultsFromTermAndValue(
              searchTerm,
              searchValue
            );
            setSearchResults(results);
          } catch (error) {
            console.error(error.message);
          } finally {
            setIsLoading(false);
          }
        }}
      >
        {searchValue}
      </a>
    </span>
  );
};

const Feature = ({ featuredResult, setIsLoading, setSearchResults }) => {
  const id = featuredResult.id;
  const title = featuredResult.title;
  const dated = featuredResult.dated;
  const images = featuredResult.images;
  const primaryimageurl = featuredResult.primaryimageurl;
  const description = featuredResult.description;
  const culture = featuredResult.culture;
  const style = featuredResult.style;
  const technique = featuredResult.technique;
  const medium = featuredResult.medium;
  const dimensions = featuredResult.dimensions;
  const people = featuredResult.people;
  const department = featuredResult.department;
  const division = featuredResult.division;
  const contact = featuredResult.contact;
  const creditline = featuredResult.creditline;

  return (
    <>
      {!id ? (
        <main id="feature" />
      ) : (
        <main id="feature">
          <div className="object-feature">
            <header>
              <h3>{title}</h3>
              <h4>{dated}</h4>
            </header>
            <section className="facts">
              {culture ? (
                <>
                  <span className="title">Culture</span>
                  <Searchable
                    searchTerm="culture"
                    searchValue={culture}
                    setIsLoading={setIsLoading}
                    setSearchResults={setSearchResults}
                  />
                </>
              ) : null}
              {medium ? (
                <>
                  <span className="title">Medium</span>
                  <Searchable
                    searchTerm="medium"
                    searchValue={medium.toLowerCase()}
                    setIsLoading={setIsLoading}
                    setSearchResults={setSearchResults}
                  />
                </>
              ) : null}
              {style ? (
                <>
                  <span className="title">Style</span>
                  <span className="content">{style}</span>
                </>
              ) : null}
              {technique ? (
                <>
                  <span className="title">Technique</span>
                  <Searchable
                    searchTerm="technique"
                    searchValue={technique}
                    setIsLoading={setIsLoading}
                    setSearchResults={setSearchResults}
                  />
                </>
              ) : null}

              {dimensions ? (
                <>
                  <span className="title">Dimensions</span>
                  <span className="content">{dimensions}</span>
                </>
              ) : null}
              {people
                ? people.map((person, index) => {
                    return (
                      <React.Fragment key={`people${index}`}>
                        <span className="title">Person</span>
                        <Searchable
                          searchTerm="person"
                          searchValue={person.displayname}
                          setIsLoading={setIsLoading}
                          setSearchResults={setSearchResults}
                        />
                      </React.Fragment>
                    );
                  })
                : null}
              {description ? (
                <>
                  <span className="title">Description</span>
                  <span className="content"> {description}</span>
                </>
              ) : null}
              {department ? (
                <>
                  <span className="title">Department</span>
                  <span className="content">{department}</span>
                </>
              ) : null}
              {division ? (
                <>
                  <span className="title">Division</span>
                  <span className="content">{division}</span>
                </>
              ) : null}
              {contact ? (
                <>
                  <span className="title">Contact</span>
                  <span className="content">{contact}</span>
                </>
              ) : null}
              {creditline ? (
                <>
                  <span className="title">Credit</span>
                  <span className="content">{creditline}</span>
                </>
              ) : null}
            </section>
            <section className="photos">
              {images
                ? images.map((image, index) => {
                    return (
                      <img
                        key={`images${index}`}
                        src={image.baseimageurl}
                        alt={image.description}
                      />
                    );
                  })
                : null}
            </section>
          </div>
        </main>
      )}
    </>
  );
};

export default Feature;
