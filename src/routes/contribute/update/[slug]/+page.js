export const load = ({ params }) => {
  console.log("Page.js load", params.slug);
  return {
    slug: params.slug,
  };
};
