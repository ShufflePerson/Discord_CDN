import * as dotenv from 'dotenv'
dotenv.config()

if (!process.env.TOKEN) {
    console.log("Please create a .env file and fill in your token. Read the README.md to learn how to get your token.");
    process.exit(-1);
}

import Discord from "./discord/discord";
import IDownloadLinkData from "./types/IDownloadLinkData";


function parseDownloadLink(link: string): IDownloadLinkData {
    if (link.includes("?")) {
	link = link.split("?")[0];
    }

    const parts = link.split("/");

    console.log(parts);

    return {
	channel_id: parts[3] || "",
	message_id: parts[4] || "",
	file_name: parts[5] || "" 
    };
}

async function getFullLink(link: string) {
    const data = (parseDownloadLink(link));
    if (!data.channel_id || !data.file_name || !data.message_id) {
	console.log("Missing one of the values: ", data);
	return "";
    }
    return await Discord.getDownloadLink(data.channel_id, data.message_id, data.file_name);
}

export { parseDownloadLink, Discord, getFullLink };
