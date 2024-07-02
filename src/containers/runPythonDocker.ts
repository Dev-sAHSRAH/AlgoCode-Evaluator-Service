// import Docker from "dockerode";
import { PYTHON_IMAGE } from "../utils/constants";
import createContainer from "./containerFactory";
import decodeDockerStream from "./dockerHelper";
// import { TestCases } from "../types/testCases";

async function runPython(code: string, inputTestCase: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawLogBuffer: Buffer[] = [];
  console.log("Initialising a new python docker container");

  const runCommand = `echo '${code.replace(
    /'/g,
    `'\\"`
  )}' > test.py && echo '${inputTestCase.replace(
    /'/g,
    `'\\"`
  )}' | python3 test.py`;

  const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
    "/bin/sh",
    "-c",
    runCommand,
  ]);

  //for starting the corresponding docker container
  await pythonDockerContainer.start();
  console.log("Started the python container 🚀");

  const loggerStream = await pythonDockerContainer.logs({
    stdout: true,
    stderr: true,
    timestamps: false,
    follow: true, //to stream the logs orelse will be returned as a single string
  });

  //   Attach events on the stream objects to start and stop reading
  loggerStream.on("data", (chunk) => {
    rawLogBuffer.push(chunk);
  });
  loggerStream.on("end", () => {
    // console.log(rawLogBuffer);
    const completeBuffer = Buffer.concat(rawLogBuffer);

    const decodedStream = decodeDockerStream(completeBuffer);
    console.log(decodedStream.stdout);
  });

  return pythonDockerContainer;
}

export default runPython;
