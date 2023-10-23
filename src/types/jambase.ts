export type JamBaseApiResponse = {
    success: boolean;
    pagination: JamBasePagination;
    artists: JamBaseArtist[];
    request: JamBaseRequest;
  };
  
  type JamBasePagination = {
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    nextPage: string;
    previousPage: string;
  };
  
  export type JamBaseArtist = {
    name: string;
    identifier: string;
    url: string;
    image: string;
    sameAs: JamBaseURLType[];
    datePublished: string;
    dateModified: string;
    "@type": string;
    member: JamBaseMusicGroup[];
    memberOf: JamBaseMusicGroup[];
    foundingLocation: JamBasePlace;
    foundingDate: string;
    genre: string[];
    events: JamBaseEvent[];
    'x-bandOrMusician': string;
    'x-numUpcomingEvents': number;
    'x-externalIdentifiers': JamBaseExternalIdentifier[];
  };
  
  type JamBaseURLType = {
    '@type': string;
    identifier: string;
    url: string;
  };
  
  type JamBaseMusicGroup = {
    type?: string;
    name: string;
    identifier: string;
    image: string;
    url: string;
  };
  
  type JamBasePlace = {
    '@type': string;
    name: string;
  };
  
  type JamBaseEvent = {
    name: string;
    identifier: string;
    url: string;
    image: string;
    sameAs: JamBaseURLType[];
    datePublished: string;
    dateModified: string;
    eventStatus: string;
    startDate: string;
    endDate: string;
    previousStartDate: string;
    doorTime: string;
    location: JamBaseLocation;
    offers: JamBaseOffer[];
    performer: JamBasePerformer[];
    eventAttendanceMode: string;
    isAccessibleForFree: boolean;
    'x-promoImage': string;
    type: string;
    'x-externalIdentifiers': JamBaseExternalIdentifier[];
    'x-customTitle': string;
    'x-subtitle': string;
    'x-headlinerInSupport': boolean;
    'x-streamIds': string[];
  };
  
  type JamBaseLocation = {
    name: string;
    identifier: string;
    url: string;
    image: string;
    sameAs: JamBaseURLType[];
    datePublished: string;
    dateModified: string;
    maximumAttendeeCapacity: number;
    address: JamBaseAddress;
    geo: JamBaseGeoCoordinates;
    events: JamBaseEvent[];
    'x-isPermanentlyClosed': boolean;
    'x-numUpcomingEvents': number;
    'x-externalIdentifiers': JamBaseExternalIdentifier[];
  };
  
  type JamBaseOffer = {
    name: string;
    identifier: string;
    url: string;
    image: string;
    sameAs: JamBaseURLType[];
    datePublished: string;
    dateModified: string;
    category: string;
    priceSpecification: JamBasePriceSpecification;
    seller: JamBaseSeller;
    validFrom: string;
  };
  
  type JamBaseAddress = {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressRegion: JamBaseAddressRegion;
    addressCountry: JamBaseAddressCountry;
    'x-streetAddress2'?: string;
    'x-timezone': string;
    'x-jamBaseMetroId': number;
    'x-jamBaseCityId': number;
  };
  
  type JamBaseAddressRegion = {
    '@type': string;
    identifier: string;
    name: string;
    alternateName: string;
    country: JamBaseCountry;
    'x-numUpcomingEvents': number;
  };
  
  type JamBaseAddressCountry = {
    '@type': string;
    identifier: string;
    name: string;
    alternateName: string;
    'x-numUpcomingEvents': number;
  };
  
  type JamBaseCountry = {
    '@type': string;
    identifier: string;
    name: string;
    alternateName: string;
    'x-numUpcomingEvents': number;
  };
  
  type JamBaseGeoCoordinates = {
    '@type': string;
    latitude: number;
    longitude: number;
  };
  
  type JamBasePriceSpecification = {
    '@type': string;
    minPrice: number;
    maxPrice: number;
    price: number;
    priceCurrency: string;
  };
  
  type JamBaseSeller = {
    '@type': string;
    identifier: string;
    disambiguatingDescription: string;
    name: string;
    url: string;
    image: string;
    sameAs: JamBaseURLType[];
    datePublished: string;
    dateModified: string;
  };
  
  type JamBasePerformer = {
    name: string;
    identifier: string;
    url: string;
    image: string;
    sameAs: JamBaseURLType[];
    datePublished: string;
    dateModified: string;
    '@type': string;
    member: JamBaseMusicGroup[];
    memberOf: JamBaseMusicGroup[];
    foundingLocation: JamBasePlace;
    foundingDate: string;
    genre: string[];
    events: JamBaseEvent[];
    'x-bandOrMusician': string;
    'x-numUpcomingEvents': number;
    'x-externalIdentifiers': JamBaseExternalIdentifier[];
    'x-performanceDate': string;
    'x-performanceRank': number;
    'x-isHeadliner': boolean;
    'x-dateIsConfirmed': boolean;
  };
  
  type JamBaseExternalIdentifier = {
    source: string;
    identifier: string;
  };
  
  type JamBaseRequest = {
    endpoint: string;
    method: string;
    params: any[];
    ip: string;
    userAgent: string;
  };
  