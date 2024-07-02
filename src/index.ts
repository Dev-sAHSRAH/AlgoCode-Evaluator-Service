import bodyParser from "body-parser";
import express, { Express } from "express";

import serverAdapter from "./config/bullBoard.config";
import serverConfig from "./config/server.config";
import runPython from "./containers/runPythonDocker";
// import sampleProducer from "./producers/sampleProducer";
import apiRouter from "./routes";
import sampleWorker from "./workers/sampleWorker";

const app: Express = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use("/api", apiRouter);
app.use("/admin/queues", serverAdapter.getRouter());

app.listen(serverConfig.PORT, () => {
  console.log(`Server started at PORT : ${serverConfig.PORT} 🔥`);
  console.log(`BullBoard is running at ${serverConfig.PORT}/admin/queues`);

  sampleWorker("SampleQueue");

  const code = `x = input()
y = input()
print("value of x is" ,x)
print("value of y is" ,y)`;

  const input = `100
200`;
  runPython(code, input);
});
