const API_URL = 'https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json';

// Fetch data from the API
async function fetchData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        studentsData = data; // Store data in the global variable
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Display student data in the table
async function displayData() {
    await fetchData();
    renderStudentsTable(studentsData);
}

// Render student data table
function renderStudentsTable(data) {
    const tableHTML = createTableHTML(data);
    const tablesContainer = document.getElementById('tables');
    tablesContainer.innerHTML = tableHTML;
}

// Create HTML for the table
function createTableHTML(data) {
    let tableHTML = '';
    tableHTML += '<table>';
    tableHTML += '<tr><th>Image</th><th>Full Name</th><th>Email</th><th>Status</th><th>Marks</th><th>Class</th></tr>';
    data.forEach(student => {
        const fullName = `${student.first_name} ${student.last_name}`;
        const status = student.passing ? 'Passing' : 'Failed';
        tableHTML += `<tr><td><img src="${student.image}" alt="${fullName}"></td><td>${fullName}</td><td>${student.email}</td><td>${status}</td><td>${student.marks}</td><td>${student.class}</td></tr>`;
    });
    tableHTML += '</table>';
    return tableHTML;
}

// Search data based on input
function searchData() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const filteredData = studentsData.filter(student => {
        const fullName = `${student.first_name} ${student.last_name}`.toLowerCase();
        return fullName.includes(searchInput) || student.email.toLowerCase().includes(searchInput);
    });
    renderStudentsTable(filteredData);
}

// Sort data in ascending order of full name (A -> Z)
function sortAZ() {
    const sortedData = studentsData.slice().sort((a, b) => {
        const fullNameA = `${a.first_name} ${a.last_name}`;
        const fullNameB = `${b.first_name} ${b.last_name}`;
        return fullNameA.localeCompare(fullNameB);
    });
    renderStudentsTable(sortedData);
}

// Sort data in descending order of full name (Z -> A)
function sortZA() {
    const sortedData = studentsData.slice().sort((a, b) => {
        const fullNameA = `${a.first_name} ${a.last_name}`;
        const fullNameB = `${b.first_name} ${b.last_name}`;
        return fullNameB.localeCompare(fullNameA);
    });
    renderStudentsTable(sortedData);
}

// Sort data by marks
function sortByMarks() {
    const sortedData = studentsData.slice().sort((a, b) => a.marks - b.marks);
    renderStudentsTable(sortedData);
}

// Sort data by passing status
function sortByPassing() {
    const sortedData = studentsData.filter(student => student.passing);
    renderStudentsTable(sortedData);
}
// Sort data by class
function sortByClass() {
    const sortedData = studentsData.slice().sort((a, b) => {
        // Convert class strings to uppercase for case-insensitive sorting
        const classA = a.class.toUpperCase();
        const classB = b.class.toUpperCase();
        return classA.localeCompare(classB);
    });
    renderStudentsTable(sortedData);
}

// Sort data by gender
function sortByGender() {
    const sortedData = studentsData.slice().sort((a, b) => {
        // Compare gender strings
        return a.gender.localeCompare(b.gender);
    });
    renderStudentsTable(sortedData);
}

// Initialize the UI
displayData();
