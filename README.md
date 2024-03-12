<p align="center">
 <img width="100px" src="https://www.svgrepo.com/show/353655/discord-icon.svg" align="center" alt="Discord" />
 <h2 align="center">Discord CDN</h2>
 <p align="center">Discord CDN provides a easy to use proxy which can be used to download expired files from Discord. </p>
</p>

## How it works

When a request is done to the server, the server will fetch the latest non-expired link and redirect the request there. 

This means that you are able to download expired links directly from Discord, keeping it fast and very low cost to host the server. 

## Environment file ( **.env** )

Fill the values in the `.env.example` and rename `.env.example` to simply `.env`

- `TOKEN`
   - A Discord Account Token, used for fetching the link
- `FALLBACK`
   - If Discord removes the endpoint for fetching a non-expired link, fallback to the **V1** lookup.
- `PORT`
   - Specifies what port the HTTP server will be running on.

