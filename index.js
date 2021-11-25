require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
bot.commands = new Discord.Collection();
const botCommands = require('./commands');

Object.keys(botCommands).map(key => { //loops through the commands and add them to commands collection
    bot.commands.set(botCommands[key].name, botCommands[key]);
});

bot.login(TOKEN);

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
    const args = msg.content.split(/ +/); //split content by whitespaces
    const command = args.shift().toLowerCase();
    console.info(`Called command: ${command}`);

    if (!bot.commands.has(command)) return; //.has checks if command exists in collection; if doesnt exist, return empty

    try {
        bot.commands.get(command).execute(msg, args);//retrieve correct command + exicute
    } catch (error) {
        console.error(error);
        msg.reply('there was an error trying to execute that command!');
    }

    // module.exports = {
    //     Ping: require('./ping'),
    // };
    // module.exports = {
    //     name: 'ping',
    //     description: 'Ping!',
    //     execute(msg, args) {
    //         msg.reply('pong');
    //         msg.channel.send('pong');
    //     },
    // };

    // if (msg.content === 'ping') {
    //   msg.reply('pong');
    //   msg.channel.send('pong');
    //
    // } else if (msg.content.startsWith('!kick')) {
    //   if (msg.mentions.users.size) {
    //     const taggedUser = msg.mentions.users.first();
    //     msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
    //   } else {
    //     msg.reply('Please tag a valid user!');
    //   }
    // }
});
