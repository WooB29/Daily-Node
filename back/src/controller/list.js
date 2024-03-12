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
    try {
        const userEmail = userEmailCheck(req);
        if(!userEmail){
            return res.status(401).json({ message: 'Access token is needed for refresh' });
        }

        const { subject, title, content } = req.body;
        
        const subjectQuery = {
            text: `SELECT s.id AS subject_id, ms.id AS member_subject_id
                   FROM subject s
                   LEFT JOIN member_subject ms ON s.id = ms.subject_id AND ms.member_email = $1
                   WHERE s.name = $2`,
            values: [userEmail, subject]
        };
        const subjectResult = await pgdb.query(subjectQuery);
    
        let subjectId;
        let memberSubjectId;
    
        if (subjectResult.rows.length === 0) {
            const newSubjectQuery = {
                text: `insert into subject (name) values ($1) returning id`,
                values: [subject]
            };
            const newSubjectResult = await pgdb.query(newSubjectQuery);
            subjectId = newSubjectResult.rows[0].id;
        } else {
            subjectId = subjectResult.rows[0].subject_id;
            memberSubjectId = subjectResult.rows[0].member_subject_id;
        }
    
        if (!memberSubjectId) {
            const addMemberSubjectQuery = {
                text: `insert into member_subject (subject_id, member_email) values ($1, $2)`,
                values: [subjectId, userEmail]
            };
            await pgdb.query(addMemberSubjectQuery);
        }
    
        const addStudyListQuery = {
            text: `insert into subject_studylist (subject_id, title, content) values ($1, $2, $3)`,
            values: [subjectId, title, content]
        };
        await pgdb.query(addStudyListQuery);
    
        return res.status(200).json({ success: true });

    }
    catch (error) {
        console.error('Error fetching subject list:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.searchList = async (req, res) => {

};