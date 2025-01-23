export const RESOURCE_NAME = 'product';
export const API_TAG_RESOURCE_NAME = 'Product API Resources';

export const FINDALL_PRODUCT_RESOURCES = {
    API_OPERATION: {
        SUMMARY: 'Get all products with pagination',
        DESCRIPTION: 'Retrieves a list of all products with optional pagination',
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

export const SORT_PRODUCT_RESOURCES = {
    API_OPERATION: {
        SUMMARY: 'Sort products',
        DESCRIPTION: 'Sorts the products based on provided sort parameters',
    },
    API_OKRES: {
        DESCRIPTION: 'Sorted products retrieved successfully',
    },
    API_BAD_REQRES: {
        DESCRIPTION: 'Invalid sort parameters provided',
    },
}

export const COUNT_PRODUCT_RESOURCES = {
    API_OPERATION: {
        SUMMARY: 'Count products',
        DESCRIPTION: 'Counts the number of products based on provided filters',
    },
    API_OKRES: {
        DESCRIPTION: 'Total number of products retrieved successfully',
    },
    API_BAD_REQRES: {
        DESCRIPTION: 'Invalid filter parameters provided',
    },
}

export const CREATE_PRODUCT_RESOURCES = {
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

export const UPDATE_PRODUCT_RESOURCES = {
    API_OPERATION: {
        SUMMARY: 'Update an existing product',
        DESCRIPTION: 'Updates an existing product by ID',
    },
    API_OKRES: {
        DESCRIPTION: 'Product updated successfully',
    },
    API_BAD_REQRES: {
        DESCRIPTION: 'Invalid product ID provided',
    },
}

export const DELETE_PRODUCT_RESOURCES = {
    API_OPERATION: {
        SUMMARY: 'Delete a product',
        DESCRIPTION: 'Deletes a specific product by ID',
    },
    API_OKRES: {
        DESCRIPTION: 'Product deleted successfully',
    },
    API_BAD_REQRES: {
        DESCRIPTION: 'Invalid product ID provided',
    },
}

export const SEARCH_PRODUCT_RESOURCES = {
    API_OPERATION: {
        SUMMARY: 'Search products with filters',
        DESCRIPTION: 'Search products by name, description, price range, category with sorting and pagination'
    },
    API_OKRES: {
        DESCRIPTION: 'Returns filtered products with pagination metadata'
    },
    API_BAD_REQRES: {
        DESCRIPTION: 'Failed to search products due to invalid parameters'
    }
};

export const FIND_LOWSTOCK_PRODUCTS_RESOURCES = {
    API_OPERATION: {
        SUMMARY: 'Get low stock products',
        DESCRIPTION: 'Retrieve all products that are below the stock threshold'
    },
    API_OKRES: {
        DESCRIPTION: 'Returns list of products with low stock'
    },
    API_BAD_REQRES: {
        DESCRIPTION: 'Failed to retrieve low stock products'
    }
};