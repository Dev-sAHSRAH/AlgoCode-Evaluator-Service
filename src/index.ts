import bodyParser from "body-parser";
import express, { Express } from "express";

import serverAdapter from "./config/bullBoard.config";
import serverConfig from "./config/server.config";
import submissionQueueProducer from "./producers/submissionQueueProducer";
import apiRouter from "./routes";
import { submission_queue } from "./utils/constants";
import sampleWorker from "./workers/sampleWorker";
import SubmissionWorker from "./workers/submissionWorker";

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
  SubmissionWorker(submission_queue);

  const code = `x = input()
print(x)`;

  const input = `10`;
  submissionQueueProducer({
    "1234": {
      language: "python",
      input,
      code,
    },
  });
});
