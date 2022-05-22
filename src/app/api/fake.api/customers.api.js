const users = [
  {
    _id: 'df67rdca3eeb7f6fgeed471815',
    name: 'Holiday Inn',
    email: 'info@holinn.com',
    phone: '+91234567890',
    country: 'United Arab Emirates',
    city: 'Abu Dhabi',
    objects: [
      {
        placement: 1,
        cost: 100,
        currency: '$',
        photos: [
          '/assets/customers/HolidayInn/src/p1_1.png'
        ],
        amount: 3
      },
      {
        placement: 2,
        cost: 200,
        currency: '$',
        photos: [
          '/assets/customers/HolidayInn/src/p2_1.png'
        ],
        amount: 2
      }
    ]
  },
  {
    _id: 'df67rdca3eeb7f6fgeed471816',
    name: 'Radisson blu',
    email: 'info@radisson.com',
    phone: '+91234567890',
    country: 'United Arab Emirates',
    city: 'Dubai',
    objects: [
      {
        placement: 1,
        cost: 120,
        currency: '$',
        photos: [
          '/assets/customers/HolidayInn/src/p1_1.png'
        ],
        amount: 3
      },
      {
        placement: 2,
        cost: 240,
        currency: '$',
        photos: [
          '/assets/customers/HolidayInn/src/p2_1.png'
        ],
        amount: 2
      }
    ]
  },
  {
    _id: 'df67rdca3eeb7f6fgeed471817',
    name: 'Marriott hotel',
    email: 'info@marriott.com',
    phone: '+91234567890',
    country: 'United Arab Emirates',
    city: 'Dubai',
    objects: [
      {
        placement: 1,
        cost: 150,
        currency: '$',
        photos: [
          '/assets/customers/HolidayInn/src/p1_1.png'
        ],
        amount: 2
      },
      {
        placement: 2,
        cost: 300,
        currency: '$',
        photos: [
          '/assets/customers/HolidayInn/src/p2_1.png'
        ],
        amount: 1
      }
    ]
  },
  {
    _id: 'df67rdca3eeb7f6fgeed471818',
    name: 'Hilton',
    email: 'info@hilton.biz',
    phone: '+91234567890',
    country: 'United Arab Emirates',
    city: 'Abu Dhabi',
    objects: [
      {
        placement: 1,
        cost: 140,
        currency: '$',
        photos: [
          '/assets/customers/HolidayInn/src/p1_1.png'
        ],
        amount: 2
      },
      {
        placement: 2,
        cost: 280,
        currency: '$',
        photos: [
          '/assets/customers/HolidayInn/src/p2_1.png'
        ],
        amount: 2
      }
    ]
  },
  {
    _id: 'df67rdca3eeb7f6fgeed471819',
    name: 'Sheraton',
    email: 'info@Sheraton.tech',
    phone: '+91234567890',
    country: 'United Arab Emirates',
    city: 'Dubai',
    objects: [
      {
        placement: 1,
        cost: 130,
        currency: '$',
        photos: [
          '/assets/customers/HolidayInn/src/p1_1.png'
        ],
        amount: 1
      },
      {
        placement: 2,
        cost: 260,
        currency: '$',
        photos: [
          '/assets/customers/HolidayInn/src/p2_1.png'
        ],
        amount: 1
      }
    ]
  },
  {
    _id: 'df67rdca3eeb7f6fgeed471820',
    name: 'Four seasons',
    email: 'info@fourseasons.com',
    phone: '+91234567890',
    country: 'United Arab Emirates',
    city: 'Sharjah',
    objects: [
      {
        placement: 1,
        cost: 180,
        currency: '$',
        photos: [
          '/assets/customers/HolidayInn/src/p1_1.png'
        ],
        amount: 3
      },
      {
        placement: 2,
        cost: 360,
        currency: '$',
        photos: [
          '/assets/customers/HolidayInn/src/p2_1.png'
        ],
        amount: 1
      }
    ]
  },
  {
    _id: 'df67rdca3eeb7f6fgeed471821',
    name: 'Metropol',
    email: 'info@metropol.com',
    phone: '+91234567890',
    country: 'United Arab Emirates',
    city: 'Sharjah',
    objects: [
      {
        placement: 1,
        cost: 400,
        currency: '$',
        photos: [
          '/assets/customers/HolidayInn/src/p1_1.png'
        ],
        amount: 3
      },
      {
        placement: 2,
        cost: 600,
        currency: '$',
        photos: [
          '/assets/customers/HolidayInn/src/p2_1.png'
        ],
        amount: 1
      }
    ]
  },
  {
    _id: 'df67rdca3eeb7f6fgeed471822',
    name: 'Crown Plaza',
    email: 'info@crown.com',
    phone: '+91234567890',
    country: 'United Arab Emirates',
    city: 'Sharjah',
    objects: [
      {
        placement: 1,
        cost: 300,
        currency: '$',
        photos: [
          '/assets/customers/HolidayInn/src/p1_1.png'
        ],
        amount: 3
      },
      {
        placement: 2,
        cost: 500,
        currency: '$',
        photos: [
          '/assets/customers/HolidayInn/src/p2_1.png'
        ],
        amount: 3
      }
    ]
  },
  {
    _id: 'df67rdca3eeb7f6fgeed471823',
    name: 'InterContinental',
    email: 'info@it.com',
    phone: '+91234567890',
    country: 'United Arab Emirates',
    city: 'Sharjah',
    objects: [
      {
        placement: 1,
        cost: 80,
        currency: '$',
        photos: [
          '/assets/customers/HolidayInn/src/p1_1.png'
        ],
        amount: 3
      },
      {
        placement: 2,
        cost: 120,
        currency: '$',
        photos: [
          '/assets/customers/HolidayInn/src/p2_1.png'
        ],
        amount: 3
      }
    ]
  },
  {
    _id: 'df67rdca3eeb7f6fgeed471824',
    name: 'Mercure Hotel',
    email: 'info@mercure.com',
    phone: '+91234567890',
    country: 'United Arab Emirates',
    city: 'Dubai',
    objects: [
      {
        placement: 1,
        cost: 50,
        currency: '$',
        photos: [
          '/assets/customers/HolidayInn/src/p1_1.png'
        ],
        amount: 3
      },
      {
        placement: 2,
        cost: 90,
        currency: '$',
        photos: [
          '/assets/customers/HolidayInn/src/p2_1.png'
        ],
        amount: 3
      }
    ]
  }
];

const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(users);
    }, 2000);
  });

export default {
  fetchAll
};
