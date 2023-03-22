const db = require('../config/connection');
const { User, Pet } = require('../models');
const userSeeds = require('./userSeeds.json');
const petSeeds = require('./petSeeds.json');

db.once('open', async () => {
  try {
    await Pet.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < petSeeds.length; i++) {
      const { _id, petAuthor } = await Pet.create(petSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: petAuthor },
        {
          $addToSet: {
            pets: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
