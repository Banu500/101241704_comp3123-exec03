var http = require("http");
const employees = require("./employee"); // Import the Employee Module

console.log("Lab 03 - NodeJs");

const port = process.env.PORT || 8081;

const server = http.createServer((req, res) => {
    if (req.method !== 'GET') {
        res.end(`{"error": "${http.STATUS_CODES[405]}"}`);
    } else {
        if (req.url === '/') {
         
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1>Welcome to Lab Exercise 03</h1>');
        }

        if (req.url === '/employee') {
     
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(employees));
        }

        if (req.url === '/employee/names') {
       
            const sortedNames = employees.map(employee => `${employee.firstName} ${employee.lastName}`).sort();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(sortedNames));
        }

        if (req.url === '/employee/totalsalary') {
          
            const totalSalary = employees.reduce((sum, employee) => sum + employee.salary, 0);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ total_salary: totalSalary }));
        }
    }
    res.end(`{"error": "${http.STATUS_CODES[404]}"}`);
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
