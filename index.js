const request = require("request");
const Discord = require("discord.js");
/**
 * @param {ip} server's ip.
*/
function getServerInfo(ip) {
  return new Promise(function(sendSuccess, sendError) {
    var server = {};
    request(`http://${ip}/info.json`, (error, data, body) => {
      if (error) {
        sendError(error);
        return;
      }
      server.infos = JSON.parse(body);

      request(`http://${ip}/players.json`, function(error, response, body) {
        if (error) {
          sendError(error);
          return;
        }
        server.players = JSON.parse(body);
        sendSuccess(server);
      });
    });
  });
}

function getTemplateServerStats(ip, channelID, messageID, client) {
  request(`http://${ip}/players.json`, function(error, response, body) {
   
  });
}

module.exports.getServerInfo = getServerInfo;
module.exports.getTemplateServerStats = getTemplateServerStats;