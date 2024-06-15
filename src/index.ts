import express, { Express } from "express";

import serverConfig from "./config/server.config";
import sampleProducer from "./producers/sampleProducer";
import apiRouter from "./routes";
import sampleWorker from "./workers/sampleWorker";

const app: Express = express();

app.use("/api", apiRouter);

app.listen(serverConfig.PORT, () => {
  console.log(`Server started at PORT : ${serverConfig.PORT} 🔥`);
  sampleWorker("SampleQueue");
  sampleProducer("SampleJob", {
    name: "Harsha",
    company: "Microsoft",
    position: "SRE",
    location: "HYD",
  });
});
