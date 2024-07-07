import DockerStreamOutput from "../types/dockerStreamOutput";
import { DOCKER_STREAM_HEADER_SIZE } from "../utils/constants";

export default function decodeDockerStream(buffer: Buffer): DockerStreamOutput {
  let offset = 0; //keeps track of current pos in the buffer while parsing

  //   The output object that will store the accumulated stdout and sterr output as strings
  const output: DockerStreamOutput = { stdout: "", stderr: "" };

  //loop until offset reaches end of buffer
  while (offset < buffer.length) {
    // channel is read from buffer and has value of type of stream
    const typeOfStream = buffer[offset];

    // This length variable holds the length of the value
    // we will read this variable on an offset of 4 bytes from the start of the chunk
    const length = buffer.readUint32BE(offset + 4);

    // as now we have read the header, we will move to the value
    offset += DOCKER_STREAM_HEADER_SIZE;

    if (typeOfStream === 1) {
      // stdout stream
      output.stdout += buffer.toString("utf-8", offset, offset + length);
    } else if (typeOfStream === 2) {
      //stderr stream
      output.stderr += buffer.toString("utf-8", offset, offset + length);
    }

    offset += length; //move offset to next chunk
  }

  return output;
}

export async function fetchDecodedStream(
  loggerStream: NodeJS.ReadableStream,
  rawLogBuffer: Buffer[]
): Promise<string> {
  return await new Promise((res, rej) => {
    loggerStream.on("end", () => {
      const completeBuffer = Buffer.concat(rawLogBuffer);

      const decodedStream = decodeDockerStream(completeBuffer);
      console.log("decode", decodedStream);
      if (decodedStream.stderr) {
        rej(decodedStream.stderr);
      } else {
        res(decodedStream.stdout);
      }
    });
  });
}
