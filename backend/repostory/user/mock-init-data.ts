import { UserData } from "../../models/user";

export const mockUsers: UserData[] = [
    {
        id: 1,
        name: "John Doe",
        recipes: []  // User without recipe Books
    },
    {
        id: 2,
        name: "Alice Smith",
        recipes: [
            {
                id: 1,
                name: "Italian Classics",
                description: "Traditional pasta and pizza recipes",
                images: ["1", "2", "3"]
            },
            {
                id: 2,
                name: "Family Favorites",
                description: "Passed down through generations",
                images: ["4", "5"]
            }
        ]
    },
    {
        id: 3,
        name: "Bob Johnson",
        recipes: [
            {
                id: 3,
                name: "Quick Weeknight Meals",
                description: "30-minute dinner recipes",
                images: ["1", "2", "3"]
            },
            {
                id: 4,
                name: "Healthy Lunches",
                description: "Nutritious meal prep ideas",
                images: ["1", "2", "3", "4"]
            },
            {
                id: 5,
                name: "Baking Adventures",
                description: "Breads and pastries collection",
                images: ["5", "6", "7"]
            }
        ]
    },
    {
        id: 4,
        name: "Emma Wilson",
        recipes: [
            {
                id: 6,
                name: "Vegetarian Delights",
                description: "Meat-free meal collection",
                images: ["1", "2", "3"]
            },
            {
                id: 7,
                name: "Asian Fusion",
                description: "Modern Asian recipes",
                images: ["1", "2", "3"]
            },
            {
                id: 8,
                name: "Dessert Heaven",
                description: "Sweet treats and cakes",
                images: ["1", "2", "3"]
            },
            {
                id: 9,
                name: "Seasonal Cooking",
                description: "Recipes for every season",
                images: ["1", "2", "3", "4"]
            }
        ]
    },
    {
        id: 5,
        name: "Michael Brown",
        recipes: [
            {
                id: 10,
                name: "BBQ Masterclass",
                description: "Grilling and smoking recipes",
                images: ["1", "2", "3"]
            },
            {
                id: 11,
                name: "Protein Power",
                description: "High-protein meal ideas",
                images: ["1", "2"]
            }
        ]
    },
    {
        id: 6,
        name: "Sarah Davis",
        recipes: [
            {
                id: 12,
                name: "Party Appetizers",
                description: "Crowd-pleasing snacks",
                images: ["1", "2", "3"]
            },
            {
                id: 13,
                name: "Slow Cooker Favorites",
                description: "Set-and-forget meals",
                images: ["1", "2", "3"]
            },
            {
                id: 14,
                name: "Baby Food Basics",
                description: "Homemade baby food recipes",
                images: ["1", "2", "3"]
            }
        ]
    },
    {
        id: 7,
        name: "David Miller",
        recipes: [
            {
                id: 15,
                name: "Seafood Specialties",
                description: "Fresh fish and shellfish dishes",
                images: ["1", "2", "3"]
            },
            {
                id: 16,
                name: "Camping Cuisine",
                description: "Outdoor cooking recipes",
                images: ["1", "2", "3"]
            }
        ]
    },
    {
        id: 8,
        name: "Lisa Anderson",
        recipes: [
            {
                id: 17,
                name: "Healthy Smoothies",
                description: "Nutritious drink blends",
                images: ["1", "2"]
            },
            {
                id: 18,
                name: "Holiday Treats",
                description: "Festive season recipes",
                images: ["1", "2", "3"]
            },
            {
                id: 19,
                name: "Budget Meals",
                description: "Cost-effective cooking",
                images: ["1", "2"]
            }
        ]
    },
    {
        id: 9,
        name: "James Wilson",
        recipes: [
            {
                id: 20,
                name: "Mediterranean Diet",
                description: "Healthy Mediterranean dishes",
                images: ["1", "2", "3"]
            },
            {
                id: 21,
                name: "Meal Prep Sunday",
                description: "Weekly preparation guide",
                images: ["22", "23", "24"]
            }
        ]
    },
    {
        id: 10,
        name: "Emily Taylor",
        recipes: [
            {
                id: 22,
                name: "Vegan Essentials",
                description: "Plant-based recipes",
                images: ["20", "21"]
            },
            {
                id: 23,
                name: "World Cuisines",
                description: "International recipes",
                images: ["17", "18", "19"]
            },
            {
                id: 24,
                name: "Gluten-Free Guide",
                description: "Celiac-friendly dishes",
                images: ["15", "25"]
            }
        ]
    }
];
