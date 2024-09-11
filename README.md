## Installation

Install the `discord-fivem-api` package using either npm or yarn:

```bash
$ npm install discord-fivem-api
# or
$ yarn add discord-fivem-api
```

## Usage

First, import the `DiscordFivemApi` class:

```javascript
const DiscordFivemApi = require('discord-fivem-api');
```

Next, create a new instance of the class with the desired configuration options:

```javascript
const options = {
  address: 'localhost', // IP or hostname of the FiveM server
  port: 30120,          // Port number (default: 30120)
  useStructure: true,   // Whether to use the custom `Player` and `Server` structures (default: true)
  interval: 5000,       // Interval in ms between server updates (default: 2500)
};

const api = new DiscordFivemApi(options, true); // 'true' initializes the API immediately
```

Configuration Options
The `options` object supports the following properties:
- `address` (required): The IP address or hostname of the FiveM server.
- `port` (optional, default: `30120`): The port number of the FiveM server.
- `useStructure`: (optional, default: `true`): Whether to use the custom `Player` and `Server` classes from the structures directory.
- `interval`: (optional, default: `2500`): The interval (in milliseconds) between server data updates.

The second argument (`init`) specifies whether to initialize the API immediately (`true`) or not (`false`, default).


### Methods
Once the `DiscordFivemApi` instance is created, you can use its methods to retrieve server information:

```javascript
api.getStatus()
  .then((status) => console.log(`Server status: ${status}`))
  .catch((err) => console.error(err));

api.getServerData()
  .then((serverData) => console.log(serverData))
  .catch((err) => console.error(err));

api.getServerPlayers()
  .then((players) => console.log(players))
  .catch((err) => console.error(err));

api.getPlayersOnline()
  .then((count) => console.log(`Players online: ${count}`))
  .catch((err) => console.error(err));

api.getMaxPlayers()
  .then((maxPlayers) => console.log(`Max players: ${maxPlayers}`))
  .catch((err) => console.error(err));
```

### Method Details

- `<Api>.getStatus()` Returns a promise that resolves to 'online' or 'offline'.

- `<Api>.getServerData()` Returns a promise that resolves to an object containing server information. If useStructure is true, it returns an instance of the Server class.

- `<Api>.getServerPlayers()` Returns a promise that resolves to an array of player objects. If useStructure is true, each object is an instance of the Player class.

- `<Api>.getPlayersOnline()` Returns a promise that resolves to the number of players currently online.

- `<Api>.getMaxPlayers()` Returns a promise that resolves to the server's maximum player capacity.

### Events
```javascript
api.on('ready', () => console.log('API initialized'));
api.on('readyPlayers', (players) => console.log(`Players: ${players.length}`));
api.on('readyResources', (resources) => console.log(`Resources: ${resources.length}`));
api.on('playerJoin', (player) => console.log(`${player.name} joined the server`));
api.on('playerLeave', (player) => console.log(`${player.name} left the server`));
api.on('resourceAdd', (resource) => console.log(`Resource added: ${resource}`));
api.on('resourceRemove', (resource) => console.log(`Resource removed: ${resource}`));
```

### Event Details

- `ready`: Emitted when the API is initialized.
- `readyPlayers`: Emitted when player data is available.
- `readyResources`: Emitted when resource data is available.
- `playerJoin`: Emitted when a player joins the server.
- `playerLeave`: Emitted when a player leaves the server.
- `resourceAdd`: Emitted when a new resource is added to the server.
- `resourceRemove`: Emitted when a resource is removed from the server.

## License

This package is licensed under the MIT License.