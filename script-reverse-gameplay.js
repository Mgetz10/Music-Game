// Sheet Music Teacher

/* to-do
* link btn to generate note
* allow guessing of note
* add points
* add rewards
* add sounds
* add music theory explanation
* fix same-line removeNote bug (use noteOrder property?)
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

// create note class
class Note {
  constructor(name, index, staffPosition, isSharp) {
    this.name = name;
    this.index = index;
    this.staffPosition = staffPosition;
    this.staffLine = domStaffLines[this.staffPosition];
    this.isSharp = isSharp;
  }

  // function to allow different notes on the same line
  isSameLineDifNote () {return this.staffLine.firstChild.className.includes('sharp');}


  showNote() {
    // creat new span
    const staffNote = document.createElement('SPAN');
    this.staffLine.appendChild(staffNote);

    if (this.isSharp){
      staffNote.classList.add('whole-note');
      staffNote.classList.add('sharp');
    } else { staffNote.classList.add('whole-note'); }
  }
  
  removeNote() {
    const staffNote = document.createElement('SPAN');
    this.staffLine.removeChild(this.staffLine.firstChild);
  }

  notePlay() {

    // if statements to prevent multiple triggers from holing down key
    if (!this.staffLine.childElementCount){
      this.showNote();
      cssNotes[this.index].classList.add('is-active');
    } else if (this.staffLine.childElementCount == 1){
      if (this.isSharp && !this.isSameLineDifNote()){
        this.showNote();
        cssNotes[this.index].classList.add('is-active');
      } else if (!this.isSharp && this.isSameLineDifNote()){
        this.showNote();
        cssNotes[this.index].classList.add('is-active');
      }
    }

    // console.log(`You played the key "${this.name}"`);
  }

  noteStop() {

    // remove notes from staff
    this.removeNote()
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


// capture every available note object
const everyNote = [
  c4, cSharp4, d4, dSharp4, e4, f4, fSharp4,
  g4, gSharp4, a4, aSharp4, b4, c5, cSharp5, d5,
];

// create note generator
let noteGenerated = false;
const generateNote = () => {
  const randomNote = Math.floor(Math.random() * everyNote.length);
  everyNote[randomNote].showNote();
  noteGenerated = true;
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
