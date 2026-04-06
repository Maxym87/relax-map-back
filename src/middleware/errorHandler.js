
import HttpError from "http-errors";

export const errorHandler = (err, _req, res, _next) => {
  console.error("Error Middleware:", err);

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({
      message: err.message,
    });
  }

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      message: err.message || err.name,
    });
  }

  const isProd = process.env.NODE_ENV === "production";

  res.status(500).json({
    message: isProd
      ? "Something went wrong. Please try again later."
      : err.message,
  });
};
