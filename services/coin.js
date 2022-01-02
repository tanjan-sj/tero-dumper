const coinGecko = require('coingecko-api-v3');
const moment = require('moment');
const fireStore = require("firebase/firestore/lite");
const db = require("../config/firebase");
const { coinGeckoDateFormat, coinList, coinCollection } = require('../utils/constant');

const batch = fireStore.writeBatch(db);
const client = new coinGecko.CoinGeckoClient({
  timeout: 10000,
  autoRetry: true,
});

const getCoinGeckoData = async () => {
  const todaysDate = moment(new Date())
    .subtract(1, 'day')
    .format(coinGeckoDateFormat);

  const coinHistory = await Promise.all(
    coinList.map(async (id) => {
      const historyData = await client.coinIdHistory({
        id: id,
        date: todaysDate,
      });
      const marketDataObject = historyData.market_data;

      return {
        id: id,
        usd: marketDataObject ? marketDataObject.current_price.usd : 0,
        gbp: marketDataObject ? marketDataObject.current_price.gbp : 0,
      };
    })
  );
  return coinHistory;
}


const dumpCoinDataInDb = async (data) => {
    for (let element of data) {
        const elementRef = fireStore.doc(db, coinCollection, element.id);
        batch.set(elementRef, {USD: element.usd, GBP: element.gbp});
    }

    await batch.commit();
}

module.exports = {
  getCoinGeckoData,
  dumpCoinDataInDb
};
