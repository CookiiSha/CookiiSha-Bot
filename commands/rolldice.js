module.exports = {
    name: 'rolldice',
    aliases: ['roll', 'dice', 'diceroll'],
    usage: '<Amount>',
    description: 'Roll the Dice..',
    execute(message, args){
        const amount = parseInt(args[0]) || 6;
        const roll = () => Math.floor(Math.random() * amount + 1);
        return message.reply("rolled a " + roll());
    }
}