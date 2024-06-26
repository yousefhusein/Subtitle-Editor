const TRANSLATE_API_URL = "https://chat-server-test.onrender.com/translate";

export default async function translate (text, sl, tl) {
    try {
        const response = await fetch(TRANSLATE_API_URL, {
            method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
                text: text.trim(),
                source: sl.toString().toLowerCase(),
                target: tl.toString().toLowerCase()
            })
        });
        const data = await response.json();
        
        if (!data || data.errors) {
            return null;
        }

        return Object.create({
            text: data.translatedText || data.to?.text || text
        });
    } catch (error) {
        return null;
    }
}