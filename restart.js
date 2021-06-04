const Discord = require("discord.js")
const moment = require('moment');


exports.run = async (client, message, args) => {

  const onayembed = new Discord.MessageEmbed()
  .setColor("RED")
  .setTimestamp()
  .setAuthor("Restart Komutu")
  .setFooter("Onaylamak için ✅ emojisine, Red etmek içinse ❌ emojisine tıklayabilirsiniz")
  .setDescription("**UYARI!** \n\nEğer Reboot işlemini onaylarsanız **bot yeniden başlatılacak**")
  message.channel.send(onayembed).then(msg => {
msg.react('✅').then(() => msg.react('❌'));

const filter = (reaction, user) => {
	return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
};

msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '✅') {
     message.channel.send(`**Bot yeniden başlatılıyor...**`)
     console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Bot yeniden başlatılıyor...`)
     process.exit(1);
		} else {
			message.reply('reboot işlemi iptal edildi!');
      msg.delete({timeout:3000})
		}
	})
	.catch(collected => {
		message.reply('Bir hatayla karşılaştık! Lütfen daha sonra tekrar deneyiniz.');
	});
  
})

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 3,
  kategori: "yönetim"
};

exports.help = { 
	name: 'reboot', 
  description: "reboot",
  usage: 'reboot'
}