function loadExpenses() {
    const list = document.getElementById("expenseList");
    list.innerHTML = "";

    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    let income = 0;
    let expense = 0;

    expenses.forEach((exp) => {

        if (exp.type === "income") income += Number(exp.amount);
        else expense += Number(exp.amount);

        const li = document.createElement("li");

        li.innerHTML = `
            <span>${exp.desc}</span>
            <span>
                ${exp.type === "income" ? "+" : "-"} ₹${exp.amount}
            </span>
        `;

        list.appendChild(li);
    });

    document.getElementById("income").innerText = "₹" + income;
    document.getElementById("expense").innerText = "₹" + expense;
    document.getElementById("balance").innerText = "₹" + (income - expense);
}

function addExpense() {
    const desc = document.getElementById("desc").value;
    const amount = document.getElementById("amount").value;
    const type = document.getElementById("type").value;
    const date = document.getElementById("date").value;
    const location = document.getElementById("location").value;
    const category = document.getElementById("category").value;
    const payment = document.getElementById("payment").value;
    const notes = document.getElementById("notes").value;

    if (!desc || !amount || !date) {
        alert("Please fill Description, Amount and Date");
        return;
    }

    const now = new Date();
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    expenses.push({
        desc,
        amount: Number(amount),
        type,
        date,
        time: now.toTimeString().split(' ')[0],
        location,
        category,
        payment,
        notes,
        created_at: now.toISOString()
    });

    localStorage.setItem("expenses", JSON.stringify(expenses));
    loadExpenses();
}

document.addEventListener("DOMContentLoaded", loadExpenses);