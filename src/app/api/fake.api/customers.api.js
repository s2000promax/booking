const users = [
  {
    _id: 'df67rdca3eeb7f6fgeed471815',
    name: 'Holiday Inn',
    email: 'info@holinn.com',
    phone: '+91234567890',
    object: {}
  },
  {
    _id: 'df67rdca3eeb7f6fgeed471816',
    name: 'Radisson blu',
    email: 'info@radisson.com',
    phone: '+91234567890',
    object: {}
  },
  {
    _id: 'df67rdca3eeb7f6fgeed471817',
    name: 'Marriott hotel',
    email: 'info@marriott.com',
    phone: '+91234567890',
    object: {}
  },
  {
    _id: 'df67rdca3eeb7f6fgeed471818',
    name: 'Hilton',
    email: 'info@hilton.biz',
    phone: '+91234567890',
    object: {}
  },
  {
    _id: 'df67rdca3eeb7f6fgeed471819',
    name: 'Sheraton',
    email: 'info@Sheraton.tech',
    phone: '+91234567890',
    object: {}
  },
  {
    _id: 'df67rdca3eeb7f6fgeed471820',
    name: 'Four seasons',
    email: 'info@fourseasons.com',
    phone: '+91234567890',
    object: {}
  },
  {
    _id: 'df67rdca3eeb7f6fgeed471821',
    name: 'Metropol',
    email: 'info@metropol.com',
    phone: '+91234567890',
    object: {}
  },
  {
    _id: 'df67rdca3eeb7f6fgeed471822',
    name: 'Crown Plaza',
    email: 'info@crown.com',
    phone: '+91234567890',
    object: {}
  },
  {
    _id: 'df67rdca3eeb7f6fgeed471823',
    name: 'InterContinental',
    email: 'info@it.com',
    phone: '+91234567890',
    object: {}
  },
  {
    _id: 'df67rdca3eeb7f6fgeed471824',
    name: 'Mercure Hotel',
    email: 'info@mercure.com',
    phone: '+91234567890',
    object: {}
  },
  {
    _id: 'df67rdca3eeb7f6fgeed47181f',
    name: 'Джоуи Триббиани',
    email: 'joe@trib.com',
    phone: '+91234567890',
    object: {}
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
