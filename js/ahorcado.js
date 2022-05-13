const wordE1 = document.getElementById('word');
const wrongLettersE1 = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const words = ['aplicacion', 'programa', 'canvas', 'casa', 'perro', 'software'];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];
const cont=0;

function fondo(){
    const canvas = document.querySelector('#figura');
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    canvas.width = 300;
    canvas.height = 425;

    const background = new Image();
    background.src = "/img/fondo1.jpg";
    background.onload = function(){
        ctx.drawImage(background,0,0);
    }
    ctx.closePath();
};

const inic = function cabeza(){
    const canvas = document.querySelector('#figura');
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.closePath();
};
const cab = function cabeza(){
    const canvas = document.querySelector('#figura');
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    
    ctx.font = '30px serif'
    ctx.fillText('😐', 145, 270)

    ctx.strokeStyle = "rgba(255, 255, 255, 0.904)";
    ctx.lineWidth = 3;
    ctx.globalCompositeOperation = 'destination-over';
    ctx.stroke();
    ctx.closePath();
};

const cue = function cuerpo(){
    const canvas = document.querySelector('#figura');
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.font = '30px serif';
    ctx.fillText('🙄', 145, 270);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.904)";


    ctx.moveTo(155,270);
    ctx.lineTo(150,320);
    ctx.globalCompositeOperation = 'destination-over';
    ctx.stroke();
    ctx.closePath();
};

const brd = function brazoDerecho(){
    const canvas = document.querySelector('#figura');
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.font = '30px serif';
    ctx.fillText('🤨', 145, 270);

    ctx.moveTo(155,270);
    ctx.lineTo(150,320);

    ctx.moveTo(153,286);
    ctx.lineTo(120,300);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.804)";
    ctx.globalCompositeOperation = 'destination-over';
    ctx.stroke();
    ctx.closePath();
};

const bri = function brazoIzquierdo(){
    const canvas = document.querySelector('#figura');
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.font = '30px serif';
    ctx.fillText('😑', 145, 270);

    ctx.moveTo(155,270);
    ctx.lineTo(150,320);

    ctx.moveTo(153,286);
    ctx.lineTo(120,300);

    ctx.moveTo(153,286);
    ctx.lineTo(180,300);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.804)";
    ctx.globalCompositeOperation = 'destination-over';
    ctx.stroke();
    ctx.closePath();
};

const pid = function piernaDerecha(){
    const canvas = document.querySelector('#figura');
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.font = '30px serif';
    ctx.fillText('😨', 145, 270);

    ctx.moveTo(155,270);
    ctx.lineTo(150,320);

    ctx.moveTo(153,286);
    ctx.lineTo(120,300);

    ctx.moveTo(153,286);
    ctx.lineTo(180,300);

    ctx.moveTo(150,320);
    ctx.lineTo(120,360);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.804)";
    ctx.globalCompositeOperation = 'destination-over';
    ctx.stroke();
    ctx.closePath();
};

const pii = function piernaIzquierda(){
    const canvas = document.querySelector('#figura');
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.font = '30px serif';
    ctx.fillText('🤕', 145, 270);

    ctx.moveTo(155,270);
    ctx.lineTo(150,320);

    ctx.moveTo(153,286);
    ctx.lineTo(120,300);

    ctx.moveTo(153,286);
    ctx.lineTo(180,300);

    ctx.moveTo(150,320);
    ctx.lineTo(120,360);

    ctx.moveTo(150,320);
    ctx.lineTo(170,360);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.804)";
    ctx.globalCompositeOperation = 'destination-over';
    ctx.stroke();
    ctx.closePath();
};

//Mostrar palabra
function displayWord(){
    wordE1.innerHTML = `
    ${selectedWord
    .split('')
    .map(
        letter =>`
        <span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
        </span>
        `
    )
    .join('')}
    `;

    const innerWord = wordE1.innerText.replace(/\n/g, '');

    if(innerWord === selectedWord){
        finalMessage.innerText = 'Felicitaciones!! 👍';
        popup.style.display= 'flex';
    }
};
// Actualizar letras erroneas
function updateWrongLetterE1(){
    wrongLettersE1.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Erroneas</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    fondo();
    //verificar si perdio
    if(wrongLetters.length === figureParts.length-1){
        finalMessage.innerText = 'Perdiste 👎';
        popup.style.display = 'flex';
    }
    const errors = wrongLetters.length;
    crearPersonaje(errors);
};

//Mostrar notificacion de letras repetidas
function showNotification(){
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
};

//Evento presionar letras
window.addEventListener('keydown', e =>{
    if(e.keyCode >= 65 && e.keyCode <=90){
        const letter = e.key;
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
            } else{
                showNotification();
            }
        } else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updateWrongLetterE1();
            } else{
                showNotification();
            }
        }
    }
});

//Reiniciar juego
playAgainBtn.addEventListener('click', () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();
    updateWrongLetterE1();
    popup.style.display = 'none';
});

let figureParts = [inic, cab, cue, brd, bri, pid, pii];

function crearPersonaje(cont){
    figureParts[cont]();
}
fondo();
displayWord();

