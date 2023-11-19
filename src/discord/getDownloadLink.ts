import axios from "axios";


let LINK_CACHE: any = {};
const CACHE_TIME: number = process.env.CACHE_TIME as any || 3600; 
function getLinkHash(channel_id: string, message_id: string, file_name: string): string {
    return `${channel_id}${message_id}${file_name}`;
}

function removeOldCaches() {
    let hashes = Object.keys(LINK_CACHE);
    for (let hash of hashes) {
	let cached_link = LINK_CACHE[hash];
	const cache_delta = (Date.now() / 1000) - cached_link.creation_time;
	if (cache_delta > CACHE_TIME) {
	    console.log(`[${hash}] Cache has expired. Removing from the cache.`);
	    delete LINK_CACHE[hash];
	}
    }
}


export default (async (channel_id: string, message_id: string, file_name: string): Promise<string> => {
    try {
    removeOldCaches();
    if (!process.env.TOKEN) {
	throw "Discord token must be set in the .env file.";
    }

    const link_hash = getLinkHash(channel_id, message_id, file_name);
    let cached_link = LINK_CACHE[link_hash];

    if (cached_link) {
	const cache_delta = (Date.now() / 1000) - cached_link.creation_time;

	if (cache_delta < CACHE_TIME) {
	    console.log(`Link is cached for the next ${Math.round(CACHE_TIME - cache_delta).toString()} seconds, returning cached link.`);
	    return cached_link.link;	
	} else {
	    delete LINK_CACHE[link_hash];
	}
    }

    const { data } = await axios.get(`https://discord.com/api/v9/channels/${channel_id}/messages?limit=5&around=${message_id}`, {
	headers: {
	    "Authorization": process.env.TOKEN,
	}
    });
    if (data.length < 0) {
	console.error(`No message by the ID ( ${channel_id}/${message_id} ) was found.`);
	return "";
    }

    const message = data[0] as any;
    const files = message.attachments;
    let found_link = "";

    for (let msg of data) {
	if (msg.attachments.length > 0) {
	    for (let file of msg.attachments) {
		if (file.id == message_id && file.filename == file_name)
		    found_link = file.url;
	    }
	}
    }

    if (!found_link) {
	console.log("Failed to find the download link.", files, data);
    } else {
	LINK_CACHE[link_hash] = {
	    creation_time: Date.now() / 1000,
	    link: found_link
	};
    }



    return found_link;
    } catch (ex) {
	console.log(ex);
	return "";
    }
});

