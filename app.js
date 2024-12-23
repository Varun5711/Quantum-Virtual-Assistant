const btn = document.querySelector("#btn");
const content = document.querySelector("#content");
const voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.lang = "hi-GB";
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    window.speechSynthesis.speak(text_speak);
}

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (e) => {
    let transcript = e.results[e.resultIndex][0].transcript.trim();
    takeCommand(transcript);
};

btn.addEventListener("click", () => {
    recognition.start();
    speak("I am listening to you, please ask a question.");
    btn.textContent = "Listening...";
    voice.style.display = "block";
});

function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";
    const normalizedMessage = message.toLowerCase().trim();

    if (normalizedMessage.includes("hello") || normalizedMessage.includes("hey")) {
        speak("Hello, what can I help you with?");
    } else if (normalizedMessage.includes("who are you") || normalizedMessage.includes("hu r u")) {
        speak("I am Quantum, a virtual assistant, made by Varun.");
    } else if (normalizedMessage.includes("how are you")) {
        speak("I am fine, what about you?");
    } else if (normalizedMessage.includes("open youtube")) {
        window.open("https://www.youtube.com");
        speak("Opening Youtube");
    } else if (normalizedMessage.includes("open linkedin")) {
        window.open("https://www.linkedin.com");
        speak("Opening Linkedin");
    } else if (normalizedMessage.includes("open instagram") || normalizedMessage.includes("open insta")) {
        window.open("https://www.instagram.com");
        speak("Opening Instagram");
    } else if (normalizedMessage.includes("Open whatsapp")||normalizedMessage.includes("open whatsup")) {
        window.open("https://web.whatsapp.com/");
        speak("Opening whatsapp web");
    } else if(normalizedMessage.includes("what is the time")||normalizedMessage.includes("kitni baji h ")) {
        let time = new Date().toLocaleDateString(undefined , {hour : "numeric" , minute : "numeric"});
        speak(time);
    } else if (normalizedMessage.includes("what is the date") || normalizedMessage.includes("aaj konsi date h")) {
        let date = new Date().toLocaleDateString(undefined, { day : "numeric", month: "short" });
        speak(date);
    } else {
        const searchQuery = encodeURIComponent(normalizedMessage);
        window.open(`https://www.google.com/search?q=${searchQuery.replace("Quantum", "")}`);
        speak(`Here is what I found on Google about ${normalizedMessage.replace("Quantum", "")}`);
    }
    

    btn.textContent = "Start Listening Again";
}