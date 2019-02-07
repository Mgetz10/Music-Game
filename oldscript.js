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

let alphaChannel = 0;
// create note class
class Note {
  constructor(name, nameNumber, index, staffPosition, isSharp) {
    this.name = name;
    this.nameNumber = nameNumber;
    this.index = index;
    this.staffPosition = staffPosition;
    this.staffLine = domStaffLines[this.staffPosition];
    this.childNumber = 0;
    this.isSharp = isSharp;
    this.generated = false;
    this.staffNote = document.createElement('SPAN');
    this.playIsCalled = false;
    this.synthA = new Tone.Synth({
      oscillator: {
        type: 'sine'
      },
      envelope: {
        attack: .1,
        decay: 5,
        sustain: 0,
        release: 3
      }
    }).toMaster()
    this.synthA.volume.value = -12; 
  }

  // function to allow different notes on the same line
  isSameLineDifNote() { return this.staffLine.firstChild.className.includes('sharp'); }

  showNote() {
    // creat new span
    this.staffLine.appendChild(this.staffNote);
    this.staffNote.classList.add('whole-note');
    this.staffNote.setAttribute('id', this.domID)
    
    if (this.isSharp){
      this.staffNote.classList.add('sharp');
    }
    this.staffNote.style.color = "rgba(0, 0, 0, "+alphaChannel+")";
    this.showNoteLetter();
  }

  showNoteLetter(){
    this.staffNote.classList.add('staff-note-name')
    this.staffNote.innerHTML = this.name;
  }
  
  removeNote() {
    if (!this.staffLine.childElementCount){} 
    this.staffLine.removeChild(this.staffNote) 
  }

  gamePlay(){
    if (this.generated){
      this.synthA.triggerAttack(this.nameNumber)
      this.generated  = false;
      console.log('score!');
      if(alphaChannel > 0){
        alphaChannel -= 0.4;
      }
      score.innerHTML = scoreCounter;
      if (noteGenerated){
        leaves[scoreCounter].classList.remove(`sprout-${leafNumber[scoreCounter]}`)
        leaves[scoreCounter].classList.add(`leaf-${leafNumber[scoreCounter]}`)
        scoreCounter += 1
        noteGenerated = false;
        setTimeout((scoreCounter) => {
          leaves[scoreCounter].classList.remove('hide');
        }, 2000)(scoreCounter);
        if (scoreCounter === 5){ 
          scoreCounter = 0;
          introSlide();
        } 
        else { setTimeout(generateNote, 300) };
      } else if (songGenerated){
        songGenerated = false;
        placeInSong++;
        if (placeInSong < songArray.length){
          setTimeout(() => {
            generateSong(songArray);
          }, 300);
        } else { introSlide() }
      }
    } else if(noteGenerated){ 
      generatedNote.removeNote();
      console.log('test');
      if (scoreCounter > 0){
        leaves[scoreCounter].classList.add('hide');
        scoreCounter--
        leaves[scoreCounter].classList.remove(`leaf-${leafNumber[scoreCounter]}`)
        leaves[scoreCounter].classList.add(`sprout-${leafNumber[scoreCounter]}`)
      }
      const plantShrink = setInterval(
        () => {
          if (scoreCounter > 0) { 
            leaves[scoreCounter].classList.add('hide');
            scoreCounter--
            leaves[scoreCounter].classList.remove(`leaf-${leafNumber[scoreCounter]}`)
            leaves[scoreCounter].classList.add(`sprout-${leafNumber[scoreCounter]}`)
          } else {
            clearInterval(plantShrink);
          }
        },
        2000,
        );
      alphaChannel += 0.2;
      generatedNote.showNote();
    } else if(songGenerated){
      placeInSong = 0
      generatedNote.removeNote()
      setTimeout(() => {
        generateSong(songArray);
      }, 300);
    }
  }

  notePlay() {
    this.playIsCalled = true;
    if(pianoHidden){ return };
    // if statements to prevent multiple triggers from holing down key
    if (!this.staffLine.childElementCount){
      this.synthA.triggerAttack(this.nameNumber)
      this.showNote();
      cssNotes[this.index].classList.add('is-active');
    } else if (this.staffLine.childElementCount == 1){
      if (this.isSharp && !this.isSameLineDifNote()){
        this.synthA.triggerAttack(this.nameNumber)
        this.showNote();
        cssNotes[this.index].classList.add('is-active');
      } else if (!this.isSharp && this.isSameLineDifNote()){
        this.synthA.triggerAttack(this.nameNumber)
        this.showNote();
        cssNotes[this.index].classList.add('is-active');
      }
    }
    this.gamePlay()

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
    this.synthA.triggerRelease()
    cssNotes[this.index].classList.remove('is-active');   
  }
}
// make elements for each note
const c4 = new Note('C','C4', 7, 10, false);
const cSharp4 = new Note('C#','C#4', 8, 10, true);
const d4 = new Note('D','D4', 9, 9, false);
const dSharp4 = new Note('D#','D#4', 10, 9, true);
const e4 = new Note('E','E4', 11, 8, false);
const f4 = new Note('F','F4', 12, 7, false);
const fSharp4 = new Note('F#','F#4', 13, 7, true);
const g4 = new Note('G','G4', 14, 6, false);
const gSharp4 = new Note('G#','G#4', 15, 6, true);
const a4 = new Note('A','A4', 16, 5, false);
const aSharp4 = new Note('A#','A#4', 17, 5, true);
const b4 = new Note('B','B4', 18, 4, false);
const c5 = new Note('C','C5', 19, 3, false);
const cSharp5 = new Note('C#','C#5', 20, 3, true);
const d5 = new Note('D','D5', 21, 2, false);


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


const someWhereOverTheRainbow = [
  {
    name: c4,
    type: 2,
  },
  {
    name: c5,
    type: 2,
  },
  {
    name: b4,
    type: 1,
  },
  {
    name: g4,
    type: 0.5,
  },
  {
    name: a4,
    type: 0.5,
  },
  {
    name: b4,
    type: 1,
  },
  {
    name: c5,
    type: 1,
  },
]

// create note generator
let noteGenerated = false;
let generatedNote;


const generateNote = () => {
  if (!noteGenerated) {
    const randomNote = Math.floor(Math.random() * everyNote.length);
    generatedNote = everyNote[randomNote];
    generatedNote.showNote();
    generatedNote.generated = true;
    noteGenerated = true;
  } 
}

let songGenerated = false;
let songArray;
const generateSong = (song) => {
    songArray = song;
    generatedNote = song[placeInSong].name;
    generatedNote.showNote();
    generatedNote.generated = true;
    songGenerated = true;
}

// assign button from dom to generate random note

// if computer has generated note player must guess note to move on


// play 'song'
let placeInSong = 0;
// to-do: change to set timeout to incorporate rhythm
const playSong = (song, delay) => {
  let rhythm = delay;
  const songInterval = setInterval(
    () => {
      if (placeInSong > 0) { song[placeInSong - 1].name.noteStop(); }
      if (placeInSong < song.length) { 
        song[placeInSong].name.notePlay(); 
        rhythm = delay * song[placeInSong].type;
        placeInSong += 1;
      } else {
        placeInSong = 0;
        clearInterval(songInterval);
      }
    },
    rhythm,
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
  let pianoHidden = true;
  const startSlide = document.getElementById('intro');
  const introSlide = () =>{
    if (!introHidden){
      startSlide.classList.toggle('intro-flex')
      startSlide.classList.toggle('hide');
      introHidden = true;
    }
    if (slideNumber){ introSlides[slideNumber - 1].classList.toggle('hide');}
    if (slideNumber === 2){ 
      pianoHidden = false;
      keyboardSection.classList.remove('hide');
    }
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
    if (slideNumber === 9){
      showNoteExample(cSharp4);
    }
    if (slideNumber === 11){
      guessGameEx.classList.add('hide');
      guessGameExP.classList.add('hide');
    }
    if (slideNumber === 12)
      guessGameExTwo.classList.add('hide');
      guessGameExPTwo.classList.add('hide');
      introSlides[slideNumber].classList.toggle('hide');
      
      slideNumber++;
    }
    
    const backSlide = () => {
      introSlides[slideNumber - 2].classList.toggle('hide');
      introSlides[slideNumber -1].classList.toggle('hide');
      if (slideNumber === 7){
        highlightNote(c4);
      }
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
    
    const nextBtnEight = document.getElementById('next-eight');
    nextBtnEight.addEventListener('click', introSlide, false);
    
    const backBtnNine = document.getElementById('back-nine');
    const nextBtnNine = document.getElementById('next-nine');
    backBtnNine.addEventListener('click', backSlide, false);
    nextBtnNine.addEventListener('click', introSlide, false);
    
    const backBtnTen = document.getElementById('back-ten');
    const nextBtnTen = document.getElementById('next-ten');
    backBtnTen.addEventListener('click', backSlide, false);
    nextBtnTen.addEventListener('click', () => {
      plantProgress.classList.remove('hide');
      leaves[0].classList.remove('hide');
      guessGameEx.classList.remove('hide');
      guessGameExP.classList.remove('hide');
      generateNote();
    }, false);
    
    const backBtnEleven = document.getElementById('back-eleven');
    const nextBtnEleven = document.getElementById('next-eleven');
    backBtnEleven.addEventListener('click', backSlide, false);
    nextBtnEleven.addEventListener('click', () => {
      guessGameExTwo.classList.remove('hide');
      guessGameExPTwo.classList.remove('hide');
      generateSong(someWhereOverTheRainbow)
    }, false);

    let extraKeys = document.getElementsByClassName('ex')
    
    let walkthrough = false;
    
    let keyboardOptions = document.getElementById('keyboard-options');
    
    const staffHTML = document.getElementById('staff');
    const guessGameEx = document.getElementById('guess-game-ex');
    const guessGameExP = document.getElementById('guess-game-ex-p');
    const guessGameExTwo = document.getElementById('guess-game-ex-two');
    const guessGameExPTwo = document.getElementById('guess-game-ex-p-two');
    const introContainer = document.getElementById('intro-container');
    const plantProgress = document.getElementById('plant-progress');
    const leaves = document.getElementsByClassName('leaves');
    const leafNumber = ['one', 'two', 'three', 'four', 'five'];
    
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
          if (setTimeoutCounter === 3){
            setTimeoutCounter = 0;
            clearInterval(showNoteExampleTimeout);
          }
        },
        500
        )
    }

    // var synthA = new Tone.Synth({
    //   oscillator: {
    //     type: 'fmsine',
    //     modulationType: 'sine',
    //     modulationIndex: 3,
    //     harmonicity: 3.4
    //   },
    //   envelope: {
    //     attack: 0.001,
    //     decay: 0.1,
    //     sustain: 0.1,
    //     release: 0.1
    //   }
    // }).toMaster()

    // var synthA = new Tone.Synth({
    //   oscillator: {
    //     type: 'triangle8'
    //   },
    //   envelope: {
    //     attack: 2,
    //     decay: 1,
    //     sustain: 0.4,
    //     release: 4
    //   }
    // }).toMaster()
        
