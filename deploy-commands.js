import { REST, Routes } from 'discord.js';
import { config } from 'dotenv';

config();

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

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

try {
  console.log('🔄 Enregistrement des commandes slash...');

  await rest.put(
    Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
    { body: commands },
  );

  console.log('✅ Commandes slash enregistrées avec succès !');
  console.log('📝 Commandes disponibles :');
  commands.forEach(cmd => console.log(`   /${cmd.name} - ${cmd.description}`));
} catch (error) {
  console.error('❌ Erreur lors de l\'enregistrement des commandes:', error);
}
