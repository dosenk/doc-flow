import UserRow from './UserRow/UserRow';

const BTNS = [
  [
    {
      id: 1,
      action: 'handleAdd',
      name: 'Добавить'
    },
    {
      id: 2,
      action: 'handleDel',
      name: 'Удалить'
    },
    { id: 3, action: 'handleRefresh', name: 'Обновить' }
  ]
];

const TABLE_COLUMNS = [
  {
    accessor: 'login',
    Header: 'Логин',
    isSorted: true
    // width: 140,
  },
  {
    accessor: 'fullName',
    Header: 'ФИО'
  },
  {
    accessor: 'role',
    Header: 'Роль',
    sortType: 'basic'
  },
  {
    accessor: 'status',
    Header: 'Статус',
    sortType: 'basic',
    Cell: UserRow
  }
];

const ROLE = [{ name: 'Администратор' }, { name: 'Регистратор' }];

export { BTNS, TABLE_COLUMNS, ROLE };
