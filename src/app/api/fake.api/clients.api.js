const users = [
  {
    _id: '67rdca3eeb7f6fgeed471815',
    name: 'Джон Дориан',
    email: 'Jony7351@tw.com',
    phone: '+91234567890',
    history: {}
  },
  {
    _id: '67rdca3eeb7f6fgeed471816',
    name: 'Кокс',
    email: 'white4571@twipet.com',
    phone: '+91234567890',
    history: {}
  },
  {
    _id: '67rdca3eeb7f6fgeed471817',
    name: 'Боб Келсо',
    email: 'bob007@tw.com',
    phone: '+91234567890',
    history: {}
  },
  {
    _id: '67rdca3eeb7f6fgeed471818',
    name: 'Рэйчел Грин',
    email: 'green7311@fam.biz',
    phone: '+91234567890',
    history: {}
  },
  {
    _id: '67rdca3eeb7f6fgeed471819',
    name: 'Шелдон Купер',
    email: 'mindgames6878@phis.tech',
    phone: '+91234567890',
    history: {}
  },
  {
    _id: '67rdca3eeb7f6fgeed471820',
    name: 'Леонард Хофстедтер',
    email: 'mindes000@phis.tech',
    phone: '+91234567890',
    history: {}
  },
  {
    _id: '67rdca3eeb7f6fgeed471821',
    name: 'Говард Воловиц',
    email: 'gov1903@phis.tech',
    phone: '+91234567890',
    history: {}
  },
  {
    _id: '67rdca3eeb7f6fgeed471822',
    name: 'Никола Тесла',
    email: 'electro@underground.tech',
    phone: '+91234567890',
    history: {}
  },
  {
    _id: '67rdca3eeb7f6fgeed471823',
    name: 'Моника Геллер',
    email: 'mono@super.com',
    phone: '+91234567890',
    history: {}
  },
  {
    _id: '67rdca3eeb7f6fgeed471824',
    name: 'Рататуй',
    email: 'ratatatata@underground.com',
    phone: '+91234567890',
    history: {}
  },
  {
    _id: '67rdca3eeb7f6fgeed47181f',
    name: 'Джоуи Триббиани',
    email: 'joe@trib.com',
    phone: '+91234567890',
    history: {}
  },
  {
    _id: '67rdca3eeb7f6fgeed47181r',
    name: 'Брэд Питт',
    email: 'superstar@star.com',
    phone: '+91234567890',
    history: {}
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
