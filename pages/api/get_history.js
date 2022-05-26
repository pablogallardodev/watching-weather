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

  const date = new Date();
  const day = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

  fetch(
    `${process.env.BASE_URL}history.json?q=${q || "Guadalajara"}&dt=${day}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      const hours = [];
      const { astro, hour } = data.forecast.forecastday[0]

      hour.map((h) => {
        const { condition } = h
        const object = {
          hour: h.time.split(" ")[1],
          icon: condition.icon,
          temperatureC: h.temp_c,
          temperatureF: h.temp_f
        }

        hours.push(object)
      })

      res.status(200).json({ error: false, data: { astro, hours } });
    })
    .catch((err) => {
      res.status(400).json({ error: true, err });
    });
}
