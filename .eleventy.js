const { DateTime } = require("luxon");
const path = require("path");

module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy('./src/style.css');
  eleventyConfig.addPassthroughCopy('./src/assets');
  eleventyConfig.addPassthroughCopy('./src/admin');

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj)
      .setLocale("es-MX")
      .toLocaleString({ day: "numeric", month: "long", year: "numeric" });
  });

  // Add a collection for blog posts with full file name as URL
  eleventyConfig.addCollection("post", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/*.md").map(item => {
      // Extract the file name without extension (e.g., "2021-06-15-my-fifth-article copy")
      const fileName = path.basename(item.inputPath, ".md");
      // Use the full file name as the slug
      item.outputPath = `public/${fileName}/index.html`;
      item.url = `/${fileName}/`;
      return item;
    });
  });

  return {
    dir: {
      input: "src",
      output: "public"
    }
  };
}