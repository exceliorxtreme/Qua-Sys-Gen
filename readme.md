# Qua‑Sys‑Gen  

## Generator educațional de sisteme de ecuații (Omogene • Simetrice • Liniar + Pătratic)

Qua‑Sys‑Gen este o aplicație web interactivă pentru profesori și elevi, dedicată studiului sistemelor de ecuații de gradul II.  
Proiectul generează automat sisteme omogene, simetrice și liniare‑pătratice, oferă soluția exactă și permite exportul în format **LaTeX** pentru teste, fișe și materiale didactice.

---

## ✨ Funcționalități principale

- Generare automată de sisteme:
  - Omogene  
  - Simetrice  
  - Liniar + Pătratic  
- Soluție exactă (fracții)  
- Export LaTeX profesional (`enumerate`)  
- Interfață pentru profesori  
- Lecții integrate  
- Mod Avansat (în dezvoltare)  
- Suport RO/EN

---

## 📁 Structura proiectului

/
├── css/  
│   ├── style.css  
│   └── dark.css  
│  
├── data/  
│   └── coefficients.json  
│  
├── js/  
│   ├── main.js  
│   ├── core/engine.js  
│   ├── ui/mainModule.js  
│   └── systems/  
│       ├── homogeneous.js  
│       ├── symmetric.js  
│       └── linearQuadratic.js  
│  
├── lectii/  
│   └── lectia1.html  
│  
├── index.html  
└── README.md

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

## 📜 Licență

MIT License — liber pentru uz educațional.

---

## 👤 Autor

Proiect realizat de **___**, profesor de matematică.  
Asistență tehnică: Microsoft Copilot.
