
const Discord = require('discord.js');
 attachment = new Discord.MessageAttachment('./src/pingping1.gif');
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: 'ping',
    cooldown: 5,
    description: 'Just a Ping Command',
    execute(message, args){
        let targetMember = message.mentions.members.first();        
        if(!args[0])
        return message.channel.send('Pong!');
        else{
            let pingEmbed = new MessageEmbed()
                .setDescription(`Ring Ring ${targetMember}!!, ${message.author.username} is Pinging you!!`)
                .setColor("#EB338B")
                .attachFiles(attachment)
                .setImage('attachment://pingping1.gif')
            message.channel.send(pingEmbed);
        }
    }
}