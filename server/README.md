# `server/README.md`

# Azure IA Dashboard — Serveur (Node/Express + Azure OpenAI)

## Prérequis

- Node.js 18+ (fetch natif)
- Un compte Azure + ressource **Azure OpenAI**
- Un **déploiement** d’un modèle chat (ex. `gpt-4o-mini`)

## Installation

# Crée un fichier .env à la racine du dossier server/

AZURE_OPENAI_ENDPOINT=https://<votre-ressource>.openai.azure.com
AZURE_OPENAI_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxx
AZURE_OPENAI_DEPLOYMENT=gpt-4o-mini
AZURE_OPENAI_API_VERSION=2024-02-15-preview
PORT=8787

```

```
