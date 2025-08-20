const generateBtn = document.getElementById("gen-btn");
const paletteContainer = document.querySelector(".palette-container");

generateBtn.addEventListener("click", generatePalette);

paletteContainer.addEventListener("click",function(e) {
    if(e.target.classList.contains("copy-btn")) {
        const hexValue = e.target.previousElementSibling.textContent;
        navigator.clipboard
        .writeText(hexValue)
        .then(() => showCopySuccess(e.target))
        .catch((err) => console.log(err));
  } else if (e.target.classList.contains("color")) {
    const hexValue = e.target.nextElementSibling.querySelector(".hex-value").textContent;
    navigator.clipboard
      .writeText(hexValue)
      .then(() => showCopySuccess(e.target.nextElementSibling.querySelector(".copy-btn")))
      .catch((err) => console.log(err));
    }
});

function showSuccess(){
  element.classList.remove("far", "fa-copy");
  element.classList.add("fas", "fa-check");

  element.style.color = "#48bb78";

  setTimeout(() => {
    element.classList.remove("fas", "fa-check");
    element.classList.add("far", "fa-copy");
    element.style.color = "";
  }, 1500);
}

function showCopySuccess(element) {
  element.classList.remove("far", "fa-copy");
  element.classList.add("fas", "fa-check");

  element.style.color = "#48bb78";

  setTimeout(() => {
    element.classList.remove("fas", "fa-check");
    element.classList.add("far", "fa-copy");
    element.style.color = "";
  }, 1500);
}

function generatePalette() {
    const baseHue = Math.floor(Math.random() * 360);
    const colors = [`hsl(${baseHue}, 70%, 50%)`,
        `hsl(${(baseHue + 30) % 360}, 70%, 50%)`,
        `hsl(${(baseHue + 60) % 360}, 70%, 50%)`,
        `hsl(${(baseHue + 90) % 360}, 70%, 50%)`,
        `hsl(${(baseHue + 120) % 360}, 70%, 50%)`]
    updatePaletteDisplay(colors);
}

function hslToHex(h, s, l) {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c/2;

    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");
}


function updatePaletteDisplay(colors) {
    const colorBoxes = document.querySelectorAll(".color-box");

    colorBoxes.forEach((box, index) => {
        const color = colors[index];
        const colorDiv = box.querySelector(".color");
        const hexvalue = box.querySelector(".hex-val");

        const [h, s, l] = color
          .match(/\d+(\.\d+)?/g)   // get numbers from string
          .map(Number);

        colorDiv.style.backgroundColor = color;
        hexvalue.textContent = hslToHex(h,s,l);
    });
}

// Generate a palette on page load
generatePalette();
