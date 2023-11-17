import axios from "axios";


export default (async (channel_id: string, message_id: string, file_name: string): Promise<string> => {
    if (!process.env.TOKEN) {
	throw "Discord token must be set in the .env file.";
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
    if (message.attachments.length < 0) {
	console.error(`The given message ( ${channel_id}/${message_id} ) has no files attached.`);
	return "";
    }

    const files = message.attachments;

    let found_link = "";
    for (let file of files) {
	if (file.filename == file_name)
	    found_link = file.url;
    }

    return found_link;
});

