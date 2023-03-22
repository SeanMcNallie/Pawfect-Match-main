import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_PET } from '../../utils/mutations';
import { QUERY_OPEN_SEARCH_PETS, QUERY_ME, QUERY_PET_DATA} from '../../utils/queries';

import Auth from '../../utils/auth';

const PetForm = () => {
  const [PetText, setPetText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addPets, { error }] = useMutation(ADD_PET, {
    update(cache, { data: { addPet } }) {
      try {
        const { pets } = cache.readQuery({ query: QUERY_PET_DATA });

        cache.writeQuery({
          query: QUERY_OPEN_SEARCH_PETS,
          data: { Pets: [addPets, ...pets] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, pets: [...me.pets, addPets] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addPets({
        variables: {
          PetText,
          PetAuthor: Auth.getProfile().data.username,
        },
      });

      setPetText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'PetText' && value.length <= 280) {
      setPetText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>Welcome.  We are an adoption search site.</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="PetText"
                placeholder="Here is a new pet..."
                value={PetText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Pet
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to find your PAWFECT pet to adopt. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default PetForm;
