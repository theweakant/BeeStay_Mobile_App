// data/MockData.js

const flashSaleItems = [
  {
    id: 1,
    name: 'Quy Duong Rose',
    location: 'Vũng Tàu',
    rating: 2.5,
    price: '120.000đ',
    originalPrice: '180.000đ',
    image:
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80 ',
  },
  {
    id: 2,
    name: 'Quoc Bao Love',
    location: 'TP.HCM',
    rating: 3.5,
    price: '80.000đ',
    originalPrice: '150.000đ',
    image:
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80 ',
  },
  {
    id: 3,
    name: 'The 5',
    location: 'Hà Nội',
    rating: 4.5,
    price: '130.000đ',
    originalPrice: '200.000đ',
    image:
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80 ',
  },
];

const newHomestays = [...flashSaleItems];
const recommendedHomestays = [...flashSaleItems];

export { flashSaleItems, newHomestays, recommendedHomestays };