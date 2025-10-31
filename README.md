# Bullomo

Bot Discord bienveillant pour le **BulloNo** et le **BulloVri** (notre alternative éthique au NaNoWriMo).
Francophone

## Philosophie

Bullomo célèbre **autant vos avancées que vos non-avancées**. Parce que s'aimer quand on n'a pas produit, c'est une victoire aussi.

- ✍️ Suivi d'objectifs d'écriture mensuels
- 💙 Messages de soutien quotidiens
- 🎉 Félicitations pour TOUTES les progressions (même zéro mot)
- 🛡️ Anti-burn-out et santé mentale avant productivité

## Contexte

Mini bot sans prétention pour commu pleurant un peu le Nano sans vouloir monter un truc méga complexe, pour écriture loisir, aligné avec nos valeurs de soutien et d'inclusivité. 

## Fonctionnalités

### Commandes disponibles

- `/objectif [nombre]` - Définir votre objectif mensuel de mots
- `/mots [nombre]` - Enregistrer vos mots écrits (même si c'est 0 !)
- `/stats` - Consulter votre progression
- `/changer-mon-objectif [nombre]` - Changer votre objectif en cours de route (avec détection automatique si vous l'aviez atteint)
- `/affirmation` - Recevoir un message de soutien
- `/reset` - Réinitialiser complètement vos données
- `/aide` - Afficher l'aide

### Fonctionnalités automatiques

- 🔔 Notification quotidienne pour encourager l'enregistrement
- 💬 Messages personnalisés selon votre progression
- 📊 Calcul automatique de mots restants et moyenne quotidienne

## Installation pour les gens qui savent coder

Vous savez faire.


## Installation pour les newbies burnoutés

1. Copier ce repository
2. Créez un compte sur une solution cloud qui simplifie le déploiement et l'hébergement d'applications web, APIs ou microservicesRailway.app (nous on utilise Railway - ce n'est pas de la pub - c'est de la survie entre newbies)
3. Importez ce repository depuis GitHub
4. Ajoutez les variables d'environnement (DISCORD_TOKEN, DISCORD_CLIENT_ID, CHANNEL_ID, NOTIFICATION_HOUR, NOTIFICATION_MINUTE)
5. Lancez le déploiement automatique

**⚠️ IMPORTANT pour l'invitation du bot :**
Ne pas utiliser "Clic droit → Ajouter l'application" ! Cela ajoute uniquement les commandes, pas le bot. Utilisez le lien d'invitation OAuth2 avec les scopes `bot` + `applications.commands`. Voir `DEPLOIEMENT_RAILWAY.md` pour les détails.

## État du projet

**Version actuelle : 1.2 (Novembre 2024)**

Version fonctionnelle mais basique. Les données sont stockées en mémoire (redémarrage = perte des données). 

**Améliorations prévues (Décembre 2024) :**
- Persistence des données (base de données)
- Affirmations personnalisables depuis Google Doc
- Graphiques de progression
- Et toutes vos suggestions !

## Contribuer

Ce projet est ouvert aux contributions ! 

- 🐛 Signalez des bugs via les Issues
- 💡 Proposez des fonctionnalités
- 🔧 Soumettez des Pull Requests
- 💬 Partagez vos retours d'expérience

## Licence

**GNU General Public License v3.0**

Vous êtes libre de copier, modifier et partager ce code, **à condition que vos modifications restent également open-source**. Usage commercial autorisé uniquement si le code reste ouvert.

→ Pas d'appropriation privative. Les communs restent communs.

## Crédits

- Idée et supervision, avec amour et rage, par **marmootte-coder**
- Développé avec l'aide de **Claude** (Anthropic)
- Pour la communauté des écrivain·es qui refusent la culture du burn-out
- Inspiré par l'univers partagé des "bullobouilles" (nos machines à laver magiques)

## Communauté

Bullomo fait partie de l'écosystème **BulloNo**, notre alternative communautaire au NaNoWriMo. Si vous utilisez ce bot, n'hésitez pas à partager votre expérience !

---

*Écrivez à votre rythme. Célébrez chaque mot. Prenez soin de vous.* ✨
