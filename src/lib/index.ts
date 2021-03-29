import { createPool, Pool } from 'mysql2';

interface insertParams {
    TABLE: string,
    columns: Array<string>,
    values: Array<string>,
    endValues: Array<string|number>
}
interface selectColumnsWhere {
    TABLE: string,
    columns: Array<string>,
    where: Array<string>,
    join?: string,
    order?: string,
    limit?: number,
    endValues: Array<string|number>
}
interface selectColumns {
    TABLE: string,
    columns: Array<string>,
    join?: string,
    order?: string,
    limit?: number,
}
interface updateColumnsWhere {
    TABLE: string,
    columns: Array<string>,
    where: Array<string>,
    endValues: Array<string|number>
}
interface updateColumns {
    TABLE: string,
    columns: Array<string>,
    endValues: Array<string|number>,
}
interface deleteWhere {
    TABLE: string,
    where: Array<string>,
    endValues: Array<string|number>
}
interface deleteValues {
    TABLE: string
}
export interface dbInterface {
    host: string,
    user: string,
    password: string,
    database: string
}

class DatabaseMysql {
    private static database: dbInterface = {
        host: '',
        user: '',
        password: '',
        database: ''
    }
    constructor(db: dbInterface) {
        DatabaseMysql.database = db;
    }
    /**
     * Executa uma query no banco de dados
     * @param query 
     * @param values
     * @returns Promise
     */
    private static poolAsync(query: string, values = []): Promise<any> {
        const dbConn: Pool = createPool(this.database);
        return new Promise(function (resolve, reject) {
            dbConn.query(query, values, function (error: any, results: any, fields: Array<any>|null|number) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(results);
                }
            });
        });
    }
    /**
     * Realiza uma operação no banco de dados
     * @param query 
     * @param values
     * @returns Promise
     */
    public static query = async (query: string, values = []) => await DatabaseMysql.poolAsync(query, values);
    /**
     * Realiza um insert no banco de dados
     * @returns Promise
     */
    public static insert = async (data: insertParams): Promise<any> => {
        const response = await DatabaseMysql.poolAsync(`INSERT INTO ${data.TABLE} (${data.columns.join(',')}) VALUES (${data.values.join(',')})`, data.endValues);

        return response;
    }
    /**
     * Realiza um select de colunas em uma tabela, a partir condições no banco de dados
     * @returns Promise
     */
    public static selectWhere = async (data: selectColumnsWhere): Promise<any> => {
        let select = `SELECT ${data.columns.join(',')} FROM ${data.TABLE} WHERE ${data.where.join(' ')}`;

        if (data.order) select += ` ORDER ${data.order}`;
        if (data.limit) select += ` LIMIT ${data.limit}`;

        const response = await DatabaseMysql.poolAsync(select, data.endValues);

        return response;
    }
    /**
     * Realiza um select de colunas em uma tabela no banco de dados
     * @returns Promise
     */
    public static select = async (data: selectColumns): Promise<any> => {
        let select = `SELECT ${data.columns.join(',')} FROM ${data.TABLE}`;
        
        if (data.join) select += data.join;
        if (data.order) select += ` ORDER ${data.order}`;
        if (data.limit) select += ` LIMIT ${data.limit}`;

        const response = await DatabaseMysql.poolAsync(select, []);

        return response;
    }
    /**
     * Realiza um update de colunas em uma tabela no banco de dados a partir de condições
     * @returns Promise
     */
    public static updateWhere = async (data: updateColumnsWhere): Promise<any> => {
        const response = await DatabaseMysql.poolAsync(`UPDATE ${data.TABLE} SET ${data.columns.join(',')} WHERE ${data.where.join(' ')}`, data.endValues);

        return response;
    }
    /**
     * Realiza um update de colunas em uma tabela no banco de dados
     * @returns Promise
     */
    public static update = async (data: updateColumns): Promise<any> => {
        const response = await DatabaseMysql.poolAsync(`UPDATE ${data.TABLE} SET ${data.columns.join(',')}`, data.endValues);

        return response;
    }
    /**
     * Realiza um delete em uma tabela, a partir condições no banco de dados
     * @returns Promise
     */
    public static deleteWhere = async (data: deleteWhere): Promise<any> => {
        const response = await DatabaseMysql.poolAsync(`DELETE FROM ${data.TABLE} WHERE ${data.where.join(' ')}`, data.endValues);

        return response;
    }
    /**
     * Realiza um delete em uma tabela no banco de dados
     * @returns Promise
     */
    public static delete = async (data: deleteValues): Promise<any> => {
        const response = await DatabaseMysql.poolAsync(`DELETE FROM ${data.TABLE}`, []);

        return response;
    }
}

export default DatabaseMysql;