{
  // Declare necessary types
  interface Task {
      id: number;
      name: string;
      title: string;
      description: string;
      status: string;
  }

  interface TeamMember {
      name: string;
      role: string;
  }

  function openHomePage(): void {
      const homePage = document.getElementById("homePage") as HTMLElement;
      const taskPage = document.getElementById("taskManagementPage") as HTMLElement;

      if (homePage && taskPage) {
          homePage.classList.remove("hidden");
          taskPage.classList.add("hidden");
      }
  }

  window.onload = openHomePage;

  $(document).ready(() => {
      // Fetch data and initialize DataTable
      fetch('https://team-dashboard-azure.vercel.app/api/index')
          .then((response) => response.json())
          .then((data) => {
              const table = $('#example').DataTable({
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

              $('#searchInput').on('keyup', function (this: HTMLInputElement) {
                  table.search(this.value).draw();
              });

              $('#totalIncomeDynamic').text(table.rows().count().toString());
          })
          .catch((error) => console.error('Error fetching data:', error));
  });

  // Type for DOM elements
  const addTaskBtn: HTMLElement | null = document.getElementById('addTaskBtn');
  const taskModal: HTMLElement | null = document.getElementById('taskModal');
  const taskForm: HTMLFormElement | null = document.getElementById('taskForm') as HTMLFormElement;
  const saveBtn: HTMLElement | null = document.getElementById('saveBtn');
  const nameSelect: HTMLSelectElement | null = document.getElementById('name') as HTMLSelectElement;
  const titleInput: HTMLInputElement | null = document.getElementById('title') as HTMLInputElement;
  const descriptionTextarea: HTMLTextAreaElement | null = document.getElementById('description') as HTMLTextAreaElement;
  const statusSelect: HTMLSelectElement | null = document.getElementById('status') as HTMLSelectElement;
  const closeBtn: HTMLElement | null = document.getElementById('closeBtn');
  
  let isEditing: boolean = false;
  let editingTaskId: number | null = null;

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
          const taskId: number = $(this).closest('tr').data('id');
          const tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
          const taskToEdit: Task | undefined = tasks.find(task => task.id === taskId);

          if (taskToEdit) {
              // Populate the modal with the task data
              if (nameSelect) nameSelect.value = taskToEdit.name;
              if (titleInput) titleInput.value = taskToEdit.title;
              if (descriptionTextarea) descriptionTextarea.value = taskToEdit.description;
              if (statusSelect) statusSelect.value = taskToEdit.status;

              // Open the modal for editing
              openModal();
              //set edit mode
              isEditing=true;
              editingTaskId=taskId;

              // Update the save button to handle the edit
              if (saveBtn) {
                // Clear any previously assigned event listeners
                saveBtn.onclick = null;
                  saveBtn.onclick = () => {
                      if (nameSelect && titleInput && descriptionTextarea && statusSelect) {
                          // Update task with the new values
                          taskToEdit.name = nameSelect.value;
                          taskToEdit.title = titleInput.value;
                          taskToEdit.description = descriptionTextarea.value;
                          taskToEdit.status = statusSelect.value;
                          
                          // Save the updated task to local storage
                          const updatedTasks: Task[] = tasks.map(task => task.id === taskId ? taskToEdit : task);
                          localStorage.setItem('tasks', JSON.stringify(updatedTasks));
                          loadTableData();

                          // Set the editing state 
                            isEditing = false;
                            editingTaskId = null;
                          // Close the modal
                          closeModal();
                      }
                  };
              }
          }
      });

      $("#taskTable").on("click", ".deleteBtn", function () {
          const taskId: number = $(this).closest('tr').data('id');
          const tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
          const updatedTasks: Task[] = tasks.filter(task => task.id !== taskId);
          localStorage.setItem('tasks', JSON.stringify(updatedTasks));

          loadTableData();
      });
  });

  // ===================== Modal Functions =====================

  const openModal = (): void => {
      if (taskModal) {
          taskModal.classList.remove('hidden');
      }
      fetchTeamMembers();  // Fetch team members when the modal is opened
  };

  const closeModal = (): void => {
      if (taskModal) {
          taskModal.classList.add('hidden');
      }
      isEditing=false;
      editingTaskId = null;
  };

  // ===================== Fetch Team Members =====================

  const apiEndpoint: string = "https://team-dashboard-azure.vercel.app/api/index";

  const fetchTeamMembers = async (): Promise<void> => {
      try {
          const response = await fetch(apiEndpoint);
          const teamMembers: TeamMember[] = await response.json();

          if (nameSelect) {
              teamMembers.forEach((member) => {
                  const option = document.createElement('option');
                  option.value = member.name;
                  option.textContent = `${member.name} - ${member.role}`;
                  nameSelect.appendChild(option);
              });
          }
      } catch (error) {
          console.error('Error fetching team members:', error);
      }
  };

  // ===================== Save Task =====================

  const saveTask = (task: Task): void => {
      const tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      location.reload();
  };

  // ===================== Handle Form Submission =====================

  if (taskForm) {
      taskForm.addEventListener('submit', (e: Event) => {
          e.preventDefault();
        if(isEditing){
            return;
        }
          const task: Task = {
              id: Date.now(),
              name: nameSelect?.value || '',
              title: titleInput?.value || '',
              description: descriptionTextarea?.value || '',
              status: statusSelect?.value || ''
          };

          saveTask(task);
          closeModal();  // Close the modal after saving
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

  const loadTableData = (): void => {
      const tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
      const tableBody = $('#taskTable tbody');
      tableBody.empty();

      let completeCount1: number = 0;
      let completeCount2: number = 0;
      let completeCount3: number = 0;

      tasks.forEach((task: Task) => {
          const newRow = `
              <tr data-id="${task.id}">
                  <td class="px-4 py-2">${task.name}</td>
                  <td class="px-4 py-2">${task.title}</td>
                  <td class="px-4 py-2">${task.description}</td>
                  <td class="px-4 py-2">${task.status}</td>
                  <td class="px-4 py-2">
                      <button class="editBtn px-2 py-1 bg-blue-500 text-white rounded">Edit</button>
                      <button class="deleteBtn px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                  </td>
              </tr>`;

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

      document.getElementById('dynamicComplete')!.textContent = completeCount1.toString();
      document.getElementById('dynamicProgress')!.textContent = completeCount2.toString();
      document.getElementById('dynamicTodo')!.textContent = completeCount3.toString();
  };

  // Initialize table data on page load
  $(document).ready(function () {
      loadTableData();
  });
}
