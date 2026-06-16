# Qua‑Sys‑Gen  

## Generator educațional de sisteme de ecuații (Omogene • Simetrice • Liniar + Pătratic • Liniare 2×2)

Qua‑Sys‑Gen este o aplicație web interactivă pentru profesori și elevi, dedicată studiului sistemelor de ecuații de gradul II.
Proiectul generează automat sisteme omogene, simetrice și liniare‑pătratice, oferă soluția exactă și permite exportul în format **LaTeX** pentru teste, fișe și materiale didactice.

---

## ✨ Funcționalități principale

- **Generare automată de sisteme:**
  - Omogene
  - Simetrice (4 tipuri)
  - Liniar + Pătratic
  - Simetric Avansat (3 tipuri: puteri, module, cuadratic-cubic)
  - **Sisteme Liniare 2×2** (5 tipuri: simple, coeficienți variați, coeficienți legați, module simple, module compuse)
- **Soluție exactă** (fracții raționale)
- **Export LaTeX profesional** (`enumerate` cu soluție comentată)
- **Interfață pentru profesori** cu input controlat
- **Lecții integrate** (Lecția 1)
- **Validări inteligente** (ex: `x, y ≠ 0` pentru fracții)
- **Suport RO/EN** (i18n complet)
---
```
Qua-Sys-Gen/
├── .gitattributes
├── core/
│   ├── engine.js
│   ├── fractions.js
│   ├── random.js
│   └── utils.js
├── css/
│   ├── components.css
│   └── layout.css
├── data/
│   ├── coefficients.json
│   └── examples.json
├── i18n/
│   ├── en.json
│   ├── i18n.js
│   └── ro.json
├── index.html
├── lectii/
│   └── lectia1.html
├── main.js
├── readme.md
├── systems/
│   ├── homogeneous.js
│   ├── linear2x2.js
│   ├── linearQuadratic.js
│   ├── linearSystems.js
│   ├── mixed.js
│   ├── nonlinear.js
│   ├── symmetric.js
│   └── symmetricAdvanced.js
└── ui/
    ├── components.js
    ├── examMode.js
    ├── mainModule.js
    └── theme.js

```

## 🛠 Tehnologii folosite

- HTML5
- CSS3 (light/dark)
- JavaScript ES6
- MathJax
- LaTeX
- JSON

---

## ▶️ Cum rulezi proiectul local

1. Clonează repository‑ul:

git clone <[https://github.com/exceliorxtreme/Qua-Sys-Gen]>

1. Intră în folder:

cd qua-sys-gen

1. Rulează cu un server local (ex. Live Server)

2. Deschide în browser:

<http://127.0.0.1:5500/>

---

## 📤 Export LaTeX

Fiecare modul generează automat:

\begin{enumerate}
\item Sistem 1
\item Sistem 2
\item Sistem 3
\end{enumerate}

Poate fi compilat cu:

- TeXLive
- MiKTeX
- Overleaf

## 🧑‍🏫 Pentru profesori

- Coeficienți mici (±1…±9)
- Soluții exacte
- Export LaTeX pentru:
- teste
- fișe
- lucrări
- materiale didactice

---

## 🚧 Roadmap

- Lecția 2
- Modul Avansat complet
- Export PDF
- Salvare localStorage
- Fișe complete (10+ sisteme)
- Modul „Exerciții pentru elevi”

---
## 🥚 Easter Egg

Interfața nu afișează soluțiile sistemelor (pentru a păstra exercițiile curate),
dar cei curioși le pot găsi în exportul LaTeX, ascunse ca și comentariu:

% Soluție: (x, y)----arată doar soluția generatoare, NU toate soluțiile!

Dacă ai descoperit asta, felicitări — ai găsit Easter Egg-ul proiectului.
---
## 📜 Licență

MIT License — liber pentru uz educațional.

---

## 👤 Autor

Proiect realizat de **___**, profesor de matematică.
Asistență tehnică: Microsoft Copilot & Minimax M3
