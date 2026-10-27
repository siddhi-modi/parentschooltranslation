function splitIntoChunks(text, maxLength = 450) {
    const sentences = text.match(/[^.!?\n]+[.!?]*\s*/g) || [text];
    const chunks = [];
    let current = '';

    for (let sentence of sentences) {
        while (sentence.length > maxLength) {
            if (current) { chunks.push(current); current = ''; }
            chunks.push(sentence.slice(0, maxLength));
            sentence = sentence.slice(maxLength);
        }
        if ((current + sentence).length > maxLength) {
            chunks.push(current);
            current = sentence;
        } else {
            current += sentence;
        }
    }
    if (current.trim()) chunks.push(current);
    return chunks;
}

async function translateChunk(chunk, targetLanguage) {
    const langPair = `en|${targetLanguage}`;
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(chunk)}&langpair=${langPair}`;

    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`Status code: ${response.status}`);

    const data = await response.json();
    if (Number(data.responseStatus) !== 200) {
        throw new Error(data.responseDetails || 'Translation failed.');
    }
    return data.responseData?.translatedText || '';
}

export async function translateNoticeText(text, targetLanguage) {
    if (!text || !text.trim()) return '';
    if (targetLanguage === 'en') return text;

    try {
        const chunks = splitIntoChunks(text);
        const results = [];
        for (const chunk of chunks) {
            results.push(await translateChunk(chunk, targetLanguage));
        }
        return results.join(' ');
    } catch (error) {
        throw new Error(`API error: ${error.message}`);
    }
}