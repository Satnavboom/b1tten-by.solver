const span = document.querySelector("#change-text span");
              
span.addEventListener("mouseover", () => {
    span.textContent = "fine. stay. whatever.";
    span.style.color = '#bbbb00';
})

span.addEventListener("mouseleave", () => {
    span.textContent = "go away";
    span.style.color = '#5315fd';
});

const input = document.getElementById("terminal-input");
const output = document.getElementById("terminal-output");

const commands = {
    help: () => `
Commands:
    help - show this (duh)
    status - ...diagnostics...
    whoami - who ARE you ??
    clear - are u dumb
    date - im flattered, but this displays the time
    echo [text] - repeats [text]
    shutdown - SHUTDOWN
        `,

    status: () => `
system unstable
containment breach: 67%
absolute solver signature: ████
    `,

    whoami: () => `
drone | id: UZI.EXE
    `,

    clear: () => { output.innerText = ""; return ""; },

    date: () => `
${new Date().toString()}
    `,

    shutdown: () => `
SHUTDOWN INITIATED. EVERYONE PANIC!!!
just kidding, YOU DON'T GET TO LEAVE
    `,
    
    echo: (args) => `
${args.join(" ")}
` || `
echo what?
    `
}

input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        const inputText = input.value.trim();
        if (!inputText) return;

        const userLine = document.createElement("div");
        userLine.textContent = `> ${inputText}`;
        output.appendChild(userLine);

        const [cmd, ...args] = inputText.split(" ");
        let result = "";
        if (commands[cmd]) {
            result = commands[cmd](args);
        } else {
            result = `command literally isnt real! (nor are u)`;
        }

        const responseLine = document.createElement("div");
        responseLine.textContent = result;
        output.appendChild(responseLine);

        input.value = "";

        output.scrollTop = output.scrollHeight;
    }
});

function appendCommandToTerminal(command) {
    const terminalOutput = document.getElementById("terminal-output");
    const terminalInputLine = document.getElementById("terminal-input-line");

    const newLine = document.createElement("div");
    newLine.classList.add("terminal-line");
    newLine.textContent = `> ${command}`;

    terminalOutput.appendChild(newLine);

    terminalOutput.scrollTop = terminalOutput.scrollHeight;

    terminalInputLine.querySelector("#terminal-input").value = ""; // Clear the input field
}

function handleTyping(event) {
    if (event.key === "Enter") {
        const inputValue = document.getElementById("terminal-input").value.trim();
        appendCommandToTerminal(inputValue);
        executeCommand(inputValue);
    }
}

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
const volumeControl = document.getElementById("volume-control");

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

volumeControl.addEventListener("input", () => {
    audioPlayer.volume = volumeControl.value;
});

window.addEventListener("load", () => {
    bgm.play().catch(() => {
        console.log("stupid bgm didn't play on load");
    });
});
