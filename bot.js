const Discord = require('discord.js');
const fs = require("fs");
const client = new Discord.Client();
const images = JSON.parse(fs.readFileSync("./pokemonrefs.json", "utf8"));

var myList = [];
var interval;
var spamid = [];
var infoid = [];
var curr = 0;
var testchannel = "436971996736258049";

var listado = ["mew", "mewtwo", "rayquaza", "moltres", "articuno", "celebi", "zenaora", "necrozma", "poipole", 
    "marshadow", "zygarde", "lugia", "cosmog", "kyurem", "solgaleo", "latios", "latias", "silvally", "giratina", 
    "lunala", "kyogre", "stakataka", "dialga", "cosmoem", "suicune", "tapu koko", "zekrom", "zapdos", "regigigas", 
    "palkia", "reshiram", "xerneas", "entei", "nihilego", "yveltal", "heatran", "guzzlord", "kartana", "pheromosa", 
    "raikou", "landorus", "cresselia", "thundurus", "tapu lele", "tornadus", "cobalion", "regirock", "tapu fini", 
    "xurkitree", "tapu bulu", "regice", "registeel", "virizion", "mesprit", "azelf", "uxie", "terrakion",
    "metang", "metagross"];

/*function step() {
    if (spamid.length > 0) {
        if (curr >= spamid.lenght) {
            curr = 0;
        }
        client.channels.get(spamid[curr]).send('spamming here');
        curr = curr + 1;
    }
};*/

client.on('ready', () => {
    console.log('I am ready!');
    myList = JSON.parse(fs.readFileSync("./list.json", "utf8"));
    //timer = setTimeout(step, interval);
});

client.on('message', message => {
    
    if (message.content === '$ping') {
    	message.reply('pong');
    }
    
    if (message.content === '$spam') { 
        if (spamid.indexOf(message.channel.id) < 0) {
            spamid.push(message.channel.id);
        }
        message.channel.send('spam enabled');
        
        clearInterval(interval);
        interval = setInterval(function() {
            if (spamid[curr] === undefined) {
                curr = 0;
            }
            //client.channels.get(testchannel).send('spamming into ' + spamid[curr]);
            client.channels.get(spamid[curr]).send('spamming here');
            curr++;
        }, 2000);
    }
    
    if (message.content === '$stop') {
        var index = spamid.indexOf(message.channel.id);
        if (index > -1) {
          spamid.splice(index, 1);
        }
        message.channel.send('spam disabled');
        
        clearInterval(interval);
        if (spamid.length > 0) {
            interval = setInterval(function() {
                if (spamid[curr] === undefined) {
                    curr = 0;
                }
                //client.channels.get(testchannel).send('spamming into ' + spamid[curr]);
                client.channels.get(spamid[curr]).send('spamming here');
                curr++;
            }, 2000);
        }
    }
    
    if (message.content === '$spamchannels') { 
        message.channel.send('spam channels: ' + spamid.join(' '));
    }

    if (message.content === '$info') {
        var index = infoid.indexOf(message.channel.id);
        if (index > -1) {
            infoid.splice(index, 1);
            message.channel.send('spawns info disabled');
        } else {
            infoid.push(message.channel.id);
            message.channel.send('spawns info enabled');
        }
    }

    if (message.content === '$infochannels') { 
        message.channel.send('spawns info channels: ' + infoid.join(' '));
    }
  
    if (message.content === '$list') { 
        message.channel.send('Pokemon to catch: ' + infoid.join(' '));
    }

    if (message.content.includes('$add') && message.content.split(' ').length > 1) { 
        var toadd = message.content.replace('$add ','');
        message.channel.send('Added pokemon to list: ' + toadd);
        fs.unlinkSync("./object.json");
        fs.writeFile("./object.json", JSON.stringify(myList), (err) => {
            if (err) {
                console.error(err);
                return;
            };
            console.log("File has been created");
        });
    }

    if (message.content.includes('$remove') && message.content.split(' ').length > 1) { 
        var torem = message.content.replace('$remove ','');
        message.channel.send('Added pokemon to list: ' + torem);
        fs.unlinkSync("./object.json");
        fs.writeFile("./object.json", JSON.stringify(myList), (err) => {
            if (err) {
                console.error(err);
                return;
            };
            console.log("File has been created");
        });
    }
    
    if (infoid.indexOf(message.channel.id) > -1) {
        if (message.embeds.length > 0) {
            emb = message.embeds[0];
            if (emb.title.startsWith('A wild')) {
                //message.channel.send(emb.image.url);
                name = emb.image.url.split('/').pop(-1).split('.')[0];
                //message.channel.send(images[name]);
                realname = images[name];
                if (realname.length >0) {
                    if (listado.indexOf(realname) > -1)
                        message.channel.send('p!catch ' + realname);
                    else
                        message.channel.send('A wild ' + realname + ' has appeared');
                }
            }
        }
    }
    
});


// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
