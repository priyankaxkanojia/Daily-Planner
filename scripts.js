
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('entryForm');
    const entryList = document.getElementById('entryList');
    const moodBoard = document.getElementById('mood-board');
    let entries = JSON.parse(localStorage.getItem('plannerEntries')) || [];

    function saveEntries() {
        localStorage.setItem('plannerEntries', JSON.stringify(entries));
    }

    function renderEntries() {
        if (!entryList) return;
        entryList.innerHTML = '';
        entries.forEach((entry, index) => {
            const div = document.createElement('div');
            div.innerHTML = \`
                <strong>\${entry.time}</strong> - \${entry.thought} \${entry.mood}
                <button onclick="deleteEntry(\${index})">❌</button>
            \`;
            entryList.appendChild(div);
        });
    }

    function renderMoodBoard() {
        if (!moodBoard) return;
        moodBoard.innerHTML = '';
        entries.forEach(entry => {
            const div = document.createElement('div');
            div.innerHTML = \`
                <h3>\${entry.time}</h3>
                <p>\${entry.thought}</p>
                <p>Mood: \${entry.mood}</p>
            \`;
            moodBoard.appendChild(div);
        });
    }

    window.deleteEntry = function(index) {
        entries.splice(index, 1);
        saveEntries();
        renderEntries();
    }

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const time = document.getElementById('time').value;
            const thought = document.getElementById('thought').value;
            const mood = document.getElementById('mood').value;

            const newEntry = { time, thought, mood };
            entries.push(newEntry);
            saveEntries();
            renderEntries();
            form.reset();
        });
        renderEntries();
    }

    if (moodBoard) {
        renderMoodBoard();
    }
});
