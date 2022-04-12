// eslint-disable-next-line import/prefer-default-export
export const MENU_LIST = [
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
];
