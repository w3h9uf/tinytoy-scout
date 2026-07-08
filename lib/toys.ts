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

export const toyItems: ToyItem[] = [
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
