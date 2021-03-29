var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createPool } from 'mysql2';
class DatabaseMysql {
    constructor(db) {
        DatabaseMysql.database = db;
    }
    /**
     * Executa uma query no banco de dados
     * @param query
     * @param values
     * @returns Promise
     */
    static poolAsync(query, values = []) {
        const dbConn = createPool(this.database);
        return new Promise(function (resolve, reject) {
            dbConn.query(query, values, function (error, results, fields) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(results);
                }
            });
        });
    }
}
DatabaseMysql.database = {
    host: '',
    user: '',
    password: '',
    database: ''
};
/**
 * Realiza uma operação no banco de dados
 * @param query
 * @param values
 * @returns Promise
 */
DatabaseMysql.query = (query, values = []) => __awaiter(void 0, void 0, void 0, function* () { return yield DatabaseMysql.poolAsync(query, values); });
/**
 * Realiza um insert no banco de dados
 * @returns Promise
 */
DatabaseMysql.insert = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield DatabaseMysql.poolAsync(`INSERT INTO ${data.TABLE} (${data.columns.join(',')}) VALUES (${data.values.join(',')})`, data.endValues);
    return response;
});
/**
 * Realiza um select de colunas em uma tabela, a partir condições no banco de dados
 * @returns Promise
 */
DatabaseMysql.selectWhere = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let select = `SELECT ${data.columns.join(',')} FROM ${data.TABLE} WHERE ${data.where.join(' ')}`;
    if (data.order)
        select += ` ORDER ${data.order}`;
    if (data.limit)
        select += ` LIMIT ${data.limit}`;
    const response = yield DatabaseMysql.poolAsync(select, data.endValues);
    return response;
});
/**
 * Realiza um select de colunas em uma tabela no banco de dados
 * @returns Promise
 */
DatabaseMysql.select = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let select = `SELECT ${data.columns.join(',')} FROM ${data.TABLE}`;
    if (data.join)
        select += data.join;
    if (data.order)
        select += ` ORDER ${data.order}`;
    if (data.limit)
        select += ` LIMIT ${data.limit}`;
    const response = yield DatabaseMysql.poolAsync(select, []);
    return response;
});
/**
 * Realiza um update de colunas em uma tabela no banco de dados a partir de condições
 * @returns Promise
 */
DatabaseMysql.updateWhere = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield DatabaseMysql.poolAsync(`UPDATE ${data.TABLE} SET ${data.columns.join(',')} WHERE ${data.where.join(' ')}`, data.endValues);
    return response;
});
/**
 * Realiza um update de colunas em uma tabela no banco de dados
 * @returns Promise
 */
DatabaseMysql.update = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield DatabaseMysql.poolAsync(`UPDATE ${data.TABLE} SET ${data.columns.join(',')}`, data.endValues);
    return response;
});
/**
 * Realiza um delete em uma tabela, a partir condições no banco de dados
 * @returns Promise
 */
DatabaseMysql.deleteWhere = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield DatabaseMysql.poolAsync(`DELETE FROM ${data.TABLE} WHERE ${data.where.join(' ')}`, data.endValues);
    return response;
});
/**
 * Realiza um delete em uma tabela no banco de dados
 * @returns Promise
 */
DatabaseMysql.delete = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield DatabaseMysql.poolAsync(`DELETE FROM ${data.TABLE}`, []);
    return response;
});
export default DatabaseMysql;
//# sourceMappingURL=index.js.map