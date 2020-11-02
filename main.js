const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
const cooldowns = new Discord.Collection();
const config = require('./config');
const { cooldown } = require('./commands/ping');

const {prefix, token} = require('./config');

client.login(token);
client.on('ready', () =>{
    console.log(`${client.user.tag} has logged in.`);
    client.user.setActivity("!help"); 
})

client.on('message', message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;
    if(command.args && !args.length){
        let reply = (`You didn't provide any Arguments, ${message.author}!`);
        if (command.usage){
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send(reply)
    }

    if (!cooldowns.has(command.name)){
        cooldowns.set(command.name, new Discord.Collection())
    }


    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)){
        const expirationTime = timestamps.get(message.author.id)+ cooldownAmount;

        if (now < expirationTime){
            const timeLeft = (expirationTime - now)/1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`)
        }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    try {
        command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
    }
    
})