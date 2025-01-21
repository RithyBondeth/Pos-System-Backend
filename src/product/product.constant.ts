export const RESOURCE_NAME = 'product';
export const API_TAG_RESOURCE_NAME = 'Product API Resources';

export const FINDALL_PRODUCT_RESOURCES = {
    API_OPERATION: {
        SUMMARY: 'Get all products',
        DESCRIPTION: 'Retrieves a list of all products',
    },
    API_OKRES: {
        DESCRIPTION: 'List all products retrieved successfully',
    },
    API_BAD_REQRES: {
        DESCRIPTION: 'No products found',
    },
}

export const FINDONE_PRODUCT_RESOURCES = {
    API_OPERATION: {
        SUMMARY: 'Get a single product',
        DESCRIPTION: 'Retrieves a specific product by ID',
    },
    API_OKRES: {
        DESCRIPTION: 'Product retrieved successfully',
    },
    API_BAD_REQRES: {
        DESCRIPTION: 'Invalid product ID provided',
    },
}

export const CREATE_PRODUCT_RESOURCE = {
    API_OPERATION: {
        SUMMARY: 'Create new product',
        DESCRIPTION: 'Creates a new product',
    },
    API_OKRES: {
        DESCRIPTION: 'Product created successfully',
    },
    API_BAD_REQRES: {
        DESCRIPTION: 'Invalid product information provided',
    },
}