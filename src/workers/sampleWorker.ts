import { Job, Worker } from "bullmq";

import redisConnection from "../config/redis.config";
import SampleJob from "../jobs/sampleJob";

export default function sampleWorker(queueName: string) {
  new Worker(
    queueName,
    async (job: Job) => {
      console.log("Sample job worker kicking", job);

      if (job.name === "SampleJob") {
        const sampleJobInstance = new SampleJob(job.data);

        sampleJobInstance.handle(job);

        //   return true;
      }
    },
    {
      connection: redisConnection,
    }
  );
}
