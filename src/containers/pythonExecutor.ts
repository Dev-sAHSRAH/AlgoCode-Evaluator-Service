// import Docker from "dockerode";
// import { TestCases } from "../types/testCases";
import CodeExecutorStrategy, {
  ExecutionResponse,
} from "../types/codeExecutorStrategy";
import { PYTHON_IMAGE } from "../utils/constants";
import createContainer from "./containerFactory";
import { fetchDecodedStream } from "./dockerHelper";
import pullImage from "./pullImage";

class PythonExecutor implements CodeExecutorStrategy {
  async execute(
    code: string,
    inputTestCase: string
  ): Promise<ExecutionResponse> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawLogBuffer: Buffer[] = [];
    console.log("Initialising a new Python docker container");
    await pullImage(PYTHON_IMAGE);
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

    try {
      const codeResponse: string = await fetchDecodedStream(
        loggerStream,
        rawLogBuffer
      );
      return { output: codeResponse, status: "COMPLETED" };
    } catch (error) {
      return { output: error as string, status: "ERROR" };
    } finally {
      await pythonDockerContainer.remove();
    }
  }
}

export default PythonExecutor;
