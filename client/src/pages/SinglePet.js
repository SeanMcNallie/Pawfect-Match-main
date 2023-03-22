import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import PetList from '../components/PetList';
import PetForm from '../components/PetForm';

import { QUERY_PET_DATA } from '../utils/queries';
// import Auth from "../utils/auth";

const SinglePet = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { petId } = useParams();

  const { loading, data } = useQuery(QUERY_PET_DATA, {
    // pass URL parameter
    variables: { petId: petId },
  });

  const pet = data?.pet || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {pet.petAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          had this thought on {pet.createdAt}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {pet.petText}
        </blockquote>
      </div>

      <div className="my-5">
        <PetList comments={pet.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <PetForm petId={pet._id} />
      </div>
    </div>
  );
};

export default SinglePet;
