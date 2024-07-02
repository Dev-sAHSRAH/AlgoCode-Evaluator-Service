import express from "express";

import { addSubmission } from "../../controllers/submission.controller";
import { createSubmissionZodSchema } from "../../dtos/createSubmission.dto";
import { validate } from "../../validators/zod.validator";

const submissionRouter = express.Router();

submissionRouter.post("/", validate(createSubmissionZodSchema), addSubmission);

export default submissionRouter;
