// data/MockData.js

const HomestayData = [
  {
    id: 1,
    name: 'PHÒNG CƠ BẢN',
    host: {
      name: 'Nguyễn Văn A',
      phone: '0909123456',
      email: 'host@example.com',
      rating: 4.8
    },

    location:{
      address: '123 Wall Street, Đà Lạt, Lâm Đồng',
      district: 'District 3',
      city: 'Đà Lạt',
      province: 'Lâm Đồng',
    },

    averageRating: 4.0,
    reviewCount: 10,
    reviews: [
      {
        userId: 1,
        name: 'Minh Anh',
        rating: 4.5,
        comment: 'Phòng sạch, view đẹp!',
        date: '2025-03-15'
      }
    ],
 
    pricePerNight: 129000,
    originalPricePerNight: 180000,
    discountPercentage: 28,

    image: '...',
    imageList: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    ],
    videoTourUrl: 'https://youtu.be/fh4cWB8tO7g',

    description: 'bla bla bla',
    features: ['Giường đôi', 'Cửa sổ', 'Tivi', 'Điều hòa', 'Gương to'],
    amenities: {
      wifi: true,
      airConditioner: true,
      kitchen:true,
      privateBathroom:true, 
      pool: false,
      petAllowed: false,
      parking: true,
      balcony: true,
      bbqArea: true,
      roomService: false,
      securityCamera: true, 
    },
    roomType: 'Phòng đôi',
    roomCount: 4,
    maxGuests: 2,
    bedCount: 1,
    bathroomCount: 1,

    policies: {
      isRefundable: true,
      allowPet: false,
      allowSmoking: false
    },
    
    checkIn: '2025-03-20T14:00:00+07:00',
    checkOut: '2025-03-20T17:00:00+07:00',

    isFlashSale: true,
    isAvailable: true,
    isInstantBook: true,
    isRecommended: true,

    availableDates: ['2025-03-20', '2025-03-21'],

  },

  {
    id: 2,
    name: 'PHÒNG VIEW HỒ',
    host: {
      name: 'Trần Thị B',
      phone: '0912345678',
      email: 'tranb@example.com',
      rating: 4.6
    },

    location:{
      address: '123 Wall Street, Đà Lạt, Lâm Đồng',
      district: 'District 3',
      city: 'Đà Lạt',
      province: 'Lâm Đồng',
    },

    averageRating: 4.7,
    reviewCount: 25,
    reviews: [
      {
        userId: 2,
        name: 'Hoàng Nam',
        rating: 5.0,
        comment: 'Phòng đẹp, sát hồ Xuân Hương, rất chill!',
        date: '2025-03-10'
      }
    ],

    pricePerNight: 219000,
    originalPricePerNight: 290000,
    discountPercentage: 25,

    image: 'https://example.com/images/room2_main.jpg',
    imageList: [
      'https://example.com/images/room2_1.jpg',
      'https://example.com/images/room2_2.jpg',
      'https://example.com/images/room2_3.jpg'
    ],
    videoTourUrl: 'https://youtube.com/watch?v=abc123xyz',

    description: 'Phòng có ban công hướng hồ, thoáng mát, phù hợp nghỉ dưỡng cặp đôi.',
    features: ['Ban công', 'Giường lớn', 'Máy lạnh', 'TV màn hình phẳng', 'View hồ'],
    amenities: {
      wifi: true,
      airConditioner: true,
      kitchen: false,
      privateBathroom: true,
      pool: false,
      petAllowed: false,
      parking: true,
      balcony: true,
      bbqArea: false,
      roomService: true,
      securityCamera: true
    },
    roomType: 'Phòng đôi',
    roomCount: 6,
    maxGuests: 2,
    bedCount: 1,
    bathroomCount: 1,

    policies: {
      isRefundable: false,
      allowPet: false,
      allowSmoking: false
    },

    checkIn: '2025-03-20T15:00:00+07:00',
    checkOut: '2025-03-21T11:00:00+07:00',

    isFlashSale: false,
    isAvailable: true,
    isInstantBook: true,
    isRecommended: true,
    availableDates: ['2025-03-20', '2025-03-21', '2025-03-22']
  }
  ,
  {
    id: 3,
    name: 'PHÒNG GIA ĐÌNH 3 GIƯỜNG',
    host: {
      name: 'Lê Văn C',
      phone: '0988112233',
      email: 'levanc@example.com',
      rating: 4.9
    },

      location:{
        address: '123 Wall Street, Đà Lạt, Lâm Đồng',
        district: 'District 3',
        city: 'Đà Lạt',
        province: 'Lâm Đồng',
      },

    averageRating: 4.3,
    reviewCount: 18,
    reviews: [
      {
        userId: 3,
        name: 'Ngọc Hân',
        rating: 4.0,
        comment: 'Phòng rộng, phù hợp đi nhóm bạn, khu vực yên tĩnh.',
        date: '2025-04-01'
      }
    ],

    pricePerNight: 349000,
    originalPricePerNight: 430000,
    discountPercentage: 19,

    image: 'https://example.com/images/room3_main.jpg',
    imageList: [
      'https://example.com/images/room3_1.jpg',
      'https://example.com/images/room3_2.jpg',
      'https://example.com/images/room3_3.jpg'
    ],
    videoTourUrl: 'https://youtube.com/watch?v=xyz789abc',

    description: 'Phòng gia đình rộng rãi, có 3 giường đơn, phù hợp nhóm 4-5 người.',
    features: ['3 Giường đơn', 'Phòng tắm riêng', 'Có bếp nấu', 'Ban công', 'View đồi thông'],
    amenities: {
      wifi: true,
      airConditioner: true,
      kitchen: true,
      privateBathroom: true,
      pool: false,
      petAllowed: false,
      parking: true,
      balcony: true,
      bbqArea: true,
      roomService: false,
      securityCamera: true
    },
    roomType: 'Phòng gia đình',
    roomCount: 4,
    maxGuests: 5,
    bedCount: 3,
    bathroomCount: 1,

    policies: {
      isRefundable: true,
      allowPet: false,
      allowSmoking: true
    },

    checkIn: '2025-03-20T13:30:00+07:00',
    checkOut: '2025-03-21T12:00:00+07:00',

    isFlashSale: true,
    isAvailable: true,
    isInstantBook: false,
    isRecommended: true,
    availableDates: ['2025-03-20', '2025-03-21', '2025-03-22', '2025-03-23']
  },

  {
    id: 4,
    name: 'CĂN HỘ STUDIO ẤM CÚNG',
    host: {
      name: 'Phạm Thị Dung',
      phone: '0966778899',
      email: 'dungpham@example.com',
      rating: 4.5
    },

      location:{
        address: '123 Wall Street, Đà Lạt, Lâm Đồng',
        district: 'District 3',
        city: 'Đà Lạt',
        province: 'Lâm Đồng',
      },

    averageRating: 4.6,
    reviewCount: 32,
    reviews: [
      {
        userId: 4,
        name: 'Thanh Tùng',
        rating: 4.8,
        comment: 'Không gian ấm cúng, chủ nhà thân thiện.',
        date: '2025-03-05'
      }
    ],

    pricePerNight: 185000,
    originalPricePerNight: 240000,
    discountPercentage: 23,

    image: 'https://example.com/images/room4_main.jpg',
    imageList: [
      'https://example.com/images/room4_1.jpg',
      'https://example.com/images/room4_2.jpg',
      'https://example.com/images/room4_3.jpg'
    ],
    videoTourUrl: 'https://youtube.com/watch?v=studio-tour123',

    description: 'Studio đầy đủ tiện nghi, gần chợ đêm, yên tĩnh và sạch sẽ.',
    features: ['Bếp nhỏ', 'Giường đôi', 'Cửa sổ lớn', 'Wifi tốc độ cao', 'Máy sưởi'],
    amenities: {
      wifi: true,
      airConditioner: true,
      kitchen: true,
      privateBathroom: true,
      pool: false,
      petAllowed: false,
      parking: false,
      balcony: false,
      bbqArea: false,
      roomService: false,
      securityCamera: true
    },
    roomType: 'Studio',
    roomCount: 5,
    maxGuests: 2,
    bedCount: 1,
    bathroomCount: 1,

    policies: {
      isRefundable: true,
      allowPet: false,
      allowSmoking: false
    },

    checkIn: '2025-03-20T14:00:00+07:00',
    checkOut: '2025-03-21T11:00:00+07:00',

    isFlashSale: false,
    isAvailable: true,
    isInstantBook: true,
    isRecommended: false,
    availableDates: ['2025-03-20', '2025-03-21', '2025-03-22']
  }
  ,

  {
    id: 5,
    name: 'VILLA MINI GẦN RỪNG THÔNG',
    host: {
      name: 'Đỗ Minh Tuấn',
      phone: '0977333444',
      email: 'tuanvilla@example.com',
      rating: 4.9
    },

      location:{
        address: '123 Wall Street, Đà Lạt, Lâm Đồng',
        district: 'District 3',
        city: 'Đà Lạt',
        province: 'Lâm Đồng',
      },

    averageRating: 4.8,
    reviewCount: 40,
    reviews: [
      {
        userId: 5,
        name: 'Phương Nghi',
        rating: 5.0,
        comment: 'Villa đẹp, sân vườn rộng, tổ chức BBQ cực đã!',
        date: '2025-03-08'
      }
    ],

    pricePerNight: 529000,
    originalPricePerNight: 620000,
    discountPercentage: 15,

    image: 'https://example.com/images/room5_main.jpg',
    imageList: [
      'https://example.com/images/room5_1.jpg',
      'https://example.com/images/room5_2.jpg',
      'https://example.com/images/room5_3.jpg'
    ],
    videoTourUrl: 'https://youtube.com/watch?v=villaview456',

    description: 'Villa mini riêng biệt, có sân vườn, gần đồi thông, thích hợp cho nhóm bạn hoặc gia đình nhỏ.',
    features: ['2 phòng ngủ', 'Bếp rộng', 'Ban công', 'BBQ ngoài trời', 'Ghế lười'],
    amenities: {
      wifi: true,
      airConditioner: true,
      kitchen: true,
      privateBathroom: true,
      pool: false,
      petAllowed: false,
      parking: true,
      balcony: true,
      bbqArea: true,
      roomService: true,
      securityCamera: true
    },
    roomType: 'Villa mini',
    roomCount: 8,
    maxGuests: 6,
    bedCount: 3,
    bathroomCount: 2,

    policies: {
      isRefundable: false,
      allowPet: false,
      allowSmoking: true
    },

    checkIn: '2025-03-20T13:00:00+07:00',
    checkOut: '2025-03-21T12:30:00+07:00',

    isFlashSale: true,
    isAvailable: true,
    isInstantBook: true,
    isRecommended: false,
    availableDates: ['2025-03-20', '2025-03-21', '2025-03-22', '2025-03-23']
  }

];

const newHomestays = [...HomestayData];
const recommendedHomestays = [...HomestayData];

const HostData = [
{
  id: 1,
  name: 'Nguyễn Văn A',
  phone: '0909123456',
  email: 'host@example.com',
  avatar: 'https://example.com/avatars/host1.jpg',

  location: {
    address: '123 Wall Street, Đà Lạt, Lâm Đồng',
    district: 'District 3',
    city: 'Đà Lạt',
    province: 'Lâm Đồng'
  },

  averageHomestayRating: 4.8,
  homeStay: [1, 2],
  totalRooms: 2,

  joinedDate: '2022-06-15',
  isSuperHost: true,
  status: 'active',

  bio: 'Tôi yêu du lịch và luôn muốn mang lại trải nghiệm tốt nhất cho du khách đến Đà Lạt.',

  socialLinks: {
    facebook: 'https://facebook.com/nguyenvana',
    instagram: 'https://instagram.com/nguyenvana'
  }
},

  {
    id: 2,
    name: 'Trần Thị Bích Ngọc',
    phone: '0912345678',
    email: 'bichngoc.host@example.com',
    avatar: 'https://example.com/avatars/host2.jpg',

    location: {
      address: '456 Lê Lợi, Hội An, Quảng Nam',
      district: 'Minh An',
      city: 'Hội An',
      province: 'Quảng Nam'
    },

    averageHomestayRating: 4.5,
    homeStay: [3, 4],
    totalRooms: 2,

    joinedDate: '2021-11-02',
    isSuperHost: false,
    status: 'active',

    bio: 'Chào bạn, tôi là Ngọc - người yêu nét cổ kính của Hội An và luôn sẵn sàng đón tiếp du khách như người thân trong nhà.',

    socialLinks: {
      facebook: 'https://facebook.com/bichngoc.host',
      instagram: 'https://instagram.com/bichngoc_travel'
    }
  }
,
  {
    id: 3,
    name: 'Lê Quốc Dũng',
    phone: '0988888888',
    email: 'quocdung.host@example.com',
    avatar: 'https://example.com/avatars/host3.jpg',

    location: {
      address: '789 Trần Phú, Phú Quốc, Kiên Giang',
      district: 'Dương Đông',
      city: 'Phú Quốc',
      province: 'Kiên Giang'
    },

    averageHomestayRating: 4.9,
    homeStay: [5],
    totalRooms: 1,

    joinedDate: '2023-03-10',
    isSuperHost: true,
    status: 'active',

    bio: 'Tôi mở homestay tại Phú Quốc để mang đến trải nghiệm biển đảo tuyệt vời nhất cho du khách bốn phương.',

    socialLinks: {
      facebook: 'https://facebook.com/lequocdung.pq',
      instagram: 'https://instagram.com/dungphuquoc'
    }
  }


];


const UserData = [
  {
    id: 1,
    name: 'Minh Anh',
    email: 'minhanh.user@example.com',
    phone: '0911222333',
    avatar: 'https://example.com/avatars/user1.jpg',

    gender: 'female',
    birthDate: '1996-04-15',

    address: {
      street: '12 Nguyễn Huệ',
      district: 'Quận 1',
      city: 'TP.HCM',
      province: 'TP.HCM'
    },

    joinedDate: '2022-05-10',
    currentBooking:2,
    totalBookingSuccess: 8, 

    favoriteHomestays: [1, 3],
    reviewCount: 5,

    isVerified: true,
    status: 'active'
  }
  ,
  {
    id: 2,
    name: 'Phạm Quang Huy',
    email: 'quanghuy.user@example.com',
    phone: '0987123456',
    avatar: 'https://example.com/avatars/user2.jpg',

    gender: 'male',
    birthDate: '1990-11-22',

    address: {
      street: '234 Lê Duẩn',
      district: 'Hải Châu',
      city: 'Đà Nẵng',
      province: 'Đà Nẵng'
    },

    joinedDate: '2023-01-05',
    currentBooking: 1,
    totalBookingSuccess: 3,

    favoriteHomestays: [2, 5],
    reviewCount: 2,

    isVerified: true,
    status: 'active'
  }
  ,
  {
    id: 3,
    name: 'Lê Thị Mai',
    email: 'maile.user@example.com',
    phone: '0909000111',
    avatar: 'https://example.com/avatars/user3.jpg',

    gender: 'female',
    birthDate: '1988-07-02',

    address: {
      street: '67 Hùng Vương',
      district: 'Liên Chiểu',
      city: 'Đà Nẵng',
      province: 'Đà Nẵng'
    },

    joinedDate: '2021-09-18',
    currentBooking: 0,
    totalBookingSuccess: 12,

    favoriteHomestays: [1, 4],
    reviewCount: 7,

    isVerified: false,
    status: 'inactive'
  }
];




export { HomestayData, newHomestays, recommendedHomestays, HostData, UserData };
