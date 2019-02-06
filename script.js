// Sheet Music Teacher

/* to-do

* add music theory explanation
* add rewards
    animationsdd
    levels
    level progress meters
* add sounds
    this.audio = new Audio(audio);
    this.audio.volume = 1;
    this.audio.play();
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
    this.playIsCalled = false;
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
    this.staffNote.style.color = "rgba(0, 0, 0, "+alphaChannel+")";
  }

  showNoteLetter(){
    this.staffNote.classList.add('staff-note-name')
    this.staffNote.innerHTML = this.name;
  }
  
  removeNote() {
    if (!this.staffLine.childElementCount){} 
    else if (this.staffLine.childElementCount == 2){
      this.staffLine.removeChild(this.staffLine.childNodes[1]); 
    } else { this.staffLine.removeChild(this.staffLine.firstChild); }
  }

  gamePlay(){
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
  }

  notePlay() {
    this.playIsCalled = true;
    this.gamePlay()
    // if statements to prevent multiple triggers from holing down key
    if (!this.staffLine.childElementCount){
      this.showNote();
      this.showNoteLetter();
      cssNotes[this.index].classList.add('is-active');
    } else if (this.staffLine.childElementCount == 1){
      if (this.isSharp && !this.isSameLineDifNote()){
        this.showNote();
        this.showNoteLetter();
        cssNotes[this.index].classList.add('is-active');
      } else if (!this.isSharp && this.isSameLineDifNote()){
        this.showNote();
        this.showNoteLetter();
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
    cssNotes[this.index].classList.remove('is-active');   
  }
}
// make elements for each note
const c4 = new Note('C', 7, 10, false);
const cSharp4 = new Note('C#', 8, 10, true);
const d4 = new Note('D', 9, 9, false);
const dSharp4 = new Note('D#', 10, 9, true);
const e4 = new Note('E', 11, 8, false);
const f4 = new Note('F', 12, 7, false);
const fSharp4 = new Note('F#', 13, 7, true);
const g4 = new Note('G', 14, 6, false);
const gSharp4 = new Note('G#', 15, 6, true);
const a4 = new Note('A', 16, 5, false);
const aSharp4 = new Note('A#', 17, 5, true);
const b4 = new Note('B', 18, 4, false);
const c5 = new Note('C', 19, 3, false);
const cSharp5 = new Note('C#', 20, 3, true);
const d5 = new Note('D', 21, 2, false);


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


const generateNote = () => {
  if (!noteGenerated) {
    const randomNote = Math.floor(Math.random() * everyNote.length);
    generatedNote = everyNote[randomNote];
    generatedNote.showNote();
    generatedNote.showNoteLetter();
    generatedNote.generated = true;
    noteGenerated = true;
  } 
}

// assign button from dom to generate random note

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
    keyboardHelperToggleEx.classList.toggle('tc-active');
    keyboardHelperToggleEx.classList.toggle('tc-inactive');
    for (let i = 0; i < compKeyLetters.length; i++){
      compKeyLetters[i].classList.toggle('hide');
    }
  }
  const keyboardHelperToggleEx = document.getElementById('key-help-toggle-ex');
  keyboardHelperToggleEx.addEventListener('click', switchKeyHelpToggle, false);
  const compKeyLetters = document.getElementsByClassName('comp-key-letter');
  const keyboardHelper = document.getElementById('key-help-toggle');
  keyboardHelper.addEventListener('click', switchKeyHelpToggle, false);
  
  // start slides
  let introHidden = false;
  const introSlides = document.getElementsByClassName('slide');
  let slideNumber = 0;
  const startSlide = document.getElementById('intro');
  const introSlide = () =>{
    if (!introHidden){
      startSlide.classList.toggle('intro-flex')
      startSlide.classList.toggle('hide');
      introHidden = true;
    }
    if (slideNumber){ introSlides[slideNumber - 1].classList.toggle('hide');}
    if (slideNumber === 2){ keyboardSection.classList.remove('hide');}
    if (slideNumber === 4){
      for (let i = 0; i < extraKeys.length; i++){
        extraKeys[i].classList.add('hide');
      }
    }
    if (slideNumber === 5){
      keyboardOptions.classList.remove('hide');
      highlightNote(c4);
     }
     if (slideNumber === 8){
      staff.classList.remove('hide')
      introContainer.classList.add('hide');
      showNoteExample(c4);
    }
      introSlides[slideNumber].classList.toggle('hide');
      
      slideNumber++;
    }
    
    const backSlide = () => {
      introSlides[slideNumber - 2].classList.toggle('hide');
      introSlides[slideNumber -1].classList.toggle('hide');
      slideNumber--;
    }
    
    const startBtn = document.getElementById('start-btn');
    startBtn.addEventListener('click', introSlide, false);
    
    const gotIt = document.getElementById('got-it');
    gotIt.addEventListener('click', introSlide, false);
    
    const backBtnOne = document.getElementById('back-one');
    const nextBtnOne = document.getElementById('next-one');
    backBtnOne.addEventListener('click', backSlide, false);
    nextBtnOne.addEventListener('click', introSlide, false);
    
    const keyboardSection = document.getElementById('keyboard-section');
    
    const backBtnTwo = document.getElementById('back-two');
    const nextBtnTwo = document.getElementById('next-two');
    backBtnTwo.addEventListener('click', backSlide, false);
    nextBtnTwo.addEventListener('click', introSlide, false);
    
    const backBtnThree = document.getElementById('back-three');
    const nextBtnThree = document.getElementById('next-three');
    backBtnThree.addEventListener('click', backSlide, false);
    nextBtnThree.addEventListener('click', introSlide, false);
    
    const backBtnFour = document.getElementById('back-four');
    const nextBtnFour = document.getElementById('next-four');
    backBtnFour.addEventListener('click', backSlide, false);
    nextBtnFour.addEventListener('click', introSlide, false);
    
    const backBtnFive = document.getElementById('back-five');
    backBtnFive.addEventListener('click', backSlide, false);
    
    const backBtnSix = document.getElementById('back-six');
    const nextBtnSix = document.getElementById('next-six');
    backBtnSix.addEventListener('click', backSlide, false);
    nextBtnSix.addEventListener('click', introSlide, false);
    
    const backBtnSeven = document.getElementById('back-seven');
    const nextBtnSeven = document.getElementById('next-seven');
    backBtnSeven.addEventListener('click', backSlide, false);
    nextBtnSeven.addEventListener('click', introSlide, false);
    
    let extraKeys = document.getElementsByClassName('ex')
    
    let walkthrough = false;
    
    let keyboardOptions = document.getElementById('keyboard-options');
    
    const staffHTML = document.getElementById('staff');
    
    const introContainer = document.getElementById('intro-container');
    
    const highlightNote = (noteObject) => {
      const flashingNote = setInterval(
        () => {
          cssNotes[noteObject.index].classList.toggle('key-highlight')
          if(noteObject.playIsCalled){
            if (cssNotes[noteObject.index].className.includes('key-highlight')){
              cssNotes[noteObject.index].classList.remove('key-highlight');
            }
            noteObject.playIsCalled = false;
            introSlide();
            clearInterval(flashingNote)
          }
        },
        500,
        );
      }
      
      let setTimeoutCounter = 0;
      const showNoteExample = (noteObject) => {
        const showNoteExampleTimeout = setInterval(
          () => {
            if (!noteObject.playIsCalled){ noteObject.notePlay() } 
            else { 
              noteObject.playIsCalled = false;
              noteObject.noteStop();
              setTimeoutCounter++
            }
            if (setTimeoutCounter === 16){
              setTimeoutCounter = 0;
              clearInterval(showNoteExampleTimeout);
            }
          },
          500
          )
        }