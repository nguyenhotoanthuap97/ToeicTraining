module.exports = {
    port: 3002,
    DALService: "http://localhost:3001",
    requestURL: {
        testbook: {
            read: '/gettestbook',
        },
        question: {
            read: '/getquestion',
        },
    },
    Tag: {
        testbook: {
            NGHE: 'Listening',
            DOC: 'Reading',
            MO_TA: 'Description',
            DS_PHAN: 'Part-list',
            PHAN: 'Part',
            PHAN_CAU_HOI: 'Test',
            BO_DE: 'Text_book',
            CAU_HOI: 'Question',
            LUA_CHON: 'Choices',
            PHAN_DAP_AN: 'Answer_sheet',
            DAP_AN: 'Answer',
        },
        question: {
            PHAN: 'Part',
            CAU_HOI: 'Question',
            LUA_CHON: 'Choices',
            PHAN_DAP_AN: 'Answer_sheet',
            DAP_AN: 'Answer',
            DOAN_VAN: 'paragraph',
        },
    },
    Attribute: {
        testbook: {
            id: 'id',
            part: 'part',
            image: 'image',
            content: 'content',
            status: 'status',
            paragraph: 'paragraph',
            question: 'question',
        },
        question: {
            id: 'id',
            part: 'part',
            image: 'image',
            content: 'content',
            status: 'status',
            paragraph: 'paragraph',
            question: 'question',
        },
    },
    access_token: "thu1512559hai1512144",
    DAL_access_token: "hai1512144thu1512559",
}