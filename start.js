import { REST, Routes } from 'discord.js';
import { config } from 'dotenv';
import { spawn } from 'child_process';

config();

// Commandes à enregistrer
const commands = [
  {
    name: 'objectif',
    description: 'Définir ton objectif mensuel de mots',
    options: [
      {
        name: 'nombre',
        description: 'Nombre de mots à atteindre',
        type: 4, // INTEGER
        required: true,
        min_value: 1,
      },
    ],
  },
  {
    name: 'mots',
    description: 'Enregistrer tes mots écrits aujourd\'hui',
    options: [
      {
        name: 'nombre',
        description: 'Nombre de mots écrits',
        type: 4, // INTEGER
        required: true,
        min_value: 0,
      },
    ],
  },
  {
    name: 'stats',
    description: 'Voir tes statistiques et progression',
  },
  {
    name: 'affirmation',
    description: 'Recevoir une affirmation de soutien',
  },
  {
    name: 'changer-mon-objectif',
    description: 'Changer ton objectif mensuel de mots',
    options: [
      {
        name: 'nombre',
        description: 'Nouveau nombre de mots à atteindre',
        type: 4, // INTEGER
        required: true,
        min_value: 1,
      },
    ],
  },
  {
    name: 'reset',
    description: 'Réinitialiser complètement tes données',
  },
  {
    name: 'aide',
    description: 'Afficher l\'aide',
  },
];

async function deployCommands() {
  try {
    console.log('🔄 Enregistrement des commandes slash...');

    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

    await rest.put(
      Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
      { body: commands },
    );

    console.log('✅ Commandes slash enregistrées avec succès !');
    return true;
  } catch (error) {
    console.error('❌ Erreur lors de l\'enregistrement des commandes:', error);
    return false;
  }
}

async function startBot() {
  console.log('🚀 Démarrage du bot...');

  // Lancer index.js
  const bot = spawn('node', ['index.js'], {
    stdio: 'inherit',
  });

  bot.on('error', (error) => {
    console.error('❌ Erreur lors du démarrage du bot:', error);
    process.exit(1);
  });

  bot.on('exit', (code) => {
    console.log(`Bot arrêté avec le code ${code}`);
    process.exit(code);
  });
}

// Enregistrer les commandes puis démarrer le bot
deployCommands()
  .then((success) => {
    if (success) {
      startBot();
    } else {
      console.error('❌ Impossible de démarrer le bot sans enregistrer les commandes');
      process.exit(1);
    }
  });
