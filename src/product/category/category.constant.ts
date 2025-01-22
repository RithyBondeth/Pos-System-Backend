export const API_TAG_RESOURCE_NAME = 'Category API Resources';
export const RESOURCE_NAME = 'category';

export const FINDALL_CATEGORY_RESOURCE = {
    API_OPERATION: {
        SUMMARY: 'Get all categories',
        DESCRIPTION: 'Retrieves a list of all categories',
    },
    API_OKRES: {
        DESCRIPTION: 'List all categories retrieved successfully',
    },
    API_BAD_REQRES: {
        DESCRIPTION: 'No categories found',
    }
}

export const FINDONE_CATEGORY_RESOURCE = {
    API_OPERATION: {
        SUMMARY: 'Get one category',
        DESCRIPTION: 'Retrieves a single category by its id',
    },
    API_OKRES: {
        DESCRIPTION: 'Category retrieved successfully',
    },
    API_BAD_REQRES: {
        DESCRIPTION: 'Invalid category id provided',
    }   
}

export const SORT_CATEGORY_RESOURCE = {
    API_OPERATION: {
        SUMMARY: 'Sort categories',
        DESCRIPTION: 'Sorts the categories based on provided sort parameters',
    },
    API_OKRES: {
        DESCRIPTION: 'Sorted categories retrieved successfully',
    },
    API_BAD_REQRES: {
        DESCRIPTION: 'Invalid sort paramters',
    }
}

export const CREATE_CATEGORY_RESOURCE = {
    API_OPERATION: {
        SUMMARY: 'Create new category',
        DESCRIPTION: 'Creates a new category',
    },
    API_OKRES: {
        DESCRIPTION: 'Category created successfully',
    },
    API_BAD_REQRES: {
        DESCRIPTION: 'Invalid category information provided',
    }
}

export const UPDATE_CATEGORY_RESOURCE = {
    API_OPERATION: {
        SUMMARY: 'Update an existing category',
        DESCRIPTION: 'Updates an existing category by ID',
    },
    API_OKRES: {
        DESCRIPTION: 'Category updated successfully',
    },
    API_BAD_REQRES: {
        DESCRIPTION: 'Invalid category ID provided',
    }
}

export const DELETE_CATEGORY_RESOURCE = {
    API_OPERATION: {
        SUMMARY: 'Delete a category',
        DESCRIPTION: 'Deletes a specific category by ID',
    },
    API_OKRES: {
        DESCRIPTION: 'Category deleted successfully',
    },
    API_BAD_REQRES: {
        DESCRIPTION: 'Invalid category ID provided',
    }
}