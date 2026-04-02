const songs = [
  // Playlist 1
  { title: "Better Days", artist: "NEFFEX", src: "song1.mp3", playlist: 1 },
  { title: "Sunset Dream", artist: "Cheel", src: "song2.mp3", playlist: 1 },
  { title: "Blue Skies", artist: "Silent Partner", src: "song3.mp3", playlist: 1 },

  // Playlist 2
  { title: "Mortals", artist: "Warriyo", src: "song4.mp3", playlist: 2 },
  { title: "Invincible", artist: "DEAF KEV", src: "song5.mp3", playlist: 2 },
  { title: "Sky High", artist: "Elektronomia", src: "song6.mp3", playlist: 2 }
];

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

let currentIndex = 0;
let isPlaying = false;

const playlist1 = document.getElementById("playlist1");
const playlist2 = document.getElementById("playlist2");

// Load playlist
songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.innerText = song.title + " - " + song.artist;
  li.onclick = () => loadSong(index);

  if (song.playlist === 1) {
    playlist1.appendChild(li);
  } else {
    playlist2.appendChild(li);
  }
});

function loadSong(index) {
  currentIndex = index;
  const song = songs[index];

  audio.src = song.src;
  title.innerText = song.title;
  artist.innerText = song.artist;

  highlightSong();
  playSong();
}

// Play / Pause
function playPause() {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
  } else {
    playSong();
  }
}

function playSong() {
  audio.play();
  isPlaying = true;
}

// Next / Previous
function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
}

function prevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
}

// Shuffle
function shuffleSong() {
  currentIndex = Math.floor(Math.random() * songs.length);
  loadSong(currentIndex);
}

// Highlight active song
function highlightSong() {
  const items = document.querySelectorAll("li");
  items.forEach((item, i) => {
    item.classList.remove("active");
    if (i === currentIndex) {
      item.classList.add("active");
    }
  });
}

// Progress bar
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
  }
});

progress.addEventListener("input", () => {
  if (audio.duration) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

// Volume
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});