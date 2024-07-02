import { Request, Response } from "express";

import { CreateSubmissionDto } from "../dtos/createSubmission.dto";

export function addSubmission(req: Request, res: Response) {
  const submissionDto = req.body as CreateSubmissionDto;

  return res.status(201).json({
    success: true,
    error: {},
    message: "Successfully collected the submission",
    data: submissionDto,
  });
}
