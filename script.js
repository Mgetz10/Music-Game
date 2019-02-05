// Sheet Music Teacher

/* to-do
* add rewards
   animationsdd
   levels
    level progress meters
* add sounds
   this.audio = new Audio(audio);
* add music theory explanation
* improve style
* improve sharp/flat system
* add dynamic chord positioning
    this.lineBefore = domStaffLines[this.staffPosition - 1]
    this.lineAfter = domStaffLines[this.staffPosition + 1]
*/

// capture the html keys from the dom
const cssNotes = document.getElementsByClassName('keys');
// capture staff divs from the dom
const domStaffLines = document.getElementsByClassName('staff-line');

let alphaChannel = 0.0;
// create note class
class Note {
  constructor(name, index, staffPosition, isSharp) {
    this.name = name;
    this.index = index;
    this.staffPosition = staffPosition;
    this.staffLine = domStaffLines[this.staffPosition];
    this.isSharp = isSharp;
    this.generated = false;
    this.staffNote = document.createElement('SPAN');
  }

  // function to allow different notes on the same line
  isSameLineDifNote() { return this.staffLine.firstChild.className.includes('sharp'); }

  showNote() {
    // creat new span
    this.staffLine.appendChild(this.staffNote);
    
    if (this.isSharp){
      this.staffNote.classList.add('whole-note');
      this.staffNote.classList.add('sharp');
    } else { this.staffNote.classList.add('whole-note'); }
    this.staffNote.style.color = "rgba(255,255,255,"+alphaChannel+")";
  }

  showNoteLetter(){
    this.staffNote.classList.add('staff-note-name')
    this.staffNote.innerHTML = this.name;
  }
  
  removeNote() {
    if (this.staffLine.childElementCount == 2){
      this.staffLine.removeChild(this.staffLine.childNodes[1]); 
    } else { this.staffLine.removeChild(this.staffLine.firstChild); }
  }

  notePlay() {
    if (this.generated){
      noteGenerated = false;
      this.generated  = false;
      console.log('score!');
      scoreCounter += 1
      alphaChannel -= 0.1;
      score.innerHTML = scoreCounter;
      setTimeout(generateNote, 300)
    } else if(noteGenerated){ 
      alphaChannel += 0.1;
      generatedNote.removeNote();
      generatedNote.showNote();
     }

    // this.audio.volume = 1;
    // this.audio.play();
    // if statements to prevent multiple triggers from holing down key
    if (!this.staffLine.childElementCount){
      this.showNote(); this.showNoteLetter();
      cssNotes[this.index].classList.add('is-active');
    } else if (this.staffLine.childElementCount == 1){
      if (this.isSharp && !this.isSameLineDifNote()){
        this.showNote(); this.showNoteLetter();
        cssNotes[this.index].classList.add('is-active');
      } else if (!this.isSharp && this.isSameLineDifNote()){
        this.showNote(); this.showNoteLetter();
        cssNotes[this.index].classList.add('is-active');
      }
    }

    // console.log(`You played the key "${this.name}"`);
  }

  noteStop() {
  //   const fadeInterval = setInterval(
  //     () => {
  //     if(this.audio.volume <= 0.1){
  //         this.audio.volume = 0
  //         this.audio.pause()
  //         this.audio.currentTime = 0;
  //         clearInterval(fadeInterval);
  //         return;
  //     }
  //     console.log("still")
  //     this.audio.volume -= 0.1;
  // }, 10);
    

    // remove notes from staff
    this.removeNote()
    this.playIsCalled = false;
    cssNotes[this.index].classList.remove('is-active');   
  }
}
// make elements for each note
const c4 = new Note('C', 0, 10, false);
const cSharp4 = new Note('C#', 1, 10, true);
const d4 = new Note('D', 2, 9, false);
const dSharp4 = new Note('D#', 3, 9, true);
const e4 = new Note('E', 4, 8, false);
const f4 = new Note('F', 5, 7, false);
const fSharp4 = new Note('F#', 6, 7, true);
const g4 = new Note('G', 7, 6, false);
const gSharp4 = new Note('G#', 8, 6, true);
const a4 = new Note('A', 9, 5, false);
const aSharp4 = new Note('A#', 10, 5, true);
const b4 = new Note('B', 11, 4, false);
const c5 = new Note('C', 12, 3, false);
const cSharp5 = new Note('C#', 13, 3, true);
const d5 = new Note('D', 14, 2, false);


// create key press effect by toggling 'is-active' class
document.onkeydown = (e) => {
  switch (e.keyCode) {
    case 65: c4.notePlay(); break;
    case 87: cSharp4.notePlay(); break;
    case 83: d4.notePlay(); break;
    case 69: dSharp4.notePlay(); break;
    case 68: e4.notePlay(); break;
    case 70: f4.notePlay(); break;
    case 84: fSharp4.notePlay(); break;
    case 71: g4.notePlay(); break;
    case 89: gSharp4.notePlay(); break;
    case 72: a4.notePlay(); break;
    case 85: aSharp4.notePlay(); break;
    case 74: b4.notePlay(); break;
    case 75: c5.notePlay(); break;
    case 79: cSharp5.notePlay(); break;
    case 76: d5.notePlay(); break;
    default:
  }
};

document.onkeyup = (e) => {
  switch (e.keyCode) {
    case 65: c4.noteStop(); break;
    case 87: cSharp4.noteStop(); break;
    case 83: d4.noteStop(); break;
    case 69: dSharp4.noteStop(); break;
    case 68: e4.noteStop(); break;
    case 70: f4.noteStop(); break;
    case 84: fSharp4.noteStop(); break;
    case 71: g4.noteStop(); break;
    case 89: gSharp4.noteStop(); break;
    case 72: a4.noteStop(); break;
    case 85: aSharp4.noteStop(); break;
    case 74: b4.noteStop(); break;
    case 75: c5.noteStop(); break;
    case 79: cSharp5.noteStop(); break;
    case 76: d5.noteStop(); break;
    default:
  }
};

// game play


// score
let scoreCounter = 0;
let score = document.getElementById('score');
score.innerHTML = scoreCounter;

// capture every available note object
const everyNote = [
  c4, cSharp4, d4, dSharp4, e4, f4, fSharp4,
  g4, gSharp4, a4, aSharp4, b4, c5, cSharp5, d5,
];

// create note generator
let noteGenerated = false;
let generatedNote;
let startHidden = false;

const hideStart = () => {
  startHidden = true;
  startBtn.classList.toggle('hide')
  let scoreHTML = document.getElementById('score-text');
  scoreHTML.classList.toggle('hide');
}
const generateNote = () => {
  if (!noteGenerated) {
    if (!startHidden){
      hideStart();
    }
    const randomNote = Math.floor(Math.random() * everyNote.length);
    generatedNote = everyNote[randomNote];
    generatedNote.showNote();
    generatedNote.showNoteLetter();
    generatedNote.generated = true;
    noteGenerated = true;
  } 
}

// assign button from dom to generate random note
const startBtn = document.getElementById('start-btn');
startBtn.addEventListener('click', generateNote, false);

// if computer has generated note player must guess note to move on


// play 'song'
let placeInSong = 0;
const playSong = (song, delay) => {
  const songInterval = setInterval(
    () => {
      if (placeInSong > 0) { song[placeInSong - 1].noteStop(); }
      if (placeInSong < song.length) { song[placeInSong].notePlay(); } else {
        placeInSong = 0;
        clearInterval(songInterval);
      }
      placeInSong += 1;
    },
    delay,
  );
};

// playSong(everyNote, 250);

// keyboard helper
const switchKeyHelpToggle = () => {
  keyboardHelper.classList.toggle('tc-active');
  keyboardHelper.classList.toggle('tc-inactive');
  for (let i = 0; i < compKeyLetters.length; i++){
    compKeyLetters[i].classList.toggle('hide');
  }
}
const compKeyLetters = document.getElementsByClassName('comp-key-letter');
const keyboardHelper = document.getElementById('key-help-toggle');
keyboardHelper.addEventListener('click', switchKeyHelpToggle, false);
