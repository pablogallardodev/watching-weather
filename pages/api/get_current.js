// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const { q } = JSON.parse(req.body);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": process.env.RAPID_API_HOST,
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
    },
  };

  fetch(
    `${process.env.BASE_URL}forecast.json?q=${q || "Guanajuato"}&days=3`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      const { location, current, forecast } = data;
      const { country, localtime, name } = location;
      const {
        condition,
        humidity,
        feelslike_c,
        feelslike_f,
        is_day,
        temp_c,
        temp_f,
        wind_kph,
        wind_dir,
        wind_degree,
        uv,
      } = current;
      const { text, icon } = condition;
      const date = `${new Date(localtime).toDateString()} ${localtime.split(' ')[1]}`

      // Info next 3 days
      const days = forecast.forecastday.map((day) => {
        const { date } = day;

        return date
      })

      const body = {
        conditionText: text,
        conditionIcon: icon,
        country,
        localtime: date,
        locationName: name,
        humidity,
        isDay: is_day,
        feelsLikeC: feelslike_c,
        feelsLikeF: feelslike_f,
        temperatureC: temp_c,
        temperatureF: temp_f,
        windSpeed: wind_kph,
        windDegree: wind_degree,
        windDir: wind_dir,
        uv,
        days
      };
      res.status(200).json({ error: false, data: body });
    })
    .catch((err) => {
      res.status(400).json({ error: true, err });
    });
}
