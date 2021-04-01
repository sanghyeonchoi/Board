import app from "./app";

const PORT = 3001;

function listeningServer() {
  console.log(`✅Listening on : http://localhost:${PORT}`);
}
app.listen(PORT, listeningServer);
