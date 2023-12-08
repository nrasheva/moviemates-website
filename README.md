# Moviemates

Moviemates is a single page application where you can discover movies, share your opinion with other cinephiles and add movies to your watchlist.

## Technologies

![React/Vite](https://img.shields.io/badge/React%2FVite-blue?style=flat&logo=react&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-593D88?style=flat&logo=redux&logoColor=white)
![React Router Dom](https://img.shields.io/badge/React%20Router%20Dom-green?style=flat&logo=react-router&logoColor=white)

## Features

- Authentication
- Discussions
- Infinite scroll on mobile
- Random movie list generator by genre
- Watchlist

## Acknowledgements

- [The Movie Database (TMDB)](https://www.themoviedb.org)

## Run locally

Clone the project

```bash
git clone https://github.com/nrasheva/moviemates-website
```

Go to the project directory

```bash
cd moviemates-website
```

Install the dependencies

```bash
npm install
```

Start the server

```bash
npm run dev
```

## API

- [moviemates-api](https://github.com/nrasheva/moviemates-api)

## Environment variables

This project uses [Dotenv Vault](https://www.dotenv.org/docs/security/vault) to securely store environment variables. You will need to add the following environmental variables to your .env file:

`VITE_API_BASE_URL`

Example: `VITE_API_BASE_URL="http://localhost:3000"`

## Feedback

If you have any feedback, please reach me at nadezhda.rasheva96@gmail.com

## License

[MIT](https://choosealicense.com/licenses/mit)
