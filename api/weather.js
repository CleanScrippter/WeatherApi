const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ error: 'City parameter is required' });
    }

    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.weatherapi.com/v1/current.json?q=${encodeURIComponent(city)}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            return res.status(response.status).json(data);
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
};
