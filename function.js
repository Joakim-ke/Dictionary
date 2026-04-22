let btn = document.getElementById("openLogin");
let box = document.getElementById("loginBox");
let overlay = document.getElementById("overlay");

btn.onclick = () =>{
  box.classList.add("show") 
  overlay.classList.add("show")
};

overlay.onclick = () =>{
  box.classList.remove("show") 
  overlay.classList.remove("show")
};

// Select elements from YOUR HTML
const input = document.querySelector(".input input");
const button = document.querySelector(".input button");
const wordEl = document.querySelector(".word p");
const phoneticEl = document.querySelector(".word span");
const meaningEl = document.querySelector(".meaning span");
const exampleEl = document.querySelector(".example span");
const speaker = document.querySelector(".fa-volume-high");

// audio object
let audio = new Audio();

//  Search function
async function getWord(word) {
    try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await res.json();

        if (data.title) {
            wordEl.textContent = "Not Found";
            meaningEl.textContent = "No meaning found";
            phoneticEl.textContent = "";
            exampleEl.textContent = "";
            return;
        }

        const result = data[0];

        // WORD
        wordEl.textContent = result.word;

        // PRONUNCIATION
        phoneticEl.textContent = result.phonetic || "";

        // MEANING
        meaningEl.textContent =
            result.meanings[0].definitions[0].definition;

        // EXAMPLE
        exampleEl.textContent =
            result.meanings[0].definitions[0].example || "No example available";

        // AUDIO
        const audioSrc = result.phonetics.find(p => p.audio)?.audio;

        if (audioSrc) {
            audio.src = audioSrc;
        }

    } catch (error) {
        wordEl.textContent = "Error";
        meaningEl.textContent = "Something went wrong";
        phoneticEl.textContent = "";
        exampleEl.textContent = "";
    }
}

// 🔘 Button click
button.addEventListener("click", () => {
    let word = input.value.trim();
    if (word !== "") {
        getWord(word);
    }
});

// ⌨️ Press Enter to search
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        let word = input.value.trim();
        if (word !== "") {
            getWord(word);
        }
    }
});

// 🔊 Speaker click
speaker.addEventListener("click", () => {
    if (audio.src) {
        audio.play();
    }
});