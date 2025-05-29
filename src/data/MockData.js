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
      address: '64 Trần Khắc Chân',
      district: 'Quận 1',
      city: 'Thành phố Hồ Chí Minh',
      province: 'HCM',
    },
    distanceToCenter: 3.5,

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
 
    priceOnSalePerNight: 129000,
    priceOriginalPerNight: 180000,
    discountPercentage: 28,

    imageURL: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/156437220.jpg?k=b93d940681e19c59e897b18dcc472126e020dc11e5ddbab1db3d06040eb0d8f2&o=&hp=1',
    imageList: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    ],
    videoTourUrl: 'https://youtu.be/fh4cWB8tO7g',

    description: 'ui a ui a',
    features: ['Giường đôi', 'Cửa sổ', 'Tivi', 'Điều hòa', 'Gương to'],
    amenities: {
      wifi: true,
      airConditioner: true,
      kitchen:true,
      privateBathroom:true, 
      pool: true,
      petAllowed: true,
      parking: false,
      balcony: false,
      bbqArea: false,
      roomService: false,
      securityCamera: false, 
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

    isOnSale: true,
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
    distanceToCenter: 3.5,

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

    priceOnSalePerNight: 219000,
    priceOriginalPerNight: 290000,
    discountPercentage: 25,

    imageURL: 'https://khonhamaudep.com/wp-content/uploads/2024/11/mau-nha-homestay-dep-22.jpg',
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

    isOnSale: false,
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
      distanceToCenter: 3.5,

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

    priceOnSalePerNight: 349000,
    priceOriginalPerNight: 430000,
    discountPercentage: 19,

    imageURL: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/156437220.jpg?k=b93d940681e19c59e897b18dcc472126e020dc11e5ddbab1db3d06040eb0d8f2&o=&hp=1',
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

    isOnSale: true,
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
      distanceToCenter: 3.5,

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

    priceOnSalePerNight: 185000,
    priceOriginalPerNight: 240000,
    discountPercentage: 23,

    imageURL: 'https://khonhamaudep.com/wp-content/uploads/2024/11/mau-nha-homestay-dep-22.jpg',
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

    isOnSale: false,
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
      distanceToCenter: 3.5,

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

    priceOnSalePerNight: 529000,
    priceOriginalPerNight: 620000,
    discountPercentage: 15,

    imageURL: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/156437220.jpg?k=b93d940681e19c59e897b18dcc472126e020dc11e5ddbab1db3d06040eb0d8f2&o=&hp=1',
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

    isOnSale: true,
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
    name: 'My Anh',
    email: 'myanh.user@example.com',
    phone: '0911222333',
    avatar: 'https://media.viez.vn/prod/2023/4/24/large_image_162e62d7c1.png',

    gender: 'female',
    birthDate: '2000-04-02',

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

const BannerData = [
  {
    id: 1,
    imageUrl: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/flash-sale-banner-design-template-9349bfc8031a263ff98d40c75a97378a_screen.jpg?ts=1714269671",
    title: "Flash Sale",
    link: "/sale"
  },
  {
    id: 2,
    imageUrl: "https://www.shutterstock.com/image-vector/background-unusual-modern-material-design-600nw-284162744.jpg",
    title: "Material Design",
    link: "/design"
  },
  {
    id: 3,
    imageUrl: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/big-sale-fashion-poster-design-template-5638480f92d0eda649c3a3a511bc38ff_screen.jpg?ts=1720866669",
    title: "Big Fashion Sale",
    link: "/fashion"
  }
];


const PolicyData = [
  {
    policyHeader: 'Check-in và trả phòng',
    policyContent: [
      'Nhận phòng từ 14:00, trả phòng trước 12:00',
      'Quý khách vui lòng xuất trình CMND/CCCD/Passport khi nhận phòng',
    ],
  },
  {
    policyHeader: 'Chính sách hủy phòng',
    policyContent: [
      'Hủy miễn phí trước 3 ngày so với ngày nhận phòng',
      'Hủy trong vòng 3 ngày sẽ bị tính phí 50% tổng tiền phòng',
      'Không đến nhận phòng sẽ bị tính phí 100% tổng tiền phòng',
    ],
  },
  {
    policyHeader: 'Chính sách trẻ em và giường phụ',
    policyContent: [
      'Trẻ em dưới 6 tuổi được miễn phí khi sử dụng giường có sẵn',
      'Trẻ em từ 6 tuổi trở lên tính như người lớn và có thể bị tính phụ phí',
      'Giường phụ có thể được cung cấp theo yêu cầu với phụ phí',
    ],
  },
];


  const QAItems = [
    {
      id: 1,
      title: 'Làm thế nào để đặt homestay?',
      description: 'Hướng dẫn chi tiết cách đặt phòng homestay',
      icon: 'home-outline',
      iconFamily: 'Ionicons',
      category: 'Đặt phòng',
      answer: 'Bạn có thể đặt homestay bằng cách: 1. Tìm kiếm homestay phù hợp, 2. Chọn ngày check-in/check-out, 3. Xác nhận thông tin và thanh toán.'
    },
    {
      id: 2,
      title: 'Chính sách hủy đặt phòng',
      description: 'Thông tin về việc hủy và hoàn tiền',
      icon: 'cancel',
      iconFamily: 'MaterialIcons',
      category: 'Chính sách',
      answer: 'Chính sách hủy phòng tùy thuộc vào từng homestay. Thông thường bạn có thể hủy miễn phí trước 24-48h.'
    },
    {
      id: 3,
      title: 'Thanh toán như thế nào?',
      description: 'Các phương thức thanh toán được hỗ trợ',
      icon: 'creditcard',
      iconFamily: 'AntDesign',
      category: 'Thanh toán',
      answer: 'Chúng tôi hỗ trợ thanh toán qua thẻ tín dụng, chuyển khoản ngân hàng, ví điện tử và thanh toán tại chỗ.'
    },
    {
      id: 4,
      title: 'Xác thực tài khoản',
      description: 'Cách xác thực và bảo mật tài khoản',
      icon: 'shield-checkmark-outline',
      iconFamily: 'Ionicons',
      category: 'Bảo mật',
      answer: 'Để xác thực tài khoản, bạn cần cung cấp số điện thoại và email. Chúng tôi sẽ gửi mã OTP để xác nhận.'
    },
    {
      id: 5,
      title: 'Liên hệ hỗ trợ',
      description: 'Cách liên hệ khi cần hỗ trợ',
      icon: 'headset',
      iconFamily: 'MaterialIcons',
      category: 'Hỗ trợ',
      answer: 'Bạn có thể liên hệ qua hotline 1900-xxxx, email support@homestay.vn hoặc chat trực tiếp trong app.'
    },
    {
      id: 6,
      title: 'Đánh giá homestay',
      description: 'Cách đánh giá và nhận xét homestay',
      icon: 'star-outline',
      iconFamily: 'Ionicons',
      category: 'Đánh giá',
      answer: 'Sau khi check-out, bạn có thể đánh giá homestay từ 1-5 sao và viết nhận xét để chia sẻ trải nghiệm.'
    }
  ];


    const PolicyScreenData = [
    {
      id: 1,
      title: 'Chính sách hủy đặt phòng',
      icon: 'cancel',
      iconFamily: 'MaterialIcons',
      summary: 'Quy định về việc hủy phòng và hoàn tiền',
      content: [
        'Khách có thể hủy phòng miễn phí trước 24 giờ check-in',
        'Hủy phòng muộn có thể bị tính phí một phần',
        'Hoàn tiền sẽ được xử lý trong 3-5 ngày làm việc',
        'Trường hợp bất khả kháng sẽ được xem xét đặc biệt'
      ]
    },
    {
      id: 2,
      title: 'Thời gian nhận/trả phòng',
      icon: 'time-outline',
      iconFamily: 'Ionicons',
      summary: 'Quy định về giờ check-in và check-out',
      content: [
        'Giờ nhận phòng tiêu chuẩn: 14:00',
        'Giờ trả phòng tiêu chuẩn: 12:00',
        'Nhận phòng sớm hoặc trả phòng muộn có thể phát sinh phí',
        'Vui lòng liên hệ chủ nhà để thỏa thuận thời gian phù hợp'
      ]
    },
    {
      id: 3,
      title: 'Nội quy homestay',
      icon: 'home-outline',
      iconFamily: 'Ionicons',
      summary: 'Các quy định cần tuân thủ khi lưu trú',
      content: [
        'Không hút thuốc trong nhà',
        'Không tổ chức tiệc tùng mà không có sự đồng ý của chủ nhà',
        'Chỉ cho phép thú cưng tại những homestay được phép',
        'Giữ gìn vệ sinh và trật tự chung',
        'Tôn trọng hàng xóm và không gây ồn ào'
      ]
    },
    {
      id: 4,
      title: 'Trách nhiệm của khách',
      icon: 'person-outline',
      iconFamily: 'Ionicons',
      summary: 'Những điều khách cần tuân thủ',
      content: [
        'Bảo quản tài sản homestay cẩn thận',
        'Báo cáo ngay khi có hư hỏng xảy ra',
        'Tuân thủ đầy đủ nội quy của homestay',
        'Thanh toán đầy đủ các khoản phí phát sinh',
        'Cung cấp thông tin chính xác khi đặt phòng'
      ]
    },
    {
      id: 5,
      title: 'Trách nhiệm của chủ nhà',
      icon: 'shield-checkmark-outline',
      iconFamily: 'Ionicons',
      summary: 'Cam kết của chủ nhà với khách',
      content: [
        'Đảm bảo homestay sạch sẽ và an toàn',
        'Cung cấp thông tin chính xác về homestay',
        'Hỗ trợ khách trong suốt thời gian lưu trú',
        'Bảo mật thông tin cá nhân của khách',
        'Xử lý khiếu nại một cách nhanh chóng và công bằng'
      ]
    },
    {
      id: 6,
      title: 'Chính sách thanh toán',
      icon: 'card-outline',
      iconFamily: 'Ionicons',
      summary: 'Quy định về thanh toán và phí dịch vụ',
      content: [
        'Thanh toán qua thẻ tín dụng, chuyển khoản hoặc ví điện tử',
        'Phí dịch vụ được tính theo quy định của platform',
        'Không hoàn tiền trong trường hợp vi phạm nội quy',
        'Phí phát sinh sẽ được thông báo trước khi tính'
      ]
    }
  ];

export {
  HomestayData, newHomestays, recommendedHomestays, HostData, UserData, BannerData, PolicyData, 
  QAItems, PolicyScreenData 
};
