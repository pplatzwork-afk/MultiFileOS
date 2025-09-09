const ComponentRegistry = {
  components: {},
  register(name, renderFn) {
    this.components[name] = renderFn;
  },
  render(name, props = {}) {
    if (!this.components[name]) return document.createTextNode(`Missing: ${name}`);
    return this.components[name](props);
  }
};

// Sample component
ComponentRegistry.register('card', ({ title, content }) => {
  const div = document.createElement('div');
  div.className = 'plugin-box';
  div.innerHTML = `<h3>${title}</h3><p>${content}</p>`;
  return div;
});