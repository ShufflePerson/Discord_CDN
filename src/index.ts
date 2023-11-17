import * as dotenv from 'dotenv'
dotenv.config()


import Discord from "./discord/discord";
import IDownloadLinkData from "./types/IDownloadLinkData";


function parseDownloadLink(link: string): IDownloadLinkData {
    const parts = link.split("/");

    return {
	channel_id: parts[4],
	message_id: parts[5],
	file_name: parts[6] 
    };
}

async function getFullLink(link: string) {
    const download_link_data = (parseDownloadLink(link));
    return await Discord.getDownloadLink(download_link_data.channel_id, download_link_data.message_id, download_link_data.file_name);
}

export { parseDownloadLink, Discord, getFullLink };
