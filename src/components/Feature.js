import React, { Fragment } from 'react';

// Don't touch this import
import { fetchQueryResultsFromTermAndValue } from '../api';

/**
 * We need a new component called Searchable which:
 * 
 * Has a template like this:
 * 
 * <span className="content">
 *  <a href="#" onClick={async (event) => {}}>SOME SEARCH TERM</a>
 * </span>
 *
 * You'll need to read searchTerm, searchValue, setIsLoading, and setSearchResults off of the props.
 * 
 * When someone clicks the anchor tag, you should:
 * 
 * - preventDefault on the event
 * - call setIsLoading, set it to true
 * 
 * Then start a try/catch/finally block:
 * 
 * try:
 *  - await the result of fetchQueryResultsFromTermAndValue, passing in searchTerm and searchValue
 *  - send the result to setSearchResults (which will update the Preview component)
 * catch: 
 *  - console.error the error
 * finally:
 *  - call setIsLoading, set it to false
 */
const Searchable = (props) => {
const [searchTerm, searchValue, setIsLoading, setSearchResults] = props;
    
    <span className="content">
    <a href="#" onClick={async (event) => {
        event.preventDefault;
        setIsLoading(true);
        try{
            const result = fetchQueryResultsFromTermAndValue(searchTerm, searchValue);
            setSearchResults(result)
        } catch {
            console.error(error);
        } finally {
            setIsLoading(false);
        }

    }}>SOME SEARCH TERM</a>
   </span>
}

/**
 * We need a new component called Feature which looks like this when no featuredResult is passed in as a prop:
 * 
 * <main id="feature"></main>
 * 
 * And like this when one is:
 * 
 * <main id="feature">
 *   <div className="object-feature">
 *     <header>
 *       <h3>OBJECT TITLE</h3>
 *       <h4>WHEN IT IS DATED</h4>
 *     </header>
 *     <section className="facts">
 *       <span className="title">FACT NAME</span>
 *       <span className="content">FACT VALUE</span>
 *       <span className="title">NEXT FACT NAME</span>
 *       <span className="content">NEXT FACT VALUE</span>
 *     </section>
 *     <section className="photos">
 *       <img src=IMAGE_URL alt=SOMETHING_WORTHWHILE />
 *     </section>
 *   </div>
 * </main>
 * 
 * The different facts look like this: title, dated, images, primaryimageurl, description, culture, style, 
 * technique, medium, dimensions, people, department, division, contact, creditline
 * 
 * The <Searchable /> ones are: culture, technique, medium (first toLowerCase it), and person.displayname (one for each PEOPLE)
 * 
 * NOTE: people and images are likely to be arrays, and will need to be mapped over if they exist
 * 
 * This component should be exported as default.
 */
const Feature = (props) => {
    const {featuredResult} = props;
    const {title, dated, images, primaryimageurl, description, culture, style, 
         technique, medium, dimensions, people, department, division, contact, creditline} = {featuredResult};
        /* 5/28/23 Kaleb: Look at line 35 to 49 and replace all searchable items inside of the content span. Do some mapping over people and images.
         */
         return ( <main id="feature">{
            {featuredResult} ? <div className="object-feature">
            <header>
              <h3>{title}</h3>
               <h4>{dated}</h4>
             </header>
            <section className="facts">
            { 
            {culture} ? 
            <>
              <span className="title">Culture</span>
               <span className="content">
                <a href="">
                Placeholder for Culture
                </a>
               </span>
               </>
               : null
            }
               <span className="title">Medium</span>
               <span className="content"><a href="">Placeholder for Meduim</a></span>

               <span className="title">{technique}</span>
               <span className="content">FACT VALUE</span>

               <span className="title">{dimensions}</span>
               <span className="content">NEXT FACT VALUE</span>

               <span className="title">{people}</span>
               <span className="content">FACT VALUE</span>

               <span className="title">{department}</span>
               <span className="content">NEXT FACT VALUE</span>

               <span className="title">{division}</span>
               <span className="content">FACT VALUE</span>

               <span className="title">{contact}</span>
               <span className="content">NEXT FACT VALUE</span>

               <span className="title">{creditline}</span>
               <span className="content">FACT VALUE</span>

             </section>
             <section className="photos">
               <img src={primaryimageurl} alt={description} />
             </section>
           </div> 
         : null } 
         </main>

         )

// if props = undefiend ? render main : 

}

export default Feature;