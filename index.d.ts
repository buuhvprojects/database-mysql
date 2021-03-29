interface insertParams {
    TABLE: string;
    columns: Array<string>;
    values: Array<string>;
    endValues: Array<string | number>;
}
interface selectColumnsWhere {
    TABLE: string;
    columns: Array<string>;
    where: Array<string>;
    join?: string;
    order?: string;
    limit?: number;
    endValues: Array<string | number>;
}
interface selectColumns {
    TABLE: string;
    columns: Array<string>;
    join?: string;
    order?: string;
    limit?: number;
}
interface updateColumnsWhere {
    TABLE: string;
    columns: Array<string>;
    where: Array<string>;
    endValues: Array<string | number>;
}
interface updateColumns {
    TABLE: string;
    columns: Array<string>;
    endValues: Array<string | number>;
}
interface deleteWhere {
    TABLE: string;
    where: Array<string>;
    endValues: Array<string | number>;
}
interface deleteValues {
    TABLE: string;
}
export interface dbInterface {
    host: string;
    user: string;
    password: string;
    database: string;
}
declare class DatabaseMysql {
    static database: dbInterface;
    constructor(db: dbInterface);
    /**
     * Executa uma query no banco de dados
     * @param query
     * @param values
     * @returns Promise
     */
    private static poolAsync;
    /**
     * Realiza uma operação no banco de dados
     * @param query
     * @param values
     * @returns Promise
     */
    static query: (query: string, values?: any[]) => Promise<any>;
    /**
     * Realiza um insert no banco de dados
     * @returns Promise
     */
    static insert: (data: insertParams) => Promise<any>;
    /**
     * Realiza um select de colunas em uma tabela, a partir condições no banco de dados
     * @returns Promise
     */
    static selectWhere: (data: selectColumnsWhere) => Promise<any>;
    /**
     * Realiza um select de colunas em uma tabela no banco de dados
     * @returns Promise
     */
    static select: (data: selectColumns) => Promise<any>;
    /**
     * Realiza um update de colunas em uma tabela no banco de dados a partir de condições
     * @returns Promise
     */
    static updateWhere: (data: updateColumnsWhere) => Promise<any>;
    /**
     * Realiza um update de colunas em uma tabela no banco de dados
     * @returns Promise
     */
    static update: (data: updateColumns) => Promise<any>;
    /**
     * Realiza um delete em uma tabela, a partir condições no banco de dados
     * @returns Promise
     */
    static deleteWhere: (data: deleteWhere) => Promise<any>;
    /**
     * Realiza um delete em uma tabela no banco de dados
     * @returns Promise
     */
    static delete: (data: deleteValues) => Promise<any>;
}
export default DatabaseMysql;
