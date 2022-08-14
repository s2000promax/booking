const CitiesGE = require('../models/CitiesGE');
// const HotelsGE = require('../models/HotelsGE');

const citiesGeMock = require('../mock/citiesGE.json');
// const hotelsGeMock = require('../mock/hotelsGE.json');

module.exports = async () => {
  const citiesGe = await CitiesGE.find();
  if (citiesGe.length !== citiesGeMock.length) {
    await createInitialEntity(CitiesGE, citiesGeMock);
  }

  /* const hotelsGe = await HotelsGE.find();
  if (hotelsGe.length !== hotelsGeMock.length) {
    await createInitialEntity(HotelsGE, hotelsGeMock);
  } */
}

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async item => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (e) {
        return e;
      }
    })
  )
}
