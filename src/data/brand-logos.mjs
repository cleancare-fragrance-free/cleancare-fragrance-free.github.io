// Official brand artwork (including compact site marks), observed October 2026.
// Local copies avoid visitor requests to logo services and protect against hotlink failures.
// Trademarks remain with their owners; inclusion is identification, not endorsement.
const assets = {
  'A-Derma': ['aderma.png', 'https://www.aderma.fr/var/dfp/storage/images/6/7/6/2/272676-252-fre-FR/80b6569a74cc-logo_a-derma-png'],
  AESTURA: ['aestura.svg', 'https://int.aestura.com/cdn/shop/files/1_GNB-Logo__172x28_21da5ca9-5f2e-4a02-bb4a-49663094861b.svg?v=1734312985&width=170'],
  ANESSA: ['anessa.png', 'https://www.shiseido.co.jp/anessa/apple-touch-icon.png'],
  'ARM & HAMMER': ['arm-hammer.png', 'https://www.armandhammer.com/-/media/aah/common/ahlogosmall.png?h=62&w=62&hash=6461CB7C1FAA1737BCF644DA8C1BFD79'],
  Aquaphor: ['aquaphor.ico', 'https://images-1.eucerin.com/~/media/aquaphor/aquaphor-logo/favicon.ico'],
  Aveeno: ['aveeno.ico', 'https://www.aveeno.com.sg/favicon.ico'],
  Bioderma: ['bioderma.svg', 'https://www.bioderma.fr/content/experience-fragments/bioderma/fr/fr/site/header/master/_jcr_content/root/headercontainer/header-container/logo/logo.svg'],
  CANMAKE: ['canmake.svg', 'https://www.canmake.com/images/common/logo.svg'],
  COSRX: ['cosrx.png', 'https://www.cosrx.com/cdn/shop/files/COSRX_150x.png?v=1658313147'],
  CeraVe: ['cerave.svg', 'https://www.cerave.com.au/-/media/project/loreal/brand-sites/cerave/shared/baseline/cerave-new-mater-logo.svg?rev=-1?w=0&hash=631E56A979030C1C05603EE81DDB9474'],
  Cetaphil: ['cetaphil.svg', 'https://www.cetaphil.com.sg/on/demandware.static/-/Sites/default/dw6670f95f/Cetaphil_Logo.svg'],
  Cleure: ['cleure.png', 'https://www.cleure.com/cdn/shop/files/Cleure_Grey_Logo_1e04aac7-2dd1-4aea-9da0-6ae8711209f2.png?v=1644266768&width=420'],
  Clinique: [null, null], // Official asset unavailable; retain text identification.
  CurrentBody: ['currentbody.svg', 'https://www.currentbody.us/cdn/shop/t/486/assets/currentbody-logo.svg?v=25185446302229482621789127062'],
  Dermina: ['dermina.png', 'https://dermina.fr/cdn/shop/files/LOGO-Black-TransparentBackground-DERMINA-LaboratoireDermatologique-PARIS-2480x800.png?v=1709961278&width=200'],
  E45: ['e45.png', 'https://e45.com/app/uploads/sites/2/2023/10/E45-logo-retina.png'],
  'Eau Thermale Avène': ['avene.png', 'https://www.eau-thermale-avene.sg/var/dfp/storage/images/3/8/6/9/20339683-88-eng-SG/61a73cc1ec82-22_av_logo_lc-png-png'],
  Ecostore: ['ecostore.png', 'https://ecostore.com/cdn/shop/files/Logo.png?v=1755818850&width=240'],
  Ecover: ['ecover.svg', 'https://uk.ecover.com/wp-content/themes/ecover2020/assets/images/logo-ecover-2020.svg'],
  EltaMD: ['eltamd.png', 'https://eltamd.com/cdn/shop/files/ELTAMD-LOGO-Favicon_ff054972-c4b9-47a0-add8-81ff2460d6c0.png?crop=center&height=32&v=1789387921&width=32'],
  'Faith in Nature': ['faith-in-nature.png', 'https://www.faithinnature.co.uk/cdn/shop/files/FIN26_07_Website_Favicon_32x32px_300dpi_V2_1.png?crop=center&height=32&v=1784448808&width=32'],
  Farmacy: ['farmacy.png', 'https://www.farmacybeauty.com/cdn/shop/files/Farmacy_Logo_2026_black_no-beaker_thicker.png?v=1786029001&width=250'],
  'Four Reasons / No Nothing': ['four-reasons.png', 'https://www.fourreasons.us/cdn/shop/files/Logo-FR_410x.png?v=1653660895'],
  'Hada Labo': ['hada-labo.gif', 'https://jp.rohto.com/-/media/com/hadalabo/logo_hadalabo.gif'],
  Honest: ['honest.svg', 'https://honest.com/cdn/shop/files/Honest_Logo.svg?v=1775773245&width=200'],
  'Kiss My Face': ['kiss-my-face.jpg', 'https://kissmyface.com/cdn/shop/files/KMF_LOGO_NEW_FEB242021-01_100x.jpg?v=1661809190'],
  'Kristin Ess': ['kristin-ess.png', 'https://kristinesshair.com/cdn/shop/files/Kristin_Ess_Hair_Logo_Grey.png?v=1765926250&width=310'],
  'La Roche-Posay': ['la-roche-posay.png', 'https://cdn.cookielaw.org/logos/b8ec011c-8bf5-4ec6-98df-990d37350f78/26c0cfec-37b4-4385-8428-abb725b6c199/a2eb5b6b-f5fe-4fd2-8080-0570080aaaac/La-Roche-Posay-Logo-140x50.png'],
  MUJI: ['muji.png', 'https://api.muji.com.sg/media/logo/stores/1/MUJI_Box-header.png'],
  Meliora: ['meliora.png', 'https://meliorameansbetter.com/cdn/shop/files/MCP_Logo_png.png?v=1659640538&width=200'],
  Naturie: ['naturie.svg', 'https://www.naturie-net.jp/assets/img/common/logo.svg'],
  Nécessaire: ['necessaire.png', 'https://necessaire.com/cdn/shop/files/Asset_3_180x180.png?v=1631301156'],
  'Paula’s Choice': ['paulas-choice.png', 'https://paulaschoice.sg/cdn/shop/t/572/assets/logo-desktop.png?v=60238587520221099081790514369'],
  Prequel: ['prequel.png', 'https://prequelskin.com/cdn/shop/files/PRQL_Logotype_2_Ink.png?v=1681404607&width=140'],
  QV: ['qv.svg', 'https://www.qvskincare.com.au/content/dam/brand-logos/new-QV-logo.svg'],
  'Real Purity': ['real-purity.png', 'https://www.realpurity.com/cdn/shop/files/logo_200x.png?v=1617371926'],
  // Do not bypass the official site's certificate error or invent its logo.
  SEEN: [null, null],
  SHISEIDO: ['shiseido.svg', 'https://www.shiseido.co.jp/sw/onlinestore/assets/images/common/logo.svg'],
  'SK-II': ['sk-ii.svg', 'https://images.ctfassets.net/4qp6lhjn6atl/3bCqYNmoVRWvwYVpTmDNub/644aad65883ba634b14877f505d43bc7/logo-white.svg', 'dark'],
  'Seventh Generation': ['seventh-generation.png', 'https://www.seventhgeneration.com/themes/custom/svg3/logo.png'],
  'Skin Aqua': ['skin-aqua.gif', 'https://jp.rohto.com/-/media/com/skin-aqua/img_2023/top/logo_skin-aqua3.gif?sc_lang=ja-jp'],
  'Sofie Pavitt Face': ['sofie-pavitt.svg', 'https://www.sofiepavittface.com/cdn/shop/files/sofie-pavitt.svg?v=1736382304&width=150'],
  Surcare: ['surcare.png', 'https://surcare.co.uk/cdn/shop/files/Surcare_Logo_Dark.png?v=1772746438&width=80'],
  'The Ordinary': ['the-ordinary.svg', 'https://theordinary.com/on/demandware.static/Sites-deciem-us-Site/-/default/dwfe11e1d2/images/brands-logo/theOrdinary-logo.svg'],
  Tide: ['tide.svg', 'https://tide.com/images/brand_main_logo.svg'],
  'Tubby Todd': ['tubby-todd.png', 'https://tubbytodd.com/cdn/shop/files/tubbytodd-logo.png?v=1718732098&width=600'],
  VERDIO: ['verdio.png', 'https://www.omibh.co.jp/sp/verdio/assets/img/apple-touch-icon.png'],
  Vanicream: ['vanicream.png', 'https://www.vanicream.com/assets/favicons/apple-touch-icon.png'],
  Vaseline: [null, null], // Official asset unavailable; retain text identification.
  Weleda: ['weleda.png', 'https://www.weleda.fr/icons/apple-touch-icon.png']
};

export const brandLogos = Object.fromEntries(Object.entries(assets).map(([brand, [file, source, theme]]) => [brand, {
  file,
  image: file ? `images/brands/${file}` : null,
  source,
  theme: theme || 'light'
}]));

export const getBrandLogo = brand => brandLogos[brand] || null;
export const brandInitials = brand => brand.trim().split(/\s+/).slice(0, 2).map(word => word[0]).join('').toUpperCase();
