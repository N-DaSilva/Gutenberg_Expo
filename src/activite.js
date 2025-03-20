import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

// ETAPE 1

const wordZone = document.getElementById("word-zone");
const constructedWord = document.getElementById("constructed-word");

// Activer le drag avec GSAP Draggable
document.querySelectorAll(".letter").forEach((letter) => {
  Draggable.create(letter, {
    type: "x,y",
    bounds: "body",
    onDragEnd: function () {
      if (this.hitTest(wordZone, "50%")) {
        // Vérifie si la lettre est déposée dans la zone
        const letterText = this.target.dataset.letter;
        if (constructedWord.textContent == "Déposer içi") {
          constructedWord.textContent = letterText;
        } else {
          constructedWord.textContent += letterText;
        }
        gsap.to(this.target, { opacity: 0, scale: 0, duration: 0.3 }); // Effet de disparition
      } else {
        gsap.to(this.target, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(0.8, 3)",
        }); // Retour à la position initiale
      }
    },
  });
});

document.getElementById("reset").addEventListener("click", () => {
  constructedWord.textContent = "Déposer içi";
  document.querySelectorAll(".letter").forEach((letter) => {
    gsap.to(letter, { x:0, y:0, opacity: 1, scale: 1, duration: 0.3 });
  });
});
