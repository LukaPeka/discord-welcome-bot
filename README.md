# 🤖 Discord Welcome Bot

Discord bot koji automatski dobrodošlice nove članove sa tagom i welcome embedom.

## 📋 Funkcionalnosti

✅ **Tagovanje novog člana** - Kada novi member uđe, bot će ga tagati u određenom kanalu  
✅ **Automatsko brisanje taga** - Tag će biti obrisan nakon 3 sekunde  
✅ **Welcome Embed** - Lepa welcome poruka sa informacijama o članu u drugom kanalu  

## 🚀 Instalacija

### 1. Kloniraj repozitorij
```bash
git clone https://github.com/LukaPeka/discord-welcome-bot.git
cd discord-welcome-bot
```

### 2. Instaliraj zavisnosti
```bash
npm install
```

### 3. Kreiraj `.env` fajl
Napravi `.env` fajl u root direktorijumu i dodaj:
```
DISCORD_TOKEN=tvoj_bot_token
CLIENT_ID=tvoj_client_id
GUILD_ID=tvoj_server_id
TAG_CHANNEL_ID=id_kanala_za_tag
WELCOME_CHANNEL_ID=id_kanala_za_welcome
```

### 4. Pokreni bot
```bash
npm start
```

Za razvoj sa automatskim restartovanjem:
```bash
npm run dev
```

## 📝 Kako dobiti potrebne IDs?

### 1. **Discord Token**
- Idi na https://discord.com/developers/applications
- Klikni "New Application"
- Idi na "Bot" → "Add Bot"
- Klikni "Copy" pod "TOKEN"

### 2. **Client ID**
- U istoj aplikaciji, idi na "General Information"
- Kopiraj "Application ID"

### 3. **Guild ID (Server ID)**
- Otvori Discord
- Desni klik na server → "Copy Server ID"
- Trebam da imaš Developer Mode uključen (User Settings → Advanced → Developer Mode)

### 4. **Channel IDs**
- Desni klik na kanal → "Copy Channel ID"
- Trebam Developer Mode da bude uključen

## 🔧 Postavke Bot-a

### Permissions
Bot trebam ove dozvole:
- ✅ Send Messages
- ✅ Embed Links
- ✅ Read Message History
- ✅ View Channels

### OAuth2 Scopes
- ✅ bot
- ✅ applications.commands

### Intent-i
Bot koristi sledeće intent-e:
- Guilds
- Guild Members
- Message Content

## 📂 Struktura projekta

```
discord-welcome-bot/
├── index.js              # Glavni fajl bota
├── package.json          # Zavisnosti
├── .env.example          # Primer .env fajla
├── .gitignore            # Git ignore fajl
└── README.md             # Ova datoteka
```

## 🎨 Personalizacija

### Promen Taga
Otvori `index.js` i pronađi liniju:
```javascript
const tagMessage = await tagChannel.send(`${member.user} добро дошао! 👋`);
```
Promeni poruku kako želiš.

### Promen Welcome Embeda
U `index.js` pronađi `welcomeEmbed` objekat i prilagodi boje, tekst, polja itd.

### Promen vremena brisanja taga
Pronađi:
```javascript
setTimeout(() => {
  tagMessage.delete().catch(err => console.log('Greška pri brisanju poruke:', err));
}, 3000); // 3000ms = 3 sekunde
```
Promeni `3000` na željeno vrijeme u milisekundama.

## 🐛 Troubleshooting

**Bot se ne konektuje:**
- Provjeri da li je token ispravan u `.env`
- Provjeri da li je bot dodat na server
- Restartaj bot (`npm start`)

**Bot ne vidi kanale:**
- Provjeri IDs kanala (trebaju biti tačni)
- Provjeri da li bot ima dozvole za čitanje/pisanje u tim kanalima

**Poruke se ne brišu:**
- Provjeri da li bot ima dozvolu "Manage Messages"
- Provjeri log greške u konzoli

## 📚 Korisni linkovi

- [Discord.js Dokumentacija](https://discord.js.org/)
- [Discord Developer Portal](https://discord.com/developers/applications)
- [Discord API Dokumentacija](https://discord.com/developers/docs/intro)

## 📄 Licenca

MIT - Slobodno koristi za svoje projekte!

---

**Kreirao:** LukaPeka  
**Verzija:** 1.0.0
