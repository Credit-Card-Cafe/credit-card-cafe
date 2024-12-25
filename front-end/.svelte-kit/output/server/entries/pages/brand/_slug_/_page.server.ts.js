import { g as getOneBrandByURL } from "../../../../chunks/brands.js";
import { b as getCardsFromBrandName } from "../../../../chunks/cards.js";
const load = async ({ params }) => {
  let brand = await getOneBrandByURL(params.slug);
  if (brand) {
    let creditCards = [];
    creditCards = await getCardsFromBrandName(brand);
    return {
      brand,
      creditCards,
      slug: params.slug
    };
  }
};
export {
  load
};
