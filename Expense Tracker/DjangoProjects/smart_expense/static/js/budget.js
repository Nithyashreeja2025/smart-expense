function setBudget(){
    const amount = Number(document.getElementById("budgetAmount").value);

    if(!amount || amount <= 0){
        alert("Enter valid budget");
        return;
    }

    localStorage.setItem("budget", amount);
    loadBudget();
}

function loadBudget(){
    const budget = Number(localStorage.getItem("budget")) || 0;
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    let totalExpense = 0;

    expenses.forEach(e=>{
        if(e.type === "expense"){
            totalExpense += e.amount;
        }
    });

    document.getElementById("totalBudget").innerText = "₹" + budget;
    document.getElementById("totalExpense").innerText = "₹" + totalExpense;
    document.getElementById("remaining").innerText = "₹" + (budget - totalExpense);

    const percent = budget > 0 ? (totalExpense / budget) * 100 : 0;
    document.getElementById("progress").style.width = Math.min(percent,100) + "%";

    /* ALERT SYSTEM */
    const warning = document.getElementById("warning");

    if(totalExpense > budget && budget !== 0){
        warning.style.display = "block";
        warning.classList.add("flash");
    }else{
        warning.style.display = "none";
        warning.classList.remove("flash");
    }
}

window.onload = loadBudget;
