const TRANSLATE_API_URL = "https://inconclusive-hip-vibraphone.glitch.me/translate";

export default async function translate (text, sl, tl) {
    try {
        const response = await fetch(TRANSLATE_API_URL, {
            method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
                text: text.trim(),
                sl: String(sl),
                tl: String(tl)
            })
        });
        const data = await response.json();
        
        if (!data || data.errors) {
            return null;
        }

        return data;
    } catch (error) {
        return null;
    }
}