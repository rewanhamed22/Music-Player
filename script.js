let currentMusic = 0;
const music = document.querySelector("#audio");
const playBtn = document.querySelector(".play-btn");
const disk = document.querySelector(".disk");
const bar = document.querySelector(".bar");
const songName = document.querySelector(".music-name");
const artist = document.querySelector(".artist-name");
const currentTime = document.querySelector(".current-time");
const duration = document.querySelector(".duration");
const forward = document.querySelector(".forward-btn");
const backward = document.querySelector(".backward-btn");

playBtn.addEventListener("click", () => {
  if (playBtn.className.includes("pause")) {
    music.play();
  } else {
    music.pause();
  }
  playBtn.classList.toggle("pause");
  disk.classList.toggle("play");
});

const playMusic = () => {
  music.play();
  playBtn.classList.remove("pause");
  disk.classList.add("play");
};

const setMusic = (i) => {
  bar.value = 0;
  let song = songs[i];
  currentMusic = i;
  music.src = song.path;
  songName.innerHTML = song.name;
  artist.innerHTML = song.artist;
  disk.style.backgroundImage = `url(${song.cover})`;
  currentTime.innerHTML = "00:00";
  setTimeout(() => {
    bar.max = music.duration;
    duration.innerHTML = formatTime(music.duration);
  }, 300);
};
setMusic(0);
const formatTime = (time) => {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = `0${min}`;
  }
  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min} : ${sec}`;
};
setInterval(() => {
  bar.value = music.currentTime;
  currentTime.innerHTML = formatTime(music.currentTime);
  if (Math.floor(music.currentTime) == Math.floor(bar.max)) {
    forward.click();
  }
}, 500);
bar.addEventListener("change", () => {
  music.currentTime = bar.value;
});
forward.addEventListener("click", () => {
  if (currentMusic >= songs.length - 1) {
    currentMusic = 0;
  } else {
    currentMusic++;
  }
  setMusic(currentMusic);
  playMusic();
});
backward.addEventListener("click", () => {
  if (currentMusic <= 0) {
    currentMusic = songs.length - 1;
  } else {
    currentMusic--;
  }
  setMusic(currentMusic);
  playMusic();
});
