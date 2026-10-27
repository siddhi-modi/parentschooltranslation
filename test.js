import { translateNoticeText } from './translator.js';

// Realistic Indian school notice test case matching the SFIC constraints
const sampleNotice = "Dear Parents, the mid-term physics examination scheduled for October 28 has been postponed to November 2. The exam will begin promptly at 09:00 AM. Please ensure students bring their practical files.";

async function runTestPipeline() {
    console.log("=== Starting Standalone Translation Module Verification ===");
    console.log(`Original Text:\n"${sampleNotice}"\n`);

    // Test Case A: English to Gujarati Translation
    try {
        console.log("Processing Gujarati Translation Request...");
        const gujaratiResult = await translateNoticeText(sampleNotice, 'gu');
        console.log(`\x1b[32m✔ Gujarati Output:\x1b[0m\n${gujaratiResult}\n`);
    } catch (err) {
        console.error(`\x1b[31m✘ Gujarati Test Failed:\x1b[0m ${err.message}\n`);
    }

    // Test Case B: English to Hindi Translation
    try {
        console.log("Processing Hindi Translation Request...");
        const hindiResult = await translateNoticeText(sampleNotice, 'hi');
        console.log(`\x1b[32m✔ Hindi Output:\x1b[0m\n${hindiResult}\n`);
    } catch (err) {
        console.error(`\x1b[31m✘ Hindi Test Failed:\x1b[0m ${err.message}\n`);
    }
}

runTestPipeline();
