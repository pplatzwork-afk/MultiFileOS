(function(app, tasks, createWindow, ComponentRegistry, State) {
  const card = ComponentRegistry.render('card', {
    title: 'Hello World',
    content: 'This plugin is running inside DevOS.'
  });
  createWindow({ title: 'Hello Plugin', content: card });
  tasks.push(() => console.log('Hello World plugin task'));
});