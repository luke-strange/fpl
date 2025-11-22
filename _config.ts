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
    fonts: "https://fonts.google.com/share?selection.family=Rubik:ital,wght@0,300..900;1,300..900",
    cssFile: "/assets/styles.css"
}));
site.use(google_fonts({
    fonts: "https://fonts.google.com/share?selection.family=Noto+Sans:ital,wght@0,100..900;1,100..900|Noto+Serif:ital,wght@0,100..900;1,100..900|Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900|Work+Sans:ital,wght@0,100..900;1,100..900",
    cssFile: "/assets/styles.css",
}));
site.use(nav());
site.use(postcss());
site.add([".css"]);

site.filter("dump", (Object) => {
    return JSON.stringify(Object);
})

site.filter("formatRank", (num: number) => {
    if (num == null) {return null};
    const strNum = Math.abs(num).toString();
    const n = Number(strNum.slice(-1));
    if (n==1) {return strNum + 'st'}
    else if (n==2) {return strNum + 'nd'}
    else if (n==3) {return strNum + 'rd'}
    else { return strNum + 'th'}
})

site.filter("FDR", (num: number) => {
    if (num==1) return "one";
    if (num==2) return "two";
    if (num==3) return "three";
    if (num==4) return "four";
    if (num==5) return "five";
})

site.add("/assets/js/filterList.js");
site.add("/assets/js/sortable.js");
site.add("/assets/images/club");
export default site;