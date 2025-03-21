import lume from "lume/mod.ts";
import base_path from "lume/plugins/base_path.ts";
import favicon from "lume/plugins/favicon.ts";
import google_fonts from "lume/plugins/google_fonts.ts";
import nav from "lume/plugins/nav.ts";
import postcss from "lume/plugins/postcss.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";

const site = lume({
    src: "./src",
    location: new URL("https://luke-strange.github.io/fpl"),
});

site.use(base_path());
site.use(google_fonts({
    fonts: "https://fonts.google.com/share?selection.family=Rubik:ital,wght@0,300..900;1,300..900"
}));
site.use(nav());
site.use(postcss());

site.filter("dump", (Object) => {
    return JSON.stringify(Object);
})

export default site;