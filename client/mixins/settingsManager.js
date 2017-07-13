const Settings = () => ({
  state: {
    settings: JSON.parse(localStorage.getItem('settings')) || {},
  },
  actions: {
    toggleSetting: (state, actions, setting) => {
      const mergeObj = {};
      mergeObj[setting] = !state.settings[setting];
      const newSettings = Object.assign({}, state.settings, mergeObj);
      localStorage.setItem('settings', JSON.stringify(newSettings));
      console.log('new settings', newSettings);
      return { settings: newSettings };
    }
  }
});

module.exports = Settings;
