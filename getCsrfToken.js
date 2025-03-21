import fetch from 'node-fetch';

export default async function handler(req, res) {
    try {
        const response = await fetch('https://launchpad.classlink.com/cfisd', {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Accept': '*/*'
            },
            credentials: 'include' // Required for authentication
        });

        if (!response.ok) {
            throw new Error(`Failed with status: ${response.status}`);
        }

        const text = await response.text();
        const match = text.match(/"Csrf-Token":"(.*?)"/);
        const csrfToken = match ? match[1] : null;

        res.status(200).json({ csrfToken });
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
        res.status(500).json({ error: 'Failed to fetch CSRF token' });
    }
}
