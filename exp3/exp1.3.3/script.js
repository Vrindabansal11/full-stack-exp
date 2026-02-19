class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    introduce() {
        return `Hello, my name is ${this.name}.`;
    }

    render(role) {
        return `
            <div class="card">
                <h2>${this.name} (${role})</h2>
                <p>Age: ${this.age}</p>
                <p class="italic">${this.introduce()}</p>
            </div>
        `;
    }
}

class Student extends Person {
    constructor(name, age, major) {
        super(name, age);
        this.major = major;
    }

    introduce() {
        return `Hello, my name is ${this.name} and I'm studying ${this.major}.`;
    }

    render() {
        return `
            <div class="card">
                <h2>${this.name} (Student)</h2>
                <p>Age: ${this.age}</p>
                <p class="italic">${this.introduce()}</p>
                <p>Major: ${this.major}</p>
            </div>
        `;
    }
}

class Teacher extends Person {
    constructor(name, age, subject) {
        super(name, age);
        this.subject = subject;
    }

    introduce() {
        return `Hello, my name is ${this.name} and I teach ${this.subject}.`;
    }

    render() {
        return `
            <div class="card">
                <h2>${this.name} (Teacher)</h2>
                <p>Age: ${this.age}</p>
                <p class="italic">${this.introduce()}</p>
                <p>Teaching: ${this.subject}</p>
            </div>
        `;
    }
}

function addPerson() {

    let type = document.getElementById("type").value;
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let extra = document.getElementById("extra").value;

    if (!name || !age) {
        alert("Please enter name and age");
        return;
    }

    let output = document.getElementById("output");
    let obj;

    if (type === "Person") {
        obj = new Person(name, age);
        output.innerHTML += obj.render("Person");
    }

    else if (type === "Student") {
        if (!extra) {
            alert("Enter Major");
            return;
        }
        obj = new Student(name, age, extra);
        output.innerHTML += obj.render();
    }

    else if (type === "Teacher") {
        if (!extra) {
            alert("Enter Subject");
            return;
        }
        obj = new Teacher(name, age, extra);
        output.innerHTML += obj.render();
    }

    // Clear inputs
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("extra").value = "";
}
