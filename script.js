/*ajax here */
const url = "https://jsonplaceholder.typicode.com/todos";

$(document).ready($.getJSON(url, renderAsTodo));

function renderAsTodo(json) {
  json.forEach(function (list) {
    addItem(list.title, list.completed);
  });
  $(".loader").hide();
}
function addItem(item, isCompleted) {
  var checked = "";
  var completed = "";
  if (isCompleted) {
    checked = "checked";
    completed = "completed";
  }
  let html = `<li class="${completed}">
        <div class='form-check '>
        <label class='form-check-label'><input class='checkbox' type='checkbox' ${checked} /> 
        ${item}
        <i class='input-helper'></i>
        </label>
        </div>
        <i class='remove mdi mdi-close-circle-outline'></i>
    </li>`;
  todoListItem.append(html);
}

/*todo part here */
var todoListItem = $(".todo-list");
var todoListInput = $(".todo-list-input");
var countNewCompltetedTasks = 0;
/* event listener on todo list */
$(".todo-list-add-btn").on("click", function (event) {
  event.preventDefault();

  var item = $(this).prevAll(".todo-list-input").val();

  if (item) {
    todoListItem.append(`
    <li>
        <div class='form-check'>
        <label class='form-check-label'><input class='checkbox' type='checkbox' /> 
        ${item}
        <i class='input-helper'></i>
        </label>
        </div>
        <i class='remove mdi mdi-close-circle-outline'></i>
    </li>`);
    todoListInput.val("");
  }
});
/* event listener on list item */
todoListItem.on("change", ".checkbox", function () {
  if ($(this).attr("checked")) {
    $(this).removeAttr("checked");
    countNewCompltetedTasks--;
  } else {
    $(this).attr("checked", "checked");
    countNewCompltetedTasks++;
  }

  $(this).closest("li").toggleClass("completed");
  let promise = new Promise(function (resolve, reject) {
    if (countNewCompltetedTasks == 5) {
      resolve("Congrats. 5 Tasks have been Successfully Completed ");
    } else {
      reject(
        `${5-countNewCompltetedTasks} more taks to be finished inorder to be successfull!`
      );
    }
  });
  promise.then((e) => alert(e)).catch((e) => console.log(e));
});

todoListItem.on("click", ".remove", function () {
  $(this).parent().remove();
});

$('button[type="submit"]').on("click", redirectTologin);
function redirectTologin() {
  $(location).attr("href", "login.html");
}
