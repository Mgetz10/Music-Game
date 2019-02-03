// Sheet Music Teacher


// capture the html keys from the dom
const cssNotes = document.getElementsByClassName('keys');
// capture staff divs from the dom
const domStaffLines = document.getElementsByClassName('staff-line');

// create note class
class Note {
  constructor(name, index, staffPosition) {
    this.name = name;
    this.index = index;
    this.staffPosition = staffPosition;
    this.staffLine = domStaffLines[this.staffPosition];
  }

  notePlay() {
    const staffNote = document.createElement('SPAN');
    if (this.staffLine.childElementCount < 1) {
      staffNote.classList.add('whole-note');
      this.staffLine.appendChild(staffNote);
      cssNotes[this.index].classList.add('is-active');
      // console.log(`You played the key "${this.name}"`);
    }
  }

  noteStop() {
    this.staffLine.removeChild(this.staffLine.firstChild);
    cssNotes[this.index].classList.remove('is-active');
  }
}

// make elements for each note
const c4 = new Note('C', 0, 10);
const cSharp4 = new Note('C#', 1, 10);
const d4 = new Note('D', 2, 9);
const dSharp4 = new Note('D#', 3, 9);
const e4 = new Note('E', 4, 8);
const f4 = new Note('F', 5, 7);
const fSharp4 = new Note('F#', 6, 7);
const g4 = new Note('G', 7, 6);
const gSharp4 = new Note('G#', 8, 6);
const a4 = new Note('A', 9, 5);
const aSharp4 = new Note('A#', 10, 5);
const b4 = new Note('B', 11, 4);
const c5 = new Note('C', 12, 3);
const cSharp5 = new Note('C#', 13, 3);
const d5 = new Note('D', 14, 2);


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


// capture every available note object
const everyNote = [
  c4, cSharp4, d4, dSharp4, e4, f4, fSharp4,
  g4, gSharp4, a4, aSharp4, b4, c5, cSharp5, d5,
];

// create note generator
const generateNote = () => {
  const randomNote = Math.floor(Math.random() * everyNote.length);
  
}

// assign button from dom to generate random note
const startBtn = document.getElementById('start-btn');
startBtn.addEventListener('click', generateNote , false);

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
