require('dotenv').config();
const express = require('express');
const app = express();
const { GoogleGenAI } = require("@google/genai")

app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));

const server = app.listen(3000);
const ai = new GoogleGenAI(process.env.GEMINI_API_KEY)
const io = require('socket.io')(server);



io.on('connection', (socket) => {
    console.log('A user is connected!!')
    socket.on('user_text', async (text) => {
        const bot_response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: text,
        })
        socket.emit('bot_text', bot_response.text)
    })


    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
})
