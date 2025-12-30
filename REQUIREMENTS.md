# Requirements – Mistral Chat

## 🎯 Objectif

Créer une interface de chat web permettant de dialoguer avec un modèle Mistral AI via une API sécurisée.

---

## ⚙️ Fonctionnels

- Envoi de messages utilisateur
- Réception des réponses de l’IA
- Historique de conversation visible
- Envoi avec la touche Entrée
- Scroll automatique vers le dernier message
- Gestion des erreurs API

---

## 🎨 UI / UX

- Messages alignés gauche / droite
- Couleurs personnalisées (Mistral)
- Typographie simple et lisible (Arial)
- Interface responsive
- Design épuré

---

## 🔐 Sécurité

- Clé API stockée côté serveur uniquement
- Aucun secret exposé au client

---

## 🧪 Contraintes techniques

- Next.js App Router
- TypeScript obligatoire
- API route dédiée (`/api/chat`)
- Pas de librairie UI externe

---

## 🚧 Hors scope

- Authentification utilisateur
- Stockage backend des conversations
- Paiement / quota utilisateur