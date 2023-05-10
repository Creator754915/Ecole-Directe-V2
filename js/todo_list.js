// Récupère les éléments du DOM
const newTaskInput = document.getElementById("new-task");
const TaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const saveTasksButton = document.getElementById("save-tasks");

// Charge les tâches depuis le localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Fonction pour afficher les tâches
function renderTasks() {
	// Vide la liste de tâches
	const taskList = document.getElementById("task-list");
	taskList.value = "";

	// Ajoute chaque tâche dans la liste
	tasks.forEach((task, index) => {
		const li = document.createElement("li");
		const span = document.createElement("span");
		const deleteButton = document.createElement("button");

		span.innerText = task;
		deleteButton.innerText = "Supprimer";
		deleteButton.addEventListener("click", () => {
			deleteTask(index);
		});

		li.appendChild(span);
		li.appendChild(deleteButton);

		taskList.appendChild(li);
	});
}

// Fonction pour ajouter une tâche
function addTask() {
	const newTaskInput = document.getElementById("new-task");
	const task = newTaskInput.value;

	// Vérifie que la tâche n'est pas vide
	if (task.trim() !== "") {
		tasks.push(task);
		newTaskInput.value = "";
		renderTasks();
	}
}

// Fonction pour supprimer une tâche
function deleteTask(index) {
	tasks.splice(index, 1);
	renderTasks();
}

// Événement pour ajouter une tâche

// Événement pour sauvegarder les tâches
saveTasksButton.addEventListener("click", () => {
	localStorage.setItem("tasks", JSON.stringify(tasks));
	alert("Les tâches ont été sauvegardées.");
});

// Affiche les tâches au chargement de la page
renderTasks();
