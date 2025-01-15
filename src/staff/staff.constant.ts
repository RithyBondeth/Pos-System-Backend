export const API_TAG_RESOURCE_NAME = "Staff API Resources"
export const RESOURCE_NAME = "staff"

export const GET_ALL_STAFF_RESOURCES = {
    API_OPERATION: {
        SUMMARY: "Get all staff with pagination and filtering",
        DESCRIPTION: "Retrieves a list of all staff members with optional filtering and pagination",
    },
    API_OKRES: {
        DESCRIPTION: "List all staff retrieved successfully",
    },
    API_BAD_REQRES: {
        DESCRIPTION: "Invalid filter paramters",
    }
}

export const COUNT_STAFF_RESOURCES = {
    API_OPERATION: {
        SUMMARY: "Count all staff",
        DESCRIPTION: "Counts the number of staff members based on provided filters",
    },
    API_OKRES: {
        DESCRIPTION: "Total number of staff retrieved successfully",
    },
    API_BAD_REQRES: {
        DESCRIPTION: "Invalid sort paramters",
    }
}

export const SORT_STAFF_RESOURCES = {
    API_OPERATION: {
        SUMMARY: "Sort staff",
        DESCRIPTION: "Sorts the staff members based on provided sort parameters",
    },
    API_OKRES: {
        DESCRIPTION: "Sorted staff retrieved successfully",
    },
    API_BAD_REQRES: {
        DESCRIPTION: "Invalid sort paramters",
    }
}

export const GET_ONESTAFF_BYID_RESOURCES = {
    API_OPERATION: {
        SUMMARY: "Get one staff by id",
        DESCRIPTION: "Retrieves a staff member by their unique identifier",
    },
    API_OKRES: {
        DESCRIPTION: "Staff retrieved successfully",
    },
    API_BAD_REQRES: {
        DESCRIPTION: "Invalid staff id provided",
    }
}

export const CREATE_STAFF_RESOURCES = {
    API_OPERATION: {
        SUMMARY: "Create a new staff",
        DESCRIPTION: "Creates a new staff member with provided information",
    },
    API_OKRES: {
        DESCRIPTION: "New staff created successfully",
    },
    API_BAD_REQRES: {
        DESCRIPTION: "Invalid staff information provided",
    }   
}

export const UPDATE_STAFF_RESOURCES = {
    API_OPERATION: {
        SUMMARY: "Update an existing staff by id",
        DESCRIPTION: "Updates a staff member by their unique identifier",
    },
    API_OKRES: {
        DESCRIPTION: "Staff updated successfully",
    },
    API_BAD_REQRES: {
        DESCRIPTION: "Invalid staff id provided",
    }
}

export const DELETE_STAFF_RESOURCES = {
    API_OPERATION: {
        SUMMARY: "Delete an existing staff by id",
        DESCRIPTION: "Removes a staff member by their unique identifier",
    },
    API_OKRES: {
        DESCRIPTION: "Staff deleted successfully",
    },
    API_BAD_REQRES: {
        DESCRIPTION: "Invalid staff id provided",
    }
}