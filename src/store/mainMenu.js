export const initState = {
  menuList: [
    {
      id: 1,
      name: 'Постановка на контроль',
      url: '/main',
      role: ['Администратор', 'Регистратор'],
      children: [
        {
          id: 11,
          name: 'Полученные документы',
          children: null,
          role: ['Администратор', 'Регистратор'],
          url: '/main/recivedDocuments'
        },
        {
          id: 12,
          name: 'Таблица объектов',
          children: null,
          role: ['Администратор', 'Регистратор'],
          url: '/main/table'
        }
      ]
    },
    {
      id: 2,
      name: 'Работа с данными',
      url: '/reports',
      role: ['Администратор', 'Регистратор'],
      children: [
        {
          id: 21,
          name: 'Редактирование',
          children: null,
          role: ['Администратор', 'Регистратор'],
          url: '/statistics'
        }
      ]
    },
    {
      id: 3,
      name: 'Отчеты',
      url: '/reports',
      role: ['Администратор'],
      children: [
        {
          id: 31,
          name: 'Статистика',
          children: null,
          role: ['Администратор'],
          url: '/statistics'
        },
        {
          id: 32,
          name: 'Графики',
          children: null,
          role: ['Администратор'],
          url: '/сharts'
        }
      ]
    },
    {
      id: 4,
      name: 'Администрирование',
      url: '/administration',
      role: ['Администратор'],
      children: [
        {
          id: 41,
          name: 'Пользователи',
          children: null,
          role: ['Администратор'],
          url: '/administration/users'
        }
      ]
    }
  ],
  active: null
};

const SET_ACTIVE = 'SET_ACTIVE';

const setActiveMenu = (active) => {
  return {
    type: 'SET_ACTIVE',
    active
  };
};

const Menu = (action, state = initState) => {
  if (!action) return state;
  switch (action.type) {
    case SET_ACTIVE:
      return { ...state, active: action.active };
    default:
      return state;
  }
};

export const menuActionCreators = {
  setActiveMenu
};

export default Menu;
