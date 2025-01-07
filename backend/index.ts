import { createApp } from './app';

const app = createApp();

const PORT = process.env.PORT || 9090;

app.listen(PORT, function () {
    console.log(`App is listening on port: ${PORT}!`);
});