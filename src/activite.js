import {gsap} from "gsap";
import {Draggable} from "gsap/Draggable";

gsap.registerPlugin(Draggable);

// ETAPE 1

const wordZone = document.getElementById("word-zone");
const constructedWord = document.getElementById("constructed-word");

  // Activer le drag avec GSAP Draggable
  document.querySelectorAll(".letter").forEach(letter => {
    Draggable.create(letter, {
      type: "x,y",
      bounds: "body",
      onDragEnd: function () {
        if (this.hitTest(wordZone, "50%")) { // Vérifie si la lettre est déposée dans la zone
          const letterText = this.target.dataset.letter;
          constructedWord.textContent += letterText; // Ajoute la lettre au mot
          gsap.to(this.target, { opacity: 0, scale: 0, duration: 0.3 }); // Effet de disparition
        } else {
          gsap.to(this.target, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" }); // Retour à la position initiale
        }
      }
    });
  });