import app from "./app.js";
import { env } from "./configs/config.js";

const PORT = env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
