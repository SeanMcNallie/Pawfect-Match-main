const { AuthenticationError } = require("apollo-server-express");
const { User, Pet } = require("../models");
const { signToken } = require("../utils/auth");
const { getToken } = require("../utils/httpHelpers");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("pets");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("pets");
    },
    pets: async (parent, { username }) => {
      const params = username ? { username } : {};
      return pet.find(params).sort({ createdAt: -1 });
    },
    pet: async (parent, { petId }) => {
      return pet.findOne({ _id: petId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("pets");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    searchPets: async (parent, { postalCode, animalType }) => {
      // Check to see if there is a token
      const tokenData = process.env["petFinderToken"];
      let petFindertoken;
      if (tokenData) {
        const tokenDataObj = JSON.parse(tokenData);
        const { token, tokenExpiry } = tokenDataObj;
        const currentTime = new Date().getTime();
        if (currentTime > tokenExpiry) {
          petFindertoken = await getToken();
        } else {
          petFindertoken = token;
        }
      } else {
        petFindertoken = await getToken();
      }

      // SET A URL FOR PETFINDER API HERE
      const url = `https://api.petfinder.com/v2/animals?type=${animalType}&location=${postalCode}`;
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${petFindertoken}`,
        },
      });

      const petData = await response.json();
      console.log("PET DATA FROM API:", JSON.stringify(petData, null, 2));
      return petData.animals;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addPet: async (parent, { petText }, context) => {
      if (context.user) {
        const pet = await pet.create({
          petText,
          petAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { pets: pet._id } }
        );

        return pet;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addComment: async (parent, { petId, commentText }, context) => {
      if (context.user) {
        return Pet.findOneAndUpdate(
          { _id: petId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removePet: async (parent, { petId }, context) => {
      if (context.user) {
        const pet = await Pet.findOneAndDelete({
          _id: petId,
          petAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { pets: pet._id } }
        );

        return pet;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeComment: async (parent, { petId, commentId }, context) => {
      if (context.user) {
        return Pet.findOneAndUpdate(
          { _id: petId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
