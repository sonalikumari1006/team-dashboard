var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
function openHomePage() {
    // Get the Home Page and Task Management Page elements by their IDs
    var homePage = document.getElementById("homePage");
    var taskPage = document.getElementById("taskManagementPage");
    // Show Home Page and hide Task Management Page
    if (homePage && taskPage) {
        homePage.classList.remove("hidden"); // Show Home Page
        taskPage.classList.add("hidden"); // Hide Task Management Page
    }
}
// Call the function on page load to show the home page initially
window.onload = openHomePage;
// // Change to Task Management page (blue button)
// function changeBlueTask(): void {
//     const blueTask = document.getElementById("blue-task") as HTMLElement;
//     const blueHome = document.getElementById("blue-home") as HTMLElement;
//     const taskPage = document.getElementById("taskManagementPage") as HTMLElement;
//     const homePage = document.getElementById("homePage") as HTMLElement;
//     if (blueTask && blueHome && taskPage && homePage) {
//         blueTask.style.backgroundColor = "blue";
//         blueTask.style.color = "white";
//         blueHome.style.backgroundColor = "white"; // Removes any background color
//         blueHome.style.color = "gray";
//         taskPage.classList.remove("hidden");
//         homePage.classList.add("hidden");
//     }
// }
// // Change to Home page (blue button)
// function changeBlueHome(): void {
//     const blueTask = document.getElementById("blue-task") as HTMLElement;
//     const blueHome = document.getElementById("blue-home") as HTMLElement;
//     const taskPage = document.getElementById("taskManagementPage") as HTMLElement;
//     const homePage = document.getElementById("homePage") as HTMLElement;
//     if (blueTask && blueHome && taskPage && homePage) {
//         blueHome.style.backgroundColor = "blue";
//         blueHome.style.color = "white";
//         blueTask.style.backgroundColor = "white"; // Removes any background color
//         blueTask.style.color = "gray";
//         homePage.classList.remove("hidden");
//         taskPage.classList.add("hidden");
//     }
// }
// Fetch data and initialize DataTable
$(document).ready(function () {
    fetch('https://team-dashboard-azure.vercel.app/api/index')
        .then(function (response) { return response.json(); })
        .then(function (data) {
        var table = $('#example').DataTable({
            data: data,
            columns: [
                { data: 'name', title: 'Name' },
                { data: 'role', title: 'Role' },
                { data: 'bio', title: 'Short Bio' }
            ],
            paging: true,
            searching: true,
            ordering: true,
            info: true,
            responsive: true
        });
        // Add search functionality
        // Add search functionality
        $('#searchInput').on('keyup', function () {
            table.search(this.value).draw();
        });
        //=================== Adding count in Card =======================
        $('#totalIncomeDynamic').text(table.rows().count().toString());
        // ================================================================
    })
        .catch(function (error) { return console.error('Error fetching data:', error); });
});
// Initial page load configuration
$(document).ready(function () {
    var homePage = document.getElementById("homePage");
    var taskManagementPage = document.getElementById("taskManagementPage");
    var taskTableLength = document.getElementById("taskTable_length");
    if (homePage && taskManagementPage && taskTableLength) {
        homePage.classList.remove("hidden");
        taskManagementPage.classList.add("hidden");
        taskTableLength.style.marginBottom = "10px";
    }
});
// Type for DOM elements
var addTaskBtn = document.getElementById('addTaskBtn');
var taskModal = document.getElementById('taskModal');
var taskForm = document.getElementById('taskForm');
var saveBtn = document.getElementById('saveBtn');
var nameSelect = document.getElementById('name');
var titleInput = document.getElementById('title');
var descriptionTextarea = document.getElementById('description');
var statusSelect = document.getElementById('status');
var closeBtn = document.getElementById('closeBtn');
// ===================== DataTable Initialization =====================
$(document).ready(function () {
    $('#taskTable').DataTable({
        paging: false,
        searching: false,
        ordering: false,
        info: false,
        responsive: false,
        lengthMenu: [10, 25, 50, 100], // Customize the "Show entries" dropdown
        pageLength: 10 // Set the default number of entries to show
    });
    // Event listeners for edit and delete buttons
    $("#taskTable").on("click", ".editBtn", function () {
        // Edit functionality
        var taskId = $(this).closest('tr').data('id');
        var tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        var taskToEdit = tasks.find(function (task) { return task.id === taskId; });
        if (taskToEdit) {
            // Populate the modal with the task data
            if (nameSelect)
                nameSelect.value = taskToEdit.name;
            if (titleInput)
                titleInput.value = taskToEdit.title;
            if (descriptionTextarea)
                descriptionTextarea.value = taskToEdit.description;
            if (statusSelect)
                statusSelect.value = taskToEdit.status;
            // Open the modal for editing
            openModal();
            // Update the save button to handle the edit
            if (saveBtn) {
                saveBtn.onclick = function () {
                    if (nameSelect && titleInput && descriptionTextarea && statusSelect) {
                        // Update task with the new values
                        taskToEdit.name = nameSelect.value;
                        taskToEdit.title = titleInput.value;
                        taskToEdit.description = descriptionTextarea.value;
                        taskToEdit.status = statusSelect.value;
                        // Save the updated task to local storage
                        var updatedTasks = tasks.map(function (task) { return task.id === taskId ? taskToEdit : task; });
                        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
                        // Close the modal
                        closeModal();
                        location.reload();
                    }
                };
            }
        }
    });
    $("#taskTable").on("click", ".deleteBtn", function () {
        var taskId = $(this).closest('tr').data('id');
        var tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        var updatedTasks = tasks.filter(function (task) { return task.id !== taskId; });
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        loadTableData();
    });
});
// ===================== Modal Functions =====================
var openModal = function () {
    if (taskModal) {
        taskModal.classList.remove('hidden');
    }
    fetchTeamMembers(); // Fetch team members when the modal is opened
};
var closeModal = function () {
    if (taskModal) {
        taskModal.classList.add('hidden');
    }
};
// ===================== Fetch Team Members =====================
var apiEndpoint = "https://team-dashboard-azure.vercel.app/api/index";
var fetchTeamMembers = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, teamMembers, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch(apiEndpoint)];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                teamMembers = _a.sent();
                if (nameSelect) {
                    teamMembers.forEach(function (member) {
                        var option = document.createElement('option');
                        option.value = member.name;
                        option.textContent = "".concat(member.name, " - ").concat(member.role);
                        nameSelect.appendChild(option);
                    });
                }
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error('Error fetching team members:', error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// ===================== Save Task =====================
var saveTask = function (task) {
    var tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    location.reload();
};
// ===================== Handle Form Submission =====================
if (taskForm) {
    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var task = {
            id: Date.now(),
            name: (nameSelect === null || nameSelect === void 0 ? void 0 : nameSelect.value) || '',
            title: (titleInput === null || titleInput === void 0 ? void 0 : titleInput.value) || '',
            description: (descriptionTextarea === null || descriptionTextarea === void 0 ? void 0 : descriptionTextarea.value) || '',
            status: (statusSelect === null || statusSelect === void 0 ? void 0 : statusSelect.value) || ''
        };
        saveTask(task);
        closeModal(); // Close the modal after saving
    });
}
// ===================== Event Listener to Open Modal =====================
if (addTaskBtn) {
    addTaskBtn.addEventListener('click', openModal);
}
if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
}
// ===================== Load Data from Local Storage =====================
var loadTableData = function () {
    var tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    var tableBody = $('#taskTable tbody');
    tableBody.empty();
    var completeCount1 = 0;
    var completeCount2 = 0;
    var completeCount3 = 0;
    tasks.forEach(function (task) {
        var newRow = "\n            <tr data-id=\"".concat(task.id, "\">\n                <td class=\"px-4 py-2\">").concat(task.name, "</td>\n                <td class=\"px-4 py-2\">").concat(task.title, "</td>\n                <td class=\"px-4 py-2\">").concat(task.description, "</td>\n                <td class=\"px-4 py-2\">").concat(task.status, "</td>\n                <td class=\"px-4 py-2\">\n                    <button class=\"editBtn px-2 py-1 bg-blue-500 text-white rounded\">Edit</button>\n                    <button class=\"deleteBtn px-2 py-1 bg-red-500 text-white rounded\">Delete</button>\n                </td>\n            </tr>");
        if (task.status === "complete") {
            completeCount1++;
        }
        if (task.status === "progress") {
            completeCount2++;
        }
        if (task.status === "to do") {
            completeCount3++;
        }
        tableBody.append(newRow);
    });
    document.getElementById('dynamicComplete').textContent = completeCount1.toString();
    document.getElementById('dynamicProgress').textContent = completeCount2.toString();
    document.getElementById('dynamicTodo').textContent = completeCount3.toString();
};
// Initialize table data on page load
$(document).ready(function () {
    loadTableData();
});
