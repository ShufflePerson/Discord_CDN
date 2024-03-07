import * as dotenv from 'dotenv'
dotenv.config()

import axios from "axios"

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
    let offset = 0;
    if (parts[6])
        offset++;

    return {
        channel_id: parts[3 + offset] || "",
        message_id: parts[4 + offset] || "",
        file_name: parts[5 + offset] || ""
    };
}

async function getFullLink(link: string) {
    try {
        const { data } = await axios.post("https://discord.com/api/v9/attachments/refresh-urls", {"attachment_urls":[link]}, {
            headers: {
                "Authorization": process.env.TOKEN,
            }
        });

        return data.refreshed_urls[0].refreshed;
    } catch (ex) {
        return "";
    }
}

export { parseDownloadLink, Discord, getFullLink };
