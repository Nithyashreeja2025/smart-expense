function exportCSV(){

    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const budget = Number(localStorage.getItem("budget")) || 0;

    if(expenses.length === 0){
        alert("No data to export");
        return;
    }

    let csv = "id,description,amount,type,category,date,time,location,payment_mode,note,created_at,month,year,budget,budget_status,remaining_budget\n";

    let totalExpense = 0;

    expenses.forEach((e, index) => {

        if(e.type === "expense"){
            totalExpense += Number(e.amount);
        }

        const dateObj = new Date(e.date || Date.now());

        const month = dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();

        const remainingBudget = budget - totalExpense;
        const budgetStatus = totalExpense > budget ? "EXCEEDED" : "WITHIN_LIMIT";

        csv += `${e.id || index+1},` +
               `"${e.desc || ""}",` +
               `${e.amount || 0},` +
               `${e.type || ""},` +
               `"${e.category || "General"}",` +
               `${e.date || ""},` +
               `${e.time || ""},` +
               `"${e.location || "NA"}",` +
               `"${e.payment || "NA"}",` +
               `"${e.notes || ""}",` +
               `"${e.created_at || ""}",` +   
               `${month},` +
               `${year},` +
               `${budget},` +
               `${budgetStatus},` +
               `${remainingBudget}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "smart_finance_report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
