<p align="center">
 <img width="100px" src="https://www.svgrepo.com/show/353655/discord-icon.svg" align="center" alt="Discord" />
 <h2 align="center">Discord CDN</h2>
 <p align="center">Keep using Discord as your CDN host, bypassing the expiry on download links!</p>
</p>

# NEW UPDATE
**Discord_CDN** can now fetch **ALL** files, even the ones you don't have access to. 

*This means, **DISCORD_CDN** can restore and let you download any old links.*

## What it looks like

Once setup, you will be able to go to `http://YOUR_SERVER_IP/DISCORD_DOWNLOAD_LINK` and it will redirect you to the latest link for that file.

It is fully safe to share the endpoint with your friends and anyone else. Your token is NOT exposed anywhere.

![Graph](assets/ss.png "How it works")

## How setup

## Prerequisites 

### 1. Node.js Installation
   - Install Node.js from [official website](https://nodejs.org/).
   - Verify installation using `node -v` and `npm -v`.


### 2. Version Control (Optional but recommended)
   - Install Git for version control.


#### Clone the repo

```
git clone https://github.com/ShufflePerson/discord_cdn.git
```

Or download the source as a zip file and extract it.

#### Run setup

```
npm run setup
```

#### Create a .env file and fill the values

```
TOKEN=NTU2NjQ0NTI1MTgzMTk4MTA0.SWGjq3.cAINvMoMWOeeG36MBddlhhwrcCD
PORT=80
CACHE_TIME=3600
```

#### Run the server

```
npm run start
```

## How to use

Simply paste the download url to the end of your server.

It is fully safe to share the server's IP, your token is not exposed anywhere.

```
http://127.0.0.1/https://cdn.discordapp.com/attachments/1165690279932735643/1175070504986611762/untitled.mp3
```

## How to get your token

1. Open Discord on your Browser. 
2. Open the Dev Tools ( Inspect Element )
3. Go to the Console Tab and paste in the following command
4. `console.log((webpackChunkdiscord_app.push([[''],{},e=>{m=[];for(let c in e.c)m.push(e.c[c])}]),m).find(m=>m?.exports?.default?.getToken!==void 0).exports.default.getToken());`
5. Copy the output and set it in the `.env` file. (e.g `TOKEN=PASTE_TOKEN_HERE`)

## Contact

My Discord is: `_.shuffle._`
