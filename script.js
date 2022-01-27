// ||================== All Varibles Initialized =================||
let songIndex = 0;
let progress;
let mainPlay = document.getElementById("mainPlay");
let previousBtn = document.getElementById("previous");
let nextBtn = document.getElementById("next");
let mainProgressBar = document.getElementById("mainProgressBar");
let gif1 = document.getElementById("gif1");
let gif2 = document.getElementById("gif2");
let songItemPlaying = Array.from(document.getElementsByClassName("songItemPlay"));
let songItemName = Array.from(document.getElementsByClassName("songItem"));
let mainSong1 = document.getElementById("mainSongPlaying1");
let mainSong2 = document.getElementById("mainSongPlaying2");
let volBar = document.getElementById("volumeBar");
let volBtn = document.getElementById("vol");
let loopBtn = document.getElementById("loop");
let loopChk = document.getElementById("checkMark");

// <||====================== Array Of the Songs and Images ===========================||>
let songPath = "public/songs/";
let songCoverPath = "public/covers/";
const songs = [
  {
    songName: "Believer - Imagine Dragons",
    filePath: `${songPath}1.mp3`,
    coverPath: `${songCoverPath}believer.jpg`,
  },
  {
    songName: "Believer - Cover By Tommee Profitt",
    filePath: `${songPath}2.mp3`,
    coverPath: `${songCoverPath}believer-tp.jpg`,
  },
  {
    songName: "Dream - Road Trip (Remix)",
    filePath: `${songPath}3.mp3`,
    coverPath: `${songCoverPath}dreamroadtrip.jpg`,
  },
  {
    songName: "Unstoppable - TheScore",
    filePath: `${songPath}4.mp3`,
    coverPath: `${songCoverPath}unstoppable.jpg`,
  },
  {
    songName: "Stronger - TheScore",
    filePath: `${songPath}5.mp3`,
    coverPath: `${songCoverPath}stronger.jpg`,
  },
  {
    songName: "The Spidy-Verse Theme",
    filePath: `${songPath}6.mp3`,
    coverPath: `${songCoverPath}spider-verse.jpg`,
  },
  {
    songName: "Warriors - Imagine Dragons",
    filePath: `${songPath}7.mp3`,
    coverPath: `${songCoverPath}warriors2016.jpg`,
  },
  {
    songName: "Warriors - 2WEI Cover",
    filePath: `${songPath}8.mp3`,
    coverPath: `${songCoverPath}warriors2wei.jpg`,
  },
];

let audioElement = new Audio(songs[songIndex].filePath); // The Main Audio Element

// ================ The Event Listeners ================||>

mainPlay.addEventListener("click", playBtn);
nextBtn.addEventListener("click", nextSong);
previousBtn.addEventListener("click", previousSong);
volBar.addEventListener("change", volChange);
loopBtn.addEventListener("click", loopVid);
audioElement.addEventListener("timeupdate", function () {
  progress = (audioElement.currentTime / audioElement.duration) * 1000;
  mainProgressBar.value = progress;
  if (mainProgressBar.value == 1000 && loopChk.style.opacity == 1) {
    mainProgressBar.value = 0;
    playBtn();
  } else if (mainProgressBar.value == 1000) nextSong()
});

mainProgressBar.addEventListener("change", function () {
  audioElement.currentTime =
  (mainProgressBar.value * audioElement.duration) / 1000;
});

songItemPlaying.forEach((element) => element.addEventListener("click", makePlay));

songItemName.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("jSName")[0].innerHTML = songs[i].songName;
});
// ========================All Functions======================||>
function playBtn () {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    songPlayText();
  } else {
    audioElement.pause();
    mainPlay.classList.remove("fa-pause-circle");
    mainPlay.classList.add("fa-play-circle");
    gif1.style.opacity = 0;
    gif2.style.opacity = 0;
  }
}
function volChange () {
  audioElement.volume = volBar.value / 100;
  if (volBar.value < 50) {
    volBtn.classList.remove("fa-volume-up");
    volBtn.classList.add("fa-volume-down");
  } else {
    volBtn.classList.remove("fa-volume-down");
    volBtn.classList.add("fa-volume-up");
  }
}
function previousSong () {
  if (songIndex <= 0) {
    songIndex = 7;
  } else {
    songIndex -= 1;
  }
  manyThings();
}
function nextSong () {
  if (songIndex >= 7) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  manyThings();
}
function makePlay (e) {
  songIndex = parseInt(e.target.id);
  e.target.classList.remove("fa-play-circle");
  e.target.classList.add("fa-pause-circle");
  gif1.style.opacity = 1;
  gif2.style.opacity = 1;
  makeAllPlays();
  manyThings();
}
function loopVid () {
  if (loopChk.style.opacity == 0) {
    loopChk.style.opacity = 1;
  } else {
    loopChk.style.opacity = 0;
  }
}
// Methods --------------------------------------------
const manyThings = () => {
  audioElement.src = `${songPath}${songIndex + 1}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  songPlayText();
};
const makeAllPlays = () => {
  songItemPlaying.forEach((element) => {
    element.classList.remove("fa-pause-circle");
    element.classList.add("fa-play-circle");
    gif1.style.opacity = 0;
    gif2.style.opacity = 0;
  });
};
const songPlayText = () => {
  mainSong1.innerText = songs[songIndex].songName;
  mainSong2.innerText = songs[songIndex].songName;
  gif1.style.opacity = 1;
  gif2.style.opacity = 1;
  mainPlay.classList.remove("fa-play-circle");
  mainPlay.classList.add("fa-pause-circle");
};
