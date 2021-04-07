import app from "./app";

const PORT = 3000;

function listenServer() {
  console.log(`✅ Listening on: http://localhost:${PORT}`);
}

app.listen(PORT, listenServer);
