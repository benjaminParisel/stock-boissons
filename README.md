# BCG — Mouvements Buvette

Petite page web pour enregistrer les entrées/sorties de boissons de la buvette
directement dans un Google Sheet (via Google Apps Script), déployée sur
Cloudflare Pages.

## Fichiers

- `index.html` — la page (structure + JS)
- `style.css` — le CSS
- `logo.png` — logo affiché en header + favicon
- `_worker.js` — Cloudflare Pages Function : injecte les variables
  d'environnement dans `index.html` au moment de servir la page
- `.env` — variables en local (non commité)

## Variables d'environnement

| Variable          | Rôle                                                              |
|-------------------|--------------------------------------------------------------------|
| `APPS_SCRIPT_URL` | URL du déploiement Google Apps Script (Déployer > Application Web) |
| `ACCESS_KEY`      | Clé requise dans l'URL (`?acces=CLE`) pour déverrouiller la page    |

`index.html` contient les placeholders `__APPS_SCRIPT_URL__` et
`__ACCESS_KEY__`, remplacés à la volée par `_worker.js` à partir de
`env.APPS_SCRIPT_URL` / `env.ACCESS_KEY`.

## Développement local

```bash
python3 -m http.server 8000
```

Puis ouvrir `http://localhost:8000/?acces=__ACCESS_KEY__` (le placeholder
brut, puisque `_worker.js` n'est pas exécuté par un simple serveur statique).

Pour tester avec les vraies variables et `_worker.js` comme en prod :

```bash
npx wrangler pages dev . --binding APPS_SCRIPT_URL=... --binding ACCESS_KEY=...
```

## Déploiement Cloudflare Pages

1. Connecter le repo à un projet Cloudflare Pages (build command: aucun,
   dossier de sortie: `.`).
2. Dans Settings > Environment variables, définir `APPS_SCRIPT_URL` et
   `ACCESS_KEY` (Production et Preview).
3. Déployer — `_worker.js` est détecté automatiquement à la racine.

Partager ensuite l'URL sous la forme `https://votre-site.pages.dev/?acces=VOTRE_CLE`
(par exemple encodée dans un QR code).

⚠️ La protection par clé est légère (côté navigateur) : elle évite que la
page traîne publiquement, ce n'est pas un vrai système de sécurité.
