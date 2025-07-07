# Task Manager App

This is a task management web app that lets users add, update, delete, filter, and restore tasks, in your browser using vanilla JavaScript, HTML, and CSS. Data is stored in the browser with `localStorage`, so tasks persist across page reloads.

# Features

- Add tasks with name, category, deadline, and status
- Filter tasks by status: Pending, In Progress, Completed, Overdue
- Soft-delete tasks (move to Deleted view instead of permanently removing)
- Restore deleted tasks
- Update task status directly from the UI
- Store all data in `localStorage` — no database needed

# Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Web APIs: `localStorage`, `DOM`, `Date`


# How It Works

1. The user fills out the form to create a new task.
2. The task is saved to an array and stored in `localStorage`.
3. Tasks are displayed in a list with a status dropdown and a delete button.
4. Tasks can be filtered or soft-deleted, and restored from the "Deleted" filter view.

# Reflection Question:

1a. Challenges faced during the project?
1b. How you approached solving those challenges?
One of the main challenges I faced was getting the “Add Task” button to work properly due to a small typo in the element ID. I also struggled with structuring the JavaScript logic in a clean and readable way, especially when filtering and updating tasks. To solve these issues, I used console.log() to debug step by step and carefully matched my HTML and JS element IDs. Another challenge was implementing a soft delete feature and being able to restore deleted tasks. I handled this by adding a deleted property to each task object and filtering based on it.

1. What you would improve if given more time?
If I had more time, I would improve the user interface with better styling, add task editing functionality, and include visual indicators like colors or icons for task statuses. I’d also like to add sort options and possibly refactor the code to use classes or modules for better organization.

# Author-
Miuris Gutierrez