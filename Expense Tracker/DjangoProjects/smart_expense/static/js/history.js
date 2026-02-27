document.addEventListener("DOMContentLoaded", loadHistory);

function loadHistory(){
    const container = document.getElementById("historyList");
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    render(expenses);

    document.getElementById("search").addEventListener("input", () => filter(expenses));
    document.getElementById("filterType").addEventListener("change", () => filter(expenses));

    function filter(data){
        const q = document.getElementById("search").value.toLowerCase();
        const type = document.getElementById("filterType").value;

        let filtered = data.filter(e => 
            (e.desc?.toLowerCase().includes(q) || 
             e.category?.toLowerCase().includes(q)) &&
            (type === "all" || e.type === type)
        );

        render(filtered);
    }

    function render(data){
        container.innerHTML = "";

        if(data.length === 0){
            container.innerHTML = "<p class='empty'>No records found</p>";
            return;
        }

        const sorted = [...data].sort(
            (a,b)=> new Date(b.created_at) - new Date(a.created_at)
        );

        sorted.forEach(e=>{
            const div = document.createElement("div");
            div.className = `history-item ${e.type}`;
            div.innerHTML = `
                <div>
                    <strong>${e.desc}</strong>
                    <small>${e.category || "General"} • ${e.date}</small>
                </div>
                <div class="amt ${e.type}">
                    ${e.type==="income"?"+":"-"}₹${e.amount}
                </div>
            `;
            container.appendChild(div);
        });
    }
}

function clearHistory(){
    if(confirm("This will delete ALL stored data permanently. Continue?")){
        localStorage.removeItem("expenses");
        localStorage.removeItem("budget");
        location.reload();
    }
}
