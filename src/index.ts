import express, { Express } from "express";

import serverAdapter from "./config/bullBoard.config";
import serverConfig from "./config/server.config";
import sampleProducer from "./producers/sampleProducer";
import apiRouter from "./routes";
import sampleWorker from "./workers/sampleWorker";

const app: Express = express();

app.use("/api", apiRouter);
app.use("/admin/queues", serverAdapter.getRouter());

app.listen(serverConfig.PORT, () => {
  console.log(`Server started at PORT : ${serverConfig.PORT} 🔥`);
  console.log(`BullBoard is running at ${serverConfig.PORT}/admin/queues`);
  sampleWorker("SampleQueue");

  sampleProducer(
    "SampleJob",
    {
      name: "Harsha",
      company: "Microsoft",
      position: "SRE",
      location: "HYD",
    },
    2
  );

  sampleProducer(
    "SampleJob",
    {
      name: "Niki",
      company: "Microsoft",
      position: "SRE",
      location: "HYD",
    },
    1
  );
});
