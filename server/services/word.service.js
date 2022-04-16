const queryDB = require('../db/query');
const db = require('../db/connection');
const ApiError = require('../exceptions/api.error');
const tokenService = require('./token.service');
const { getHash } = require('../utils/utils');

class WordService {
  static async handleGetNewWords(figurant, letterCount = 2) {
    const { name } = figurant;
    const [firstName] = name.split(' ');
    const firstLetters = firstName.slice(0, letterCount);
    const SQLquery = `SELECT word FROM words WHERE words.word NOT IN (SELECT codeName FROM base) AND word LIKE '${firstLetters}%'`;
    const { data } = await queryDB(db.pool, SQLquery);
    if (data.length <= 10) await WordService.handleGetNewWords(figurant, letterCount - 1);
    return data;
  }
}

module.exports = WordService;
