import { categories } from '$lib/cardLists.js';

export const load = async ({ params }) => {
    const list = categories.find((category) => category.id == params.slug);
    return {
        category: list,
        slug: params.slug
    }
};
