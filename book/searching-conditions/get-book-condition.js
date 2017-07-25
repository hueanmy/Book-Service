class GetBookCondition {

    getSQL() {
        return 'select * from book';
    }

    getParameters() {
        return [];
    }
}

module.exports = GetBookCondition;
