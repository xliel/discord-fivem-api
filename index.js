const fetch = require('node-fetch');

class DiscordFivemApi {
    constructor(ip) {
        if (!ip) throw Error('Please provide a serverIP and serverPort. Need Help? Check Out: https://discord.gg/dpC3TS4dRk');
        this.ip = ip;
    }

    host() {
        const split = this.ip.split(':')
        return split[0];
    };

    port() {
        const split = this.ip.split(':')
        if (split.length >= 2) {
            return split[1];
        }
    };

    getServerStatus() {
        return new Promise((sendSuccess, sendError) => {
            fetch(`http://${this.ip}/info.json`).then((res) => res.json()).then((body) => {
                sendSuccess('online');
            }).catch((err) => {
                sendSuccess('offline')
            });
        });
    }

    getPlayers() {
        return new Promise((sendSuccess, sendError) => {
            fetch(`http://${this.ip}/players.json`).then((res) => res.json()).then((body) => {
                sendSuccess(body);
            }).catch((err) => {
                sendError(err);
            });
        });
    };

    getPlayersOnline() {
        return new Promise((sendSuccess, sendError) => {
            fetch(`http://${this.ip}/players.json`).then((res) => res.json()).then((body) => {
                sendSuccess(body.length);
            }).catch((err) => {
                sendError(err);
            });
        });
    };

    getMaxPlayers() {
        return new Promise((sendSuccess, sendError) => {
            fetch(`http://${this.ip}/info.json`).then((res) => res.json()).then((body) => {
                sendSuccess(body.vars.sv_maxClients);
            }).catch((err) => {
                sendError(err);
            });
        });
    };

    getServerResources() {
        return new Promise((sendSuccess, sendError) => {
            fetch(`http://${this.ip}/info.json`).then((res) => res.json()).then((body) => {
                sendSuccess(body.resources);
            }).catch((err) => {
                sendError(err);
            });
        });
    };

    getServerLocale() {
        return new Promise((sendSuccess, sendError) => {
            fetch(`http://${this.ip}/info.json`).then((res) => res.json()).then((body) => {
                sendSuccess(body.vars.locale);
            }).catch((err) => {
                sendError(err);
            });
        });
    };

    getServerTags() {
        return new Promise((sendSuccess, sendError) => {
            fetch(`http://${this.ip}/info.json`).then((res) => res.json()).then((body) => {
                sendSuccess(body.vars.tags);
            }).catch((err) => {
                sendError(err);
            });
        });
    };

    getServerVersion() {
        return new Promise((sendSuccess, sendError) => {
            fetch(`http://${this.ip}/info.json`).then((res) => res.json()).then((body) => {
                sendSuccess(body.version);
            }).catch((err) => {
                sendError(err);
            });
        });
    };

    getLicenseKey() {
        return new Promise((sendSuccess, sendError) => {
            fetch(`http://${this.ip}/info.json`).then((res) => res.json()).then((body) => {
                sendSuccess(body.vars.sv_licenseKeyToken);
            }).catch((err) => {
                sendError(err);
            });
        });
    };
};

module.exports.DiscordFivemApi = DiscordFivemApi;
