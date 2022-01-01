const CronJob = require('cron').CronJob;

const { getCoinGeckoData } = require("./coin");
const { cronExpression } = require("../utils/constant");

const dumpCoinDataInDb = new CronJob(cronExpression, async function() {
    try{
        const dumpingData = await getCoinGeckoData();
    }catch(err){
      console.log(err);
    }
}, null, false, null);

module.exports = {
    dumpCoinDataInDb
}