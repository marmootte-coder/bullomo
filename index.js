import { Client, GatewayIntentBits, EmbedBuilder } from 'discord.js';
import cron from 'node-cron';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { config } from 'dotenv';

config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
  ],
});

// Fichier pour stocker les données
const DATA_FILE = './data.json';

// Initialiser ou charger les données
function loadData() {
  if (existsSync(DATA_FILE)) {
    return JSON.parse(readFileSync(DATA_FILE, 'utf-8'));
  }
  return { users: {} };
}

function saveData(data) {
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Messages d'encouragement
const ENCOURAGEMENTS_AVANCEE = [
  "Bravo ! Chaque mot compte, tu avances merveilleusement bien !",
  "Tu es incroyable ! Continue comme ça !",
  "Wow ! Tu fais un travail magnifique !",
  "C'est génial ! Tu progresses à ton rythme et c'est parfait !",
  "Félicitations ! Tu prends soin de ton projet et c'est beau !",
];

const ENCOURAGEMENTS_SANS_AVANCEE = [
  "Aujourd'hui tu as pris soin de toi, et c'est une victoire en soi !",
  "Se reposer fait partie du processus créatif. Tu es parfait·e comme tu es !",
  "Chaque jour où tu survives est une réussite. Je suis fier·e de toi !",
  "Prendre une pause, c'est aussi avancer. Tu gères comme un·e champion·ne !",
  "Tu existes, tu résistes, et c'est déjà énorme. Bravo !",
  "Pas de mots aujourd'hui ? Pas grave ! Tu es toujours aussi précieux·se !",
];

const AFFIRMATIONS = [
  "Tu es capable et tu mérites de réussir.",
  "Ton rythme est le bon rythme.",
  "Tu as le droit de faire des pauses.",
  "Chaque petit pas compte, même les plus petits.",
  "Tu es plus fort·e que tu ne le penses.",
  "Prendre soin de toi n'est pas égoïste, c'est nécessaire.",
  "Tu as le droit d'être imparfait·e.",
  "Ta créativité est précieuse, quelle que soit sa forme.",
];

let data = loadData();

// Fonction pour obtenir ou créer un utilisateur
function getUser(userId) {
  if (!data.users[userId]) {
    data.users[userId] = {
      goal: 0,
      totalWords: 0,
      dailyProgress: {},
      startDate: new Date().toISOString().split('T')[0],
    };
    saveData(data);
  }
  return data.users[userId];
}

// Fonction pour calculer les stats
function calculateStats(user) {
  const today = new Date().toISOString().split('T')[0];
  const startDate = new Date(user.startDate);
  const currentDate = new Date();
  const daysElapsed = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const daysRemaining = daysInMonth - daysElapsed;

  const wordsRemaining = Math.max(0, user.goal - user.totalWords);
  const wordsPerDay = daysRemaining > 0 ? Math.ceil(wordsRemaining / daysRemaining) : 0;
  const todayWords = user.dailyProgress[today] || 0;

  return {
    daysElapsed,
    daysRemaining,
    wordsRemaining,
    wordsPerDay,
    todayWords,
    percentage: user.goal > 0 ? Math.round((user.totalWords / user.goal) * 100) : 0,
  };
}

// Commande pour définir l'objectif
async function handleSetGoal(interaction) {
  const goal = interaction.options.getInteger('nombre');

  const user = getUser(interaction.user.id);
  user.goal = goal;
  user.startDate = new Date().toISOString().split('T')[0];
  saveData(data);

  await interaction.reply(`🎯 Ton objectif de ${goal} mots est enregistré ! Tu peux le faire ! 💪`);
}

// Commande pour ajouter des mots
async function handleAddWords(interaction) {
  const words = interaction.options.getInteger('nombre');

  const user = getUser(interaction.user.id);
  if (user.goal === 0) {
    await interaction.reply("D'abord définis ton objectif avec `/objectif` ! 😊");
    return;
  }

  const today = new Date().toISOString().split('T')[0];
  if (!user.dailyProgress[today]) {
    user.dailyProgress[today] = 0;
  }

  user.dailyProgress[today] += words;
  user.totalWords += words;
  saveData(data);

  const stats = calculateStats(user);

  // Message d'encouragement
  const encouragement = words > 0
    ? ENCOURAGEMENTS_AVANCEE[Math.floor(Math.random() * ENCOURAGEMENTS_AVANCEE.length)]
    : ENCOURAGEMENTS_SANS_AVANCEE[Math.floor(Math.random() * ENCOURAGEMENTS_SANS_AVANCEE.length)];

  const embed = new EmbedBuilder()
    .setColor(words > 0 ? 0x00FF00 : 0xFFAA00)
    .setTitle(words > 0 ? '✨ Bravo !' : '💜 C\'est ok !')
    .setDescription(encouragement)
    .addFields(
      { name: 'Mots aujourd\'hui', value: `${stats.todayWords}`, inline: true },
      { name: 'Total', value: `${user.totalWords} / ${user.goal}`, inline: true },
      { name: 'Progression', value: `${stats.percentage}%`, inline: true },
    );

  if (stats.wordsRemaining > 0) {
    embed.addFields(
      { name: 'Reste à écrire', value: `${stats.wordsRemaining} mots`, inline: true },
      { name: 'Par jour', value: `${stats.wordsPerDay} mots`, inline: true },
    );
  } else {
    embed.addFields(
      { name: '🎉 Objectif atteint !', value: 'Tu es incroyable !', inline: false }
    );
  }

  await interaction.reply({ embeds: [embed] });
}

// Commande pour voir les stats
async function handleStats(interaction) {
  const user = getUser(interaction.user.id);

  if (user.goal === 0) {
    await interaction.reply("Tu n'as pas encore défini d'objectif ! Utilise `/objectif` pour commencer ! 😊");
    return;
  }

  const stats = calculateStats(user);

  const embed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('📊 Tes statistiques')
    .addFields(
      { name: 'Objectif', value: `${user.goal} mots`, inline: true },
      { name: 'Total écrit', value: `${user.totalWords} mots`, inline: true },
      { name: 'Progression', value: `${stats.percentage}%`, inline: true },
      { name: 'Mots aujourd\'hui', value: `${stats.todayWords}`, inline: true },
      { name: 'Reste à écrire', value: `${stats.wordsRemaining} mots`, inline: true },
      { name: 'Par jour', value: `${stats.wordsPerDay} mots`, inline: true },
      { name: 'Jours écoulés', value: `${stats.daysElapsed}`, inline: true },
      { name: 'Jours restants', value: `${stats.daysRemaining}`, inline: true },
    )
    .setFooter({ text: 'Continue à ton rythme, tu assures ! 💜' });

  await interaction.reply({ embeds: [embed] });
}

// Commande pour une affirmation
async function handleAffirmation(interaction) {
  const affirmation = AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];
  await interaction.reply(`💜 ${affirmation}`);
}

// Commande pour réinitialiser
async function handleReset(interaction) {
  const userId = interaction.user.id;
  if (data.users[userId]) {
    delete data.users[userId];
    saveData(data);
    await interaction.reply("Tes données ont été réinitialisées. Prêt·e pour un nouveau départ ! 🌟");
  } else {
    await interaction.reply("Tu n'as pas encore de données à réinitialiser !");
  }
}

// Commande d'aide
async function handleHelp(interaction) {
  const embed = new EmbedBuilder()
    .setColor(0x9B59B6)
    .setTitle('🤖 Commandes du bot')
    .setDescription('Voici tout ce que je peux faire pour t\'aider ! 💜')
    .addFields(
      { name: '/objectif', value: 'Définir ton objectif mensuel de mots' },
      { name: '/mots', value: 'Enregistrer tes mots écrits aujourd\'hui' },
      { name: '/stats', value: 'Voir tes statistiques et progression' },
      { name: '/affirmation', value: 'Recevoir une affirmation de soutien' },
      { name: '/reset', value: 'Réinitialiser tes données' },
      { name: '/aide', value: 'Afficher cette aide' },
    )
    .setFooter({ text: 'Tu vas y arriver ! Je crois en toi ! 🌟' });

  await interaction.reply({ embeds: [embed] });
}

// Gestion des interactions (Slash Commands)
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  try {
    switch (interaction.commandName) {
      case 'objectif':
        await handleSetGoal(interaction);
        break;
      case 'mots':
        await handleAddWords(interaction);
        break;
      case 'stats':
        await handleStats(interaction);
        break;
      case 'affirmation':
        await handleAffirmation(interaction);
        break;
      case 'reset':
        await handleReset(interaction);
        break;
      case 'aide':
        await handleHelp(interaction);
        break;
    }
  } catch (error) {
    console.error('Erreur lors du traitement de la commande:', error);
    const errorMessage = 'Oups ! Une erreur s\'est produite. Réessaie dans un instant ! 💜';

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(errorMessage);
    } else {
      await interaction.reply(errorMessage);
    }
  }
});

// Notification quotidienne
function sendDailyNotification() {
  const channelId = process.env.NOTIFICATION_CHANNEL_ID;
  if (!channelId) return;

  const channel = client.channels.cache.get(channelId);
  if (!channel) return;

  const affirmation = AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];

  const embed = new EmbedBuilder()
    .setColor(0xFF69B4)
    .setTitle('🌅 Bonjour !')
    .setDescription(`Un nouveau jour commence ! 💜\n\n"${affirmation}"\n\nN'oublie pas d'enregistrer tes mots avec \`/mots\` !`)
    .setFooter({ text: 'Que tu écrives ou non aujourd\'hui, tu es précieux·se !' });

  channel.send({ embeds: [embed] });
}

// Planification de la notification quotidienne
const notificationHour = process.env.NOTIFICATION_HOUR || 9;
const notificationMinute = process.env.NOTIFICATION_MINUTE || 0;

cron.schedule(`${notificationMinute} ${notificationHour} * * *`, () => {
  sendDailyNotification();
}, {
  timezone: "Europe/Paris"
});

// Démarrage du bot
client.once('ready', () => {
  console.log(`✅ Bot connecté en tant que ${client.user.tag}`);
  console.log(`📝 Prêt à accompagner les écrivain·es !`);
  console.log(`💡 N'oublie pas d'enregistrer les commandes avec: node deploy-commands.js`);
});

// Connexion
client.login(process.env.DISCORD_TOKEN);
