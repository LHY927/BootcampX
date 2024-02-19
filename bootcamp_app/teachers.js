const { Pool } = require("pg");

const userInput = process.argv.slice(2);

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "bootcampx",
});

pool
  .query(
    `
  SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM assistance_requests
JOIN teachers ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name LIKE '%${userInput[0]}%'
ORDER BY teachers.name;
  `
  )
  .then((res) => {
    res.rows.forEach((row) => {
      console.log(`${row.cohort}:${row.teacher}`);
    });
  })
  .catch((err) => console.error("query error", err.stack));
