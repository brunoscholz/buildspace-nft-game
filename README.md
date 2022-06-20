# Buildspace NFT Game Project

This project is the result of buildspace's [Create your own mini turn-based NFT browser game](https://buildspace.so/p/create-turn-based-nft-game).

It uses hardhat and react.

## Game

You mint your character's NFT based on three pre-defined template characters. Then you wait for the monster to appear and attack!

But be careful! The monster's attacks are way more powerful so you need a lot of friends to defeat the terrible monster.

You must have the [Metamask extension](https://metamask.io/download/) on your browser.
Connect to the Rinkeby testnet and have some ([fake ether](https://faucets.chain.link/rinkeby)) to play.

## Live demo

[Capitol Defenders](https://capitol-defenders.herokuapp.com/)

## Development

```
$ git clone https://github.com/brunoscholz/buildspace-nft-game.git
```

Create a .env file and place the following variables:

```
PRIVATE_KEYS="..."
ALCHEMY_MUMBAI_API_KEY=...
```

PRIVATE_KEYS is the private key to the account you are testing with. You can get this on metamask account details -> expose private key. This will be used by hardhat to deploy the contract for the NFT-ENS.

ALCHEMY_MUMBAI_API_KEY is the secret key of your app. You can create one [here](https://www.alchemy.com/).


```
$ npm install && npm run start
```

Go to [localhost:3000](http://localhost:3000)
