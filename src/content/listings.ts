export type Listing = {
  slug: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  status: "Active" | "Sold";
  price: number;
  beds: number | null;
  baths: number | null;
  sqft: number | null;
  lotSize: string;
  yearBuilt: number | null;
  propertyType: string;
  mlsNumber: string;
  description: string;
  features: string[];
  photoCount: number;
  sourceUrl: string;
};

function photos(slug: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => {
    const num = String(i + 1).padStart(2, "0");
    return `/listings/${slug}/${num}.jpg`;
  });
}

export const activeListings: Listing[] = [
  {
    slug: "2235-wilcox-oroville-ca",
    address: "2235 Wilcox",
    city: "Oroville",
    state: "CA",
    zip: "95966",
    status: "Active",
    price: 274000,
    beds: 4,
    baths: 2,
    sqft: 1674,
    lotSize: "4,792 sq ft",
    yearBuilt: 1910,
    propertyType: "Multi Family / Single Family (Duplex)",
    mlsNumber: "OR26149967",
    description:
      "Discover this charming and versatile property featuring two separate residences on one lot—an exceptional opportunity for homeowners and investors alike! The front home offers 3 bedrooms and 1 bathroom, while the second dwelling features 1 bedroom and 1 bathroom, providing endless possibilities for multi-generational living, rental income, or a private guest residence. Conveniently located in the heart of Oroville, California, this property is just minutes from shopping, dining, parks, and outdoor recreation, including beautiful Lake Oroville. Commuters will appreciate the easy access to Highways 70 and 99, making travel throughout the region simple and convenient. Whether you're looking for a smart investment, your first home, or a property with income-producing potential, this unique offering checks all the boxes. Live in one home while renting the other to help offset your mortgage, or add this exceptional property to your investment portfolio. Don't miss this rare opportunity—schedule your private showing today and explore the possibilities this one-of-a-kind property has to offer!",
    features: [
      "Two separate residences on one lot",
      "Front home: 3 bed / 1 bath",
      "Second dwelling: 1 bed / 1 bath",
      "Minutes from Lake Oroville",
      "Easy access to Highways 70 and 99",
      "Public sewer, public water",
      "Evaporative cooling",
    ],
    photoCount: 14,
    sourceUrl:
      "https://www.norcalgoldhomes.com/prop-details/87700481/2235_Wilcox_Oroville_CA_95966",
  },
  {
    slug: "520-black-bart-oroville-ca",
    address: "520 Black Bart",
    city: "Oroville",
    state: "CA",
    zip: "95966",
    status: "Active",
    price: 149000,
    beds: 2,
    baths: 2,
    sqft: 800,
    lotSize: "2.88 acres",
    yearBuilt: 1979,
    propertyType: "Lots/Land / Mobile/Manufactured",
    mlsNumber: "OR26140719",
    description:
      "Discover the perfect blend of privacy and convenience with this charming home situated on nearly 3 acres, just minutes from town. Featuring 2 bedrooms, 2 bathrooms, and a spacious living room, this property offers plenty of room to relax and enjoy country living. With ample space for recreational vehicles, equipment, gardening, and more, the possibilities are endless. The terraced landscape and existing irrigation provide abundant sunlight, making it an ideal setting for growing gardens, orchards, or whatever your heart desires. Conveniently located near Lake Oroville, shopping, and a variety of outdoor recreational opportunities, this property is perfect as a full-time residence, private retreat, or vacation getaway. Don't miss this unique opportunity—call today to schedule your private showing!",
    features: [
      "Nearly 3 private acres",
      "Terraced landscape with existing irrigation",
      "Room for RVs, equipment, gardens or orchards",
      "Wood burning stove insert",
      "Deck",
      "Near Lake Oroville",
    ],
    photoCount: 15,
    sourceUrl:
      "https://www.norcalgoldhomes.com/prop-details/87189348/520_Black_Bart_Oroville_CA_95966",
  },
  {
    slug: "13-meadowview-oroville-ca",
    address: "13 Meadowview",
    city: "Oroville",
    state: "CA",
    zip: "95966",
    status: "Active",
    price: 324000,
    beds: 3,
    baths: 1,
    sqft: 1012,
    lotSize: "9,583 sq ft",
    yearBuilt: 1964,
    propertyType: "Single Family",
    mlsNumber: "OR26129634",
    description:
      "Take a look at this beautifully updated three-bedroom home located in the highly desirable Oroville East Foothills. Nearly every aspect of this home has been renovated, including new electrical, plumbing, flooring, windows, doors, roof, bathroom, cabinetry, and a complete new HVAC system with air conditioning and heating. Ceiling fans have been installed in all bedrooms, and the kitchen features new appliances, including a dishwasher, stove, and microwave. You'll love the custom cabinetry, granite countertops, and stylish flooring throughout the home. Situated on a large corner lot, the property offers multiple access points and provides excellent flexibility for future use. There is also potential to add an ADU (Accessory Dwelling Unit), making this an outstanding opportunity for homeowners and investors alike. Conveniently located near shopping, hospitals, entertainment, and the many recreational activities available at Lake Oroville, this stunning home is move-in ready and waiting for its new owner. Schedule your private showing today and experience everything this exceptional property has to offer.",
    features: [
      "Fully renovated: electrical, plumbing, flooring, windows, roof, HVAC",
      "New appliances, granite countertops, custom cabinetry",
      "Large corner lot with ADU potential",
      "Turnkey / move-in ready",
      "Near Lake Oroville, shopping, hospitals",
    ],
    photoCount: 33,
    sourceUrl:
      "https://www.norcalgoldhomes.com/prop-details/85315520/13_Meadowview_Oroville_CA_95966",
  },
  {
    slug: "184-peak-view-oroville-ca",
    address: "184 Peak View",
    city: "Oroville",
    state: "CA",
    zip: "95966",
    status: "Active",
    price: 215000,
    beds: 2,
    baths: 2,
    sqft: 1440,
    lotSize: "3.66 acres",
    yearBuilt: 1974,
    propertyType: "Single Family (Manufactured House)",
    mlsNumber: "OR26037223",
    description:
      "Rare Opportunity – Fantastic Price for 3.66 Acres with Stunning Views! This is a rare chance to own 3.66 private acres at a truly fantastic price — opportunities like this don't come along often. With sweeping, unobstructed valley views and end-of-the-road privacy, this property delivers space, scenery, and serenity at a value that's hard to match. Enjoy breathtaking views from the shaded western patio, where cool summer breezes make it the perfect place to relax. Picture evenings under twinkling stars as city lights shimmer below — your own peaceful escape from the everyday. This charming 2-bedroom, 2-bath older manufactured home includes a spacious bonus room that could easily be converted into a third bedroom, office, or additional living area. Lemon trees welcome you at the front, adding warmth and character to the setting. The property also features two wells, a newer 2,500-gallon holding tank, and a newer roof for added value and peace of mind. Ultimate privacy. Incredible views. Exceptional price. Properties with this much potential at this price point are rare — don't miss your chance. Seller may consider owner finance. Bring all offers — this is a must-see opportunity.",
    features: [
      "3.66 private acres with sweeping valley views",
      "Bonus room — convertible to 3rd bedroom or office",
      "Two wells + newer 2,500-gallon holding tank",
      "Newer roof",
      "Seller may consider owner financing",
    ],
    photoCount: 13,
    sourceUrl:
      "https://www.norcalgoldhomes.com/prop-details/72359596/184_Peak_View_Oroville_CA_95966",
  },
];

export const soldListings = [
  { address: "391 Canyon Highlands", city: "Oroville, CA 95966", price: 455000, beds: 5, baths: 2, sqft: 2609 },
  { address: "94 Valley View Drive", city: "Oroville, CA 95966", price: 390000, beds: 3, baths: 2, sqft: 1400 },
  { address: "76 Orchardcrest Drive", city: "Oroville, CA 95965", price: 284000, beds: 3, baths: 2, sqft: 1694 },
  { address: "2145 Hewitt Avenue", city: "Oroville, CA 95966", price: 225000, beds: 3, baths: 2, sqft: 1800 },
  { address: "2311 A", city: "Oroville, CA 95966", price: 165000, beds: 2, baths: 1, sqft: 936 },
  { address: "0 Olive Hwy", city: "Oroville, CA 95966", price: 81000, beds: null, baths: null, sqft: null },
];

export function getListingBySlug(slug: string): Listing | undefined {
  return activeListings.find((l) => l.slug === slug);
}

export function listingPhotos(listing: Listing): string[] {
  return photos(listing.slug, listing.photoCount);
}
