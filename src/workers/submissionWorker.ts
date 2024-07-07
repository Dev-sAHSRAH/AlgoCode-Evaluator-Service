import { Job, Worker } from "bullmq";

import redisConnection from "../config/redis.config";
import SubmissionJob from "../jobs/submissionJob";

export default function SubmissionWorker(queueName: string) {
  new Worker(
    queueName,
    async (job: Job) => {
      if (job.name === "SubmissionJob") {
        const submissionJobInstance = new SubmissionJob(job.data);

        submissionJobInstance.handle(job);

        //   return true;
      }
    },
    {
      connection: redisConnection,
    }
  );
}
