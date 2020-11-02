const { MessageEmbed } = require("discord.js");
module.exports = {

    name: 'hug',
    description: 'You want to hug someone?',
    usage: '<User>',
    execute(message, args){
        if (!args[0]){
            return message.channel.send(`Aww..${message.author.username} hugged theirself`);
        } else {
            let user = message.mentions.members.first();
            let myEmbed = new MessageEmbed()
                .setDescription(`${message.author.username} hugged ${user}, So cute~`)
                .setImage('https://media.tenor.com/images/afbc39fcc4cbe67d9622f657d60d41cf/tenor.gif')

            return message.channel.send(myEmbed);
        }

    }
}