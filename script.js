console.log("This is Musical");
var songIndex = 0;
var mainPlay = document.getElementById("mainPlay");
var previousBtn = document.getElementById("previous");
var nextBtn = document.getElementById("next");
var mainProgressBar = document.getElementById("mainProgressBar");
var gif1 = document.getElementById("gif1");
var gif2 = document.getElementById("gif2");
var songItemPlaying = Array.from(
  document.getElementsByClassName("songItemPlay")
);
var songItemName = Array.from(document.getElementsByClassName("songItem"));
var mainSong1 = document.getElementById("mainSongPlaying1");
var mainSong2 = document.getElementById("mainSongPlaying2");
var volBar = document.getElementById("volumeBar");
var volBtn = document.getElementById("vol");
var loopBtn = document.getElementById("loop");
var loopChk = document.getElementById("checkMark");
var songPath = "public/songs/";
var songCoverPath = "public/covers/";
var songs = [
  {
    songName: "Believer - Imagine Dragons",
    filePath: "".concat(songPath, "1.mp3"),
    coverPath: "".concat(songCoverPath, "believer.jpg"),
  },
  {
    songName: "Believer - Cover By Tommee Profitt",
    filePath: "".concat(songPath, "2.mp3"),
    coverPath: "".concat(songCoverPath, "believer-tp.jpg"),
  },
  {
    songName: "Dream - Road Trip (Remix)",
    filePath: "".concat(songPath, "3.mp3"),
    coverPath: "".concat(songCoverPath, "dreamroadtrip.jpg"),
  },
  {
    songName: "Unstoppable - TheScore",
    filePath: "".concat(songPath, "4.mp3"),
    coverPath: "".concat(songCoverPath, "unstoppable.jpg"),
  },
  {
    songName: "Stronger - TheScore",
    filePath: "".concat(songPath, "5.mp3"),
    coverPath: "".concat(songCoverPath, "stronger.jpg"),
  },
  {
    songName: "SpiderMan - Sam Raimi Theme",
    filePath: "".concat(songPath, "6.mp3"),
    coverPath: "".concat(songCoverPath, "spider-man.jpg"),
  },
  {
    songName: "Warriors - Imagine Dragons",
    filePath: "".concat(songPath, "7.mp3"),
    coverPath: "".concat(songCoverPath, "warriors2016.jpg"),
  },
  {
    songName: "Warriors - 2WEI Cover",
    filePath: "".concat(songPath, "8.mp3"),
    coverPath: "".concat(songCoverPath, "warriors2wei.jpg"),
  },
];
var audioElement = new Audio(songs[songIndex].filePath);
mainPlay.addEventListener("click", playBtn);
nextBtn.addEventListener("click", nextSong);
previousBtn.addEventListener("click", previousSong);
volBar.addEventListener("change", volChange);
loopBtn.addEventListener("click", loopVid);
songItemPlaying.forEach(function (element) {
  element.addEventListener("click", makePlay);
});
songItemName.forEach(function (element, i) {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("jSName")[0].innerHTML = songs[i].songName;
});
audioElement.addEventListener("timeupdate", function () {
  var progress = (audioElement.currentTime / audioElement.duration) * 1000;
  mainProgressBar.value = progress;
  if (mainProgressBar.value == "1000" && loopChk.style.opacity == "1") {
    mainProgressBar.value = "0";
    playBtn();
  } else if (mainProgressBar.value == "1000") {
    nextSong();
  }
});
mainProgressBar.addEventListener("change", function () {
  audioElement.currentTime =
    (mainProgressBar.value * audioElement.duration) / 1000;
});
// ========================All Functions======================||>
function playBtn() {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    songPlayText();
  } else {
    audioElement.pause();
    mainPlay.classList.remove("fa-pause-circle");
    mainPlay.classList.add("fa-play-circle");
    gif1.style.opacity = "0";
    gif2.style.opacity = "0";
  }
}
function volChange() {
  audioElement.volume = volBar.value / 100;
  if (volBar.value < 50) {
    volBtn.classList.remove("fa-volume-up");
    volBtn.classList.add("fa-volume-down");
  } else {
    volBtn.classList.remove("fa-volume-down");
    volBtn.classList.add("fa-volume-up");
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
  makeAllPlays();
  songIndex = parseInt(e.target.id);
  e.target.classList.remove("fa-play-circle");
  e.target.classList.add("fa-pause-circle");
  gif1.style.opacity = "1";
  gif2.style.opacity = "1";
  manyThings();
}
function loopVid() {
  if (loopChk.style.opacity == "0") {
    loopChk.style.opacity = "1";
  } else {
    loopChk.style.opacity = "0";
  }
}
var manyThings = function () {
  audioElement.src = "".concat(songPath).concat(songIndex + 1, ".mp3");
  audioElement.currentTime = 0;
  audioElement.play();
  songPlayText();
};
var makeAllPlays = function () {
  songItemPlaying.forEach(function (element) {
    element.classList.remove("fa-pause-circle");
    element.classList.add("fa-play-circle");
    gif1.style.opacity = "0";
    gif2.style.opacity = "0";
  });
};
var songPlayText = function () {
  mainSong1.innerText = songs[songIndex].songName;
  mainSong2.innerText = songs[songIndex].songName;
  gif1.style.opacity = "1";
  gif2.style.opacity = "1";
  mainPlay.classList.remove("fa-play-circle");
  mainPlay.classList.add("fa-pause-circle");
};
