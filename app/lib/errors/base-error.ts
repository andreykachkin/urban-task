abstract class ErrorBase extends Error {
  public code: string;
  public statusCode: number;
  public message: string;
}

export default ErrorBase;
