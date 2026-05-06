const socket = io("http://localhost:3000");

const outputYou = document.querySelector('.output-you');
const outputBot = document.querySelector('.output-bot');

const SpeechRecognition = window.SpeechRecognition || window.webkit.SpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

document.querySelector('button').addEventListener('click', () => {
    recognition.start();
})

recognition.addEventListener('speechstart', () => {
    console.log('Speech has started!!')
})

recognition.addEventListener('result', (e) => {
    console.log(e, 'detected');
    const user_text = e.results[0][0].transcript;
    const formattedText = user_text.charAt(0).toUpperCase() + user_text.slice(1)
    outputYou.textContent = formattedText;
    socket.emit('user_text', formattedText);
})

recognition.addEventListener('speechend', () => {
    recognition.stop();
})

recognition.addEventListener('error', (e) => {
    outputYou.textContent = 'Error :' + e.error;
})

function synthVoice(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    synth.speak(utterance);
}

socket.on('bot_text', function (replyText) {
    synthVoice(replyText);

    if (replyText == '') replyText = '(No answer...)';
    outputBot.textContent = replyText;
});










socket.on('connect', (socket) => {
    console.log('Socket Connected!!')
})