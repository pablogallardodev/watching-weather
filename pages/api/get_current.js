// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    const { q } = JSON.parse(req.body)

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': process.env.RAPID_API_HOST,
            'X-RapidAPI-Key': process.env.RAPID_API_KEY
        }
    };
    
    fetch(`${process.env.BASE_URL}current.json?q=${q}`, options)
        .then(response => response.json())
        .then(data => {
            const { location, current } = data;
            const { country, localtime, name } = location;
            const { condition, humidity, feelslike_c, is_day, temp_c, wind_kph, wind_dir } = current;
            const { text, icon } = condition;

            const body = {
                conditionText: text,
                conditionIcon: icon,
                country,
                localtime,
                locationName: name,
                humidity,
                isDay: is_day,
                feelsLike: feelslike_c,
                temperature: temp_c,
                windSpeed: wind_kph,
                windDir: wind_dir
            };
            res.status(200).json({ error: false, data: body });
        })
        .catch(err => {
            res.status(400).json({ error: true, err })
        });
}
  