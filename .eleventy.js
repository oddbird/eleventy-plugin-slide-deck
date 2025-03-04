import pluginWebc from "@11ty/eleventy-plugin-webc";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import pluginSlideDeck from "./index.js";
import yaml from "js-yaml";

export default async function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginSlideDeck, {
    domain: 'talks.oddbird.net',
    imgDir: '/_img/',
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

  return {
    dir: {
      input: 'test',
      layouts: '_layouts',
    }
  }
}
