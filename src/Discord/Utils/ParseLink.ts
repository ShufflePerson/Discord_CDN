import ELinkIssue from "../Types/ELinkIssue";
import ILinkData from "../Types/ILinkData";
import IParsedLink from "../Types/IParsedLink";


/**
 * Ensures the given `input` is in the right format so its possible to extract data from it. 
 * @param input Discord Download link given in any format.  
 * @returns A IParsedLink
 */
function ParseLink(input: string): IParsedLink {
    if (input.includes("?"))
        input = input.split("?")[0];

    if (input.includes("attachments/"))
        input = input.split("attachments/")[1];

    let slashParts = input.split("/");
    if (slashParts.length != 3)
        return { error: ELinkIssue.INVALID_SLASH_AMOUNT };

    const [ channelID, fileID, fileName ] = slashParts;

    if (isNaN(Number(channelID)))
        return { error: ELinkIssue.CHANNEL_ID_NAN};

    if (isNaN(Number(fileID)))
        return { error: ELinkIssue.FILE_ID_NAN};

    if (!fileName.includes("."))
        return { error: ELinkIssue.FILENAME_NO_DOT };

    return {
        error: ELinkIssue.NONE,
        data: {
            channelID: channelID,
            fileID: fileID,
            fileName
        }
    }
}


export default ParseLink;