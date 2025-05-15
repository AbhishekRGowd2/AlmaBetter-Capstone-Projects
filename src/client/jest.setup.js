// jest.setup.js

// Mock localStorage
if (!global.localStorage) {
    global.localStorage = {
      store: {},
      getItem(key) {
        return this.store[key] || null;
      },
      setItem(key, value) {
        this.store[key] = value.toString();
      },
      removeItem(key) {
        delete this.store[key];
      },
      clear() {
        this.store = {};
      },
    };
  } else {
    global.localStorage.clear = () => {
      global.localStorage.store = {};
    };
    global.localStorage.getItem = (key) => {
      return global.localStorage.store?.[key] || null;
    };
    global.localStorage.setItem = (key, value) => {
      if (!global.localStorage.store) global.localStorage.store = {};
      global.localStorage.store[key] = value.toString();
    };
    global.localStorage.removeItem = (key) => {
      delete global.localStorage.store?.[key];
    };
  }
  