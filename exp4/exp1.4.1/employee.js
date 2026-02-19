const fs = require("fs");
const readline = require("readline");

const FILE = "employees.json";

let employees = [];

if (fs.existsSync(FILE)) {
  employees = JSON.parse(fs.readFileSync(FILE));
}

function saveData() {
  fs.writeFileSync(FILE, JSON.stringify(employees, null, 2));
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showMenu() {
  console.log("\nExperiment 1.4.1 - Employee Management System");
  console.log("1. Add Employee");
  console.log("2. List Employees");
  console.log("3. Update Employee");
  console.log("4. Delete Employee");
  console.log("5. Exit");

  rl.question("Select option: ", handleMenu);
}

function addEmployee() {
  rl.question("Name: ", (name) => {
    rl.question("Position: ", (position) => {
      rl.question("Salary: ", (salary) => {
        if (!name || !position || isNaN(salary)) {
          console.log("Invalid input!");
          return showMenu();
        }

        const emp = {
          id: Date.now(),
          name,
          position,
          salary: Number(salary),
        };

        employees.push(emp);
        saveData();
        console.log("Employee added!");
        showMenu();
      });
    });
  });
}

function listEmployees() {
  console.log("\nEmployee List:");

  employees.forEach((emp) => {
    console.log(
      `ID: ${emp.id}, Name: ${emp.name}, Position: ${emp.position}, Salary: ${emp.salary}`
    );
  });

  showMenu();
}

function updateEmployee() {
  rl.question("Enter ID: ", (id) => {
    const emp = employees.find((e) => e.id == id);

    if (!emp) {
      console.log("Not found!");
      return showMenu();
    }

    rl.question("New Name: ", (name) => {
      emp.name = name || emp.name;
      saveData();
      console.log("Updated!");
      showMenu();
    });
  });
}

function deleteEmployee() {
  rl.question("Enter ID: ", (id) => {
    employees = employees.filter((e) => e.id != id);
    saveData();
    console.log("Deleted!");
    showMenu();
  });
}

function handleMenu(choice) {
  switch (choice) {
    case "1":
      addEmployee();
      break;
    case "2":
      listEmployees();
      break;
    case "3":
      updateEmployee();
      break;
    case "4":
      deleteEmployee();
      break;
    case "5":
      rl.close();
      break;
    default:
      showMenu();
  }
}

showMenu();
