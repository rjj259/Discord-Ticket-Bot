let models = require("./schemas");
module.exports = {
    /**
    * Insert one document
    * @param {string} collection - Which collection the document is in
    * @param {Object} query - Which to delete
    * @returns {Object}
    */
    dbInsert: async (collection, query) => {
        return new models[collection](
            query
        ).save();
    },
    /**
     *Search the database for an id, creates a new entry if not found
     * @param {string} collection - The collection to query.
     * @param  {Object} query - The term to search for
     * @returns {Object}
     */
    dbQuery: async (collection, query) => {
        return await models[collection].findOne(
            query
        )
            .then((res) => {
                if (!res) {
                    return new models[collection](
                        query
                    ).save();
                }
                return res;
            }).catch((error) => {
                console.log(error);
            });
    },
    /**
     * Search the database for some parameters and return all entries that match, does not create a new entry if not found
     * @param {string} collection - The collection to query.
     * @param  {Object} query - The term to search for
     * @returns {Object}
     */
    dbQueryAll: async (collection, query) => {
        return await models[collection].find(
            query
        )
            .then((res) => {
                if (!res) {
                    return null;
                } else {
                    return res;
                }
            }).catch((error) => {
                console.log(error);
            });
    },
    /**
     * Search the database for some parameters, returns one entry and does not create a new entry if not found
     * @param {string} collection - The collection to query.
     * @param  {Object} query - The term to search for
     * @returns {Object}
     */
    dbQueryNoNew: async (collection, query) => {
        if (!models[collection]) return 0;
        return await models[collection].findOne(
            query
        )
            .then((res) => {
                if (!res) {
                    return null;
                } else {
                    return res;
                }
            }).catch((error) => {
                console.log(error);
            });
    },
    /**
     * Modify the database by providing either the userId or serverId
     * @param {string} collection - Who should be modified, user or server.
     * @param  {Snowflake | string} id - The id of the user/server
     * @param {Object} modify - Should the user/server be blocked or unblocked
     * @returns {Object}
     */
    dbModifyId: async (collection, id, modify) => {
        modify.id = id;
        return await models[collection].findOne({
            id: id
        })
            .then(async (res) => {
                if (!res) {
                    return new models[collection](
                        modify
                    ).save();
                }
                await res.update(modify);
                return res;
            });
    },
    /**
     * Modify the database by providing either the userId or serverId.
     *
     * *Note: Does not create new if not found.*
     * @param {string} collection - Who should be modified, user or server.
     * @param {Object} term - Which to modify
     * @param {Object} query - Which to modify
     * @param {Object} modify - What to change it to
     * @returns {Promise}
     */
    dbModify(collection, query, modify) {
        return models[collection].findOneAndUpdate(query, modify)
            .then((res) => {
                return res;
            });
    },
    /**
     * Modify all matching queries
     * @param {string} collection - What should be modified
     * @param {*} query - Which to modify
     * @param {*} modify - What to change it to
     */
    dbModifyAll: async (collection, query, modify) => {
        return await models[collection].find(
            query
        )
            .then(async (res) => {
                if (!res) return undefined;
                await models[collection].updateMany(query, modify);
                return res;
            });
    },
    /**
     * Delete one document
     * @param {string} collection - Which collection the document is in
     * @param {Object} query - Which to delete
     * @returns {Promise<void>}
     */
    dbDeleteOne: async (collection, query) => {
        return await models[collection].findOne(
            query
        )
            .then(async (res) => {
                if (!res) return undefined;
                await res.deleteOne();
                return res;
            });
    },
    /**
     * Delete all documents matching the query
     * @param {string} collection - Which collection the documents are in
     * @param {Object} query - Which to delete
     * @returns {Promise<void>}
     */
    dbDeleteAll: async (collection, query) => {
        return await models[collection].find(
            query
        )
            .then(async (res) => {
                if (!res) return undefined;
                await res.deleteMany(query);
                return res;
            });
    }
}