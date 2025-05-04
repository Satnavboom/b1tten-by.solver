const span = document.querySelector("#change-text span");
              
span.addEventListener("mouseover", () => {
    span.textContent = "fine. stay. whatever.";
    span.style.color = '#bbbb00';
})

span.addEventListener("mouseleave", () => {
    span.textContent = "go away";
    span.style.color = '#5315fd';
});

const bgm = document.getElementById("bgm");
bgm.volume = 0.1;
bgm.play().catch(() => {
    console.log("stupid bgm didn't autoplay");
});

const audioPlayer = document.getElementById("audio-player");
const playbutton = document.getElementById("play-btn");
const progressBar = document.getElementById("progress-bar");
const currentTimeDisplay = document.getElementById("current-time");
const durationDisplay = document.getElementById("duration");

let isPlaying = false;

playbutton.addEventListener("click", () => {
    if (isPlaying) {
        audioPlayer.pause();
        playbutton.textContent = "Play";
        bgm.play();
    } else {
        audioPlayer.play();
        playbutton.textContent = "Pause";
        bgm.pause();
    }
    isPlaying = !isPlaying;
});

audioPlayer.addEventListener("timeupdate", () => {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    const progress = (currentTime / duration) * 100;

    progressBar.value = progress;

    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' +currentSeconds : currentSeconds}`;

    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60);
    durationDisplay.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' + durationSeconds : durationSeconds}`;
});

progressBar.addEventListener("input", () => {
    const seekTime = (progressBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = seekTime;
});

window.addEventListener("load", () => {
    bgm.play().catch(() => {
        console.log("stupid bgm didn't play on load");
    });
});
