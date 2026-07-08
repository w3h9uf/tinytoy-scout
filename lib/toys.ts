export type AgeBand = "0-3m" | "3-6m" | "6-9m" | "9-12m" | "12-18m" | "18-24m" | "24-36m";

export type ToyItem = {
  id: string;
  name: string;
  category: string;
  ageBands: AgeBand[];
  price: string;
  score: number;
  redditMentions: number;
  safetyScore: number;
  cleanupScore: number;
  parentFit: string;
  bestFor: string[];
  watchouts: string[];
  commonPraise: string[];
  commonComplaints: string[];
  evidence: string;
  affiliateUrl: string;
};

export type EvidenceGrade = "High" | "Medium" | "Low";

export type SafetySource = {
  label: string;
  url: string;
  note: string;
};

export type ToyEnrichment = {
  slug: string;
  evidenceGrade: EvidenceGrade;
  sentiment: {
    positive: number;
    mixed: number;
    negative: number;
  };
  productExamples: string[];
  ageReason: string;
  materialNotes: string;
  cleaningNotes: string;
  safetyChecklist: string[];
  cpscFlags: string[];
  avoidIf: string[];
  alternatives: string[];
  redditQuerySeeds: string[];
  seoKeywords: string[];
  recallSearchUrl: string;
  lastReviewed: string;
};

export type EnrichedToyItem = ToyItem & ToyEnrichment;

export const ageBands: AgeBand[] = [
  "0-3m",
  "3-6m",
  "6-9m",
  "9-12m",
  "12-18m",
  "18-24m",
  "24-36m"
];

export const issueTags = [
  "easy-clean",
  "quiet",
  "travel",
  "no-batteries",
  "less-plastic",
  "tummy-time",
  "giftable"
] as const;

export type IssueTag = (typeof issueTags)[number];

const baseToyItems: ToyItem[] = [
  {
    id: "contrast-cards",
    name: "High Contrast Card Set",
    category: "Visual development",
    ageBands: ["0-3m", "3-6m"],
    price: "$8-18",
    score: 92,
    redditMentions: 184,
    safetyScore: 95,
    cleanupScore: 92,
    parentFit: "Best low-cost newborn add-on",
    bestFor: ["tummy-time", "travel", "quiet"],
    watchouts: ["Choose rounded corners", "Avoid laminated edges that peel"],
    commonPraise: ["Keeps newborns engaged for short sessions", "Easy to rotate during tummy time"],
    commonComplaints: ["Short useful window", "Some sets feel flimsy"],
    evidence:
      "Parents repeatedly frame contrast cards as a cheap, low-risk first toy rather than a long-term staple.",
    affiliateUrl: "https://www.amazon.com/s?k=high+contrast+baby+cards"
  },
  {
    id: "soft-mirror",
    name: "Soft Floor Baby Mirror",
    category: "Tummy time",
    ageBands: ["0-3m", "3-6m", "6-9m"],
    price: "$12-28",
    score: 90,
    redditMentions: 221,
    safetyScore: 91,
    cleanupScore: 84,
    parentFit: "Most mentioned tummy-time helper",
    bestFor: ["tummy-time", "giftable", "quiet"],
    watchouts: ["Check seam quality", "Avoid hard-frame mirrors for young babies"],
    commonPraise: ["Helps extend tummy-time sessions", "Works on floor mats and play gyms"],
    commonComplaints: ["Can distort reflection", "Fabric edges collect lint"],
    evidence:
      "Discussion clusters usually mention mirrors when parents ask how to make tummy time less frustrating.",
    affiliateUrl: "https://www.amazon.com/s?k=soft+baby+floor+mirror"
  },
  {
    id: "stacking-cups",
    name: "Stacking Cups",
    category: "Open-ended play",
    ageBands: ["6-9m", "9-12m", "12-18m", "18-24m"],
    price: "$5-15",
    score: 94,
    redditMentions: 337,
    safetyScore: 93,
    cleanupScore: 96,
    parentFit: "Best repeat-use value",
    bestFor: ["easy-clean", "travel", "no-batteries"],
    watchouts: ["Avoid tiny detachable stickers", "Dry after bath play"],
    commonPraise: ["Kids return to them for months", "Good for bath, floor, and travel"],
    commonComplaints: ["Some sets crack with rough use", "Numbers and labels can rub off"],
    evidence:
      "Stacking cups show up across multiple age threads because they solve different play needs as babies grow.",
    affiliateUrl: "https://www.amazon.com/s?k=baby+stacking+cups"
  },
  {
    id: "sensory-balls",
    name: "Soft Sensory Ball Pack",
    category: "Motor skills",
    ageBands: ["3-6m", "6-9m", "9-12m", "12-18m"],
    price: "$10-25",
    score: 87,
    redditMentions: 163,
    safetyScore: 88,
    cleanupScore: 85,
    parentFit: "Good for grasping practice",
    bestFor: ["easy-clean", "no-batteries"],
    watchouts: ["Skip foam if baby chews aggressively", "Check for air holes that trap water"],
    commonPraise: ["Easy for small hands to grab", "Encourages rolling and reaching"],
    commonComplaints: ["Attracts pet hair", "Some textures are too firm"],
    evidence:
      "Parents like multi-texture balls when they ask for simple toys before crawling and early cruising.",
    affiliateUrl: "https://www.amazon.com/s?k=soft+sensory+balls+baby"
  },
  {
    id: "cloth-book",
    name: "Crinkle Cloth Book",
    category: "Early reading",
    ageBands: ["3-6m", "6-9m", "9-12m"],
    price: "$7-20",
    score: 86,
    redditMentions: 198,
    safetyScore: 90,
    cleanupScore: 72,
    parentFit: "Best stroller and diaper bag filler",
    bestFor: ["travel", "giftable"],
    watchouts: ["Check wash instructions", "Avoid long loose ribbons"],
    commonPraise: ["Keeps babies busy in the car seat or stroller", "Lightweight and hard to break"],
    commonComplaints: ["Crinkle sound can annoy adults", "Fabric can hold spit-up smell"],
    evidence:
      "Cloth books are often recommended as practical busy toys rather than literacy products.",
    affiliateUrl: "https://www.amazon.com/s?k=crinkle+cloth+baby+book"
  },
  {
    id: "wooden-rings",
    name: "Wooden Ring Stacker",
    category: "Fine motor",
    ageBands: ["9-12m", "12-18m", "18-24m"],
    price: "$14-35",
    score: 82,
    redditMentions: 109,
    safetyScore: 82,
    cleanupScore: 90,
    parentFit: "Best Montessori-style shelf toy",
    bestFor: ["less-plastic", "quiet", "giftable"],
    watchouts: ["Confirm non-toxic finish", "Avoid narrow posts for younger babies"],
    commonPraise: ["Looks good on open shelves", "Useful for color and size language"],
    commonComplaints: ["Some babies ignore it", "Paint chips on cheaper versions"],
    evidence:
      "Parents praise ring stackers most when they want durable, quiet, shelf-friendly toys.",
    affiliateUrl: "https://www.amazon.com/s?k=wooden+baby+ring+stacker"
  },
  {
    id: "shape-sorter",
    name: "Simple Shape Sorter",
    category: "Problem solving",
    ageBands: ["12-18m", "18-24m", "24-36m"],
    price: "$12-30",
    score: 88,
    redditMentions: 176,
    safetyScore: 84,
    cleanupScore: 88,
    parentFit: "Best first puzzle-style toy",
    bestFor: ["no-batteries", "giftable"],
    watchouts: ["Avoid pieces under small-parts size", "Make sure shapes are not mouth-sized"],
    commonPraise: ["Teaches persistence and matching", "Works well before jigsaw puzzles"],
    commonComplaints: ["Frustrating if introduced too early", "Pieces disappear around the house"],
    evidence:
      "Shape sorters tend to be recommended with an age caveat: great around toddlerhood, poor for early babies.",
    affiliateUrl: "https://www.amazon.com/s?k=toddler+shape+sorter"
  },
  {
    id: "silicone-teether",
    name: "One-Piece Silicone Teether",
    category: "Teething",
    ageBands: ["3-6m", "6-9m", "9-12m"],
    price: "$6-16",
    score: 85,
    redditMentions: 244,
    safetyScore: 89,
    cleanupScore: 95,
    parentFit: "Best simple teething buy",
    bestFor: ["easy-clean", "travel", "quiet"],
    watchouts: ["Avoid bead strings", "Inspect for bite tears"],
    commonPraise: ["Easy to sanitize", "Small enough for diaper bags"],
    commonComplaints: ["Baby preference is unpredictable", "Dropped constantly"],
    evidence:
      "The strongest pattern is not a single winning teether, but a preference for simple one-piece designs.",
    affiliateUrl: "https://www.amazon.com/s?k=one+piece+silicone+baby+teether"
  },
  {
    id: "activity-cube",
    name: "Wooden Activity Cube",
    category: "Busy play",
    ageBands: ["12-18m", "18-24m", "24-36m"],
    price: "$35-90",
    score: 79,
    redditMentions: 132,
    safetyScore: 78,
    cleanupScore: 81,
    parentFit: "Best high-engagement gift",
    bestFor: ["giftable", "less-plastic"],
    watchouts: ["Check bead maze wire strength", "Avoid exposed screws or rough edges"],
    commonPraise: ["Multiple play modes in one toy", "Keeps toddlers standing and cruising"],
    commonComplaints: ["Bulky", "Quality varies widely by brand"],
    evidence:
      "Activity cubes get high enthusiasm as gifts, but parents often warn each other to inspect build quality.",
    affiliateUrl: "https://www.amazon.com/s?k=wooden+activity+cube+baby"
  },
  {
    id: "bath-pipes",
    name: "Open Bath Pipe Set",
    category: "Bath play",
    ageBands: ["12-18m", "18-24m", "24-36m"],
    price: "$10-25",
    score: 80,
    redditMentions: 151,
    safetyScore: 83,
    cleanupScore: 76,
    parentFit: "Best bath toy if it dries fully",
    bestFor: ["easy-clean", "no-batteries"],
    watchouts: ["Avoid sealed squeeze toys", "Dry pieces separately after bath"],
    commonPraise: ["More interesting than rubber ducks", "Easy water cause-and-effect play"],
    commonComplaints: ["Suction cups fail", "Mold worries if pieces do not open"],
    evidence:
      "Bath-toy threads repeatedly converge on one rule: avoid toys that trap water.",
    affiliateUrl: "https://www.amazon.com/s?k=open+bath+pipe+toys+toddler"
  },
  {
    id: "push-walker",
    name: "Weighted Push Walker",
    category: "Gross motor",
    ageBands: ["9-12m", "12-18m"],
    price: "$35-120",
    score: 77,
    redditMentions: 118,
    safetyScore: 74,
    cleanupScore: 86,
    parentFit: "Best for assisted cruising, not early walking pressure",
    bestFor: ["giftable", "less-plastic"],
    watchouts: ["Avoid fast rolling wheels", "Use only with supervision"],
    commonPraise: ["Supports cruising toddlers", "Doubles as toy storage on some models"],
    commonComplaints: ["Can tip or move too fast", "Not every baby needs one"],
    evidence:
      "Parents recommend push walkers cautiously, especially when a model has adjustable wheel resistance.",
    affiliateUrl: "https://www.amazon.com/s?k=weighted+baby+push+walker"
  },
  {
    id: "busy-board",
    name: "Travel Busy Board",
    category: "Travel",
    ageBands: ["18-24m", "24-36m"],
    price: "$12-35",
    score: 83,
    redditMentions: 205,
    safetyScore: 75,
    cleanupScore: 80,
    parentFit: "Best airplane and restaurant distraction",
    bestFor: ["travel", "quiet"],
    watchouts: ["Inspect snaps and buckles", "Avoid detachable cords or tiny loose pieces"],
    commonPraise: ["Quiet enough for public spaces", "Good for buckle and zipper practice"],
    commonComplaints: ["Some boards are too hard for young toddlers", "Small parts vary by seller"],
    evidence:
      "Busy boards spike in travel threads, but safety complaints are more common than with simple toys.",
    affiliateUrl: "https://www.amazon.com/s?k=toddler+travel+busy+board"
  }
];

export const safetySources: SafetySource[] = [
  {
    label: "CPSC small-parts rule",
    url: "https://www.cpsc.gov/Business--Manufacturing/Business-Education/Business-Guidance/Small-Parts-for-Toys-and-Childrens-Products",
    note: "Products intended for children under 3 must not present choking, aspiration, or ingestion hazards from small parts."
  },
  {
    label: "CPSC toy safety standard",
    url: "https://www.cpsc.gov/Business--Manufacturing/Business-Education/Toy-Safety",
    note: "ASTM F963 is the mandatory U.S. consumer product safety standard for children's toys."
  },
  {
    label: "CPSC recalls",
    url: "https://www.cpsc.gov/Recalls",
    note: "Recall status should be checked before publishing purchase-oriented pages."
  },
  {
    label: "HealthyChildren toy buying tips",
    url: "https://www.healthychildren.org/English/safety-prevention/at-home/Pages/how-to-buy-safe-toys.aspx",
    note: "Parent-facing guidance emphasizes reading labels, thinking large, avoiding loud toys, and checking seams."
  }
];

const enrichmentById: Record<string, ToyEnrichment> = {
  "contrast-cards": {
    slug: "best-high-contrast-cards-newborns",
    evidenceGrade: "High",
    sentiment: { positive: 77, mixed: 18, negative: 5 },
    productExamples: ["Wee Gallery Art Cards", "Lovevery Looker cards", "beiens contrast cards"],
    ageReason:
      "Best suited to newborn visual attention windows; usefulness drops once babies want graspable toys.",
    materialNotes: "Prefer thick board cards with rounded corners and soy-based or non-toxic ink claims.",
    cleaningNotes: "Wipe only; retire cards if lamination peels or corners become soft from mouthing.",
    safetyChecklist: ["Rounded corners", "No peeling film", "Large format", "No detachable rings"],
    cpscFlags: ["Paperboard damage can create loose scraps", "Not a crib sleep item"],
    avoidIf: ["You already have a play gym with strong contrast panels", "Baby is aggressively mouthing paper"],
    alternatives: ["Soft baby mirror", "Black-and-white board book"],
    redditQuerySeeds: [
      "best toys for newborn reddit high contrast cards",
      "are high contrast cards worth it reddit",
      "newborn tummy time toys reddit"
    ],
    seoKeywords: ["best high contrast cards for newborns", "newborn visual development toys", "0-3 month toys"],
    recallSearchUrl: "https://www.cpsc.gov/Recalls?search=contrast%20cards",
    lastReviewed: "2026-07-08"
  },
  "soft-mirror": {
    slug: "best-soft-baby-mirrors-tummy-time",
    evidenceGrade: "High",
    sentiment: { positive: 72, mixed: 22, negative: 6 },
    productExamples: ["Sassy Tummy Time Mirror", "Fisher-Price floor mirror", "Lovevery framed mirror"],
    ageReason:
      "Useful from early tummy time through sitting practice, especially before babies can crawl away.",
    materialNotes: "Look for shatter-resistant mirror film, soft border, tight seams, and stable kickstand.",
    cleaningNotes: "Wipe mirror film gently; fabric borders can hold lint and spit-up around seams.",
    safetyChecklist: ["Shatter-resistant mirror", "Soft frame", "No loose ribbons", "Stable prop angle"],
    cpscFlags: ["Inspect seams regularly", "Avoid hard mirror edges for young babies"],
    avoidIf: ["Floor space is limited", "Your play gym already includes a removable mirror"],
    alternatives: ["Contrast cards", "Tummy-time water mat without loose parts"],
    redditQuerySeeds: [
      "baby hates tummy time mirror reddit",
      "best tummy time mirror reddit",
      "soft floor mirror baby reddit"
    ],
    seoKeywords: ["best baby mirror for tummy time", "soft floor baby mirror", "tummy time toys"],
    recallSearchUrl: "https://www.cpsc.gov/Recalls?search=baby%20mirror",
    lastReviewed: "2026-07-08"
  },
  "stacking-cups": {
    slug: "best-stacking-cups-babies",
    evidenceGrade: "High",
    sentiment: { positive: 84, mixed: 13, negative: 3 },
    productExamples: ["The First Years Stack Up Cups", "Mushie stacking cups", "Green Toys stacking cups"],
    ageReason:
      "Starts as grasping and banging, then becomes nesting, stacking, bath play, counting, and pretend play.",
    materialNotes: "Simple one-piece cups are easier to inspect than cups with stickers or trapped inserts.",
    cleaningNotes: "Dishwasher-safe sets are easiest; dry fully after bath use to avoid residue.",
    safetyChecklist: ["One-piece construction", "No sticker labels", "No cracks", "Large enough for mouthing"],
    cpscFlags: ["Discard cracked cups", "Dry thoroughly after water play"],
    avoidIf: ["You dislike plastic toys", "You need a quiet toy for thin-walled apartments"],
    alternatives: ["Wooden nesting cups", "Silicone stacking cups"],
    redditQuerySeeds: [
      "stacking cups baby worth it reddit",
      "best toys 6 month old reddit stacking cups",
      "simple baby toys reddit"
    ],
    seoKeywords: ["best stacking cups for babies", "6 month baby toys", "open ended baby toys"],
    recallSearchUrl: "https://www.cpsc.gov/Recalls?search=stacking%20cups",
    lastReviewed: "2026-07-08"
  },
  "sensory-balls": {
    slug: "best-soft-sensory-balls-babies",
    evidenceGrade: "Medium",
    sentiment: { positive: 68, mixed: 24, negative: 8 },
    productExamples: ["Infantino textured balls", "Edushape sensory balls", "B. toys sensory balls"],
    ageReason:
      "Most useful when babies begin reaching, transferring objects between hands, and rolling after toys.",
    materialNotes: "Avoid crumbly foam for heavy chewers; inspect textured seams and inflation plugs.",
    cleaningNotes: "Choose sealed or dishwasher-safe balls; textured surfaces collect hair and crumbs.",
    safetyChecklist: ["No foam tearing", "No removable plug", "No trapped water holes", "BPA-free claim"],
    cpscFlags: ["Chewed foam can become small pieces", "Air holes can trap bath water"],
    avoidIf: ["You have pets with lots of shedding", "Baby bites through soft plastics"],
    alternatives: ["Large silicone teether", "Fabric grasping ball"],
    redditQuerySeeds: [
      "sensory balls baby reddit",
      "best toys for grasping baby reddit",
      "textured baby balls safe reddit"
    ],
    seoKeywords: ["best sensory balls for babies", "baby grasping toys", "3-6 month baby toys"],
    recallSearchUrl: "https://www.cpsc.gov/Recalls?search=sensory%20balls",
    lastReviewed: "2026-07-08"
  },
  "cloth-book": {
    slug: "best-crinkle-cloth-books-babies",
    evidenceGrade: "Medium",
    sentiment: { positive: 67, mixed: 25, negative: 8 },
    productExamples: ["Lamaze cloth books", "Manhattan Toy soft books", "Melissa & Doug soft activity book"],
    ageReason:
      "Works once babies grab and mouth objects; later becomes a stroller or restaurant distraction.",
    materialNotes: "Prefer short fabric tabs, stitched elements, and no long strings or detachable teethers.",
    cleaningNotes: "Machine-washable books win; air dry fully so crinkle layers do not trap odor.",
    safetyChecklist: ["Secure seams", "No long ribbons", "No detachable rings", "Machine washable"],
    cpscFlags: ["Loose threads and ribbons need trimming", "Stuffing exposure means discard"],
    avoidIf: ["You need silent toys", "You cannot machine wash after spit-up"],
    alternatives: ["Board book", "Soft photo album"],
    redditQuerySeeds: [
      "crinkle book baby reddit",
      "best stroller toys baby reddit",
      "cloth books baby worth it reddit"
    ],
    seoKeywords: ["best crinkle books for babies", "cloth baby books", "stroller toys baby"],
    recallSearchUrl: "https://www.cpsc.gov/Recalls?search=cloth%20book%20baby",
    lastReviewed: "2026-07-08"
  },
  "wooden-rings": {
    slug: "best-wooden-ring-stackers-babies",
    evidenceGrade: "Medium",
    sentiment: { positive: 61, mixed: 30, negative: 9 },
    productExamples: ["Melissa & Doug stacker", "Hape rainbow stacker", "Lovevery wood stacker"],
    ageReason:
      "Better after sitting and early problem-solving; younger babies may only mouth or bang the rings.",
    materialNotes: "Prioritize smooth sanding, water-based paint, and no narrow removable center post.",
    cleaningNotes: "Wipe dry only; wood can swell or chip if soaked.",
    safetyChecklist: ["Smooth finish", "No paint chips", "Large rings", "Stable center post"],
    cpscFlags: ["Paint chips are ingestion risk", "Narrow posts need age-appropriate supervision"],
    avoidIf: ["Baby throws hard toys", "You need dishwasher-safe cleanup"],
    alternatives: ["Soft stacking rings", "Stacking cups"],
    redditQuerySeeds: [
      "wooden ring stacker baby reddit",
      "montessori baby toys reddit stacker",
      "wooden toys paint chipping reddit"
    ],
    seoKeywords: ["best wooden ring stacker", "Montessori baby toys", "quiet baby toys"],
    recallSearchUrl: "https://www.cpsc.gov/Recalls?search=wooden%20ring%20stacker",
    lastReviewed: "2026-07-08"
  },
  "shape-sorter": {
    slug: "best-shape-sorters-toddlers",
    evidenceGrade: "High",
    sentiment: { positive: 70, mixed: 23, negative: 7 },
    productExamples: ["Melissa & Doug shape sorter", "Fisher-Price shape sorter", "Hape shape sorter"],
    ageReason:
      "Most toddlers engage once they can intentionally match and release pieces; too early causes frustration.",
    materialNotes: "Large chunky shapes are better for under-3; avoid magnets or tiny peg-like pieces.",
    cleaningNotes: "Plastic versions wipe clean; wood versions need dry wipe and chip inspection.",
    safetyChecklist: ["Chunky pieces", "No magnets", "No splintering", "Age label matches child"],
    cpscFlags: ["Small pieces are banned for under-3 toys", "Magnets are high-severity ingestion hazards"],
    avoidIf: ["Child still mouths every object", "You need a travel toy with no loose pieces"],
    alternatives: ["Chunky knob puzzle", "Stacking cups"],
    redditQuerySeeds: [
      "shape sorter toddler reddit",
      "best first puzzle toddler reddit",
      "shape sorter age reddit"
    ],
    seoKeywords: ["best shape sorter for toddlers", "12 month toys", "first puzzle toys"],
    recallSearchUrl: "https://www.cpsc.gov/Recalls?search=shape%20sorter",
    lastReviewed: "2026-07-08"
  },
  "silicone-teether": {
    slug: "best-one-piece-silicone-teethers",
    evidenceGrade: "High",
    sentiment: { positive: 66, mixed: 29, negative: 5 },
    productExamples: ["Comotomo teether", "Nuby silicone teether", "Haakaa teething toy"],
    ageReason:
      "Preference varies by baby, but one-piece teethers are easy to trial during early teething windows.",
    materialNotes: "Food-grade silicone is common; avoid bead strings and liquid-filled designs.",
    cleaningNotes: "Boil or dishwasher only if manufacturer allows; inspect for tears after chewing.",
    safetyChecklist: ["One-piece body", "No beads", "No liquid filling", "No tear marks"],
    cpscFlags: ["Detached beads are choking hazards", "Torn silicone should be discarded"],
    avoidIf: ["Baby rejects silicone textures", "You cannot supervise mouthing sessions"],
    alternatives: ["Cold washcloth", "Large textured sensory ball"],
    redditQuerySeeds: [
      "best teether reddit baby",
      "silicone teether one piece reddit",
      "baby teether choking hazard reddit"
    ],
    seoKeywords: ["best silicone teether", "safe baby teethers", "one piece teether"],
    recallSearchUrl: "https://www.cpsc.gov/Recalls?search=silicone%20teether",
    lastReviewed: "2026-07-08"
  },
  "activity-cube": {
    slug: "best-wooden-activity-cubes-toddlers",
    evidenceGrade: "Medium",
    sentiment: { positive: 58, mixed: 29, negative: 13 },
    productExamples: ["Battat activity cube", "Hape country critters cube", "B. toys Zany Zoo"],
    ageReason:
      "High engagement once toddlers can stand, cruise, and work multiple manipulatives.",
    materialNotes: "Check bead maze wires, screw covers, paint finish, and whether the cube is heavy enough.",
    cleaningNotes: "Spot clean only; bead tracks and corners collect dust.",
    safetyChecklist: ["No exposed screws", "Secure bead maze", "No sharp edges", "Stable weight"],
    cpscFlags: ["Loose beads become small parts", "Heavy cube can pinch toes if tipped"],
    avoidIf: ["Small apartment storage is tight", "Baby pulls up on unstable furniture"],
    alternatives: ["Busy board", "Shape sorter"],
    redditQuerySeeds: [
      "wooden activity cube worth it reddit",
      "best activity cube toddler reddit",
      "activity cube safety reddit"
    ],
    seoKeywords: ["best activity cube for toddlers", "wooden activity cube", "1 year old toys"],
    recallSearchUrl: "https://www.cpsc.gov/Recalls?search=activity%20cube",
    lastReviewed: "2026-07-08"
  },
  "bath-pipes": {
    slug: "best-bath-toys-that-dont-mold",
    evidenceGrade: "High",
    sentiment: { positive: 63, mixed: 27, negative: 10 },
    productExamples: ["Boon Pipes", "Boon Cogs", "Munchkin bath cups"],
    ageReason:
      "Best after babies sit reliably in the bath and can pour, scoop, or press suction pieces.",
    materialNotes: "Open designs beat sealed squeeze toys because trapped bath water drives mold complaints.",
    cleaningNotes: "Rinse, separate, and air dry; avoid toys that cannot be opened or visually inspected.",
    safetyChecklist: ["Open drainage", "No sealed cavities", "Strong suction only above waterline", "No mildew odor"],
    cpscFlags: ["Mold exposure complaints are common in sealed bath toys", "Use only with bath supervision"],
    avoidIf: ["Bathroom has poor drying airflow", "Child chews suction cups"],
    alternatives: ["Stacking cups", "Open silicone bath cups"],
    redditQuerySeeds: [
      "bath toys that don't mold reddit",
      "boon pipes mold reddit",
      "best bath toys toddler reddit"
    ],
    seoKeywords: ["bath toys that don't mold", "best toddler bath toys", "open bath toys"],
    recallSearchUrl: "https://www.cpsc.gov/Recalls?search=bath%20toy",
    lastReviewed: "2026-07-08"
  },
  "push-walker": {
    slug: "best-weighted-push-walkers-babies",
    evidenceGrade: "Medium",
    sentiment: { positive: 52, mixed: 34, negative: 14 },
    productExamples: ["Radio Flyer walker wagon", "Hape push walker", "VTech sit-to-stand walker"],
    ageReason:
      "Only relevant once babies are pulling to stand or cruising; not needed to teach independent walking.",
    materialNotes: "Wheel resistance, weight distribution, and handle height matter more than activity panels.",
    cleaningNotes: "Wipe wheels and handle; inspect axles if used outdoors.",
    safetyChecklist: ["Adjustable wheel resistance", "Wide base", "No fast-rolling wheels", "Supervised use"],
    cpscFlags: ["Fall risk if wheels move too fast", "Not for stairs or uneven floors"],
    avoidIf: ["Home has stairs without gates", "Baby is not pulling to stand"],
    alternatives: ["Cruising furniture setup", "Activity cube"],
    redditQuerySeeds: [
      "push walker baby reddit",
      "weighted push walker worth it reddit",
      "baby walker safety reddit"
    ],
    seoKeywords: ["best push walker for babies", "weighted baby walker", "cruising toys"],
    recallSearchUrl: "https://www.cpsc.gov/Recalls?search=push%20walker",
    lastReviewed: "2026-07-08"
  },
  "busy-board": {
    slug: "best-travel-busy-boards-toddlers",
    evidenceGrade: "Medium",
    sentiment: { positive: 60, mixed: 28, negative: 12 },
    productExamples: ["deMoca busy board", "Esjay toddler busy board", "Melissa & Doug latch board"],
    ageReason:
      "Better for older toddlers who can manipulate buckles without pulling parts into their mouth.",
    materialNotes: "Felt boards are light for travel; wooden latch boards are sturdier but heavier.",
    cleaningNotes: "Felt is hard to sanitize; wooden boards wipe clean but need screw checks.",
    safetyChecklist: ["No loose cords", "No detachable buckles", "Secure screws", "Age 18m+ or 3+ label checked"],
    cpscFlags: ["Small detachable hardware varies by seller", "Long cords can create entanglement risk"],
    avoidIf: ["Child mouths hardware", "You need a washable toy"],
    alternatives: ["Reusable sticker book", "Crinkle cloth book for younger babies"],
    redditQuerySeeds: [
      "busy board toddler travel reddit",
      "airplane toys toddler reddit busy board",
      "busy board small parts reddit"
    ],
    seoKeywords: ["best travel busy board", "quiet airplane toys toddler", "restaurant toys toddler"],
    recallSearchUrl: "https://www.cpsc.gov/Recalls?search=busy%20board",
    lastReviewed: "2026-07-08"
  }
};

export const toyItems: EnrichedToyItem[] = baseToyItems.map((toy) => ({
  ...toy,
  ...enrichmentById[toy.id]
}));
