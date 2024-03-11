const pgdb = require('../utils/postgres');
const jwt = require('jsonwebtoken');

const userEmailCheck = (req) => {
    const accessToken = req.headers["authorization"].split(" ")[1];
    if(!accessToken){
        return null;
    }
    const decoded = jwt.decode(accessToken);
    return decoded.id;
};

exports.getLists = async (req, res) => {
    try {
        const userEmail = userEmailCheck(req);
        if(!userEmail){
            return res.status(401).json({ message: 'Access token is needed for refresh' });
        }

        const studyListQuery = {
            text: `
                select ssl.*, s.name as subject_name
                from member_subject ms
                left join subject_studylist ssl on ms.subject_id = ssl.subject_id
                left join subject s on ssl.subject_id = s.id
                where ms.member_email = $1
            `,
            values: [userEmail]
        }
        const sutdyListResult = await pgdb.query(studyListQuery);
        return res.status(200).json(sutdyListResult.rows);
    } 
    catch (error) {
        console.error('Error fetching study list:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.mySubjectList = async (req, res) => {
    try {
        const userEmail = userEmailCheck(req);
        if(!userEmail){
            return res.status(401).json({ message: 'Access token is needed for refresh' });
        }
        const studyListQuery = {
            text: `
                select s.*
                from member_subject ms
                join subject s on ms.subject_id = s.id
                where ms.member_email = $1;
            `,
            values: [userEmail]
        };
        const sutdyListResult = await pgdb.query(studyListQuery);
        return res.status(200).json(sutdyListResult.rows);
    }
    catch (error) {
        console.error('Error fetching subject list:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.uploadList = async (req, res) => {

};

exports.searchList = async (req, res) => {

};