type ErrorInfo = {
  name: string;
  message: string;
  stack?: string;
  code?: string | number;
  status?: number;
  details?: unknown;
  originalError: unknown;
};

type ErrorLoggerOptions = {
  log?: boolean;
  onError?: (error: ErrorInfo) => any | Promise<any>;
};

const isObject = (value: unknown): value is Record<string, any> =>
  typeof value === "object" && value !== null;

const normalizeError = (error: unknown): ErrorInfo => {
  // Standard JS Error
  if (error instanceof Error) {
    const err = error as Error & {
      code?: string | number;
      status?: number;
      cause?: unknown;
    };

    return {
      name: err.name,
      message: err.message,
      stack: err.stack,
      code: err.code,
      status: err.status,
      details: err.cause,
      originalError: error,
    };
  }

  // String
  if (typeof error === "string") {
    return {
      name: "Error",
      message: error,
      originalError: error,
    };
  }

  // Number / Boolean / Symbol / BigInt
  if (
    typeof error === "number" ||
    typeof error === "boolean" ||
    typeof error === "symbol" ||
    typeof error === "bigint"
  ) {
    return {
      name: "Error",
      message: String(error),
      originalError: error,
    };
  }

  // Object (Axios, Prisma, custom errors, etc.)
  if (isObject(error)) {
    return {
      name: error.name ?? "UnknownError",
      message: error.message ?? "An unknown error occurred.",
      stack: error.stack,
      code: error.code,
      status: error.status ?? error.statusCode,
      details:
        error.errors ??
        error.response?.data ??
        error.meta ??
        error.cause ??
        error,
      originalError: error,
    };
  }

  return {
    name: "UnknownError",
    message: "An unknown error occurred.",
    originalError: error,
  };
};

export const ErrorMessageLogger = async (
  error: unknown,
  options: ErrorLoggerOptions = {}
): Promise<ErrorInfo> => {
  const { log = process.env.NODE_ENV !== "production", onError } = options;

  const parsedError = normalizeError(error);

  if (log) {
    console.group(`❌ ${parsedError.name}`);

    console.error("Message:", parsedError.message);

    if (parsedError.code)
      console.error("Code:", parsedError.code);

    if (parsedError.status)
      console.error("Status:", parsedError.status);

    if (parsedError.details)
      console.error("Details:", parsedError.details);

    if (parsedError.stack)
      console.error(parsedError.stack);

    console.groupEnd();
  }

  try {
    await onError?.(parsedError);
  } catch (callbackError) {
    console.error("Error inside ErrorMessageLogger.onError()", callbackError);
  }

  return parsedError;
};