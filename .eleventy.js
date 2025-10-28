import pluginWebc from "@11ty/eleventy-plugin-webc";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import pluginSlideDeck from "./index.js";
import yaml from "js-yaml";

const buildFunction = (slide) => {
  if (slide.youtube) {
    const bg = `background-image: url('https://v1.opengraph.11ty.dev/https%3A%2F%2Fyoutube.com%2Fwatch%3Fv%3D${slide.youtube}/auto/jpeg/');`;
    slide.layout = slide.layout || 'embed';
    slide.embed = `
      <lite-youtube
        videoid="${slide.youtube}"
        style="${bg}"
        @text="${slide.title}"
      ></lite-youtube>
    `;
  }
  return slide;
};

export default async function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginSlideDeck, {
    domain: 'example.oddbird.net',
    imgDir: '/_img/',

    buildFunction,
  });

  eleventyConfig.addPlugin(pluginWebc, {
    components: [
      'components/**/*.webc',
      'test/_includes/**/*.webc',
    ],
  });

  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    // output image formats
    formats: ['avif', 'jpeg'],

    // output image widths
    widths: [640, 1024, 1800],

    // optional, attributes assigned on <img> nodes override these values
    htmlOptions: {
      imgAttributes: {
        loading: "lazy",
        decoding: "async",
      },
    },
  });

  eleventyConfig.addPassthroughCopy({
    './test/_css': 'css',
    './test/_fonts': 'fonts',
  });

  return {
    dir: {
      input: 'test',
      layouts: '_layouts',
    }
  }
}
