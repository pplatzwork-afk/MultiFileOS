const plugins = {};
const tasks = [];

async function loadPlugin(manifest) {
  try {
    const res = await fetch(manifest.url);
    const code = await res.text();
    const module = new Function('app', 'tasks', 'createWindow', 'ComponentRegistry', 'State', code);
    module(document.getElementById('desktop'), tasks, createWindow, ComponentRegistry, State);
    plugins[manifest.name] = manifest;
    console.log(`✅ Loaded plugin: ${manifest.name}`);
  } catch (err) {
    console.error(`❌ Failed to load plugin: ${manifest.name}`, err);
  }
}

function saveManifest() {
  const raw = document.getElementById('manifestInput').value;
  try {
    const manifest = JSON.parse(raw);
    localStorage.setItem(`plugin-${manifest.name}`, raw);
    loadPlugin(manifest);
  } catch (err) {
    alert('Invalid manifest JSON');
  }
}

function loadStoredManifests() {
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('plugin-')) {
      try {
        const manifest = JSON.parse(localStorage.getItem(key));
        loadPlugin(manifest);
      } catch (err) {
        console.warn('Failed to load stored plugin:', key);
      }
    }
  });
}

function discoverPlugins(url) {
  fetch(url)
    .then(res => res.json())
    .then(list => list.forEach(loadPlugin))
    .catch(err => console.error('Discovery failed:', err));
}