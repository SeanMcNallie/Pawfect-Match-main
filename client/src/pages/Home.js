import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_OPEN_SEARCH_PETS } from "../utils/queries";
import SearchBar from "../components/Search/searchBar";

const Home = () => {
  const [searchData, setSearchData] = useState({
    location: "75218",
    animalType: "dog",
  });

  const { loading, data } = useQuery(QUERY_OPEN_SEARCH_PETS, {
    variables: {
      postalCode: searchData.location,
      animalType: searchData.animalType,
    },
  });
  // // if logged in, set this to true
  // const loggedIn = Auth.loggedIn();

  return (
    // <Header />
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: "1px dotted #1a1a1a" }}
        >
          <div class="col-12 col-md-10 mb-3 p-3">
            <SearchBar searchHandler={setSearchData} />
          </div>
          <div class="col-12 col-md-10 mb-3 p-3">
            {loading ? (
              <div>Loading data...</div>
            ) : (
              data?.searchPets?.map((pet) => {
                console.log(pet.photos);
                return (
                  <div className="p-3 my-3">
                    <h3>
                      {pet.name} {pet.type} {pet.breeds.primary}
                    </h3>
                    <p>{pet.description}</p>
                    {pet?.photos?.[0] && <img src={pet.photos[0].medium} />}
                  </div>
                );
              })
            )}
            {/* <SearchResults /> */}
          </div>
        </div>
      </div>
    </main>
    // <Footer />
  );
};

export default Home;
