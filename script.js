// SpendWise - JavaScript foundation
let budget = 0;
let expenses = [];

const $ = id => document.getElementById(id);

function money(n) {
  return "KES " + n.toLocaleString();
}

function totalSpent(list) {
  let total = 0;
  for (let e of list) total += e.amount;
  return total;
}

function balance(budget, spent) {
  return budget - spent;
}

function setBudget() {
  let v = Number(prompt("Enter your monthly budget (KES):"));
  budget = isNaN(v) || v < 0 ? 0 : v;
  update();
}

function update() {
  let spent = totalSpent(expenses);
  let left = balance(budget, spent);
  let pct = budget ? Math.round(spent / budget * 100) : 0;

  $("left").textContent = money(left);
  $("budget").textContent = money(budget);
  $("spent").textContent = money(spent);
  $("count").textContent = expenses.length;
  $("bar").style.width = Math.min(pct, 100) + "%";
  $("bar").classList.toggle("over", left < 0);
  $("msg").textContent = !budget ? 'Click "Set budget" to begin.'
    : left < 0 ? "Over budget by " + money(-left)
    : "Within budget: " + pct + "% used";

  $("rows").innerHTML = "";
  for (let e of expenses) {
    let r = $("rows").insertRow();
    r.insertCell().textContent = e.name;
    r.insertCell().textContent = money(e.amount);
    r.insertCell().textContent = e.category;
    r.insertCell().textContent = e.date;
  }

  console.log("===== SpendWise Summary =====");
  console.log("Budget: " + money(budget));
  console.log("Total spent: " + money(spent));
  console.log("Remaining balance: " + money(left));
}

$("form").addEventListener("submit", e => {
  e.preventDefault();
  expenses.push({
    name: $("item").value,
    amount: Number($("amount").value),
    category: $("category").value,
    date: $("date").value || new Date().toISOString().slice(0, 10)
  });
  e.target.reset();
  update();
});
function setProfile() {
  let n = (prompt("Enter your name:") || "").trim();
  if (!n) return;
  $("userName").textContent = n;
  $("avatar").textContent = n[0].toUpperCase();
  console.log("Profile set: " + n);
}
$("budgetBtn").addEventListener("click", setBudget);
$("profileBtn").addEventListener("click", setProfile);
update();
