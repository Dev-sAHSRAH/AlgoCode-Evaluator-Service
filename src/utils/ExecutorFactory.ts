import cppExecutor from "../containers/cppExecutor";
import JavaExecutor from "../containers/javaExecutor";
import PythonExecutor from "../containers/pythonExecutor";
import CodeExecutorStrategy from "../types/codeExecutorStrategy";

export default function createExecutor(
  codeLanguage: string
): CodeExecutorStrategy | null {
  if (codeLanguage === "PYTHON") {
    return new PythonExecutor();
  } else if (codeLanguage === "JAVA") {
    return new JavaExecutor();
  } else if (codeLanguage === "CPP") {
    return new cppExecutor();
  } else {
    return null;
  }
}
