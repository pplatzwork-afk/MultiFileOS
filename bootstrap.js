function addToTaskbar(name, launchFn) {
  const btn = document.createElement('button');
  btn.textContent = name;
  btn.onclick = launchFn;
  document.getElementById('taskbar').appendChild(btn);
}

function launchManifestEditor() {
  const container = document.createElement('div');
  container.className = 'plugin-box';
  container.innerHTML = `
    <h3>Plugin Manifest Editor</h3>
    <textarea id="manifestInput">{ "name": "hello-world", "url": "plugins/hello-world.js" }</textarea>
    <button onclick="saveManifest()">Save & Load Plugin</button>
  `;
  createWindow({ title: 'Manifest Editor', content: container });
}

window.addEventListener('DOMContentLoaded', () => {
  addToTaskbar('Manifest Editor', launchManifestEditor);
  createWindow({
    title: 'Welcome',
    content: ComponentRegistry.render('card', {
      title: 'Welcome to DevOS',
      content: 'Phase 3 is live. Windows, taskbar, and plugins are ready.'
    })
  });
  tasks.forEach(task => task());
  loadStoredManifests();
});