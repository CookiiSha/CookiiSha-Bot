const { MessageEmbed } = require("discord.js");
const { prefix } = require('../config.json');
module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Display all commands and descriptions",
  execute(message) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
      .setTitle("CookiiSha Bot Help")
      .setDescription("List of all commands")
      .setColor("#EB338B");

    commands.forEach((cmd) => {
      helpEmbed.addField(
        `**${prefix}${cmd.name} ${cmd.aliases ? `(${cmd.aliases})` : ""}**`,
        `${cmd.description}`,
        true
      );
    });

    helpEmbed.setTimestamp();

    return message.channel.send(helpEmbed).catch(console.error);
  }
};