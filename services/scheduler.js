const CronJob = require('cron').CronJob;

const { getCoinGeckoData, dumpCoinDataInDb } = require("./coin");
const { cronExpression } = require("../utils/constant");

const schedulerForDumpingData = new CronJob(cronExpression, async function() {
    try{
        const dumpingData = await getCoinGeckoData();
        await dumpCoinDataInDb(dumpingData);
        
        console.log("Data dumped sucessfully");
    }catch(err){
      console.log(err);
    }
}, null, false, null);

module.exports = {
    schedulerForDumpingData
}