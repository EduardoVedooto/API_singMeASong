import "./setup";
import app from "./app";

const port = process.env.PORT || 4000;

app.listen(port, () => console.info(`Server is listening on port ${port}.`));
