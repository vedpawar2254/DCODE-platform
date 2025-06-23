class ApiError extends Error {
    constructor(
        statusCode,
        message = "An unexpected error occurred. Please try again later.",
        errors = [],
        stack = []
    ) {
        super(message)
        this.statusCode = statusCode,
            this.message = message,
            this.data = null,
            this.success = false,
            this.errors = errors

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this.errors, this.constructor);
        }
    }
}