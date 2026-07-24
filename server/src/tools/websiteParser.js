import axios from "axios";
import * as cheerio from "cheerio";


export async function websiteParser(url) {
  try {
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);
    $("script").remove();
    $("style").remove();
    $("noscript").remove();
    $("header").remove();
    $("footer").remove();
    $("nav").remove();

    const title = $("title").text().trim();

    const content = $("body").text().replace(/\s+/g, " ").trim();

    return {
      title,
      type: "website",
      content,
      url,
    };
  } catch (error) {
    console.log(`error in website parser :- ${error.message}`);
    throw error;
  }
}
