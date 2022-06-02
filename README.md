# wathing-weather - app del clima

Esta es una aplicación wen only movil, en donde podremos vizualizar el clima de nuestros lugares favoritos, asi como guardarlos en un listado, para posteriormente vizualizarlos en tiempo real. Esta aplicación fue realizada con [Netx JS](https://nextjs.org/), [Firebase](https://firebase.google.com/) y consumiendo nuestra api [WeatherAPI desde Rapid API](https://rapidapi.com/weatherapi/api/weatherapi-com/)

## Preparando la aplicación

Para ejecutar la aplicacion debes tener un proyecto de [Firebase](https://console.firebase.google.com/) para la autenticación y el guardado de información, tener instalado en tu equipo Node.js y NPM.

Descarga el repositorio:

```bash
git clone https://github.com/pablogallardodev/watching-weather.git
cd watching-weather
```

Instala las dependencias:

```bash
npm install
```

Crea un archivo `.env` a partir del archivo `.env.example`.

```bash
cp .env.example .env
```

### Variables .env

Necesitará el RAPID_API_HOST y RAPID_API_KEY, los cuales podrás encontrar en el [dashboard](https://rapidapi.com/weatherapi/api/weatherapi-com/) una vez suscrito al API dentro de RapidAPI. Agrégue ambas variables al archivo `.env`.

En el archivo /services/firebase/client.js, debe sustituir la configuración del proyecto firebase que puede encontrar en la [consola](https://console.firebase.google.com/) de su proyecto.

## Ejecutando la aplicación

Una vez completado lo mencionado anteriormente, puede ejecutar la aplicación con:

```bash
npm run dev
```

Para visualizar la aplicacion dirijase a [localhost:3000](http://localhost:3000).

## Menciones

Este proyecto es realizado en base a un Hackathon, el cuál, ha sido lanzado por Miguel Ángel Durán (midudev), a quíen puedes encontrar en directos en [Twich](https://twitch.tv/midudev)