const tabs = document.querySelectorAll(".tabs a");
const openFiles = document.querySelectorAll(".open-file");
const articles = document.querySelectorAll("article");
const syntax = document.querySelector("#syntax");
const lineLengths = {};

function switchTab(e) {
    const t = e.currentTarget;
    const id = t.dataset.target;
    const active = document.querySelectorAll(`[data-target="${id}"]`);
    const tabPanel = document.querySelector(id);
    
    const syntaxName = {
        "#readme": "Markdown",
        "#php": "PHP",
        "#js": "JavaScript",
        "#less": "LessCSS",
        "#adaptive": "JSON",
    }[id];
    
    syntax.innerHTML = syntaxName;
    
    tabs.forEach(t => t.classList.remove("active"));
    openFiles.forEach(t => t.classList.remove("active"));
    articles.forEach(t => t.classList.remove("active"));
    
    active.forEach(el => el.classList.add("active"));
    tabPanel.classList.add("active");
    
    setupLineNumbers(id, tabPanel);
}

function setupLineNumbers(id, tabPanel) {
    let lineBox = document.querySelector(`${id} .line-box`);
    
    if (lineBox === null) {
        let n = id.substring(1);
        lineBox = document.createElement("div");
        lineBox.className = "line-box";

        for (let i = 0; i < lineLengths[n]; i++) {
            const line = document.createElement("div");

            line.textContent = i + 1;
            lineBox.appendChild(line);
        }
        
        tabPanel.appendChild(lineBox);
    }
}

tabs.forEach(t => t.addEventListener("click", switchTab));
openFiles.forEach(t => t.addEventListener("click", switchTab));

articles.forEach(a => {
    lineLengths[a.id] = a.innerHTML.split("\n").length - 1;
});

switchTab({currentTarget: document.querySelector('[data-target="#readme"]')});