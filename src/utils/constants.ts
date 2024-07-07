export const PYTHON_IMAGE = "python:3.8-slim";
export const JAVA_IMAGE = "openjdk:11-jdk-slim";
export const CPP_IMAGE = "gcc:latest";

export const submission_queue = "SubmissionQueue";

// This will represent the header size of docker stream
// docker stream header contains data about type od stream, i.e, stdout/sterr
// and length of the data
export const DOCKER_STREAM_HEADER_SIZE = 8; //in bytes
