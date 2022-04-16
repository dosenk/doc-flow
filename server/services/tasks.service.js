const queryDB = require('../db/query');
const db = require('../db/connection');
const { handleGetNewWords } = require('./word.service');

const taskData = {
  initiators: {
    main: null,
    all: []
  },
  info: ''
};

class TasksService {
  static async handleAddBase({ date, number: baseNumber, type }, figurant, iniciator, decree) {
    const bases = await TasksService.handleGetBase(baseNumber);
    if (!bases.length) {
      const words = await handleGetNewWords(figurant);
      console.log(words);
    } else {
      const { id } = bases[0];
      const tasks = await TasksService.handleGetTasks(id, figurant);
      console.log(tasks);
      if (tasks.find((task) => task.decreeNumber === decree.number))
        return { info: 'Задание в работе' };
      // const [taskInitiator] = await TasksService.handleGetInitiator(iniciator);
      // const { id: initiatorId } = taskInitiator;
      // taskData.initiators.all = tasks.map((task) => [task.initiator1, task.initiator2]).flat();
      // taskData.initiators.main = iniciator.name;
      // const initiator = await TasksService.handleGetInitiator(iniciator);
      // console.log(initiator);
    }
    return taskData;

    // const queryAddUser = `INSERT INTO base (login, password, role, active, fullName)
    //                             VALUES ('${login}', '${passHash}', (SELECT * FROM user_role WHERE value = '${role}'), '${
    //   active ? '1' : '0'
    // }', '${fullName ?? ''}')`;
  }

  static async handleGetInitiator(initiator) {
    // const SQLquery = `SELECT * FROM initiators WHERE surname = '${initiator.surname}' AND name = '${initiator.name}' AND patronymic = '${initiator.patronymic}'`;
    const SQLquery = `SELECT * FROM initiators WHERE surname = 'Петровский' AND name = 'А' AND patronymic = 'А'`;
    const { data } = await queryDB(db.pool, SQLquery);
    return data;
  }

  static async handleGetBase(baseNumber) {
    const SQLquery = `SELECT * FROM base WHERE number = '${baseNumber}'`;
    const { data } = await queryDB(db.pool, SQLquery);
    return data;
  }

  static async handleGetTasks(id, figurant) {
    const SQLquery = `SELECT tasks.figurant AS figurant,
                    tasks.base,
                    tasks.decree,
                    figurants.fio,
                    decree.number AS decreeNumber,
                    decree.date_of_sanction AS sanctionDate,
                    decree.days
                    FROM tasks
                    LEFT JOIN figurants ON tasks.base = figurants.baseId
                    LEFT JOIN decree ON tasks.decree = decree.id
                    WHERE tasks.base = '${id}' AND figurants.fio = '${figurant.name}'`;
    console.log(SQLquery);
    const { data } = await queryDB(db.pool, SQLquery);
    return data;
  }
}

module.exports = TasksService;
