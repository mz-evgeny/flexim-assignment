export interface Params {
    getListProducts: {
        page?: number;
        limit?: number;
        sortField?: string;
        sortOrder?: "asc" | "desc";
        searchTerm?: string;
    };
}
