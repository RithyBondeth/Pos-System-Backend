export const API_TAG_RESOURCE_NAME = "Auth API Resource";

export const RESOURCE_NAME = "auth";

export const AUTH_MESSAGE = {
    INVALID_CREDENTIALS: 'Invalid email or password',
    USER_NOT_FOUND: 'User not found',
    UNAUTHORIZED: 'Unauthorized access',
    TOKEN_EXPIRED: 'Token has expired',
    INVALID_TOKEN: 'Invalid token',
    INSUFFICIENT: 'Insufficient permissions',
}

export const LOGIN_RESOURCES = {
    API_OPERATION: {
        SUMMARY: "Login",
        DESCRIPTION: "Authenticate the staff using their email and password",
    },
    API_OKRES: {
        DESCRIPTION: "User authenticated successfully",
    },
    API_BAD_REQRES: {
        DESCRIPTION: "Invalid email or password provided",
    }
}

export const REGISTER_RESOURCES = {
    API_OPERATION: {
        SUMMARY: "Register",
        DESCRIPTION: "Register a new staff",
    },
    API_OKRES: {
        DESCRIPTION: "Staff registered successfully",
    },
    API_BAD_REQRES: {
        DESCRIPTION: "Invalid email or password provided",
    }
}

export const CURRENT_STAFF_RESOURCES = {
    API_OPERATION: {
        SUMMARY: "Get current staff",
        DESCRIPTION: "Get the current authenticated staff by token",
    },
    API_OKRES: {
        DESCRIPTION: "Current staff retrieved successfully",
    },
    API_BAD_REQRES: {
        DESCRIPTION: "Invalid token provided",
    }
}

export const FORGOT_PASSWORD_RESOURCES = {
    API_OPERATION: {
        SUMMARY: "Forgot password",
        DESCRIPTION: "Send a reset token to the provided email",
    },
    API_OKRES: {
        DESCRIPTION: "Reset password token sent successfully to the provided email",
    },
    API_BAD_REQRES: {
        DESCRIPTION: "Invalid email provided",
    }
}