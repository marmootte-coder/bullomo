# 🚂 Déploiement sur Railway

Guide complet pour déployer votre bot Discord sur Railway afin qu'il tourne 24/7, même quand votre ordinateur est éteint.

## 🤔 Pourquoi Railway ?

- **Gratuit** : Railway offre 500 heures gratuites par mois (largement suffisant pour un bot Discord)
- **Toujours en ligne** : Votre bot tourne 24/7
- **Facile** : Pas besoin de connaissances en serveurs
- **Automatique** : Se met à jour automatiquement quand vous poussez du code

## 📋 Ce dont vous avez besoin

Avant de commencer :

✅ Un compte GitHub (gratuit)
✅ Un compte Railway (gratuit) - on va le créer ensemble
✅ Votre code poussé sur GitHub
✅ Votre bot Discord créé sur le Developer Portal
✅ Votre Token Discord et Application ID

---

## 🚀 Étape 1 : Créer un compte Railway

1. Allez sur https://railway.app
2. Cliquez sur "Login"
3. Choisissez "Login with GitHub"
4. Autorisez Railway à accéder à votre compte GitHub

C'est tout ! Vous avez un compte Railway.

---

## 🔗 Étape 2 : Connecter votre projet GitHub

1. Sur Railway, cliquez sur "New Project"
2. Choisissez "Deploy from GitHub repo"
3. Si c'est la première fois, autorisez Railway à accéder à vos repos GitHub
4. Sélectionnez le repository `discordbotlabo`
5. Railway va automatiquement détecter que c'est un projet Node.js

---

## ⚙️ Étape 3 : Configurer les variables d'environnement

C'est l'équivalent du fichier `.env` mais sur Railway.

1. Dans votre projet Railway, cliquez sur l'onglet "Variables"
2. Cliquez sur "Add Variable" ou "New Variable"
3. Ajoutez ces variables **UNE PAR UNE** :

### Variables OBLIGATOIRES :

**DISCORD_TOKEN**
- Valeur : Le token de votre bot Discord
- Où le trouver : https://discord.com/developers/applications → votre bot → Bot → Reset Token

**DISCORD_CLIENT_ID**
- Valeur : L'Application ID de votre bot
- Où le trouver : https://discord.com/developers/applications → votre bot → General Information → Application ID

### Variables OPTIONNELLES (pour les notifications) :

**NOTIFICATION_CHANNEL_ID**
- Valeur : L'ID du canal Discord où envoyer les notifications quotidiennes
- Comment le trouver :
  1. Discord → Paramètres → Avancés → Mode développeur (ON)
  2. Clic droit sur le canal → Copier l'identifiant

**NOTIFICATION_HOUR**
- Valeur : L'heure de la notification (0-23)
- Par défaut : 9
- Exemple : `9` pour 9h du matin

**NOTIFICATION_MINUTE**
- Valeur : Les minutes (0-59)
- Par défaut : 0
- Exemple : `30` pour XX:30

### Exemple de configuration :

```
DISCORD_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
DISCORD_CLIENT_ID=1234567890123456789
NOTIFICATION_CHANNEL_ID=9876543210987654321
NOTIFICATION_HOUR=9
NOTIFICATION_MINUTE=0
```

**⚠️ IMPORTANT** : Ne partagez JAMAIS votre DISCORD_TOKEN !

---

## 🎯 Étape 4 : Déployer !

1. Une fois les variables configurées, Railway va automatiquement déployer
2. Vous verrez des logs défiler dans l'onglet "Deployments"
3. Attendez de voir :
   ```
   🔄 Enregistrement des commandes slash...
   ✅ Commandes slash enregistrées avec succès !
   🚀 Démarrage du bot...
   ✅ Bot connecté en tant que VotreBot#1234
   📝 Prêt à accompagner les écrivain·es !
   ```

Si vous voyez ça : **BRAVO ! Votre bot est en ligne !** 🎉

---

## 🧪 Étape 5 : Inviter le bot sur votre serveur

### 🎯 IMPORTANT : Le bon lien d'invitation

**⚠️ Problème courant** : Si vous ajoutez le bot via "Clic droit sur le profil → Ajouter l'application", seules les **commandes** seront ajoutées, **pas le bot lui-même**. Du coup, le bot n'apparaît pas dans la liste des membres et les utilisateurs ne peuvent pas lui envoyer de messages privés.

**✅ Solution : Créer le bon lien d'invitation**

1. Allez sur https://discord.com/developers/applications
2. Sélectionnez votre bot
3. Cliquez sur "OAuth2" dans le menu de gauche
4. Cliquez sur "URL Generator"
5. **Cochez ces deux scopes OBLIGATOIRES** :
   - ✅ **bot** (pour que le bot soit présent sur le serveur)
   - ✅ **applications.commands** (pour les commandes slash)
6. Plus bas, cochez les permissions nécessaires :
   - ✅ Send Messages
   - ✅ Send Messages in Threads
   - ✅ Embed Links
   - ✅ Read Message History
7. Copiez l'URL générée en bas
8. Partagez **cette URL** pour inviter le bot correctement

**Exemple d'URL correcte** :
```
https://discord.com/oauth2/authorize?client_id=VOTRE_CLIENT_ID&permissions=274878286848&scope=bot%20applications.commands
```

### 🧪 Tester le bot

1. Utilisez l'URL d'invitation créée ci-dessus pour inviter le bot
2. Vérifiez que le bot apparaît dans la liste des membres (il devrait avoir un badge "BOT")
3. Tapez `/` dans un canal → vous devriez voir les commandes !
4. Essayez `/aide` pour vérifier que tout fonctionne
5. Testez l'envoi de message privé au bot (pour consulter ses stats discrètement 💜)

---

## 🔄 Mettre à jour le bot

Quand vous modifiez le code :

1. Faites vos modifications en local
2. Commitez et poussez sur GitHub :
   ```bash
   git add .
   git commit -m "Description des changements"
   git push
   ```
3. Railway détecte automatiquement le push
4. Il redéploie le bot automatiquement !

---

## 📊 Surveiller votre bot

### Voir les logs

1. Dans Railway, cliquez sur votre projet
2. Allez dans l'onglet "Deployments"
3. Cliquez sur le dernier déploiement
4. Vous voyez tous les logs en temps réel

### Redémarrer le bot

Si besoin de redémarrer :
1. Onglet "Deployments"
2. Cliquez sur les 3 points "..."
3. "Restart"

---

## 💰 Combien ça coûte ?

Railway offre **500 heures gratuites par mois** + 5$ de crédit.

Un bot Discord utilise environ **720 heures par mois** (24h × 30 jours).

**Solution** :
- Avec les 5$ de crédit gratuit, vous avez largement de quoi tourner
- Railway ne facture que les heures utilisées au-delà du gratuit
- Pour un petit bot comme celui-ci, ça reste dans le gratuit ou quelques centimes par mois

**Alternative gratuite à 100%** :
Si vous dépassez, vous pouvez aussi utiliser :
- Render.com (gratuit mais se met en veille après 15 min d'inactivité)
- Fly.io (3 machines gratuites)

---

## ❌ Dépannage

### Le bot ne démarre pas

**Vérifiez les logs** :
- Railway → Deployments → Dernier déploiement → Logs
- Lisez l'erreur affichée

**Erreurs courantes** :

#### "Invalid token"
→ Le DISCORD_TOKEN est incorrect
→ Solution : Régénérez le token sur Discord Developer Portal et mettez-le à jour dans Railway

#### "Cannot find module"
→ Problème avec les dépendances
→ Solution : Vérifiez que `package.json` contient toutes les dépendances

#### "DISCORD_CLIENT_ID is not defined"
→ Vous avez oublié d'ajouter cette variable
→ Solution : Ajoutez-la dans Variables

### Les commandes n'apparaissent pas

1. Vérifiez les logs : voyez-vous "✅ Commandes slash enregistrées avec succès" ?
2. Si non, vérifiez DISCORD_CLIENT_ID
3. Si oui, attendez 5 minutes et fermez/rouvrez Discord
4. Vérifiez que le bot a bien le scope `applications.commands` quand vous l'avez invité

### Le bot se déconnecte

- Railway peut redémarrer les applications de temps en temps (c'est normal)
- Le bot se reconnecte automatiquement
- Si ça arrive trop souvent, vérifiez les logs pour voir s'il y a des erreurs

---

## 🔐 Sécurité

✅ **À FAIRE** :
- Gardez votre token secret
- Ne commitez JAMAIS le fichier `.env` sur GitHub (il est dans `.gitignore`)
- Utilisez les variables d'environnement de Railway

❌ **À NE PAS FAIRE** :
- Partager votre token
- Mettre le token directement dans le code
- Publier des screenshots avec le token visible

---

## 🎉 C'est fini !

Votre bot tourne maintenant 24/7 sur Railway !

Vous pouvez :
- ✅ Éteindre votre ordinateur
- ✅ Utiliser les commandes Discord à tout moment
- ✅ Recevoir les notifications quotidiennes
- ✅ Mettre à jour le code facilement

**Profitez de votre bot bienveillant !** 💜

---

## 📚 Ressources

- Documentation Railway : https://docs.railway.app
- Discord Developer Portal : https://discord.com/developers/applications
- Support Railway : https://railway.app/help

---

## 💡 Astuce : Développement local vs Production

**Pour développer en local** (sur votre ordi) :
```bash
npm run start:local
```
Cela lance juste le bot sans enregistrer les commandes.

**Pour tester comme sur Railway** (enregistrement + bot) :
```bash
npm start
```

Sur Railway, c'est toujours `npm start` qui est utilisé.
