// ||================== All Varibles Initialized =================||
let songIndex = 0;
let progress;
const mainPlay = document.getElementById("mainPlay");
const previousBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
const mainProgressBar = document.getElementById("mainProgressBar");
const gif1 = document.getElementById("gif1");
const gif2 = document.getElementById("gif2");
const songItemPlaying = Array.from(
  document.getElementsByClassName("songItemPlay")
);
const songItemName = Array.from(document.getElementsByClassName("songItem"));
const mainSong1 = document.getElementById("mainSongPlaying1");
const mainSong2 = document.getElementById("mainSongPlaying2");
const volBar = document.getElementById("volumeBar");
const volBtn = document.getElementById("vol");
const loopBtn = document.getElementById("loop");
const loopChk = document.getElementById("checkMark");

const playIcon = "fa-circle-play";
const pauseIcon = "fa-circle-pause";
const volUp = "fa-volume-high";
const volDown = "fa-volume-low";
const noVol = "fa-volume-xmark";

const mp3 = ".mp3";

// <||====================== Array Of the Songs and Images ===========================||>
const songPath = "public/songs/";
const songCoverPath = "public/covers/";
const songs = [
  {
    songName: "Believer - Imagine Dragons",
    filePath: `${songPath}1${mp3}`,
    coverPath: `${songCoverPath}believer.jpg`,
    time: "3:36",
  },
  {
    songName: "Believer - Cover By Tommee Profitt",
    filePath: `${songPath}2${mp3}`,
    coverPath: `${songCoverPath}believer-tp.jpg`,
    time: "4:35",
  },
  {
    songName: "Dream - Road Trip (Remix)",
    filePath: `${songPath}3${mp3}`,
    coverPath: `${songCoverPath}dreamroadtrip.jpg`,
    time: "3:07",
  },
  {
    songName: "Unstoppable - TheScore",
    filePath: `${songPath}4${mp3}`,
    coverPath: `${songCoverPath}unstoppable.jpg`,
    time: "3:10",
  },
  {
    songName: "Stronger - TheScore",
    filePath: `${songPath}5${mp3}`,
    coverPath: `${songCoverPath}stronger.jpg`,
    time: "3:19",
  },
  {
    songName: "The Spidy-Verse Theme",
    filePath: `${songPath}6${mp3}`,
    coverPath: `${songCoverPath}spider-verse.jpg`,
    time: "5:16",
  },
  {
    songName: "Warriors - Imagine Dragons",
    filePath: `${songPath}7${mp3}`,
    coverPath: `${songCoverPath}warriors2016.jpg`,
    time: "2:50",
  },
  {
    songName: "Warriors - 2WEI Cover",
    filePath: `${songPath}8${mp3}`,
    coverPath: `${songCoverPath}warriors2wei.jpg`,
    time: "3:21",
  },
];

let audioElement = new Audio(songs[songIndex].filePath); // The Main Audio Element

// ================ The Event Listeners ================||>

mainPlay.addEventListener("click", playBtn);
nextBtn.addEventListener("click", nextSong);
previousBtn.addEventListener("click", previousSong);
volBar.addEventListener("change", volChange);
loopBtn.addEventListener("click", loopVid);
audioElement.addEventListener("timeupdate", updateProgress);

mainProgressBar.addEventListener("change", function () {
  audioElement.currentTime =
    (mainProgressBar.value * audioElement.duration) / 1000;
});

songItemPlaying.forEach((element) =>
  element.addEventListener("click", makePlay)
);

songItemName.forEach((element, i) => {
  let songImage = element.getElementsByClassName("img");
  let songNamePlaying = element.getElementsByClassName("jSName");
  let songDuration = element.getElementsByClassName("duration");

  songImage[0].src = songs[i].coverPath;
  songNamePlaying[0].textContent = songs[i].songName;
  songDuration[0].textContent = songs[i].time;
});

// ========================All Functions======================||>
function playBtn() {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    songPlayText();
  } else {
    audioElement.pause();
    mainPlay.classList.remove(pauseIcon);
    mainPlay.classList.add(playIcon);
    gifHide();
  }
}

function updateProgress() {
  let progress = (audioElement.currentTime / audioElement.duration) * 1000;
  mainProgressBar.value = progress;
  if (mainProgressBar.value == 1000 && loopChk.style.opacity == 1) {
    mainProgressBar.value = 0;
    playBtn();
  } else if (mainProgressBar.value == 1000) nextSong();
}

function volChange() {
  audioElement.volume = volBar.value / 100;

  if(volBar.value <= 0){
    volBtn.classList.remove(volDown);
    volBtn.classList.remove(volUp);
    volBtn.classList.add(noVol);
  } else if (volBar.value < 50) {
    volBtn.classList.remove(noVol)
    volBtn.classList.remove(volUp);
    volBtn.classList.add(volDown);
  } else {
    volBtn.classList.remove(noVol)
    volBtn.classList.remove(volDown);
    volBtn.classList.add(volUp);
  }
}

function previousSong() {
  if (songIndex <= 0) {
    songIndex = 7;
  } else {
    songIndex -= 1;
  }
  manyThings();
}

function nextSong() {
  if (songIndex >= 7) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  manyThings();
}

function makePlay(e) {
  songIndex = parseInt(e.target.id);
  e.target.classList.remove(playIcon);
  e.target.classList.add(pauseIcon);
  gifShow();
  makeAllPlays();
  manyThings();
}

function loopVid() {
  if (loopChk.style.opacity == 0) {
    loopChk.style.opacity = 1;
  } else {
    loopChk.style.opacity = 0;
  }
}

// Components --------------------------------------------
const manyThings = () => {
  audioElement.src = `${songPath}${songIndex + 1}${mp3}`;
  audioElement.currentTime = 0;
  audioElement.play();
  songPlayText();
};

const makeAllPlays = () => {
  songItemPlaying.forEach((element) => {
    element.classList.remove(pauseIcon);
    element.classList.add(playIcon);
    gifHide();
  });
};

const songPlayText = () => {
  mainSong1.innerText = songs[songIndex].songName;
  mainSong2.innerText = songs[songIndex].songName;
  gifShow();
  mainPlay.classList.remove(playIcon);
  mainPlay.classList.add(pauseIcon);
};

const gifShow = () => {
  gif1.style.opacity = 1;
  gif2.style.opacity = 1;
}

const gifHide = () => {
  gif1.style.opacity = 0;
  gif2.style.opacity = 0;
}