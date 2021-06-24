const booleanFillterObj = {
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
  rentalType: "",
  entryDate: new Date(),
  checkOutDate: new Date(),
  sizeMin: 0,
  sizeMax: 0,
  roomsMin: 0,
  roomsMax: 0,
  ...booleanFillterObj,
};

export const ownerFiltersObj = {
  address: "",
  pricePerMonth: 0,
  images: [],
  rentalType: "",
  entryDate: new Date(),
  checkOutDate: new Date(),
  size: 0,
  floor: 0,
  rooms: 0,
  ...booleanFillterObj,
};
