// renderer.js
const { ipcRenderer } = require('electron');

document.getElementById('generateBtn').addEventListener('click', () => {
    const url = document.getElementById('urlInput').value;
    ipcRenderer.invoke('generate-crawler', url).then((result) => {
        document.getElementById('output').innerText = result;
    });
});
