// src/propertyData.js
const PROPERTY_DATA = [
    {
      id: 1,
      title: 'Modern Apartment in City Center',
      location: 'London, UK',
      price: 1200,
      bedrooms: 2,
      bathrooms: 1,
      area: 850,
      imageUrl: '/api/placeholder/400/200',
      isAvailable: true,
      images: [
        'https://www.johncullenlighting.com/wp-content/uploads/2023/09/DSC_5913-copy.jpg',
        'https://www.johncullenlighting.com/wp-content/uploads/2023/09/DSC_5913-copy.jpg',
        'https://www.johncullenlighting.com/wp-content/uploads/2023/09/DSC_5913-copy.jpg'
      ],
      description: 'A beautiful modern apartment located in the heart of the city. This apartment offers stunning views, modern amenities, and easy access to public transportation.',
      amenities: [
        'High-speed internet',
        'Air conditioning',
        'Washer/dryer',
        'Dishwasher',
        'Gym access',
        'Parking space'
      ],
      availableDates: {
        start: '2023-10-01',
        end: '2024-09-30'
      },
      owner: {
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '+44 123 456 7890',
        responseRate: '98%',
        responseTime: 'Within 2 hours'
      },
      reviews: [
        {
          id: 101,
          userName: 'Sarah Johnson',
          rating: 5,
          date: '2023-07-15',
          comment: 'Absolutely loved my stay here! The apartment was clean, comfortable and in a perfect location.'
        },
        {
          id: 102,
          userName: 'Michael Brown',
          rating: 4,
          date: '2023-06-22',
          comment: 'Great apartment, very modern and well maintained. Only giving 4 stars because of some noise from the street.'
        }
      ]
    },
    {
      id: 2,
      title: 'Luxury Villa with Pool',
      location: 'Manchester, UK',
      price: 2500,
      bedrooms: 4,
      bathrooms: 3,
      area: 2200,
      imageUrl: '/api/placeholder/400/200',
      isAvailable: true,
      images: [
        'https://www.johncullenlighting.com/wp-content/uploads/2023/09/DSC_5913-copy.jpg',
        'https://www.johncullenlighting.com/wp-content/uploads/2023/09/DSC_5913-copy.jpg',
        'https://www.johncullenlighting.com/wp-content/uploads/2023/09/DSC_5913-copy.jpg'
      ],
      description: 'A luxurious villa with a private pool and spacious garden. Perfect for family gatherings or entertaining guests.',
      amenities: [
        'Private pool',
        'Garden',
        'High-speed internet',
        'Smart home system',
        'Home theater',
        'Double garage'
      ],
      availableDates: {
        start: '2023-09-15',
        end: '2024-09-14'
      },
      owner: {
        name: 'Emma Wilson',
        email: 'emma.wilson@example.com',
        phone: '+44 987 654 3210',
        responseRate: '95%',
        responseTime: 'Within 4 hours'
      },
      reviews: [
        {
          id: 201,
          userName: 'David Thompson',
          rating: 5,
          date: '2023-08-05',
          comment: 'Exceptional property with amazing amenities. Had a wonderful stay!'
        }
      ]
    },
    {
      id: 3,
      title: 'Cozy Studio Near University',
      location: 'Birmingham, UK',
      price: 750,
      bedrooms: 1,
      bathrooms: 1,
      area: 450,
      imageUrl: '/api/placeholder/400/200',
      isAvailable: false,
      images: [
        'https://www.johncullenlighting.com/wp-content/uploads/2023/09/DSC_5913-copy.jpg',
        'https://www.johncullenlighting.com/wp-content/uploads/2023/09/DSC_5913-copy.jpg',
        'https://www.johncullenlighting.com/wp-content/uploads/2023/09/DSC_5913-copy.jpg'
      ],
      description: 'A cozy studio apartment ideally located near the university campus. Perfect for students or young professionals.',
      amenities: [
        'High-speed internet',
        'Study desk',
        'Washing machine',
        'Microwave',
        'Bike storage',
        'Security system'
      ],
      availableDates: {
        start: '2023-11-01',
        end: '2024-10-31'
      },
      owner: {
        name: 'Robert Taylor',
        email: 'robert.taylor@example.com',
        phone: '+44 555 123 4567',
        responseRate: '90%',
        responseTime: 'Within 6 hours'
      },
      reviews: [
        {
          id: 301,
          userName: 'Jessica Adams',
          rating: 4,
          date: '2023-05-12',
          comment: 'Clean and convenient studio. Good value for money.'
        },
        {
          id: 302,
          userName: 'Tom Walker',
          rating: 3,
          date: '2023-04-18',
          comment: 'Decent place but a bit small. Good location though.'
        }
      ]
    },
    {
      id: 4,
      title: 'Family Home with Garden',
      location: 'Brighton, UK',
      price: 1800,
      bedrooms: 3,
      bathrooms: 2,
      area: 1500,
      imageUrl: '/api/placeholder/400/200',
      isAvailable: true,
      images: [
        'https://www.johncullenlighting.com/wp-content/uploads/2023/09/DSC_5913-copy.jpg',
        'https://www.johncullenlighting.com/wp-content/uploads/2023/09/DSC_5913-copy.jpg',
        'https://www.johncullenlighting.com/wp-content/uploads/2023/09/DSC_5913-copy.jpg'
      ],
      description: 'A lovely family home with a beautiful garden in a quiet residential area. Close to schools and parks.',
      amenities: [
        'Garden',
        'Patio',
        'Dishwasher',
        'Washer/dryer',
        'Fireplace',
        'Storage shed'
      ],
      availableDates: {
        start: '2023-10-15',
        end: '2024-10-14'
      },
      owner: {
        name: 'Patricia Clark',
        email: 'patricia.clark@example.com',
        phone: '+44 777 888 9999',
        responseRate: '99%',
        responseTime: 'Within 1 hour'
      },
      reviews: [
        {
          id: 401,
          userName: 'James Wilson',
          rating: 5,
          date: '2023-07-28',
          comment: 'Perfect home for our family. The garden was a huge plus!'
        }
      ]
    },
    {
      id: 5,
      title: 'Penthouse Apartment with Terrace',
      location: 'Oxford, UK',
      price: 2200,
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      imageUrl: '/api/placeholder/400/200',
      isAvailable: true,
      images: [
        'https://www.johncullenlighting.com/wp-content/uploads/2023/09/DSC_5913-copy.jpg',
        'https://www.johncullenlighting.com/wp-content/uploads/2023/09/DSC_5913-copy.jpg',
        'https://www.johncullenlighting.com/wp-content/uploads/2023/09/DSC_5913-copy.jpg'
      ],
      description: 'A stunning penthouse apartment with a spacious terrace offering panoramic views of the city. Luxury finishes throughout.',
      amenities: [
        'Terrace',
        'Floor-to-ceiling windows',
        'Smart home system',
        'Wine cooler',
        'Concierge service',
        'Private elevator'
      ],
      availableDates: {
        start: '2023-09-01',
        end: '2024-08-31'
      },
      owner: {
        name: 'Daniel Harris',
        email: 'daniel.harris@example.com',
        phone: '+44 333 444 5555',
        responseRate: '97%',
        responseTime: 'Within 3 hours'
      },
      reviews: [
        {
          id: 501,
          userName: 'Elizabeth Green',
          rating: 5,
          date: '2023-08-15',
          comment: 'The most amazing apartment I\'ve ever stayed in. The views are incredible!'
        },
        {
          id: 502,
          userName: 'Richard Martin',
          rating: 5,
          date: '2023-07-10',
          comment: 'Pure luxury. Worth every penny for the experience.'
        }
      ]
    },
    {
      id: 6,
      title: 'Charming Cottage in Countryside',
      location: 'Bath, UK',
      price: 1600,
      bedrooms: 2,
      bathrooms: 1,
      area: 1200,
      imageUrl: '/api/placeholder/400/200',
      isAvailable: true,
      images: [
        'https://www.johncullenlighting.com/wp-content/uploads/2023/09/DSC_5913-copy.jpg',
        'https://www.johncullenlighting.com/wp-content/uploads/2023/09/DSC_5913-copy.jpg',
        'https://www.johncullenlighting.com/wp-content/uploads/2023/09/DSC_5913-copy.jpg'
      ],
      description: 'A charming cottage nestled in the beautiful countryside. Perfect for those seeking peace and tranquility.',
      amenities: [
        'Fireplace',
        'Garden',
        'BBQ area',
        'Countryside views',
        'Parking space',
        'Pet friendly'
      ],
      availableDates: {
        start: '2023-10-10',
        end: '2024-10-09'
      },
      owner: {
        name: 'Olivia Wilson',
        email: 'olivia.wilson@example.com',
        phone: '+44 111 222 3333',
        responseRate: '96%',
        responseTime: 'Within 5 hours'
      },
      reviews: [
        {
          id: 601,
          userName: 'William Thomas',
          rating: 5,
          date: '2023-06-20',
          comment: 'Idyllic cottage in a beautiful setting. So peaceful and relaxing.'
        }
      ]
    },
    {
      id: 7,
      title: 'Stylish Loft in Historic Building',
      location: 'Liverpool, UK',
      price: 1100,
      bedrooms: 1,
      bathrooms: 1,
      area: 750,
      imageUrl: '/api/placeholder/400/200',
      isAvailable: false,
      images: [
        'https://www.johncullenlighting.com/wp-content/uploads/2023/09/DSC_5913-copy.jpg',
        'https://www.johncullenlighting.com/wp-content/uploads/2023/09/DSC_5913-copy.jpg',
        'https://www.johncullenlighting.com/wp-content/uploads/2023/09/DSC_5913-copy.jpg'
      ],
      description: 'A stylish loft apartment in a converted historic building. Features exposed brick walls and original architectural details.',
      amenities: [
        'High ceilings',
        'Exposed brick',
        'Designer furniture',
        'Smart TV',
        'Bluetooth sound system',
        'Keyless entry'
      ],
      availableDates: {
        start: '2023-11-15',
        end: '2024-11-14'
      },
      owner: {
        name: 'George Robinson',
        email: 'george.robinson@example.com',
        phone: '+44 444 555 6666',
        responseRate: '93%',
        responseTime: 'Within 8 hours'
      },
      reviews: [
        {
          id: 701,
          userName: 'Sophie Miller',
          rating: 4,
          date: '2023-05-15',
          comment: 'Beautiful loft with great character. A bit noisy at night but overall great stay.'
        }
      ]
    },
    {
      id: 8,
      title: 'Modern Townhouse with Garage',
      location: 'Bristol, UK',
      price: 1900,
      bedrooms: 3,
      bathrooms: 2,
      area: 1700,
      imageUrl: 'https://www.johncullenlighting.com/wp-content/uploads/2023/09/DSC_5913-copy.jpg',
      isAvailable: true,
      images: [
        'https://www.johncullenlighting.com/wp-content/uploads/2023/09/DSC_5913-copy.jpg',
        'https://www.johncullenlighting.com/wp-content/uploads/2023/09/DSC_5913-copy.jpg',
        'https://www.johncullenlighting.com/wp-content/uploads/2023/09/DSC_5913-copy.jpg'
      ],
      description: 'A modern townhouse with a garage and open-plan living space. Located in a vibrant neighborhood with easy access to shops and restaurants.',
      amenities: [
        'Garage',
        'Open-plan living',
        'Home office space',
        'Balcony',
        'Underfloor heating',
        'Smart lighting'
      ],
      availableDates: {
        start: '2023-09-20',
        end: '2024-09-19'
      },
      owner: {
        name: 'Alice Cooper',
        email: 'alice.cooper@example.com',
        phone: '+44 666 777 8888',
        responseRate: '98%',
        responseTime: 'Within 2 hours'
      },
      reviews: [
        {
          id: 801,
          userName: 'Henry Johnson',
          rating: 5,
          date: '2023-08-25',
          comment: 'Fantastic townhouse in a great location. Very modern and well equipped.'
        },
        {
          id: 802,
          userName: 'Laura Smith',
          rating: 4,
          date: '2023-07-18',
          comment: 'Lovely property with great facilities. Enjoyed our stay here.'
        }
      ]
    }
  ];
  
  export default PROPERTY_DATA;