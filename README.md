# Tero Dumper

This is an API that collects data from the [CoinGecko](https://www.coingecko.com/api/documentations/v3#/coins/get_coins__id__history) history api everyday at 00:00:00 and dumps the price data for **USD** and **GBP** in a Firestore database.
The supported coin list is given below:
- celo-euro
- celo-dollar
- celo
- ubeswap
- bitcoin
- moola-market
- mobius
- weth
- wrapped-bitcoin
- knoxedge
- poofcash
- resource-protocol
- solana
- truefeedbackchain
- premio
- usd-coin
- chubbyakita
- chubbydoge
- allbridge
- compound-ether
- saber
- fantom
- avalanche-2
- wmatic
- binancecoin
- aave
- curve-dao-token
- celostarter
- sushi
- moola-celo-atoken

## Build Instructions

- Clone the git repo by running the following command in your terminal - 
```
git clone git@github.com:tanjan-sj/tero-dumper.git
```
- Run the following command to install the dependencies -
```
npm i
```
- Create your own `.env` file by reffering to the **example.env** file and add your own Firebase credentials. 
- Create a collection in your Firestore database for dumping data and name it ***dumping***.
- Run the project -
```
npm start
```

