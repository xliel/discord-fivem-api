# Discord-Fivem-Api
Small package in order to interact with FiveM API

**How-to install :**

```
npm i discord-fivem-api
```

**NPM:** [npmjs.com/discord-fivem-api](https://www.npmjs.com/package/discord-fivem-api)
**Support** https://discord.gg/dpC3TS4dRk

**How-to use :** 
Here is an example to display the number of players online on a server.
(default port is 30120)

```js
const fivem = require("discord-fivem-api");
const server = new fivem.DiscordFivemApi("000.000.00.00:30120");
server.getPlayersOnline().then((res) => console.log(res));
```

# Requests :
- host - Hostname or IP of the game server.
- port - Query port for the game server. (default port is 30120)
- getServerStatus - Get server status of the server (online/offline)

- getPlayers - All players in the server. (array of objects)
- getPlayersOnline - Number of players online in the server.
- getMaxPlayers - Get the maximum amount of players that are able to join the server.

- getServerResources - Get all resource names of the server resources.
- getServerLocale - The language of the server.
- getServerVersion - Get version od the server.
- getServerTags - Get all tags of the server.
- getLicenseKey - The license key for the server.

# **Example Server Stats** :

```js
const Discord = require("discord.js");
const client = new Discord.Client({ intents: Object.keys(Discord.Intents.FLAGS) });
const fivem = require("discord-fivem-api");
const server = new fivem.DiscordFivemApi("000.000.00.00:30120");

client.on("ready", () => {
   console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
 if (!message.guild || message.author.bot) return;
 if (message.content === '!stats') {
    server.getPlayers().then(async(data) => {
      let result  = [];
      let index = 1;
      for (let player of data) {
        result.push(`${index++}. ${player.name} | ${player.id} ID | ${player.ping} ping\n`);
      }
      const embed = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setAuthor("Server is online")
        .setTitle(`Players (${data.length}/${(await server.getPlayersOnline())})`)
        .setDescription(result.length > 0 ? result : 'No Players Online!')
        .setTimestamp();
      message.channel.send({ embeds: [embed] });
    }).catch((err) => {
      const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setAuthor("Server is offline")
      .setTimestamp();
    message.channel.send({ embeds: [embed] });
    });
 }
});

client.login("BOT_TOKEN");
```

### Preview
![FivemStats](https://cdn.discordapp.com/attachments/621111828025573396/771737140227866635/unknown.png)
