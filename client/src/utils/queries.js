import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      pets {
        _id
        petText
        createdAt
      }
    }
  }
`;

export const QUERY_OPEN_SEARCH_PETS = gql`
  query GeneralSearchPets($postalCode: String!, $animalType: String!){
    searchPets(postalCode: $postalCode, animalType: $animalType) {
      breeds {
        primary
      }
      location
      description
      name
      type
      gender
      size
      status
      photos {
        medium
      }
    }
  }
`;

// petsearch query
// export const QUERY_SEARCH_PETS = gql`
//   query searchPets (
//       $location: String
//       $animal: String
//       ){
//       searchPets (
//         location: $location
//         animal: $animal
//       ){
//         pets {
//           name
//           status
//           age
//           size
//           media {
//             photos {
//               size
//               url
//             }
//           }
//           breeds {
//             breed
//           }
//           sex
//           description
//           shelterId
//         }
//       }
//     }
// `;

export const QUERY_PET_DATA = gql`
  query getPetData($petId: ID!) {
    pet(id: $id) {
    name
    status
    age
    size
    gender
    type
    breed
    house_trained
    organization
    location
      shelterId
      media {
        photos {
          size
          url
        }
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      pets {
        _id
        petText
        petAuthor
        createdAt
      }
    }
  }
`;
