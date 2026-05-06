function addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toLocaleDateString("bn-BD");
}

function generateSchedule() {
    let dob = document.getElementById("dob").value;

    if (!dob) {
        alert("দয়া করে জন্ম তারিখ দিন");
        return;
    }

    let tbody = document.querySelector("#result tbody");
    tbody.innerHTML = "";

    let vaccines = [
        { name: "BCG", time: "জন্মের পর", days: 0 },
        { name: "Pentavalent + PCV + bOPV", time: "৬ সপ্তাহ", days: 42 },
        { name: "Pentavalent + PCV + bOPV", time: "১০ সপ্তাহ", days: 70 },
        { name: "Pentavalent + PCV + bOPV", time: "১৪ সপ্তাহ", days: 98 },
        { name: "IPV", time: "৬ সপ্তাহ", days: 42 },
        { name: "IPV", time: "১৪ সপ্তাহ", days: 98 },
        { name: "MR", time: "৯ মাস", days: 270 },
        { name: "MR", time: "১৫ মাস", days: 450 }
    ];

    // 🔥 Group by date
    let grouped = {};

    vaccines.forEach(v => {
        let date = addDays(dob, v.days);

        if (!grouped[date]) {
            grouped[date] = {
                doses: [],
                time: v.time
            };
        }

        grouped[date].doses.push(v.name);
    });

    // 🔥 Render table
    Object.keys(grouped).forEach(date => {
        let row = document.createElement("tr");

        let doseList = grouped[date].doses;
        let doseCount = doseList.length;

        row.innerHTML = `
            <td>💉 ${doseList.join(" + ")}</td>
            <td>${grouped[date].time}</td>
            <td> ${date}</td>
            <td>💊 ${doseCount} dose</td>
        `;

        tbody.appendChild(row);
    });
}

document.getElementById("vaccineForm").addEventListener("submit", function(e) {
    e.preventDefault();
    generateSchedule();
});