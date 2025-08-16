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

// site.remoteFile("/assets/images/club/t1.png", "https://resources.premierleague.com/premierleague/badges/50/t1.png");
// site.remoteFile("/assets/images/club/t3.png", "https://resources.premierleague.com/premierleague/badges/50/t3.png");
// site.remoteFile("/assets/images/club/t4.png", "https://resources.premierleague.com/premierleague/badges/50/t4.png");
// site.remoteFile("/assets/images/club/t6.png", "https://resources.premierleague.com/premierleague/badges/50/t6.png");
// site.remoteFile("/assets/images/club/t7.png", "https://resources.premierleague.com/premierleague/badges/50/t7.png");
// site.remoteFile("/assets/images/club/t8.png", "https://resources.premierleague.com/premierleague/badges/50/t8.png");
// site.remoteFile("/assets/images/club/t11.png", "https://resources.premierleague.com/premierleague/badges/50/t11.png");
// site.remoteFile("/assets/images/club/t13.png", "https://resources.premierleague.com/premierleague/badges/50/t13.png");
// site.remoteFile("/assets/images/club/t14.png", "https://resources.premierleague.com/premierleague/badges/50/t14.png");
// site.remoteFile("/assets/images/club/t17.png", "https://resources.premierleague.com/premierleague/badges/50/t17.png");
// site.remoteFile("/assets/images/club/t20.png", "https://resources.premierleague.com/premierleague/badges/50/t20.png");
// site.remoteFile("/assets/images/club/t21.png", "https://resources.premierleague.com/premierleague/badges/50/t21.png");
// site.remoteFile("/assets/images/club/t91.png", "https://resources.premierleague.com/premierleague/badges/50/t91.png");
// site.remoteFile("/assets/images/club/t31.png", "https://resources.premierleague.com/premierleague/badges/50/t31.png");
// site.remoteFile("/assets/images/club/t94.png", "https://resources.premierleague.com/premierleague/badges/50/t94.png");
// site.remoteFile("/assets/images/club/t54.png", "https://resources.premierleague.com/premierleague/badges/50/t54.png");
// site.remoteFile("/assets/images/club/t40.png", "https://resources.premierleague.com/premierleague/badges/50/t40.png");
// site.remoteFile("/assets/images/club/t43.png", "https://resources.premierleague.com/premierleague/badges/50/t43.png");
// site.remoteFile("/assets/images/club/t39.png", "https://resources.premierleague.com/premierleague/badges/50/t39.png");
// site.remoteFile("/assets/images/club/t36.png", "https://resources.premierleague.com/premierleague/badges/50/t36.png");

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