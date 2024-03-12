import IConfig from "../Types/IConfig";
import ELinkIssue from "./Types/ELinkIssue";
import IRefreshUrlsRes from "./Types/IRefreshUrlsRes";
import ParseLink from "./Utils/ParseLink";
import VerifyToken from "./Utils/VerifyToken";

import axios, { AxiosRequestConfig } from "axios"

class Discord {
    constructor(private config: IConfig) {};


    /**
     * Fetches the latest link for a given Discord download link
     * @param oldLink Discord Link in any of the supported formats
     * @returns An updated link which can be requested immediatelty
     * @throws If the given link fails to parse OR the Request to Discord fails.
     * @todo Fallback to V1 lookup if the HTTP request fails.
     */
    public async fetchLatestLink(oldLink: string): Promise<string> {
        if (!oldLink.includes("https://")) 
            oldLink = `https://cdn.discordapp.com/${oldLink}`;
        const linkData = ParseLink(oldLink);
        if (linkData.error != ELinkIssue.NONE) {
            throw new Error(linkData.error);
        }

        try {
            const { data } = await axios.post("https://discord.com/api/v9/attachments/refresh-urls", {
                attachment_urls: [oldLink]
            }, this.getHTTPConfig());

            let response = data as IRefreshUrlsRes;
            if (!response || !response.refreshed_urls || response.refreshed_urls.length == 0) {
                console.log("response:", data);
                throw new Error("Unexpected Discord response.");
            }

            let updatedLink = response.refreshed_urls[0].refreshed;
            return updatedLink;

        } catch (ex) {
            console.log(ex)
        }

        return "";
    }

    private getHTTPConfig(): AxiosRequestConfig {
        return {
            headers: {
                "Authorization": this.config.TOKEN
            }
        }
    }
}

export default Discord;