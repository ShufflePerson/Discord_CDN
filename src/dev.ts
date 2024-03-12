import Discord from "./Discord/Discord";
import getConfig from "./config";

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