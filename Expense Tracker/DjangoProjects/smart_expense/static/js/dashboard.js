document.addEventListener("DOMContentLoaded", function () {

    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    let income = 0, expense = 0;

    // totals
    expenses.forEach(e => {
        if (e.type === "income") income += Number(e.amount);
        if (e.type === "expense") expense += Number(e.amount);
    });

    // UI update
    document.getElementById("income").innerText = "₹" + income;
    document.getElementById("expense").innerText = "₹" + expense;
    document.getElementById("balance").innerText = "₹" + (income - expense);

    // recent transactions
    const list = document.getElementById("txList");
    list.innerHTML = "";

    expenses.slice(-5).reverse().forEach(e => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${e.desc}</span>
            <span class="amount-${e.type}">
                ${e.type === "income" ? "+" : "-"}₹${e.amount}
            </span>
        `;
        list.appendChild(li);
    });

    // ====== CHART FIX (TRUE CHRONOLOGICAL ORDERING) ======

    // group by date (ONLY valid dates)
    const grouped = {};

    expenses.forEach(e => {

        if (!e.date) return;   // skip invalid/no-date entries

        // normalize date (YYYY-MM-DD)
        const dateObj = new Date(e.date);
        const key = dateObj.toISOString().split("T")[0];

        if (!grouped[key]) {
            grouped[key] = { income: 0, expense: 0 };
        }

        if (e.type === "income") grouped[key].income += Number(e.amount);
        if (e.type === "expense") grouped[key].expense += Number(e.amount);
    });


    // convert to array of objects for proper sorting
    const timeline = Object.keys(grouped).map(dateStr => {
        return {
            date: dateStr,
            timestamp: new Date(dateStr).getTime(),
            income: grouped[dateStr].income,
            expense: grouped[dateStr].expense
        };
    });

    // TRUE chronological sort
    timeline.sort((a, b) => a.timestamp - b.timestamp);

    // extract sorted data
    const labels = timeline.map(item => item.date);
    const incomeData = timeline.map(item => item.income);
    const expenseData = timeline.map(item => item.expense);


    // draw chart
    const ctx = document.getElementById("dashChart").getContext("2d");

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Income',
                    data: incomeData,
                    borderWidth: 3,
                    tension: 0.4
                },
                {
                    label: 'Expense',
                    data: expenseData,
                    borderWidth: 3,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: "#ffffff",
                        font: { size: 14, weight: '600' }
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: "#ffffff" },
                    grid: { color: "rgba(255,255,255,0.1)" }
                },
                y: {
                    ticks: { color: "#ffffff" },
                    grid: { color: "rgba(255,255,255,0.1)" }
                }
            }
        }
    });


});
