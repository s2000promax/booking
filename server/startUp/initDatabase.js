// 1. Any user has min required fields in DB (cities & hotels)
// 2. The data equals mock data

const CitiesGE = require('../models/CitiesGE');
const HotelsGE = require('../models/HotelsGE');

const citiesMock = require('../mock/citiesGE.json');
const hotelsMock = require('../mock/hotelsGE.json');

module.exports = async () => {
 const citiesGE = await CitiesGE.find;
 if (citiesGE.length !== citiesMock.length) {
    await createInitialEntities(CitiesGE, citiesMock)
 }

  const hotelsGE = await HotelsGE.find;
  if (hotelsGE.length !== hotelsMock.length) {
    await createInitialEntities(HotelsGE, hotelsMock);
  }
};

async function createInitialEntities(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async item => {
      try {
        delete  item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
}
