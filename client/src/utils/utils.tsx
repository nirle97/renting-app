export const advancedFilterObj = {
  rentalType: "",
  entryDate: new Date().toLocaleDateString(),
  checkOutDate: new Date().toLocaleDateString(),
  parking: false,
  porch: false,
  garden: false,
  furnished: false,
  elevator: false,
  handicapAccessible: false,
  petsAllowed: false,
  smokeAllowed: false,
};

export const clientFiltersObj = {
  address: "",
  priceMin: 0,
  priceMax: 0,
  sizeMin: 0,
  sizeMax: 0,
  roomsMin: 0,
  roomsMax: 0,
  ...advancedFilterObj,
};
export const ownerFiltersObj = {
  address: "",
  imagesUrl: [],
  cords: {
    lat: 0,
    lng: 0,
  },
  pricePerMonth: 0,
  images: [],
  size: 0,
  floor: 0,
  rooms: 0,
  ...advancedFilterObj,
};
