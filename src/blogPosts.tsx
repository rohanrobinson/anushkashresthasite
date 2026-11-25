import type { ReactNode } from "react";

import gharMoolGhar from "./assets/in-use/bikram-sambat/mool-ghar-diyo.jpg";
import gharAgamChhen from "./assets/in-use/mool-ghar/mool-ghar-red-saris.jpg";
import gharPatanAerial from "./assets/in-use/bikram-sambat/mangal-bazar-patan.jpg";
import moodPujaMarigold from "./assets/in-use/bikram-sambat/02-puja-marigold.jpg";
import gharDashain from "./assets/in-use/bikram-sambat/dashain-tika-dog.jpg";
import gharGosaikunda from "./assets/in-use/bikram-sambat/rasuwa-gosaikunda.jpg";
import gharTrekking from "./assets/in-use/bikram-sambat/trekking-pass.jpg";
import gharPikhaLakhu from "./assets/in-use/shared/pikha-lakhu-puja.jpg";
import gharChowk from "./assets/in-use/shared/chowk-temple-square.jpg";
import gharHimalHome from "./assets/in-use/shared/himal-home-diyo.jpg";
import gharIhi from "./assets/in-use/shared/ihi-with-baba.jpg";
import gharBahra from "./assets/in-use/shared/bahra-with-baba.jpg";
import musicRosePuja from "./assets/in-use/shared/music-rose-puja.jpg";
import patanAerialVideo from "./assets/in-use/mool-ghar/patan-durbar-aerial.mp4";
import patanAerialPoster from "./assets/in-use/mool-ghar/patan-durbar-aerial.jpg";
import gharPujaThali from "./assets/in-use/bikram-sambat/puja-thali-rose.jpg";
import moodNewarTattoo from "./assets/in-use/bikram-sambat/01-newar-tattoo.jpg";
import lakeWater from "./assets/in-use/bikram-sambat/water.jpg";
import bikramSambatVideo from "./assets/in-use/bikram-sambat/bikram-sambat-cover.mp4";
import bikramSambatPoster from "./assets/in-use/bikram-sambat/bikram-sambat-cover.jpg";
import basecamp from "./assets/in-use/shared/basecamp-2021.jpg";
import moolGharMood01 from "./assets/in-use/mool-ghar/mg-01.jpg";
import moolGharMood02 from "./assets/in-use/mool-ghar/mg-02.jpg";
import moolGharMood03 from "./assets/in-use/mool-ghar/mg-03.jpg";
import moolGharMood04 from "./assets/in-use/mool-ghar/mg-04.jpg";
import moolGharMood05 from "./assets/in-use/mool-ghar/mg-05.jpg";
import moolGharMood06 from "./assets/in-use/mool-ghar/mg-06.jpg";
import moolGharMood07 from "./assets/in-use/mool-ghar/mg-07.jpg";
import moolGharMood08 from "./assets/in-use/mool-ghar/mg-08.jpg";
import moolGharMood09 from "./assets/in-use/mool-ghar/mg-09.jpg";
import moolGharMood10 from "./assets/in-use/mool-ghar/mg-10.jpg";
import moolGharMood11 from "./assets/in-use/mool-ghar/mg-11.jpg";
import moolGharMood12 from "./assets/in-use/mool-ghar/mg-12.jpg";
import moolGharMood13 from "./assets/in-use/mool-ghar/mg-13.jpg";
import moolGharMood14 from "./assets/in-use/mool-ghar/mg-14.jpg";
import moolGharMood15 from "./assets/in-use/mool-ghar/mg-15.jpg";
// Bikram Sambat mood board, one per month (BS = Bikram Sambat).
import bsMangshir from "./assets/in-use/bikram-sambat/bs-mangshir.jpg";
import bsPoush from "./assets/in-use/bikram-sambat/bs-poush.jpg";
import bsMagh from "./assets/in-use/bikram-sambat/bs-magh.jpg";
import bsFalgun from "./assets/in-use/bikram-sambat/bs-falgun.jpg";
import bsChaitra from "./assets/in-use/bikram-sambat/bs-chaitra.jpg";
import bsBaisakh from "./assets/in-use/bikram-sambat/bs-baisakh.jpg";
import bsJestha from "./assets/in-use/bikram-sambat/bs-jestha.jpg";
import bsAshad from "./assets/in-use/bikram-sambat/bs-ashad.jpg";
import bsKartikThapicha from "./assets/in-use/bikram-sambat/bs-kartik-thapicha.jpg";
import bsKartikMhaPuja from "./assets/in-use/bikram-sambat/bs-kartik-mha-puja.jpg";
import bsKartikDashainPuja from "./assets/in-use/bikram-sambat/bs-kartik-dashain-puja.jpg";
import bsKartikMarigolds from "./assets/in-use/bikram-sambat/bs-kartik-marigolds.jpg";
import bsKartikMatriarch from "./assets/in-use/bikram-sambat/bs-kartik-matriarch.jpg";
import bsKartikKumariPuja from "./assets/in-use/bikram-sambat/bs-kartik-kumari-puja.jpg";
import bsKartikTiharLights from "./assets/in-use/bikram-sambat/bs-kartik-tihar-lights.jpg";
import bsMangshirSagun from "./assets/in-use/bikram-sambat/bs-mangshir-sagun.jpg";
import bsMangshirPujaSpread from "./assets/in-use/bikram-sambat/bs-mangshir-puja-spread.jpg";
import bsMangshirPujaView from "./assets/in-use/bikram-sambat/bs-mangshir-puja-view.jpg";
import bsMangshirWeddingBow from "./assets/in-use/bikram-sambat/bs-mangshir-wedding-bow.jpg";
import bsMangshirIDoCrew from "./assets/in-use/bikram-sambat/bs-mangshir-i-do-crew.jpg";
import bsMangshirSindoor from "./assets/in-use/bikram-sambat/bs-mangshir-sindoor.jpg";
import bsMangshirEbcMasked from "./assets/in-use/bikram-sambat/bs-mangshir-ebc-masked.jpg";
import bsMangshirGosaikundaCalf from "./assets/in-use/bikram-sambat/bs-mangshir-gosaikunda-calf.jpg";
import bsMangshirKalinchowk from "./assets/in-use/bikram-sambat/bs-mangshir-kalinchowk.jpg";
import bsPoushUltralight from "./assets/in-use/bikram-sambat/bs-poush-ultralight.jpg";
import bsPoushPhewa from "./assets/in-use/bikram-sambat/bs-poush-phewa.jpg";
import bsPoushYomari from "./assets/in-use/bikram-sambat/bs-poush-yomari.jpg";
import bsPoushJeri from "./assets/in-use/bikram-sambat/bs-poush-jeri.jpg";
import bsPoushHappuSunbask from "./assets/in-use/bikram-sambat/bs-poush-happu-sunbask.jpg";
import bsPoushThali from "./assets/in-use/bikram-sambat/bs-poush-thali.jpg";
import bsPoushSunbaskKitchen from "./assets/in-use/bikram-sambat/bs-poush-sunbask-kitchen.jpg";
import bsPoushHappuFlowers from "./assets/in-use/bikram-sambat/bs-poush-happu-flowers.jpg";
import bsPoushHappuAndNush from "./assets/in-use/bikram-sambat/bs-poush-happu-and-nush.jpg";
import bsMaghShrine from "./assets/in-use/bikram-sambat/bs-magh-shrine.jpg";
import bsMaghChakuBite from "./assets/in-use/bikram-sambat/bs-magh-chaku-bite.jpg";
import bsMaghRiverDip from "./assets/in-use/bikram-sambat/bs-magh-river-dip.jpg";
import bsMaghLaddus from "./assets/in-use/bikram-sambat/bs-magh-laddus.jpg";
import bsMaghButterLamps from "./assets/in-use/bikram-sambat/bs-magh-butter-lamps.jpg";
import bsMaghTribeni from "./assets/in-use/bikram-sambat/bs-magh-tribeni.jpg";
import bsFalgunRasbari from "./assets/in-use/bikram-sambat/bs-falgun-rasbari.jpg";
import bsFalgunDiyo from "./assets/in-use/bikram-sambat/bs-falgun-diyo.jpg";
import bsFalgunSweetsBox from "./assets/in-use/bikram-sambat/bs-falgun-sweets-box.jpg";
import bsFalgunMangalbazarAlley from "./assets/in-use/bikram-sambat/bs-falgun-mangalbazar-alley.jpg";
import bsFalgunSparklers from "./assets/in-use/bikram-sambat/bs-falgun-sparklers.jpg";
import bsChaitraHoliYellow from "./assets/in-use/bikram-sambat/bs-chaitra-holi-yellow.jpg";
import bsChaitraRamNavami from "./assets/in-use/bikram-sambat/bs-chaitra-ram-navami.jpg";
import bsChaitraHoliBlue from "./assets/in-use/bikram-sambat/bs-chaitra-holi-blue.jpg";
import bsChaitraSamayBaji from "./assets/in-use/bikram-sambat/bs-chaitra-samay-baji.jpg";
import bsChaitraYomariPlate from "./assets/in-use/bikram-sambat/bs-chaitra-yomari-plate.jpg";
import bsChaitraLeafPlate from "./assets/in-use/bikram-sambat/bs-chaitra-leaf-plate.jpg";
import bsChaitraBrassLamps from "./assets/in-use/bikram-sambat/bs-chaitra-brass-lamps.jpg";
import bsChaitraMandalaOffering from "./assets/in-use/bikram-sambat/bs-chaitra-mandala-offering.jpg";
import bsChaitraSanoDashain from "./assets/in-use/bikram-sambat/bs-chaitra-sano-dashain.jpg";
import bsBaisakhRooftopTerrace from "./assets/in-use/bikram-sambat/bs-baisakh-rooftop-terrace.jpg";
import bsBaisakhJatraNight from "./assets/in-use/bikram-sambat/bs-baisakh-jatra-night.jpg";
import bsBaisakhPatanSquare from "./assets/in-use/bikram-sambat/bs-baisakh-patan-square.jpg";
import bsBaisakhGreenHills from "./assets/in-use/bikram-sambat/bs-baisakh-green-hills.jpg";
import bsBaisakhFeetUp from "./assets/in-use/bikram-sambat/bs-baisakh-feet-up.jpg";
import bsBaisakhPineForest from "./assets/in-use/bikram-sambat/bs-baisakh-pine-forest.jpg";
import bsBaisakhStreetLaugh from "./assets/in-use/bikram-sambat/bs-baisakh-street-laugh.jpg";
import bsBaisakhNewarTattoo from "./assets/in-use/bikram-sambat/bs-baisakh-newar-tattoo.jpg";
import bsBaisakhAnklets from "./assets/in-use/bikram-sambat/bs-baisakh-anklets.jpg";
import bsJesthaYak from "./assets/in-use/bikram-sambat/bs-jestha-yak.jpg";
import bsJesthaCairns from "./assets/in-use/bikram-sambat/bs-jestha-cairns.jpg";
import bsJesthaPorterTrail from "./assets/in-use/bikram-sambat/bs-jestha-porter-trail.jpg";
import bsJesthaTrekMap from "./assets/in-use/bikram-sambat/bs-jestha-trek-map.jpg";
import bsJesthaChortenTrail from "./assets/in-use/bikram-sambat/bs-jestha-chorten-trail.jpg";
import bsJesthaSummitRest from "./assets/in-use/bikram-sambat/bs-jestha-summit-rest.jpg";
import bsJesthaNamche from "./assets/in-use/bikram-sambat/bs-jestha-namche.jpg";
import bsJesthaAmaDablamRiver from "./assets/in-use/bikram-sambat/bs-jestha-ama-dablam-river.jpg";
import bsJesthaAmaDablamDawn from "./assets/in-use/bikram-sambat/bs-jestha-ama-dablam-dawn.jpg";
import bsAsarHappuRooftop from "./assets/in-use/bikram-sambat/bs-asar-happu-rooftop.jpg";
import bsAsarCafeWindow from "./assets/in-use/bikram-sambat/bs-asar-cafe-window.jpg";
import bsAsarHappuGlance from "./assets/in-use/bikram-sambat/bs-asar-happu-glance.jpg";
import bsAsarMudShout from "./assets/in-use/bikram-sambat/bs-asar-mud-shout.jpg";
import bsAsarMudWade from "./assets/in-use/bikram-sambat/bs-asar-mud-wade.jpg";
import bsAsarMudCheer from "./assets/in-use/bikram-sambat/bs-asar-mud-cheer.jpg";
import bsAsarSwayambhuLaugh from "./assets/in-use/bikram-sambat/bs-asar-swayambhu-laugh.jpg";
import bsAsarSwayambhuDome from "./assets/in-use/bikram-sambat/bs-asar-swayambhu-dome.jpg";
import bsAsarSwayambhuCalm from "./assets/in-use/bikram-sambat/bs-asar-swayambhu-calm.jpg";
import bsShrawanHappuMango from "./assets/in-use/bikram-sambat/bs-shrawan-happu-mango.jpg";
import bsShrawanSwayambhuBuddha from "./assets/in-use/bikram-sambat/bs-shrawan-swayambhu-buddha.jpg";
import bsShrawanRedBangles from "./assets/in-use/bikram-sambat/bs-shrawan-red-bangles.jpg";
import bsShrawanCafeButterflies from "./assets/in-use/bikram-sambat/bs-shrawan-cafe-butterflies.jpg";
import bsShrawanPuff from "./assets/in-use/bikram-sambat/bs-shrawan-puff.jpg";
import bsShrawanOfficeWindow from "./assets/in-use/bikram-sambat/bs-shrawan-office-window.jpg";
import bsShrawanCurtainWindow from "./assets/in-use/bikram-sambat/bs-shrawan-curtain-window.jpg";
import bsShrawanSkyBird from "./assets/in-use/bikram-sambat/bs-shrawan-sky-bird.jpg";
import bsShrawanPoppyCurtain from "./assets/in-use/bikram-sambat/bs-shrawan-poppy-curtain.jpg";
import bsBhadauPatanLions from "./assets/in-use/bikram-sambat/bs-bhadau-patan-lions.jpg";
import bsBhadauPatanLoop from "./assets/in-use/bikram-sambat/bs-bhadau-patan-loop.mp4";
import bsBhadauPatanDog from "./assets/in-use/bikram-sambat/bs-bhadau-patan-dog.jpg";
import bsBhadauPatanPagoda from "./assets/in-use/bikram-sambat/bs-bhadau-patan-pagoda.jpg";
import bsBhadauGhatNight1 from "./assets/in-use/bikram-sambat/bs-bhadau-ghat-night-1.jpg";
import bsBhadauGhatNight2 from "./assets/in-use/bikram-sambat/bs-bhadau-ghat-night-2.jpg";
import bsBhadauGhatNight3 from "./assets/in-use/bikram-sambat/bs-bhadau-ghat-night-3.jpg";
import bsBhadauGosaikundaBeanie from "./assets/in-use/bikram-sambat/bs-bhadau-gosaikunda-beanie.jpg";
import bsBhadauGosaikundaOffering from "./assets/in-use/bikram-sambat/bs-bhadau-gosaikunda-offering.jpg";
import bsBhadauGosaikundaBreakfast from "./assets/in-use/bikram-sambat/bs-bhadau-gosaikunda-breakfast.jpg";
import bsAsojFeetBaa from "./assets/in-use/bikram-sambat/bs-asoj-feet-baa.jpg";
import bsAsojButterLamps from "./assets/in-use/bikram-sambat/bs-asoj-butter-lamps.jpg";
import bsAsojPaan from "./assets/in-use/bikram-sambat/bs-asoj-paan.jpg";
import bsAsojPujaSpread from "./assets/in-use/bikram-sambat/bs-asoj-puja-spread.jpg";
import bsAsojStreetGlance from "./assets/in-use/bikram-sambat/bs-asoj-street-glance.jpg";
import bsAsojStreetStride from "./assets/in-use/bikram-sambat/bs-asoj-street-stride.jpg";
import bsAsojStreetPause from "./assets/in-use/bikram-sambat/bs-asoj-street-pause.jpg";
import bsFalgunRooftopCafe from "./assets/in-use/bikram-sambat/bs-falgun-rooftop-cafe.jpg";
import bsFalgunAarti1 from "./assets/in-use/bikram-sambat/bs-falgun-aarti-1.jpg";
import bsFalgunAarti2 from "./assets/in-use/bikram-sambat/bs-falgun-aarti-2.jpg";
import bsFalgunAarti3 from "./assets/in-use/bikram-sambat/bs-falgun-aarti-3.jpg";
import bsMaghSagunBowl from "./assets/in-use/bikram-sambat/bs-magh-sagun-bowl.jpg";
import bsMaghSwasthani from "./assets/in-use/bikram-sambat/bs-magh-swasthani.jpg";
import bsMaghTempleMum from "./assets/in-use/bikram-sambat/bs-magh-temple-mum.jpg";
import moodLinenAnklets from "./assets/in-use/shared/13-linen-anklets.jpg";

export type BlogSection = {
  heading: ReactNode;
  paragraphs: ReactNode[];
  /* Optional photo for the section. It fills the section's band behind the
     text, so `position` is the CSS background-position that keeps the part
     that matters (usually faces) in frame when the band is wide and short. */
  image?: {
    src: string;
    alt: string;
    caption?: string;
    position?: string;
  };
  /* The season a month falls in, shown on its contents row between the
     caption and the caret: the English name, then the Nepali ritu. */
  season?: { en: string; ne: string };
  /* Optional photos for the two outer panels. With these the band splits
     into three, 25 / 50 / 25 with a hairline between each: the heading and
     caption on the left over the first, the prose in the middle over
     `image`, and the button on the right over the second. */
  sideImages?: [
    { src: string; alt: string; position?: string },
    { src: string; alt: string; position?: string },
  ];
  /* Optional, three-panel bands only: show the prose through a window
     `lines` tall, with a round button under it that sets the text drifting
     slowly up through the window, like a teleprompter, at `wordsPerMinute`.
     A second click pauses it; at the end the button takes it back to the
     top. Speed is in words rather than pixels so a phone's narrow column
     reads at the same pace as a wide one. */
  scrollWindow?: {
    lines: number;
    wordsPerMinute: number;
  };
  /* Optional, for the "contents" layout: nine photos behind the open
     panel, a 3 x 3 grid read left to right, top to bottom, three to a line
     in the data. Without it the panel shows `image` alone. A photo above
     or below the text can come with a `caption`, a sticker that pops up
     only while that photo is hovered on a wide screen. It never wraps on
     its own, so break a long one with <br />. `position` (a CSS
     object-position) keeps an off-centre subject in its cell, on a phone
     too (the phone grid takes it from the same photo here). `whole`
     shows the photo uncropped, on a blurred copy of itself, for a subject
     too tall or wide for any crop of the cell to hold. `captionTopRight`
     pins the caption to the photo's top right corner instead, for a photo
     whose foot and top left both hold what matters. `video` is a short
     muted loop (H.264 .mp4) that fades in over the photo and plays while
     it is hovered on a wide screen; phones and reduced motion keep the
     photo. It takes the photo's `position`. */
  panelGrid?: (
    | string
    | {
        src: string;
        caption?: ReactNode;
        captionTopRight?: boolean;
        position?: string;
        whole?: boolean;
        video?: string;
      }
  )[];
  /* Optional: the photos behind the open panel on a phone, 3 rows of 2,
     read left to right, two to a line in the data. Without it a phone
     takes the top and bottom rows of `panelGrid`, slots 1, 2, 3, 7, 8 and
     9 in order: the captioned photos, since the text covers the middle
     row on a wide screen. */
  panelGridPhone?: string[];
  /* Optional button under the paragraphs. With no `href` it shows as
     coming soon and does not click, for a page that is not written yet. */
  cta?: {
    label: string;
    href?: string;
  };
};

export type BlogPost = {
  slug: string;
  tag: string;
  title: string;
  devanagari?: string;
  date: string;
  /* Counted at roughly 220 words a minute, the rate people actually read a
     screen at rather than the 300 a print estimate assumes. */
  readTime: string;
  /* The record to put on while you read. `youtube` is the video id the "play"
     link points at. Keep `note` short — title, artist and note share one line
     on the page. */
  music: {
    youtube: string;
    /* Optional photo behind the listen card, under a dark wash. */
    backdrop?: string;
    /* Leave the artist out of the visible line (it stays in the link label
       for screen readers). */
    hideArtist?: boolean;
    title: string;
    artist: string;
    note: string;
  };
  intro: ReactNode[];
  /* Optional looping footage behind the header and intro. It fills one
     full-width band the way a section photo does; `poster` shows while it
     loads and stands in for it when the reader prefers reduced motion. */
  introVideo?: {
    src: string;
    poster: string;
    alt: string;
    /* Where the sharp copy is cropped on a wide screen, as a CSS
       object-position. The default is framed for the Patan clip. */
    framePosition?: string;
    /* Let the blurred copy show through behind the intro on the right, not
       just on the left. For footage close to the band's own brown (stone,
       roofs) that otherwise vanishes under the wash. */
    seeThrough?: boolean;
    /* Where the sharp copy sits on a wide screen. "left" (the default)
       puts it in the open left of the band beside the text; "right" puts
       the title and intro on the left over the blur and the footage down
       the right edge; "center" splits the band in two, a row of title,
       footage and record over a centred column of intro. Phones show the
       clip whole behind the text whichever it is. */
    frameSide?: "left" | "right" | "center";
  };
  sections: BlogSection[];
  /* How the sections show. "bands" (the default) gives each its own
     full-width band down the page. "contents" folds them into one list
     under the opening, a row per section with its caption; a row opens
     that section's full text over the list, on the section's `image`
     under a dark wash, and closes back to the list. */
  sectionsLayout?: "bands" | "contents";
  outro: ReactNode[];
  /* "strip" (the default) crops every tile to one short row; "square" crops
     every photo to a square in an even grid, for a bigger board of mixed
     shapes; "gallery" hangs twelve photos like a gallery wall, tall and
     wide frames packed into one rectangle (see .post-mosaic--gallery). */
  moodBoardLayout?: "strip" | "square" | "gallery";
  /* Heading over the board; falls back to a generic one. */
  moodBoardTitle?: string;
  /* Columns for the "square" board on a wider screen (5 by default); pick
     one that divides the photo count so the grid closes evenly. */
  moodBoardColumns?: number;
  /* On a phone, show the board as a swipeable carousel instead of a grid.
     Desktop keeps the grid either way. */
  moodBoardCarousel?: boolean;
  moodBoard: {
    image: string;
    alt: string;
    caption: string;
    /* Optional styled version shown in place of `caption`, e.g. a link. */
    captionContent?: ReactNode;
    /* Where the tile crops the photo, as a CSS object-position, for a
       subject off-centre in the frame. Defaults to the centre. */
    position?: string;
    /* The month a tile stands for, on a calendar's board: the romanised
       name sits in the middle of the photo at rest and turns to the
       Devanagari when the tile is hovered or tapped. */
    month?: { ne: string; en: string };
  }[];
};

const ne = (text: string) => (
  <span lang="ne" style={{ fontFamily: "var(--font-devanagari)" }}>
    {text}
  </span>
);

/* Devanagari over the romanised name. The Gregorian span it maps onto lives in
   the prose rather than the heading. */
const month = (nepali: string, roman: string) => (
  <>
    {ne(nepali)}
    <span
      style={{
        display: "block",
        fontFamily: "var(--font-body)",
        fontSize: "0.75rem",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--color-marigold)",
        marginTop: "0.4rem",
      }}
    >
      {roman}
    </span>
  </>
);

/* Reading elsewhere, opened in its own tab so nobody loses their place here. */
const out = (href: string, text: string) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      color: "var(--color-marigold)",
      textDecoration: "underline",
      textUnderlineOffset: "3px",
    }}
  >
    {text}
  </a>
);

const MOOL_GHAR: BlogPost = {
  slug: "mool-ghar",
  tag: "Origin Story",
  title: "Mool Ghar",
  devanagari: "मूल घर",
  date: "Oct 21, 2026",
  readTime: "4 min read",
  music: {
    youtube: "0fYbkFKJmO0",
    backdrop: musicRosePuja,
    title: "“Ganashpati”",
    artist: "Kuma Sagar",
    hideArtist: true,
    note: "The right soundtrack for Mool Ghar.",
  },
  intro: [
    <>
      Mool means root. Ghar means home. Put them together and every dictionary
      will hand you <em>ancestral house</em>, which is technically correct and
      almost entirely ancient. A mool ghar is not the chhen — not the brick and
      the timber of it. It is the address your family's rituals are registered
      to: the one house where the gods are kept, where the feasts happen, and
      where you go back to be married, initiated, mourned and fed.
    </>,
    <>
      So let me give you the tour, starting outside the front door, because in a
      mool ghar the house begins before you are in it.
    </>,
  ],
  introVideo: {
    src: patanAerialVideo,
    poster: patanAerialPoster,
    alt: "Aerial footage drifting over the temple roofs of Patan Durbar Square",
    seeThrough: true,
  },
  sections: [
    {
      heading: (
        <>
          We call it{" "}
          {out(
            "https://heritageasplacemaking.com/urban-heritage-mining-blog/pikha-lakhu-by-madina-rai",
            "Pikha Lakhu",
          )}
        </>
      ),
      image: {
        src: gharPikhaLakhu,
        alt: "A puja laid out on the floor: a brass deity, marigolds, rice and a copper plate with a banana and an oil lamp",
        caption: "what gets handed over at the door",
        position: "center 40%",
      },
      paragraphs: [
        <>
          Right at the threshold of the main door sits a small mandala of stone
          or brass, set into the ground: the Pikha Lakhu. It is easy to walk
          straight over if nobody has told you it is there, and people do, and
          then somebody's grandmother has opinions.
        </>,
        <>
          The Pikha Lakhu marks the spiritual boundary of the household — the
          line between the family's inside and everybody else's outside. It is
          worshipped every morning by the matriarch of the house, and it is
          where a great deal of ritual gets handed over: what comes in, what is
          sent out, what is not allowed past the door.
        </>,
        <>A doorstep with a job!</>,
      ],
    },
    {
      heading: "Call it courtyard, chowk, bahal",
      image: {
        src: gharChowk,
        alt: "A quiet square in Patan with a two-tiered pagoda temple among red brick houses",
        caption: "everyone’s business, on a quiet morning",
        position: "center 45%",
      },
      paragraphs: [
        <>
          The{" "}
          {out("https://ecs.com.np/features/a-newari-house-reborn", "chhen")} is
          red brick and intricately carved wood, but its defining
          feature is that it turns inward. A mool ghar gathers around a chowk,
          or bahal in older quarters, making the courtyard the house’s actual
          room.
        </>,
        <>
          Community feasts happen there. Family feasts happen there. Rituals
          that need fifty people and four hours happen there. It is also where
          everyone can see exactly who arrived, with whom, and how late, which
          is either the charm or the problem depending on the decade you were
          born in.
        </>,
      ],
    },
    {
      heading: "The forbidden room: Agam Chhen",
      image: {
        src: gharAgamChhen,
        alt: "Thirteen women in red saris gathered at the carved doorway of the mool ghar",
        caption: "as close to the agam chhen as a camera gets",
        position: "center 15%",
      },
      paragraphs: [
        <>
          Here is the part that makes a mool ghar a mool ghar rather than a
          handsome old chhen: it houses the family's lineage shrines. The{" "}
          {ne("मूल घर")} is where the Agam Chhen is — a highly restricted
          private room, usually on the upper floors, dedicated to the family's
          esoteric deities, the Agam Dyah.
        </>,
        <>
          Only initiated family members go in. Not guests, not the uninitiated,
          not you, and depending on the house, not me either. The deity stays.
          The house stays with the deity. That is the whole arrangement, and it
          is the reason the chhen cannot simply be sold and swapped for
          something with better plumbing.
        </>,
        <>
          It is also a tradition on the way out. Not gone — not close to gone —
          but slipping, because the restrictions that kept it intact are the
          same restrictions that make it hard to keep up. A generation raised
          half in the west, families spread across four cities, and rules that
          are… well. Now <em>that</em> is something I am saving for 2 cents ;)
        </>,
      ],
    },
    {
      heading: "Born as a son or daughter",
      image: {
        src: gharHimalHome,
        alt: "A hand holding three lit diyos over a puja plate in Himal Home, Patan",
        caption: "same house, same lamps, different rules",
        position: "center 45%",
      },
      paragraphs: [
        <>
          Zoom out from the architecture and the same house organises people. If
          you are born a son, you get{" "}
          {out(
            "https://intravelmag.com/intravel/indigenous/hindu-bratabandha-ceremony-nepal",
            "bartabandha",
          )}{" "}
          — the initiation that makes
          you a full member of the lineage, with all the access that comes with
          it.
        </>,
        <>
          If you are born a daughter, you get three husbands. Relax. Sit down.
          Let me explain.
        </>,
      ],
    },
    {
      heading: "Husband one: an apple, divine one",
      image: {
        src: gharIhi,
        alt: "A small girl in her Ihi finery and red bangles, held close by a man in glasses",
        caption: "Ihi day: married to a bel, no regrets",
        position: "center 35%",
      },
      paragraphs: [
        <>
          The first marriage is{" "}
          {out(
            "https://www.sbs.com.au/language/nepali/en/article/the-story-of-ihi-why-girls-from-this-community-are-marrying-a-fruit/32lwcaa4e",
            "Ihi",
          )}
          , and the groom is a bel fruit — wood apple —
          which is a form of Vishnu. It is celebrated exactly like a wedding —
          not the desi kind with the bling, but the kind with ritual, procedure,
          a great deal of red, and genuinely excellent food.
        </>,
        <>
          A small girl, dressed as a bride, married to a god in fruit form, in
          the courtyard, surrounded by the entire extended family. It is as
          wholesome as it sounds and the photographs are unbeatable.
        </>,
      ],
    },
    {
      heading: "Husband two: the Sun",
      image: {
        src: gharBahra,
        alt: "A smiling girl in red and gold with a peacock feather in her hair, standing with a man in an argyle sweater",
        caption: "day twelve, out in the sun at last",
        position: "center 45%",
      },
      paragraphs: [
        <>
          The second is{" "}
          {out(
            "https://steemit.com/wedding/@elishagautam/marriage-with-the-sun-an-important-tradition",
            "Bahra Tayegu",
          )}
          , and the groom is the sun god.
        </>,
        <>
          For twelve days, no sunlight reaches her and no male sets eyes on her —
          not her brother, not her dad. Only female company; playing with
          makeup, passing the hours with{" "}
          {out("https://www.youtube.com/watch?v=LLH4vi8uupg", "gatti")}, filling
          the room with their own energy. On the twelfth day the ritual
          concludes: she is brought out, and the first thing she is presented
          to, and the thing she is married to, is the sun.
        </>,
        <>
          Which brings us to the why behind it all. The most compelling
          explanation? These marriages were a kind of safety net, a cosmic
          cushion against widowhood. If your first husband is a form of God and
          your second is the sun itself, then no mortal man dying can ever
          leave you a widow. Her real husbands are immortal. The human one is
          technically the runner-up.
        </>,
      ],
    },
    {
      heading: "So why all of this?",
      image: {
        src: moodLinenAnklets,
        alt: "Anklets over linen, feet off the ground",
        caption: "body, mind and spirit, all under one roof",
      },
      paragraphs: [
        <>
          So why does a community marry its daughters to fruit and to the sun,
          keep a room upstairs that most of the family never enters, and worship
          a doorstep every single morning? Strip the ritual back and the answer
          is mostly the same: care. Each of these rites turns up at the exact
          moment a person is changing, and makes sure they are not left to do
          it alone.
        </>,
        <>
          Some of it looks after the body: Bahra shows up right as a girl is
          growing up, and hands her twelve days of rest, feasting, and being
          waited on hand and foot. Some
          of it looks after the mind: Ihi and bartabandha tell a child, in front
          of fifty relatives, that they belong — to a house, a lineage, a
          courtyard that will always have a plate for them. And some of it
          looks after the spirit: a god in the family, a doorstep that keeps
          the wrong things out, a shrine upstairs that never moves.
        </>,
        <>
          Call it superstition if you like. I call it the most thorough
          insurance policy ever written, and the mool ghar is where it is kept.
        </>,
      ],
    },
  ],
  outro: [
    <>
      These are all facts, beliefs, and for some people, reality to a
      considerable extent. This is a magnifying lens held over the thing, not a
      verdict on it. My verdict, if I ever formulate one, goes in 2 cents.
    </>,
    <>
      And because a tour is nothing without the family album: below is April
      1998, a courtyard dressed in red for the wedding and my sisters lined up
      in all their tiny, serious bride glory. They got the
      bel, the feast and the fuss; I got to put it on the internet. Sorry{" "}
      {ne("दिदिहरु")} but hover around for the gossip!
    </>,
  ],
  /* Family photos from the Ihi and Bahra, 1998. */
  moodBoardLayout: "square",
  moodBoardTitle: "Moodboard for MoolGhar",
  moodBoardCarousel: true,
  moodBoard: [
    {
      image: moolGharMood01,
      alt: "Children in paper caps lined up in a garden with a man behind them, a pile of bricks beside",
      caption: "first marriage of my sisters, 1998",
    },
    {
      image: moolGharMood02,
      alt: "Girls seated in a row on a mat in a courtyard, offering pots and a fire pit in front of them",
      caption: "front row for the Bel drop",
    },
    {
      image: moolGharMood03,
      alt: "Women passing white thread around a group of small girls beside a clay pot",
      caption: "round & round she goes: ONZ edition",
    },
    {
      image: moolGharMood04,
      alt: "Girls in red and white eating from plates of beaten rice and curry on the stone floor",
      caption: "excellent food, as promised",
    },
    {
      image: moolGharMood05,
      alt: "A woman draping thread over a line of girls while family watch from a brick doorway",
      caption: "round & round again: ANZ edition",
    },
    {
      image: moolGharMood06,
      alt: "A woman crouched before small girls in red and gold while women stand watching",
      caption: "Alah time",
      captionContent: out(
        "https://nenepal.com/blogs/cultural-guides/the-disappearing-practice-of-alah",
        "Alah time",
      ),
    },
    {
      image: moolGharMood07,
      alt: "A man in white holding a cloth while girls sit on a mat behind him",
      caption: "rites, rituals & procedure it is",
    },
    {
      image: moolGharMood08,
      alt: "A crowded courtyard of girls in red and gold holding plates among family",
      caption: "fifty people and five hours, roughly",
    },
    {
      image: moolGharMood09,
      alt: "An elder in white with a small girl on his lap, family and children around a puja plate",
      caption: "best seat in the house: a lap",
    },
    {
      image: moolGharMood10,
      alt: "Girls in red sitting in a row beside fruit, pots and a square fire pit",
      caption: "bel fruit: the original long-term boyfriend",
    },
    {
      image: moolGharMood11,
      alt: "Four girls in gold and red silk holding leaf plates in a lane",
      caption: "four brides, zero grooms, all attitude",
    },
    {
      image: moolGharMood12,
      alt: "Two girls with yellow headbands seated while women tend to them indoors",
      caption: "second marriage, forever together sisters",
    },
    {
      image: moolGharMood13,
      alt: "A woman washing the hands of two girls in yellow headbands over a bowl",
      caption: "mum and her two beautiful brides",
    },
    {
      image: moolGharMood14,
      alt: "Three children in silk and paper caps sitting on a step with bowls",
      caption: "married by noon, snacking by one",
    },
    {
      image: moolGharMood15,
      alt: "A woman crouching before a line of girls in a sunny courtyard with a clay pot",
      caption: "courtyard having its main-character day",
    },
  ],
};

const FESTIVAL_CALENDAR: BlogPost = {
  slug: "festival-calendar",
  tag: "Festivals",
  /* Reads as one line on the page: the Nepali carries the comma so the title
     matches the card it opens from. */
  title: "by Bikram Sambat",
  devanagari: "बाह्र महिना,",
  date: "Nov 10, 2026",
  readTime: "7 min read",
  music: {
    youtube: "A0GOxBvHNNg",
    backdrop: moodPujaMarigold,
    title: "“Man Magan”",
    artist: "Deepak Bajracharya",
    hideArtist: true,
    note: "The right soundtrack for a year this full.",
  },
  intro: [
    <>
      Somewhere in Kathmandu right now, someone is sweeping a doorstep and
      hanging a garland for a new year nobody outside Nepal is counting. It's
      the first day of{" "}
      {out(
        "https://career.spiralogics.com/blogs/28/Nepal-Sambat-From-Ancient-Era-to-Digital-Renaissance",
        "Nepal Sambat",
      )}{" "}
      today. And that sparks a fact worth sitting with: the Gregorian calendar
      says 2026. But a Nepali follows Bikram Sambat, which runs roughly 57 years
      ahead. Here, the year turns over in mid-April, from SPRING stretching
      throughout Baisakh to Chaitra: shaped by the seasons and the rhythm of the
      land. The rains, the planting, the harvest, the festivals, and the clear
      skies that come once the clouds pass. So years aren’t just counted,
      they're lived!!
    </>,
    <>
      A way of keeping time that feels connected to the land and lives built
      around it. As we celebrate Mha: Puja, I wanted to take a closer look at
      different ways of measuring a year, and what it reveals about the cultures
      that keep them alive. Because sometimes, understanding a calendar is
      another way of understanding the people who call it home.
    </>,
  ],
  introVideo: {
    src: bikramSambatVideo,
    poster: bikramSambatPoster,
    alt: "A hilltop shrine under a clear blue sky, the Nepali flag and strings of prayer flags along a wooden boardwalk, snow peaks in the distance",
    // The flag, shrine and prayer flags, rather than the sky above them.
    framePosition: "50% 52%",
  },
  sectionsLayout: "contents",
  sections: [
    {
      heading: month("कार्तिक", "Kartik"),
      image: {
        src: gharHimalHome,
        alt: "A hand holding three lit diyos over a puja plate",
        caption: "october through november",
        position: "center 45%",
      },
      season: { en: "autumn", ne: "शरद" },
      // Stand-ins while the three-panel band is tried out; swap for the
      // real Kartik photos.
      sideImages: [
        {
          src: gharDashain,
          alt: "A dog on a balcony wearing tika and a marigold garland",
        },
        {
          src: gharGosaikunda,
          alt: "Sitting at the edge of a still alpine lake in the mountains",
        },
      ],
      scrollWindow: { lines: 4, wordsPerMinute: 180 },
      // Behind the open panel, 3 x 3, read left to right, in the order of
      // the numbered files in "1. kartik"; the middle one is the month's own
      // photo. Happu in his tika, the Dashain kalash, Mha: Puja, the
      // Dashain offering, three diyos, the marigolds in bloom, the
      // matriarch of the Shrestha household with her puja basket, Kumari
      // Puja on Ashtami and Tihar lights.
      panelGrid: [
        { src: gharDashain, caption: "happu after his Dashain tika" },
        { src: bsKartikThapicha, caption: "dashain with newars" },
        { src: bsKartikMhaPuja, caption: "scene from mha: pooja" },
        bsKartikDashainPuja, gharHimalHome, bsKartikMarigolds,
        { src: bsKartikMatriarch, caption: "mum, head of festive operations" },
        { src: bsKartikKumariPuja, caption: "scene from post-kumari pooja" },
        { src: bsKartikTiharLights, caption: "tihar evenings" },
      ],
      paragraphs: [
        <>
          We're in Kartik 2083, mid-festival season: Bada Dashain has recently
          passed, bringing families together for tika and blessings, while Tihar
          fills the days with lights, offerings, and rituals honouring the world
          around us. {ne("दशैं")} wears sunny days and clear blue skies, a last magic
          trace of summer; two weeks later, {ne("तिहार")} brings chillier mornings and
          earlier sunsets ~ exactly why this is prime season for mountain
          viewing or stargazing.
        </>,
        <>
          The month brings two sides of Nepal’s calendar into view: cultural
          celebrations and the changing landscape. Want to dig into either one,
          or experience Nepal in this season for yourself? Know what you're
          signing up for.
        </>,
      ],
      // The in-depth Kartik guide is still to be written; add its href then.
      cta: { label: "Step into Kartik →" },
    },
    {
      heading: month("मंसिर", "Mangshir"),
      image: {
        src: bsMangshirIDoCrew,
        alt: "Wedding photo-booth props in a black bowl: 'I do crew' cards and a paper diamond ring",
        caption: "november through december",
      },
      season: { en: "late fall", ne: "हेमन्त" },
      // Stand-ins for the side panels; swap for the real photos.
      sideImages: [
        {
          src: gharBahra,
          alt: "A smiling girl in red and gold with a peacock feather in her hair, standing with a man in an argyle sweater",
        },
        {
          src: gharPatanAerial,
          alt: "Patan Durbar Square from above under a heavy grey sky",
        },
      ],
      scrollWindow: { lines: 4, wordsPerMinute: 180 },
      // Behind the open panel, 3 x 3, read left to right; the middle one
      // is the month's own photo. Puja laid out on the grass, a Newari
      // sagun plate, puja against the valley, the wedding day (a bow at the
      // door, the "I do crew" props, sindoor), then trekking season (a calf
      // on the Gosaikunda trek, prayer flags and the range at Kalinchowk,
      // hooded and masked on the Everest base camp trek).
      panelGrid: [
        { src: bsMangshirPujaSpread, caption: "wedding edition: before" },
        { src: bsMangshirSagun, caption: "thay:bhu by festive operations head" },
        { src: bsMangshirPujaView, caption: "wedding edition: after" },
        bsMangshirWeddingBow, bsMangshirIDoCrew, bsMangshirSindoor,
        { src: bsMangshirGosaikundaCalf, caption: "somewhere in Rasuwa" },
        { src: bsMangshirKalinchowk, caption: "somewhere in Dolakha" },
        { src: bsMangshirEbcMasked, caption: "somewhere in Khumbu" },
      ],
      paragraphs: [
        <>
          If Mangshir has a reputation in Nepali households, it's for being the
          wedding season. The eighth month of Bikram Sambat falls in the middle
          of November and through, when the weather is pleasant and the
          mountains often emerge against clear skies ~ still not too late for a
          short trek, but the season's real highlight is the wedding calendar.
          The month also brings {ne("बिबाह पंचमी")}, celebrating the divine marriage of Rama and
          Sita from the Ramayana.
        </>,
        <>
          It's a sweet spot between seasons: late autumn that's not too cold,
          not too busy, just clear skies and good vibes. For a closer look into
          the month, step right in.
        </>,
      ],
      // A Mangshir guide is still to be written; add its href then.
      cta: { label: "Step into Mangshir →" },
    },
    {
      heading: month("पुष", "Poush"),
      image: {
        src: bsPoushSunbaskKitchen,
        alt: "Leaning on a kitchen counter in a long white jumper, looking out at a sunlit rooftop through tall windows",
        caption: "december through january",
      },
      season: { en: "pre-winter", ne: "हेमन्त" },
      // Stand-ins for the side panels; swap for the real photos.
      sideImages: [
        {
          src: gharMoolGhar,
          alt: "A diyo burning on the floor among marigold petals and sindoor",
        },
        {
          src: lakeWater,
          alt: "Bare feet over the bow of a blue wooden boat on lake water",
        },
      ],
      scrollWindow: { lines: 4, wordsPerMinute: 180 },
      // Behind the open panel, 3 x 3, read left to right; the middle one
      // is the month's own photo. An ultralight in Pokhara, a plate of
      // yomari, Phewa at dusk, a jeri held up to the camera, sunbasking in a
      // kitchen, a dal bhat thali, then sunbasking with Happu, Happu asleep among the
      // rooftop pots, and Happu grinning cheek to cheek under a blue sky.
      panelGrid: [
        { src: bsPoushUltralight, caption: "pokhara activities 101" },
        { src: bsPoushYomari, caption: "yomari punhi, obviously" },
        { src: bsPoushPhewa, caption: "phewa lake in pokhara" },
        bsPoushJeri,
        // She stands at the foot of the frame, under a tall ceiling.
        { src: bsPoushSunbaskKitchen, position: "center bottom" },
        bsPoushThali,
        { src: bsPoushHappuSunbask, caption: "winter sun, shared with happu" },
        // Happu sleeps low in a tall frame, under the pots.
        {
          src: bsPoushHappuFlowers,
          position: "center 95%",
          caption: "perfect spot spotted",
        },
        { src: bsPoushHappuAndNush, caption: "winter sun, shared with happu" },
      ],
      paragraphs: [
        <>
          When winter arrives in Nepal, the mountains empty out! Trekkers and
          locals head down to escape the biting cold. Down in Terai, the weather
          is just right for exploring: the lakes of Pokhara, or Chitwan for
          magnificent animal watching. But winter in Kathmandu hits different:
          jeri-swari with chiya under bihana ko nyano nyamo gham ~ pure
          sunbasking, then {ne("घिउचाकु दालभात")} for heavy lunch, and an afternoon nap in the sun
          until the wind picks up. The mood is cozy, because it's Christmas and
          new year time of year.
        </>,
        <>
          The month brings its own celebrations: Yomari Punhi, a day for
          savoring a beloved Newari delicacy, while the Gurung community marks
          the first of the three Lhosars, Tamu. Come taste what the month has to
          offer here.
        </>,
      ],
      // A Poush guide is still to be written; add its href then.
      cta: { label: "Step into Poush →" },
    },
    {
      heading: month("माघ", "Magh"),
      image: {
        src: bsMaghTempleMum,
        alt: "A woman in a red hooded jacket and tika making an offering before a garlanded deity in a carved wooden temple",
        caption: "january through february",
      },
      season: { en: "winter", ne: "शिशिर" },
      // Stand-ins for the side panels; swap for the real photos.
      sideImages: [
        {
          src: gharPikhaLakhu,
          alt: "A puja laid out on the floor: a brass deity, marigolds, rice and a copper plate",
        },
        {
          src: gharChowk,
          alt: "A two-tiered pagoda temple in a quiet Patan square, red brick houses around it",
        },
      ],
      scrollWindow: { lines: 4, wordsPerMinute: 180 },
      // Behind the open panel, 3 x 3, read left to right; the middle one
      // is the month's own photo. In the order of the numbered files in
      // "magh": mum at the shrine, a bite of chaku, a dip at the river, a
      // bowl of fritters, eggs, fish and meat, mum at a temple, butter
      // lamps on a newspaper, then the Swasthani Brata Katha open by a diyo, til
      // and murai ko laddu, and the ghat at Tribeni.
      panelGrid: [
        // The file is cut to the deity and mum, framed high to keep the
        // deity's crown; the next two are framed high for the faces.
        {
          src: bsMaghShrine,
          position: "center 15%",
          caption: "mum and god, catching up",
        },
        {
          src: bsMaghChakuBite,
          position: "center 35%",
          caption: "maghe sankranti",
        },
        {
          src: bsMaghRiverDip,
          position: "center 30%",
          caption: "Sankhu, Sali river visit",
        },
        bsMaghSagunBowl, bsMaghTempleMum, bsMaghButterLamps,
        // High enough for the page's illustrated heading and the diyo.
        {
          src: bsMaghSwasthani,
          position: "center 28%",
          caption: "swasthani story time",
        },
        // Two laddus stacked: no crop of a wide cell holds both.
        { src: bsMaghLaddus, whole: true, caption: "sankranti ladoo, in all sizes" },
        { src: bsMaghTribeni, caption: "somewhere in tribeni" },
      ],
      paragraphs: [
        <>
          The first day arrives with a full sensory welcome: til ko laddu,
          gheu-chaku, and maa's hands rubbing warm {ne("कालो तेल")} into your crown with an
          ashirbaad. Maghe Sankranti represents winter at its peak. Through the
          month, "Swasthani Katha" a divine narrative of Shiva and Parvati is
          read aloud in some households, while the Tamang community celebrates
          the second Lhosar of the year this month, Sonam.
        </>,
        <>
          The month closes toward Shree Panchami, on the fifth day of the bright
          fortnight; an auspicious day to begin a new pursuit, because it
          belongs to the goddess of knowledge. Come join me as I tell you all
          about this month.
        </>,
      ],
      // A Magh guide is still to be written; add its href then.
      cta: { label: "Step into Magh →" },
    },
    {
      heading: month("फागुन", "Falgun"),
      image: {
        src: bsFalgunAarti1,
        alt: "A priest in saffron at a night aarti, eyes up, holding a blazing tiered lamp",
        caption: "february through march",
      },
      season: { en: "winter", ne: "शिशिर" },
      // Stand-ins for the side panels; swap for the real photos.
      sideImages: [
        {
          src: moodPujaMarigold,
          alt: "Marigolds, diyo, sindoor and incense laid out on brick for puja",
        },
        {
          src: gharHimalHome,
          alt: "A hand holding three lit diyos over a puja plate",
        },
      ],
      scrollWindow: { lines: 4, wordsPerMinute: 180 },
      // Behind the open panel, 3 x 3, read left to right; the middle one
      // is the month's own photo. A smile at a rooftop cafe, a diyo held
      // up in the dark, sparklers on Shivaratri night, three of a night
      // aarti, the sweets the halwa money went on, a Mangalbazar alley from
      // above, and gulab jamun and rasbari in a glass bowl.
      panelGrid: [
        // She sits left of centre in a wide frame; the face and flame in the
        // next sit above the month's name, which is centred on that cell.
        {
          src: bsFalgunRooftopCafe,
          position: "30% center",
          caption: "shivaratri, soul's flying",
        },
        {
          src: bsFalgunDiyo,
          position: "center 62%",
          caption: "a diyo for the darkest night",
        },
        // Toward the faces on the right, for a phone's narrow cell.
        {
          src: bsFalgunSparklers,
          position: "60% center",
          caption: "shivaratri, sparks flying",
        },
        bsFalgunAarti2, bsFalgunAarti1, bsFalgunAarti3,
        { src: bsFalgunSweetsBox, caption: "dessert #1" },
        // Low enough in the alley for the sweet shop's sign.
        {
          src: bsFalgunMangalbazarAlley,
          position: "center 72%",
          caption: "alleys of mangalbazar",
        },
        // Near the foot, so the two sweets sit above this cell's sticker,
        // which rides high to clear the close triangle.
        {
          src: bsFalgunRasbari,
          position: "center 90%",
          caption: "dessert #2",
        },
      ],
      paragraphs: [
        <>
          Falgun arrives with the year's final Lhosar: Gyalpo, celebrated mostly
          among Sherpa communities, and continuing the spirit of the Hindu
          gods, {ne("शिवरात्रि")} falls on one of the darkest nights of the month. Culturally,
          it marks the end of winter's hibernation, and tourists from all over
          come to feel the energy Pashupati ignites.
        </>,
        <>
          Growing up, celebrating this meant stretching ropes across
          neighborhood streets to stop passing bikes, collecting money to
          buy {ne("हलुवा")} &amp; enjoy hard earned dessert by the bonfire, sacred some
          may say. Because by "neighborhood," I mean alleys of Mangalbazar; the
          "sacred bonfire" is how we end Shivaratri in our chowk, in our aangan.
        </>,
      ],
      // A Falgun guide is still to be written; add its href then.
      cta: { label: "Step into Falgun →" },
    },
    {
      heading: month("चैत", "Chaitra"),
      image: {
        src: bsChaitraYomariPlate,
        alt: "A leaf plate of yomari, beaten rice, a bara and cut fruit, a brass cup beside it",
        caption: "march through april",
      },
      season: { en: "spring", ne: "बसन्त" },
      // Stand-ins for the side panels; swap for the real photos.
      sideImages: [
        {
          src: gharIhi,
          alt: "A small girl in her Ihi finery and red bangles, held close by a man in glasses",
        },
        {
          src: basecamp,
          alt: "Arms out on a rocky trail below snow-covered Himalayan peaks",
        },
      ],
      scrollWindow: { lines: 4, wordsPerMinute: 180 },
      // Behind the open panel, 3 x 3, read left to right; the middle one
      // is the month's own photo. In the order of the numbered files in
      // "chaitra": Holi in yellow, Baa at a Ram Navami puja, Holi in blue,
      // three leaf plates of feast food, brass lamps lit for the jatra, the
      // Pikhalakhu offering at Mool Ghar, and Chaite Dashain at Mool Ghar.
      panelGrid: [
        // Framed high for the faces.
        {
          src: bsChaitraHoliYellow,
          position: "center 20%",
          caption: "holi, yellow edition",
        },
        // Cut from Baa's head down to the puja, and shown whole: no crop of
        // a wide cell holds both. The puja runs to the foot of the frame and
        // Baa's face is top left, so the caption goes top right, over the
        // helmet, on two lines to keep clear of him.
        {
          src: bsChaitraRamNavami,
          whole: true,
          caption: (
            <>
              ram navami,
              <br />
              marigold ready
            </>
          ),
          captionTopRight: true,
        },
        {
          src: bsChaitraHoliBlue,
          position: "center 25%",
          caption: "holi, blue edition",
        },
        bsChaitraSamayBaji, bsChaitraYomariPlate, bsChaitraLeafPlate,
        {
          src: bsChaitraBrassLamps,
          position: "center 55%",
          caption: "preparations for jatra",
        },
        // The file is cut so the offering sits above the caption.
        {
          src: bsChaitraMandalaOffering,
          caption: 'pikhalakhu, as is from "mool ghar"',
        },
        {
          src: bsChaitraSanoDashain,
          position: "center 55%",
          caption: "chaite dashain at mool ghar",
        },
      ],
      paragraphs: [
        <>
          Chaitra is the last page of the Nepali year: our December, but in
          spring. The month opens with Holi, a celebration of colors where
          playing with water welcomes summer, and brings Sano Dashain, two major
          days honoring Goddess Durga and Rama Navami across the country.
        </>,
        <>
          In Bhaktapur, one of the three durbar square cities, the {ne("जात्रा")} begins.
          Nepali new year festival reenacting a mythological victory through
          massive public rituals. Read all about it inside the Chaitra edition.
        </>,
      ],
      // A Chaitra guide is still to be written; add its href then.
      cta: { label: "Step into Chaitra →" },
    },
    {
      heading: month("बैशाख", "Baisakh"),
      image: {
        src: bsBaisakhFeetUp,
        alt: "A sneaker propped up in a sunny garden, a hanging basket and prayer flags against snowy Annapurna peaks",
        caption: "april through may",
      },
      season: { en: "spring", ne: "बसन्त" },
      // Stand-ins for the side panels; swap for the real photos.
      sideImages: [
        {
          src: gharPatanAerial,
          alt: "Patan Durbar Square from above under a heavy grey sky",
        },
        {
          src: moodNewarTattoo,
          alt: "Traditional Newar leg tattoos of a temple window and peacocks",
        },
      ],
      scrollWindow: { lines: 4, wordsPerMinute: 180 },
      // Behind the open panel, 3 x 3, read left to right; the middle one
      // is the month's own photo. A rooftop terrace in bloom, diyos lit
      // before the jatra chariot at night, a Patan temple square, green
      // hills under a blue sky, feet up below the Annapurnas, a pine
      // forest, then a laugh in the street under a sun hat, Newar leg
      // tattoos of a temple window and peacocks, and anklets for Mata
      // Tirtha Aunsi.
      panelGrid: [
        { src: bsBaisakhRooftopTerrace, caption: "rooftop season, in bloom" },
        // Low enough for the chariot's face and the diyos below it.
        {
          src: bsBaisakhJatraNight,
          position: "center 60%",
          caption: "jatra night, diyos lit",
        },
        { src: bsBaisakhPatanSquare, caption: "a quiet square in patan" },
        bsBaisakhGreenHills, bsBaisakhFeetUp, bsBaisakhPineForest,
        // High, for the hat and both faces.
        {
          src: bsBaisakhStreetLaugh,
          position: "center 20%",
          caption: "hat on, giggles out",
        },
        { src: bsBaisakhNewarTattoo, caption: "inked like a temple window" },
        { src: bsBaisakhAnklets, caption: "mother's day in may" },
      ],
      paragraphs: [
        <>
          Welcome to the other half of the year. For those who'd rather
          experience the culture of the cities, the month is defined by its
          Jatras: Biska: Jatra in Bhaktapur concludes and Rato Machindranath
          Jatra in Patan begins, where multi-tiered wooden chariots carry the
          idols of deities through narrow, winding ancient streets. It's a
          different kind of thrill ~ a major feat of community coordination and
          devotion.
        </>,
        <>
          As the new year month, Baisakh also includes Mata Tirtha Aunsi, a
          mother's day with a ritual attached. And along the line somewhere in
          the month comes {ne("अक्षय तृतीया")}, I took a special mention because that is my
          birthday and it's a date I like to keep up. The full month is waiting:
          read on!
        </>,
      ],
      // A Baisakh guide is still to be written; add its href then.
      cta: { label: "Step into Baisakh →" },
    },
    {
      heading: month("जेठ", "Jestha"),
      image: {
        src: bsJesthaChortenTrail,
        alt: "Trekkers on a rocky trail past a small chorten, snowy peaks under a blue sky ahead",
        caption: "may through june",
      },
      season: { en: "early summer", ne: "ग्रिष्म" },
      // Stand-ins for the side panels; swap for the real photos.
      sideImages: [
        {
          src: gharTrekking,
          alt: "Hooded, buffed and sunglassed on a cold pass, snowed-on peaks behind",
        },
        {
          src: moodLinenAnklets,
          alt: "Anklets over linen, feet off the ground",
        },
      ],
      scrollWindow: { lines: 4, wordsPerMinute: 180 },
      // Behind the open panel, 3 x 3, read left to right; the middle one
      // is the month's own photo. The Everest trail: a yak below the
      // peaks, cairns under a clouded summit, porters on a misty trail, the
      // trekking map, a chorten on the trail, a rest at the top, Namche at
      // first light, Ama Dablam over the river, and Ama Dablam at dawn.
      panelGrid: [
        // The yak sits low in a very tall frame.
        {
          src: bsJesthaYak,
          position: "center 58%",
          caption: "yak traffic, khumbu edition",
        },
        { src: bsJesthaCairns, caption: "stacked for luck" },
        {
          src: bsJesthaPorterTrail,
          caption: "somewhere on the way to namche",
        },
        bsJesthaTrekMap,
        // Wide frames: toward the trekkers and the peaks, and toward the two
        // resting at the top.
        { src: bsJesthaChortenTrail, position: "68% center" },
        { src: bsJesthaSummitRest, position: "35% center" },
        { src: bsJesthaNamche, caption: "namche, first light" },
        // Up a little for more of the peak.
        {
          src: bsJesthaAmaDablamRiver,
          position: "center 35%",
          caption: "ama dablam, showing off",
        },
        { src: bsJesthaAmaDablamDawn, caption: "dawn, then the climb" },
      ],
      paragraphs: [
        <>
          Did I mention this is Nepal's second trekking season? If you missed
          the mountains because you were busy celebrating Dashain, this is the
          time to go feel them breathe. You decide how many mountains to see and
          how close to get. For a panoramic view of the Himalayan range, take a
          day's ride from Kathmandu to Nagarkot or Namobuddha, where the range
          lines up beautifully against the horizon. Prefer to earn those views
          on foot? Head to Pokhara and pick Dhampus, Ghandruk, or Ghorepani Poon
          Hill. Whatever your spirit calls for!
        </>,
        <>
          Or just straight up raw-dog a nine day trek. It is said that Shiva
          struck his trident on a rocky mountain and instantly, a stream of
          pure, cold water burst forth from the rock, forming the high-altitude
          alpine lake known today as Gosaikunda. Learn more in Jestha edition.
        </>,
      ],
      // A Jestha guide is still to be written; add its href then.
      cta: { label: "Step into Jestha →" },
    },
    {
      heading: month("असार", "Ashadh"),
      image: {
        src: bsAsarMudWade,
        alt: "Wading through a muddy paddy field in black overalls and an organizer badge, mud fest crowd behind",
        caption: "june through july",
      },
      season: { en: "summer", ne: "ग्रिष्म" },
      // Stand-ins for the side panels; swap for the real photos.
      sideImages: [
        {
          src: basecamp,
          alt: "Arms out on a rocky trail below snow-covered Himalayan peaks",
        },
        {
          src: gharPujaThali,
          alt: "A puja thali of flowers, banana and sindoor beside a hand holding a rose",
        },
      ],
      scrollWindow: { lines: 4, wordsPerMinute: 180 },
      // Behind the open panel, 3 x 3, read left to right; the middle one
      // is the month's own photo. Happu on the roof under monsoon clouds, a
      // rainy-day cafe window, Happu again, three from the paddy-planting
      // mud fest, and Swayambhu under grey skies.
      panelGrid: [
        // Happu sits right of centre in both rooftop frames.
        {
          src: bsAsarHappuRooftop,
          position: "58% center",
          caption: "happu, on cloud watch",
        },
        { src: bsAsarCafeWindow, caption: "rainy day, window seat" },
        {
          src: bsAsarHappuGlance,
          position: "66% center",
          caption: "grey skies, white floof",
        },
        bsAsarMudShout, bsAsarMudWade, bsAsarMudCheer,
        // Low enough for her face, which sits under the stupa's eyes in
        // both of these.
        {
          src: bsAsarSwayambhuLaugh,
          position: "center 62%",
          caption: "monsoon giggles",
        },
        // The stupa's eyes and the top of its dome.
        {
          src: bsAsarSwayambhuDome,
          position: "center 30%",
          caption: "swayambhu, flags flying",
        },
        {
          src: bsAsarSwayambhuCalm,
          position: "center 66%",
          caption: "okay, serious face now",
        },
      ],
      paragraphs: [
        <>
          There’s this famous song “aasare mahinama pani paryo rujhaune” sung by
          the very talented Prashant Tamang back in 2011, the gist ~ it's a
          rainy month. Somewhere in its grey-green days, Bhoto Jatra closes the
          long arc of Rato Machindranath. And seasonally, this month matters
          deeply for farmers: it's rice-planting time, with Ropain Diwas
          celebrated on the 15th. After long hours out in the sun, there's a
          tradition of beaten rice and yogurt. Many people join farmers on this
          day, play in the mud all day, and eat a tummy full of dahi chiura,
          because it's the day. But there's so much more in this month. Come
          read about it all.
        </>,
      ],
      // A Ashad guide is still to be written; add its href then.
      cta: { label: "Step into Ashadh →" },
    },
    {
      heading: month("साउन", "Shrawan"),
      image: {
        src: bsShrawanPuff,
        alt: "A lit joint held between the fingers against a pale wall",
        caption: "july through august",
      },
      season: { en: "early monsoon", ne: "बर्षा" },
      // Stand-ins for the side panels; swap for the real photos.
      sideImages: [
        {
          src: musicRosePuja,
          alt: "A hand holding a pink rose over a puja plate of flowers, banana and sindoor",
        },
        {
          src: gharChowk,
          alt: "A two-tiered pagoda temple in a quiet Patan square, red brick houses around it",
        },
      ],
      scrollWindow: { lines: 4, wordsPerMinute: 180 },
      // Behind the open panel, 3 x 3, read left to right; the middle one
      // is the month's own photo. Happu eyeing the first mangoes, a Buddha
      // at Swayambhu under monsoon clouds, red bangles, a cafe window strung
      // with paper butterflies, a puff, a city view from an office window,
      // curtains open on the trees, a bird in a blue break in the clouds,
      // and afternoon light through a poppy curtain.
      panelGrid: [
        // High enough for Happu's ears and the mango, under the sticker.
        {
          src: bsShrawanHappuMango,
          position: "center 30%",
          caption: "mango season, happu on duty",
        },
        // Low, for the Buddha at the foot of the frame.
        {
          src: bsShrawanSwayambhuBuddha,
          position: "center 85%",
          caption: "buddha, minding the monsoon",
        },
        { src: bsShrawanRedBangles, caption: "shrawan bangles, red edition" },
        bsShrawanCafeButterflies, bsShrawanPuff, bsShrawanOfficeWindow,
        { src: bsShrawanCurtainWindow, caption: "curtains open, rain on hold" },
        { src: bsShrawanSkyBird, caption: "a break in the clouds" },
        { src: bsShrawanPoppyCurtain, caption: "afternoon nap lighting" },
      ],
      paragraphs: [
        <>
          The month opens with Shrawan Sankranti, the cultural clock from which
          the festival season officially begins its countdown. Call it Shiva's
          month: Mondays at Pashupatinath, with green bangles and green saris
          the official theme as Teej approaches ~ celebrated massively among
          women.
        </>,
        <>
          The month also brings {ne("गुरु")} Purnima, teacher's appreciation time of the
          year. And thirty days after Ropain, on Shrawan 15, we eat the rice
          with some milk ~ kheer khane din. Come read all about the month and
          its different shades.
        </>,
      ],
      // A Shrawan guide is still to be written; add its href then.
      cta: { label: "Step into Shrawan →" },
    },
    {
      heading: month("भदौ", "Bhadra"),
      image: {
        src: bsBhadauGhatNight2,
        alt: "A crowd on river ghat steps at night, lamps lit around a deity carried to the water's edge",
        caption: "august through september",
      },
      season: { en: "monsoon", ne: "बर्षा" },
      // Stand-ins for the side panels; swap for the real photos.
      sideImages: [
        {
          src: gharBahra,
          alt: "A smiling girl in red and gold with a peacock feather in her hair, standing with a man in an argyle sweater",
        },
        {
          src: gharPikhaLakhu,
          alt: "A puja laid out on the floor: a brass deity, marigolds, rice and a copper plate",
        },
      ],
      scrollWindow: { lines: 4, wordsPerMinute: 180 },
      // Behind the open panel, 3 x 3, read left to right; the middle one
      // is the month's own photo. Three in Patan Durbar Square, Mangalbazar's
      // own: cross-legged by the stone lions, laughing with a street dog,
      // and looking out at the pagoda; a night on the river ghat as a deity
      // goes to the water; and Gosaikunda for Janai Purnima: by the lake,
      // waving at the peaks, and breakfast above the water.
      panelGrid: [
        // She sits left of centre in a wide frame; on hover, a loop of her
        // in the square with the pigeons lifting behind.
        {
          src: bsBhadauPatanLions,
          position: "30% center",
          caption: "by the lions, pigeons on duty",
          video: bsBhadauPatanLoop,
        },
        // High, so her face sits below the month's name, which is centred
        // on this cell.
        {
          src: bsBhadauPatanDog,
          position: "center 30%",
          caption: "made a friend in the square",
        },
        // She sits at the right edge of a wide frame.
        {
          src: bsBhadauPatanPagoda,
          position: "100% center",
          caption: "home turf, golden hour",
        },
        bsBhadauGhatNight1, bsBhadauGhatNight2, bsBhadauGhatNight3,
        { src: bsBhadauGosaikundaBeanie, caption: "gosaikunda, pom-pom approved" },
        // High, for her raised hand and the snowy peak behind it.
        {
          src: bsBhadauGosaikundaOffering,
          position: "center 20%",
          caption: "hello from 4,380m",
        },
        {
          src: bsBhadauGosaikundaBreakfast,
          caption: "breakfast, lake view included",
        },
      ],
      paragraphs: [
        <>
          Bhadra is another month packed with celebration, tradition, and food.
          Janai Purnima falls first — an auspicious day for men, sending
          thousands up to Gosaikunda to renew their sacred thread; the Shiva
          month continues. And if you're in Mangalbazar, buckle up: Mataya, Gai
          Jatra, and Krishna Janmashtami follow in sequence, each with different
          facets but one core — the whole place comes alive.
        </>,
        <>
          And if you weren't waiting on food this month, joke's on you: it
          brings {ne("क्वाटी खाने दिन")}, nine different kinds of beans in a single soup. The month
          has a different energy as it finishes with the last bits of monsoon.
          Come read all about it.
        </>,
      ],
      // A Bhadra guide is still to be written; add its href then.
      cta: { label: "Step into Bhadra →" },
    },
    {
      heading: month("असोज", "Asoj"),
      image: {
        src: bsAsojStreetStride,
        alt: "Walking up the middle of a Kathmandu street in a hat and mask, power lines overhead and a green hill ahead",
        caption: "september through october",
      },
      season: { en: "autumn", ne: "शरद" },
      // Stand-ins for the side panels; swap for the real photos.
      sideImages: [
        {
          src: gharDashain,
          alt: "A dog on a balcony wearing tika and a marigold garland",
        },
        {
          src: gharMoolGhar,
          alt: "A diyo burning on the floor among marigold petals and sindoor",
        },
      ],
      scrollWindow: { lines: 4, wordsPerMinute: 180 },
      // Behind the open panel, 3 x 3, read left to right; the middle one
      // is the month's own photo. With Baba for Father's Day either side of
      // two generations of feet on the rugs; three on a Kathmandu street
      // under a tangle of wires as the skies clear; then butter lamps, paan
      // with Baba before work, and a puja spread.
      panelGrid: [
        { src: gharBahra, caption: "father's day, throwback edition" },
        { src: bsAsojFeetBaa, caption: "two generations, same rug" },
        { src: gharIhi, caption: "baba's girl, ihi day" },
        bsAsojStreetGlance, bsAsojStreetStride, bsAsojStreetPause,
        { src: bsAsojButterLamps, caption: "lamps lit, wishes sent" },
        { src: bsAsojPaan, caption: "paan o'clock with baba" },
        // Low, for the rose and the hydrangea at the foot of the frame.
        {
          src: bsAsojPujaSpread,
          position: "center 85%",
          caption: "puja plates, fully loaded",
        },
      ],
      paragraphs: [
        <>
          Last of the series, but the festive bells are ringing as we nearly
          circle back to Kartik. First comes Biswakarma Puja, when tools,
          machines, cars are decorated with marigold garlands as a sign of
          respect because anything that makes our lives easier deserves
          gratitude. Then comes Indra Jatra, one of Kathmandu's grandest street
          festivals, filling the streets around Kathmandu Durbar Square as the
          monsoon gives way to brighter autumn days.
        </>,
        <>
          Father's Day, according to the {ne("विक्रम संवत")} calendar, falls this month too. And
          just like that, the skies clear, the trekking season opens, and the
          mountains start calling again. Curious what Asoj has in store? Come
          see the month from the inside!
        </>,
      ],
      // A Ashwin guide is still to be written; add its href then.
      cta: { label: "Step into Asoj →" },
    },
  ],
  outro: [
    <>
      These celebrations shift from year to year. Dashain usually begins towards
      the end of Asoj, but as I write this on Kartik 24, 2083, both Dashain and
      Tihar have fallen within Kartik, just weeks apart. And as we welcome
      another year with Mha: Puja, it's time for a little self-appreciation.
      Think Snoop Dogg's famous "I'd like to thank me" moment, but make it
      spiritually rooted, wholesome, and a sprinkle of exhaustion after all the
      festivities.
    </>,
    <>
      But that's the beauty of it, isn't it? It's these little celebrations,
      rituals, and gatherings that keep the living, living. Every month brings
      its own magic, its own energy, and a rhythm that blends with the changing
      seasons. No two months feel quite the same, and that's what makes
      experiencing Nepal throughout the year so special.
    </>,
    <>
      If you could pick just one month to experience Nepal, which would it be?
      {/* On a phone the note comes after the board and there is no hover,
          so the post ends on the question. */}
      <span className="desktop-only">
        {" "}
        Here are twelve glimpses, one from each month. Hover over each picture
        to discover a little more.
      </span>
    </>,
  ],
  /* The year in twelve frames, one per month, from Kartik (where the post
     is published) round to Ashwin. */
  moodBoardLayout: "gallery",
  moodBoardTitle: "Moodboard for Bikram Sambat",
  moodBoard: [
    {
      image: gharDashain,
      alt: "A dog on a balcony wearing tika and a marigold garland",
      position: "center 30%",
      caption: "post-dashain tika click",
      month: { ne: "कार्तिक", en: "Kartik" },
    },
    {
      image: bsMangshir,
      alt: "Arm raised in a peace sign on a boulder below snow-dusted Himalayan peaks",
      position: "center 74%",
      caption: "scene from EBC trek",
      month: { ne: "मंसिर", en: "Mangshir" },
    },
    {
      image: bsPoush,
      alt: "A plate of glossy jeri piled on swari",
      caption: "jerii swari in da house",
      month: { ne: "पुष", en: "Puush" },
    },
    {
      image: bsMagh,
      alt: "An open Swasthani Brata Katha beside a brass plate and an oil lamp",
      caption: "कुमारजी आज्ञा गर्नुहुन्छ, हे अगस्त्य मुनि",
      // Devanagari sets larger than Outfit at the same size; a notch down
      // matches the other captions and keeps it under the month's name.
      // Two lines, broken at the comma.
      captionContent: (
        <span style={{ fontSize: "0.9em" }}>
          {ne("कुमारजी आज्ञा गर्नुहुन्छ,")}
          <br />
          {ne("हे अगस्त्य मुनि")}
        </span>
      ),
      month: { ne: "माघ", en: "Magh" },
    },
    {
      image: bsFalgun,
      alt: "A priest swinging a blazing fire lamp at a night aarti before a crowd",
      caption: "Jai shambo, take a puff",
      month: { ne: "फागुन", en: "Falgun" },
    },
    {
      image: bsChaitra,
      alt: "A face and shirt covered in yellow and pink Holi colour",
      caption: "Holi is here",
      month: { ne: "चैत", en: "Chaith" },
    },
    {
      image: bsBaisakh,
      alt: "Four women with red tika on their foreheads, seated behind a cake",
      caption: "tika first, then cake",
      month: { ne: "बैशाख", en: "Baisakh" },
    },
    {
      image: bsJestha,
      alt: "Standing in a wide-brimmed hat with a walking stick above misty green hills",
      position: "0% center",
      caption: "hat on, stick found, view earned",
      month: { ne: "जेठ", en: "Jeth" },
    },
    {
      image: gharPatanAerial,
      alt: "Patan Durbar Square from above under a heavy grey sky",
      caption: "the rain is on its way",
      month: { ne: "असार", en: "Asar" },
    },
    {
      image: bsAshad,
      alt: "Leaning on a rooftop railing in Kathmandu as monsoon clouds gather over the hills",
      caption: "grey skies, kheer on the stove",
      month: { ne: "साउन", en: "Shrawan" },
    },
    {
      image: gharGosaikunda,
      alt: "Sitting at the edge of a still alpine lake in the mountains",
      caption: "a long walk up for a thread",
      month: { ne: "भदौ", en: "Bhadau" },
    },
    {
      image: moodPujaMarigold,
      alt: "Marigolds, diyo, sindoor and incense laid out on brick",
      caption: "the marigolds are back",
      month: { ne: "असोज", en: "Asoj" },
    },
  ],
};

export const BLOG_POSTS: BlogPost[] = [MOOL_GHAR, FESTIVAL_CALENDAR];

export const getPost = (slug: string) =>
  BLOG_POSTS.find((post) => post.slug === slug);
