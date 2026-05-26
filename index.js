const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
});

client.once('ready', () => {
  console.log(`✅ Bot je uspešno prijavljen kao ${client.user.tag}`);
  console.log(`🎮 Spreman za rad na serveru!`);
});

client.on('messageCreate', async (message) => {
  // Ignoriši poruke od bota
  if (message.author.bot) return;

  // !test komanda - testira welcome embed
  if (message.content === '!test') {
    try {
      const welcomeChannelId = process.env.WELCOME_CHANNEL_ID;
      const welcomeChannel = await client.channels.fetch(welcomeChannelId);

      if (!welcomeChannel || !welcomeChannel.isTextBased()) {
        return message.reply('❌ Welcome kanal nije pronađen!');
      }

      // Kreiraj isti embed kao za nove članove
      const testEmbed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle(`🎉 Dobrodošao/dobrodošla ${message.author.username}!`)
        .setDescription(`Veoma nam je drago što si se pridružio/la našoj zajednici!`)
        .addFields(
          { name: '👤 Korisničko ime', value: message.author.username, inline: true },
          { name: '🎫 Discord tag', value: message.author.tag, inline: true },
          { name: '📅 Account kreiran', value: `<t:${Math.floor(message.author.createdTimestamp / 1000)}:d>`, inline: true },
          { name: '🎪 Serverski članu od', value: `<t:${Math.floor(message.member.joinedTimestamp / 1000)}:d>`, inline: true },
          { name: '👥 Broj članova na serveru', value: `${message.guild.memberCount}`, inline: true },
          { name: '💬 Pogledaj pravila', value: 'Obavezno pročitaj pravila server-a!', inline: false }
        )
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: `ID: ${message.author.id}` })
        .setTimestamp();

      // Pošalji embed u welcome kanal
      await welcomeChannel.send({ embeds: [testEmbed] });
      
      // Odgovori korisniku
      await message.reply('✅ Welcome embed je poslan u ' + welcomeChannel.toString() + '!');
      
      console.log(`✅ Test embed poslan od ${message.author.tag}`);
    } catch (error) {
      console.error('❌ Greška pri slanju test embeda:', error);
      message.reply('❌ Došlo je do greške!');
    }
  }
});

client.on('guildMemberAdd', async (member) => {
  try {
    // Dobijanje kanala za tag
    const tagChannelId = process.env.TAG_CHANNEL_ID;
    const tagChannel = await client.channels.fetch(tagChannelId);

    // Dobijanje kanala za welcome embed
    const welcomeChannelId = process.env.WELCOME_CHANNEL_ID;
    const welcomeChannel = await client.channels.fetch(welcomeChannelId);

    // ===== TAG PORUKA =====
    if (tagChannel && tagChannel.isTextBased()) {
      const tagMessage = await tagChannel.send(`${member.user} Добро дошао! 👋`);

      // Brisanje poruke nakon 3 sekunde
      setTimeout(() => {
        tagMessage.delete().catch(err => {
          console.log('❌ Greška pri brisanju tag poruke:', err.message);
        });
      }, 3000);

      console.log(`✅ Tag poruka poslana za ${member.user.tag}`);
    }

    // ===== WELCOME EMBED =====
    if (welcomeChannel && welcomeChannel.isTextBased()) {
      const welcomeEmbed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle(`🎉 Dobrodošao/dobrodošla ${member.user.username}!`)
        .setDescription(`Veoma nam je drago što si se pridružio/la našoj zajednici!`)
        .addFields(
          { name: '👤 Korisničko ime', value: member.user.username, inline: true },
          { name: '🎫 Discord tag', value: member.user.tag, inline: true },
          { name: '📅 Account kreiran', value: `<t:${Math.floor(member.user.createdTimestamp / 1000)}:d>`, inline: true },
          { name: '🎪 Serverski članu od', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:d>`, inline: true },
          { name: '👥 Broj članova na serveru', value: `${member.guild.memberCount}`, inline: true },
          { name: '💬 Pogledaj pravila', value: 'Obavezno pročitaj pravila server-a!', inline: false }
        )
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: `ID: ${member.id}` })
        .setTimestamp();

      await welcomeChannel.send({ embeds: [welcomeEmbed] });
      console.log(`✅ Welcome embed poslan za ${member.user.tag}`);
    }

  } catch (error) {
    console.error('❌ Greška pri dočekivanju novog člana:', error);
  }
});

// Error handling
client.on('error', error => {
  console.error('❌ Discord.js greška:', error);
});

process.on('unhandledRejection', error => {
  console.error('❌ Neobrađena greška:', error);
});

// Login
client.login(process.env.DISCORD_TOKEN);
