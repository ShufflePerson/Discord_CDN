<p align="center">
 <img width="100px" src="https://www.svgrepo.com/show/353655/discord-icon.svg" align="center" alt="Discord" />
 <h2 align="center">Discord CDN <strong>V2</strong></h2>
 <p align="center">Updates any old/expired Discord download links.</p>
</p>

![Graph](assets/ss.png "How it works")

# Usage

There are two ways to use the HTTP server

## Way 1

Simply paste the Discord URL at the end of your server URL

```
http://localhost/https://cdn.discordapp.com/attachments/763509665585561610/1216965708911480923/image.png
```

## Way 2

Replace the `cdn.discord.app.com` with your URL. Make sure to change `HTTPS` to `HTTP` unless you have configured `HTTPS` through something like CloudFlare.

```
http://localhost/attachments/763509665585561610/1216965708911480923/image.png
```

## Using as Library

If you wish to use **Discord CDN** as a library, check the code example below.

You may also check `src/server.ts` to see how the HTTP server uses it.

```typescript
import { Discord, getConfig } from "PATH_TO_DISCORD_CDN"

//getConfig will parse the config from .env
//if you wish to pass your own config object, check the `src/Types/IConfig.ts` interface

async function dev() {
    try {
        let config = await getConfig();
        let discord = new Discord(config);
        let link = await discord.fetchLatestLink("https://cdn.discordapp.com/attachments/763509665585561610/1216965708911480923/image.png?ex=")
        console.log(link);
    } catch (ex) {
        console.error(ex);
    }
}

dev();
```

# Installation and Setup

## Download the repo

```bash
git clone https://github.com/ShufflePerson/Discord_CDN.git
cd Discord_CDN
```

### OR

Download the repo as a zip and extract it to a folder.

## Setup Environment file ( **.env** )

Fill the values in the `.env.example` and rename `.env.example` to simply `.env`

- `TOKEN`
   - A Discord Account Token, used for fetching the link
- `FALLBACK`
   - If Discord removes the endpoint for fetching a non-expired link, fallback to the **V1** lookup.
- `PORT`
   - Specifies what port the HTTP server will be running on.

## Yarn

### Install packages

```
yarn install
```

### Start the server

```
yarn pnpify tsc
yarn node ./dist/server.js
```

## NPM

### Install packages

```bash
npm run setup
```

### Start the server

This will also recompile the code. 

```bash
npm run start
```


# Contact

You may contact me on my Discord: `_.shuffle._`
