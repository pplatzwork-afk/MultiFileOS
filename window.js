function createWindow({ title, content }) {
  const win = document.createElement('div');
  win.className = 'window';
  win.innerHTML = `
    <div class="window-header">
      <span>${title}</span>
      <button class="close-btn">×</button>
    </div>
    <div class="window-body"></div>
  `;
  win.querySelector('.window-body').appendChild(content);
  win.querySelector('.close-btn').onclick = () => win.remove();
  makeDraggable(win);
  document.getElementById('desktop').appendChild(win);
}

function makeDraggable(el) {
  let offsetX, offsetY;
  const header = el.querySelector('.window-header');
  header.onmousedown = e => {
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
    document.onmousemove = e => {
      el.style.left = `${e.clientX - offsetX}px`;
      el.style.top = `${e.clientY - offsetY}px`;
    };
    document.onmouseup = () => document.onmousemove = null;
  };
}