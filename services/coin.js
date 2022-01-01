const coinGecko = require('coingecko-api-v3');
const moment = require('moment');
const { coinGeckoDateFormat, coinList } = require('../utils/constant');

const client = new coinGecko.CoinGeckoClient({
  timeout: 10000,
  autoRetry: true,
});

const getCoinGeckoData = async () => {
  const todaysDate = moment(new Date())
    .subtract(1, 'day')
    .format(coinGeckoDateFormat);

  const result = await Promise.all(
    coinList.map(async (id) => {
      const historyData = await client.coinIdHistory({
        id: id,
        date: todaysDate,
      });
      const marketDataObject = historyData.market_data;

      return {
        id: id,
        USD: marketDataObject ? marketDataObject.current_price.usd : 0,
        GBP: marketDataObject ? marketDataObject.current_price.gbp : 0,
      };
    })
  );

  let dumpingData = [];

  for (let element of result) {
    dumpingData[element.id] = {
      usd: element.usd,
      gbp: element.gbp,
    };
  }

  console.log(dumpingData);

  return dumpingData;
}

module.exports = {
  getCoinGeckoData
};
