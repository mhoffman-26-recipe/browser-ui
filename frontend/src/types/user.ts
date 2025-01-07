export interface RecipeData {
    id?: number;
    name: string;
    description?: string;
    images?: string[];
}

export interface UserData {
    id?: number;
    name: string;
    recipes?: RecipeData[];
}