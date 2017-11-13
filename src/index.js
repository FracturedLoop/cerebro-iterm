const {exec} = require('child_process');

const icon = '/Applications/iTerm.app';

const fn = ({term, display}) => {
  // Put your plugin code here
  let match = term.match(new RegExp(/^iterm\s*(.*)/, 'i'));

  if (match) {
    let command = match[1].replace(/"/g, '\\"');
    const onSelect = (event) => {
      exec(
        `osascript \
        -e 'tell application "iTerm" to create window with default profile' \
        -e 'tell application "System Events" to tell process "iTerm" to keystroke "${command}"' \
        -e 'tell application "System Events" to tell process "iTerm" to key code 52'`
      );
    };
    display({
      onSelect,
      title: `Run in iTerm`,
      icon,
      getPreview: () =>
        `<div style="text-align: center;">Press enter to run <br/>'<code style="background-color: #626262;">${match[1]}</code>'<br/> in a new iTerm window</div>`,
    });
  }
};

module.exports = {
  fn,
  keyword: 'iterm',
  name: 'iTerm',
};
