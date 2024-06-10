import { pool } from "../config/pgdb.js";

/**
 * 
 * @param {string} table 
 * @param {string} column 
 * @param {string} columnElem -> column type varchar
 * @returns 
 * ```
 * export const getOneVarchar = async (table, column, columnElem) => {
    try{

        const query = `SELECT * FROM ${table} WHERE ${column} = '${columnElem}';`
        const res = await pool.query(query);
        return res.rows

    }catch(err){
        throw err
    }
}
 * ```
 */
export const getOneVarchar = async (table, column, columnElem) => {
    try {

        const query = `SELECT * FROM ${table} WHERE ${column} = '${columnElem}';`
        const res = await pool.query(query);
        return res.rows

    } catch (err) {
        throw err
    }
}

/**
 * 
 * @param {string} table 
 * @param {string} column 
 * @param {string} columnElem -> column type varchar
 * @returns 
 * 
 * ```
 * export const getOneInt = async (table, column, columnElem) => {
    try{

        const query = `SELECT * FROM ${table} WHERE ${column} = ${columnElem};`
        const res = await pool.query(query);
        return res.rows;

    }catch(err){
        throw err
    };
};
 * ```
 */
export const getOneInt = async (table, column, columnElem) => {
    try {

        const query = `SELECT * FROM ${table} WHERE ${column} = ${columnElem};`
        const res = await pool.query(query);
        return res.rows

    } catch (err) {
        throw err
    }
}


/**
 * 
 * @param {string} table 
 * @returns 
 * 
 * ```
 * export const getAll = async (table) => {
    try{

        const query = `SELECT * FROM ${table}`
        const res = await pool.query(query);
        return res.rows

    }catch(err){
        throw err
    }
}
 * ```
 */
export const getAll = async (table) => {
    try {

        const query = `SELECT * FROM ${table}`
        const res = await pool.query(query);
        return res.rows

    } catch (err) {
        throw err
    }
}

/**
 * 
 * @param {string} table 
 * @param {object} columns 
 * @param {object} newValue 
 * @param {string} where 
 * @param {string} whereElem 
 * @returns 
 */
export const putmany = async (table, columns, newValue, where, whereElem) => {
    try {

        const filterData = function (arr) {
            const clearData = []
            for (let i = 0; i < arr.length; i++) {
                let str = ''
                let type = typeof arr[i];
                console.log(type, arr[i])
                if (type == 'string') {

                    for (let j = 0; j < arr[i].length; j++) {
                        if (arr[i][j] !== ';') {
                            str += arr[i][j];
                        }
                    }
                    clearData.push(str)
                } else if (typeof arr[i ] == 'number' || typeof arr[i] == 'boolean' || typeof arr[i] == 'object') {
                    clearData.push(arr[i]);
                };
            }

            return clearData
        }

        const generat = (columns, values) => {
            let str = ''
            if (typeof values[0] == 'number') {
                str += columns[0] + " = " + values[0];
            } else {
                str += columns[0] + " = " + `'${values[0]}'`;
            }
            for (let i = 0; i < columns.length; i++) {
                if (i > 0) {
                    const type = typeof values[i];

                    if (type == 'number' || type == 'boolean') {
                        str += ', ' + columns[i] + " = " + values[i];
                    } else {
                        str += ', ' + columns[i] + " = " + `'${values[i]}'`;
                    }
                }
            }
            return str
        }
        const cleardata = filterData(newValue)
        console.log('cleardata ->  ',cleardata);
        const gencolumn = generat(columns, cleardata);
        console.log('gendata ->   ',gencolumn);
        if(typeof whereElem == 'string'){
            const filterwhere = filterData([whereElem])
            whereElem = `'${filterwhere}'`
        }

        const query = `UPDATE ${table} SET ${gencolumn}  WHERE ${where} = ${whereElem} RETURNING *;`
        console.log(query);

        const res = await pool.query(query);
        return res.rows

    } catch (err) {
        throw err
    }
}


export const deleteOneVarchar = async (table, column, columnElem) => {
    try {

        const query = `DELETE FROM ${table} WHERE ${column} = '${columnElem}' RETURNING *;`
        const res = await pool.query(query);
        return res.rows

    } catch (err) {
        throw err
    }
}

export const deleteOneInt = async (table, column, columnElem) => {
    try {

        const query = `DELETE FROM ${table} WHERE ${column} = ${columnElem} RETURNING *;`
        const res = await pool.query(query);
        return res.rows

    } catch (err) {
        throw err
    }
}

export const insertMany = async (table, columnArr, valueArr) => {

    if (columnArr.length !== valueArr.length) {
        throw new Error('Insert qilishda qiymatlar yetarli emas...');
    }

    try {
        const filterData = function (arr) {
            const clearData = []
            for (let i = 0; i < arr.length; i++) {
                let str = ''
                for (let j = 0; j < arr[i].length; j++) {
                    if (arr[i][j] !== ';') {
                        str += arr[i][j];
                    }
                }
                clearData.push(str)
            }

            return clearData
        }

        const replace = (arr) => {
            let str = arr[0];
            for (let i = 1; i < arr.length; i++) {
                if (i > 0) {
                    str += ", " + arr[i];
                };
            };

            return str
        };

        const genValue = (valueArr) => {

            const len = valueArr.length;
            let str = '$1'
            for (let i = 2; i <= len; i++) {
                str += ', ' + `$${i}`;
            }
            return str
        }

        const column = replace(columnArr);
        const filteredValue = filterData(valueArr);
        const value = genValue(filteredValue);

        const query = `INSERT INTO ${table} (${column}) values (${value}) RETURNING *;`;
        const res = await pool.query(query, valueArr);
        return res.rows;

    } catch (err) {
        throw err
    }

}


