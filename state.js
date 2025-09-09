const State = {
  data: {},
  listeners: [],
  set(key, value) {
    this.data[key] = value;
    this.listeners.forEach(fn => fn(this.data));
  },
  subscribe(fn) {
    this.listeners.push(fn);
    fn(this.data);
  }
};