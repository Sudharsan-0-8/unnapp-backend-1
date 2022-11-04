const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type option {
        no: INT!
        type: TYPEOFOPTION = NORMAL
    }

    type answer {
        ques_id: ID
        answer: String
    }

    type User {
        id: ID!
        username: String!
        password: String!
        no_of_participations: INT
        no_of_hosted: INT
        following_id: [ID]
        hosted: [Contest]
        followers: [User]
        following: [User]
    }

    type Contest {
        id: ID!
        name: String!
        description: String
        type: TYPEOFCONTEST = MCQ
        host_id: ID!
        start_date: String!
        start_time: String!
        end_time: String!
        end_date: String!
        duration: INT
        no_of_registrations: INT
    }
    
    type Ques {
        id: ID!
        contes_id: ID!
        question: String!
        options: [option]
    }

    type Report {
        user_id: ID!
        contest_id: ID!
        answers: [answer]
        status: CONTESTSTATUS = TAKEN
        marks: INT
    }

    enum TYPEOFCONTEST {
        MCQ
        CODE
    }

    enum TYPEOFOPTION {
        NORMAL
        STRINGINPUT
    }

    enum CONTESTSTATUS {
        COMPLETED
        TAKEN
    }


    type Query {
        test: String!
    }
`;

module.exports = { typeDefs };
