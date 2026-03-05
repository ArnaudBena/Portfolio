# CLAUDE.md — Portfolio Arnaud BENACQUISTA
> Brief de développement — Version 2 — Mars 2026
> Lire ce fichier en intégralité avant d'écrire la moindre ligne de code.

---

## 1. CONTEXTE

**Propriétaire :** Arnaud BENACQUISTA  
**Ville :** Metz  
**Situation :** En reconversion professionnelle. Formation Concepteur Développeur d'Application (CDA) à Metz Numeric School. Spécialisation Java / Spring Boot.  
**Objectif :** Portfolio one-page pour se présenter auprès de recruteurs et clients. Candidature en recherche de stage (2 mois) et d'alternance.  
**Site de référence structurelle :** https://said.contact — s'en inspirer pour la structure, le scroll, l'organisation des sections. Ne pas copier sa charte graphique (fond blanc + orbes pastel). La nôtre est dark glassmorphism.

---

## 2. STACK TECHNIQUE

| Élément        | Choix                                                                 |
|----------------|-----------------------------------------------------------------------|
| HTML           | HTML5 sémantique, fichier unique `index.html`                        |
| CSS            | Tailwind CSS via CDN + balise `<style>` pour glassmorphism et keyframes |
| JS             | Vanilla JS, fichier `app.js` à la racine                             |
| Fonts          | Google Fonts : `Syne` (titres) + `DM Sans` (corps)                  |
| Icons          | Font Awesome 6 via CDN                                               |
| Logos technos  | SVG via CDN `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/`    |
| Formulaire     | FormSubmit.co — conserver l'action existante                         |
| Page merci     | `thanks.html` à refaire avec le même style                           |

**Aucun npm. Aucun build tool. Le site doit fonctionner en ouvrant index.html dans un navigateur.**

---

## 3. STRUCTURE DES FICHIERS

```
/
├── index.html
├── thanks.html
├── claude.md                        ← ce fichier
│
├── assets/
│   ├── css/
│   │   └── style.css                ← styles custom (glassmorphism, keyframes, variables)
│   ├── js/
│   │   └── app.js                   ← tout le JS vanilla
│   ├── img/
│   │   ├── avatar.jpeg              ← photo portrait (section Hero)
│   │   ├── person.jpg               ← photo décontractée (section À propos)
│   │   └── projects/                ← screenshots des projets (à ajouter par Arnaud)
│   ├── fonts/                       ← réservé si fonts locales un jour
│   └── docs/
│       └── cv-arnaud-benacquista.pdf ← CV à déposer par Arnaud
│
└── favicons/
    ├── favicon16x16.png
    ├── favicon32x32.png
    ├── androidchrome192x192.png
    ├── androidchrome512x512.png
    └── appletouchicon.png
```

> Les chemins dans `index.html` doivent refléter cette structure.
> Exemples : `href="./assets/css/style.css"`, `src="./assets/js/app.js"`, `src="./assets/img/avatar.jpeg"`

---

## 4. DESIGN SYSTEM — "Deep Space Glass"

### 4.1 Philosophie
Glassmorphism inspiré de visionOS / iOS 18 Apple. Ambiance : développeur dans le noir, univers spatial, élégance sobre. L'identité doit être mémorable et professionnelle. Référence visuelle : Apple Vision Pro UI.

### 4.2 Variables CSS

```css
:root {
  --bg-base:        #0a0a12;
  --bg-surface:     #0f0f1a;
  --glass-bg:       rgba(255, 255, 255, 0.05);
  --glass-border:   rgba(255, 255, 255, 0.12);
  --glass-hover:    rgba(255, 255, 255, 0.08);
  --accent:         #00D4FF;
  --accent-soft:    rgba(0, 212, 255, 0.15);
  --text-primary:   #F0F4FF;
  --text-secondary: rgba(240, 244, 255, 0.55);
  --orb-cyan:       rgba(0, 212, 255, 0.12);
  --orb-purple:     rgba(99, 60, 180, 0.10);
  --orb-green:      rgba(0, 180, 120, 0.08);
}
```

### 4.3 Typographie

```html
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
```

- `h1, h2` : Syne 800, uppercase, letter-spacing élevé
- `h3` : Syne 600
- Corps : DM Sans 400
- Labels / catégories : DM Sans 500 uppercase, couleur `--accent`

### 4.4 Cards glassmorphism

```css
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;
}
.glass-card:hover {
  border-color: rgba(0, 212, 255, 0.3);
  box-shadow: 0 0 30px rgba(0, 212, 255, 0.08);
}
```

### 4.5 Orbes de fond

Trois `div.orb` en `position: fixed`, `z-index: 0`, `pointer-events: none`, `border-radius: 50%`, `filter: blur(100px)` :
- Orbe cyan — haut droite — `rgba(0, 212, 255, 0.12)` — 600x600px
- Orbe violet — centre gauche — `rgba(99, 60, 180, 0.10)` — 500x500px
- Orbe vert — bas centre — `rgba(0, 180, 120, 0.08)` — 400x400px

Tout le contenu doit être en `position: relative; z-index: 1` par-dessus.

### 4.6 Animations

| Effet              | Déclencheur                  | Détail                                           |
|--------------------|------------------------------|--------------------------------------------------|
| Fade + translateY  | Scroll IntersectionObserver  | opacity 0→1 + translateY 30px→0, durée 0.6s     |
| Cursor spotlight   | mousemove (desktop)          | Halo cyan subtil qui suit le curseur             |
| Nav blur           | Scroll > 50px                | Header reçoit .scrolled : backdrop-filter + bordure basse |
| Burger             | Click                        | Slide depuis la droite sur mobile                |
| Card hover         | Hover                        | Border glow cyan + scale(1.02) subtil            |
| Badge "En recherche" | CSS keyframes              | Bordure accent qui pulse doucement               |

---

## 5. NAVIGATION

**Logo :** `favicon32x32.png` + texte "Arnaud BENACQUISTA" en Syne  
**Liens :** Accueil · À propos · Compétences · Parcours · Projets · Contact  
**Bouton CV :** Icône download + "Télécharger CV", `href="./cv-arnaud-benacquista.pdf"` + attribut `download`  
**Réseaux :** GitHub (`https://github.com/ArnaudBena`) + LinkedIn (`https://www.linkedin.com/in/arnaud-benacquista-aa07a6159/`) uniquement  
**Sticky :** Header fixe. Classe `.scrolled` ajoutée au scroll > 50px  
**Mobile :** Burger menu, slide depuis la droite, fermeture au clic sur un lien

> La section "Services" est supprimée définitivement.

---

## 6. SECTIONS ET CONTENU

### 6.1 Hero

- **Gauche :** Badge, H1, sous-titre, deux CTA
- **Droite :** `avatar.jpeg` dans un cercle avec bordure glow cyan
- Animation : slide-in-left texte, slide-in-right image

```
Badge :      En reconversion · Développeur Java
H1 :         Bonjour, je suis Arnaud Benacquista.
Sous-titre : Futur ingénieur fullstack passionné par le code,
             basé à Metz. Je transforme des idées en applications.
CTA 1 :      Voir mes projets   →  #projets
CTA 2 :      Me contacter      →  #contact
```

---

### 6.2 À propos

- Image gauche : `person.jpg`
- Texte droite :

```
Label : À PROPOS
H2 :    Passionné par le code et les défis techniques.

§1 : Salut, moi c'est Arnaud. Je me forme actuellement pour devenir
     Concepteur Développeur d'Application à Metz Numeric School,
     avec une spécialisation en Java et Spring Boot.

§2 : Mon objectif est de poursuivre en master pour me rapprocher
     d'un poste d'ingénieur développeur fullstack, voire Lead Dev.
     J'aime autant la technique que l'aspect stratégique d'un projet.

§3 : Avant le code, j'ai été cadre dans le commerce. Cette expérience
     m'a forgé des qualités rares chez un développeur junior :
     communication claire, gestion de priorités, et sens du collectif.
```

---

### 6.3 Compétences

Structure inspirée de said.contact : deux colonnes, pas de barres de progression.

**Colonne gauche — SOFT SKILLS (cards glass)**

| Titre              | Description                                      |
|--------------------|--------------------------------------------------|
| Communication      | Clarté, négociation, transmission d'information  |
| Travail en équipe  | Collaboration dans des environnements dynamiques |
| Résolution de pb   | Analyse et solutions adaptées sous contrainte    |
| Adaptabilité       | Reconversion réussie, nouvelles technos rapidement |
| Curiosité          | Veille technologique et apprentissage continu    |

**Colonne droite — TECHNOLOGIES (logos en grid)**

Logos via CDN devicons. Format :
```html
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/{slug}.svg" width="48" height="48" alt="{nom}">
```

| Techno      | Slug devicon                        |
|-------------|-------------------------------------|
| HTML5       | `html5/html5-original`              |
| CSS3        | `css3/css3-original`                |
| JavaScript  | `javascript/javascript-original`    |
| TypeScript  | `typescript/typescript-original`    |
| Java        | `java/java-original`                |
| Spring Boot | `spring/spring-original`            |
| Angular     | `angularjs/angularjs-original`      |
| Python      | `python/python-original`            |
| SQL         | `mysql/mysql-original`              |
| Git         | `git/git-original`                  |

---

### 6.4 Parcours

Inspiré de said.contact. Deux colonnes. Bouton "Télécharger CV" en haut à droite.

```
Label : PARCOURS
H2 :   Mon évolution professionnelle.
```

**Colonne gauche — EXPÉRIENCES**

```
[Card spéciale — badge "En recherche" avec bordure accent pulsante]

Septembre 2026 - Aujourd'hui
(ici viendra mon exp alternance tu dois trouver quelque chose a mettre en attente)

Juin 2025 - Aout 2025
(ici viendra mon exp en stage mais je n'ai pas encore la boite ou j'irais donc pareil a mettre en attente car je cherche un stage)


Decembre 2020 - Decembre 2024
Chef de secteur
EcoWater Systems France, Grand Est
En tant que Chef de secteur pour EcoWater Systems France, je suis chargé de développer l’activité commerciale dans la région Grand Est, je gère un portefeuille clients existant tout en cherchant à élargir le réseau de partenaires. Également, je forme et accompagne les équipes commerciales sur les produits de traitement de l’eau, tout en assurant un suivi des projets, de la prospection à la conclusion. J'interviens aussi dans la négociation des contrats et la fidélisation des clients pour garantir un partenariat durable. (tu dois résumé ici car cela sera trop long)

```

**Colonne droite — FORMATIONS**

```
2025 - 2027
Master Développement Ingénierie Informatique (alternance)
Metz Numeric School
Architecture Microservices, Cloud, DevOps, conception logicielle avancée.

2024 - 2026
Bac+3 Concepteur Développeur d'Applications
Metz Numeric School
Développement logiciel, bases de données, méthodologies agiles, Java, Spring Boot.

2015
Licence GREEN (Gestion des Ressources Énergétiques et Environnementales)
Diplôme obtenu
Gestion de projet, analyse environnementale, réglementation énergétique.
```

---

### 6.5 Projets

```
Label : PROJETS
H2 :   Quelques réalisations récentes.
```

**Filtres :** Tous · Logiciel · Web · Applications  
**Grid :** 3 colonnes desktop, 2 tablette, 1 mobile

---

**Projet 1 — Club Canin**
- `data-category="app"` — Applications
- Statut : EN COURS
- Année : 2025-2026
- Description : Application web de gestion d'un club canin, projet fil rouge CDA à Metz Numeric School. Gestion des membres, des chiens, des cours par tranche d'âge (chiots, éducation, dressage, sociabilisation), des réservations et du planning des coachs.
- Technologies : Java, Spring Boot, SQL, HTML, CSS, JavaScript
- Lien GitHub : aucun — projet confidentiel école
- Image : placeholder

---

**Projet 2 — Site vitrine mariage**
- `data-category="web"` — Développement Web
- Statut : Terminé
- Année : 2025
- Description : Création d'un site vitrine élégant pour un événement de mariage. Présentation du lieu, du programme et des informations pratiques pour les invités.
- Technologies : HTML, CSS
- Image : placeholder ou screenshot à fournir par Arnaud

> Ne pas préciser que c'est le mariage d'Arnaud.

---

**Projet 3 — Site psychologue du travail**
- `data-category="web"` — Développement Web
- Statut : à préciser par Arnaud (EN COURS ou Terminé)
- Année : 2025-2026
- Description : Site vitrine professionnel pour une psychologue du travail. Présentation des services, prise de contact, interface claire et rassurante.
- Technologies : HTML, CSS, JavaScript
- Image : placeholder ou screenshot à fournir

---

**Projet 4 — Projet Spring Boot** *(visible, "Coming Soon")*
- `data-category="log"` — Développement Logiciel
- Statut : COMING SOON
- Année : 2026
- Description : Projet backend Spring Boot en cours de définition.
- Affichage : Card visible avec badge "Coming Soon", overlay semi-opaque, pas de lien cliquable
- `<!-- TODO Arnaud : mettre à jour quand le sujet est défini -->`

---

### 6.6 Contact

```
Label : CONTACT
H2 :   Parlons de votre projet.
Intro : Disponible pour un stage de 2 mois et une alternance.
        N'hésitez pas à me contacter pour toute opportunité ou collaboration.
```

**Formulaire :**
- Champs : Nom, Prénom, Email, Message
- Bouton : "Envoyer le message"
- Action : `https://formsubmit.co/2a768d921d50b88f49ce222f2bf7ecb4`
- `_captcha false` + honeypot + `_next` vers `thanks.html` : à conserver

> Bug à corriger : l'ancien champ email avait `name="firstname"`. Corriger en `name="email"` et `id="email"`.

---

### 6.7 Footer

```
Liens : GitHub + LinkedIn uniquement
Texte : © 2026 Arnaud BENACQUISTA. Tous droits réservés.
```

---

## 7. THANKS.HTML

Même style glassmorphism que index.html. Mêmes orbes de fond. Contenu :

```
H1 : Merci pour votre message !
P  : Je vous recontacterai dans les plus brefs délais.
CTA : Retour à l'accueil  →  index.html
```

---

## 8. APP.JS — FONCTIONNALITÉS

```
1. menuMobile()       Burger toggle + fermeture au clic sur lien
2. stickyHeader()     Classe .scrolled sur header quand scroll > 50px
3. tabsFilters()      Filtrage portfolio par catégorie (data-filter / data-category)
4. showModals()       Ouverture / fermeture des modals projets
5. sectionsReveal()   Fade-in + translateY au scroll (IntersectionObserver)
6. cursorSpotlight()  Halo cyan qui suit la souris — desktop uniquement (pas sur touch)
```

---

## 9. BUGS ANCIENNE VERSION À CORRIGER

| Bug                                 | Fichier     | Correction                                  |
|-------------------------------------|-------------|---------------------------------------------|
| Champ email avec `name="firstname"` | index.html  | `name="email"` et `id="email"`              |
| Liens Twitter/Facebook génériques   | partout     | Supprimer                                   |
| `thanks.html` sans style            | thanks.html | Refaire avec glassmorphism                  |
| Chemins `./CSS/` et `./JS/`         | index.html  | Tout à la racine                            |
| Projets avec Lorem Ipsum            | index.html  | Remplacer par le vrai contenu (section 6.5) |

---

## 10. SEO ET META TAGS

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="author" content="Arnaud BENACQUISTA">
<meta name="description" content="Portfolio d'Arnaud BENACQUISTA — Développeur en reconversion, spécialisation Java et Spring Boot, basé à Metz. Disponible pour stage et alternance.">
<meta name="keywords" content="développeur, Java, Spring Boot, Angular, reconversion, Metz, portfolio, fullstack, CDA">
<meta property="og:title" content="Arnaud BENACQUISTA — Portfolio Développeur">
<meta property="og:description" content="Futur ingénieur développeur fullstack, en formation à Metz Numeric School. Disponible pour stage et alternance.">
<meta name="theme-color" content="#0a0a12">
<link rel="apple-touch-icon" href="./appletouchicon.png">
<link rel="icon" type="image/png" sizes="32x32" href="./favicon32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="./favicon16x16.png">
```

---

## 11. RÈGLES ABSOLUES

1. Pas de framework JS (React, Vue, etc.). Vanilla uniquement.
2. Tailwind via CDN uniquement. Pas de npm, pas de build.
3. Les effets glassmorphism s'écrivent en CSS custom dans `<style>`, pas en classes Tailwind.
4. Mobile first. Tester à 375px, 768px et 1280px minimum.
5. Les logos technos viennent du CDN devicons. Pas d'images locales pour les logos.
6. Ne jamais inventer de contenu non listé dans ce brief.
7. Le CV PDF sera déposé par Arnaud. Le bouton existe, il ne bloque pas si le fichier est absent.
8. `alt` sur toutes les images. `aria-label` sur tous les boutons sans texte visible.
9. Les orbes de fond sont en `position: fixed`, pas `absolute`.
10. Tout le contenu est en `z-index: 1` minimum par-dessus les orbes (`z-index: 0`).

---

## 12. ORDRE DE DÉVELOPPEMENT RECOMMANDÉ

```
 1. Squelette HTML + head (meta, fonts, CDN Tailwind, CDN Font Awesome)
 2. Variables CSS + styles glass dans <style>
 3. Orbes de fond
 4. Header sticky + navigation + burger mobile
 5. Section Hero
 6. Section À propos
 7. Section Compétences (soft skills cards + logos grid devicons)
 8. Section Parcours (expériences + formations + card "En recherche")
 9. Section Projets (cards + filtres + modals)
10. Section Contact (formulaire corrigé)
11. Footer
12. app.js (toutes les fonctions)
13. thanks.html
14. Tests responsive + relecture SEO
```

---
## 13. TEMPS POUR COMMIT

```
Tu devras t'arrêter pour que je puisse faire chaque commit, voici mes commits prevus (ça commence au 2 c'est normal), ne les fais pas toi par contre : 

# 2
git add index.html
git commit -m "init: squelette HTML + head (meta SEO, fonts, CDN Tailwind, Font Awesome)"

# 3
git add assets/css/style.css
git commit -m "style: variables CSS, reset de base et typographie"

# 4
git add assets/css/style.css
git commit -m "style: design system glassmorphism (cards, orbes, keyframes)"

# 5
git add index.html assets/css/style.css
git commit -m "feat: header sticky + navigation desktop et burger mobile"

# 6
git add index.html assets/css/style.css
git commit -m "feat: section Hero (avatar, titre, badge, CTA)"

# 7
git add index.html assets/css/style.css
git commit -m "feat: section À propos (photo, texte, layout deux colonnes)"

# 8
git add index.html assets/css/style.css
git commit -m "feat: section Compétences (soft skills cards + logos devicons)"

# 9
git add index.html assets/css/style.css
git commit -m "feat: section Parcours (formations, expériences, card En recherche)"

# 10
git add index.html assets/css/style.css
git commit -m "feat: section Projets (cards, filtres par catégorie)"

# --- PAUSE : vérifier le rendu des cards et des filtres avant de continuer ---

# 11
git add index.html assets/css/style.css
git commit -m "feat: modals projets (ouverture, fermeture, contenu détaillé)"

# 12
git add index.html assets/css/style.css
git commit -m "feat: section Contact (formulaire corrigé, FormSubmit)"

# 13
git add index.html assets/css/style.css
git commit -m "feat: footer (liens sociaux, copyright)"

# 14
git add assets/js/app.js
git commit -m "feat: JS burger, sticky header, filtres portfolio, modals"

# 15
git add assets/js/app.js
git commit -m "feat: JS reveal scroll IntersectionObserver + cursor spotlight"

# 16
git add thanks.html
git commit -m "feat: page remerciement thanks.html glassmorphism"

# --- PAUSE : test complet desktop + mobile avant les assets ---

# 17
git add assets/img/avatar.jpeg assets/img/person.jpg
git commit -m "assets: ajout photos avatar et portrait"

# 18
git add favicons/
git commit -m "assets: ajout favicons"

# --- PAUSE : déposer le CV PDF dans assets/docs/ ---

# 19
git add assets/docs/cv-arnaud-benacquista.pdf
git commit -m "docs: ajout CV PDF téléchargeable"

# --- PAUSE : corrections après relecture complète ---

# 20
git add index.html thanks.html assets/css/style.css
git commit -m "fix: ajustements responsive 375px et 768px"

# 21
git add index.html assets/css/style.css assets/js/app.js
git commit -m "fix: corrections mineures accessibilité et nettoyage code"

# 22
git add README.md
git commit -m "docs: mise à jour README avec lien GitHub Pages"
```

---

*Brief rédigé en Mars 2026 avec l'aide de Claude (Anthropic).*
