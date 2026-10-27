console.log("--> Starting server.js execution...");

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { translateNoticeText } from './translator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

console.log("--> Express application initialized.");

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/translate', async (req, res) => {
    const { text, targetLanguage } = req.body;
    try {
        const translatedResult = await translateNoticeText(text, targetLanguage);
        res.json({ success: true, translation: translatedResult });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Only start our own server on a local computer. Vercel runs the app itself.
if (!process.env.VERCEL) {
    console.log(`--> Attempting to start server listening on port ${PORT}...`);

    app.listen(PORT, () => {
        console.log(`\n✔ SUCCESS: Server is up and listening!`);
        console.log(`👉 Open your browser to: http://localhost:${PORT}\n`);
    }).on('error', (err) => {
        console.error("❌ SERVER CRASHED ON START:", err.message);
    });
}

export default app;