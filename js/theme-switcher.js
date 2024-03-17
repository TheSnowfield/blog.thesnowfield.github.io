// icarus theme switcher
// by TheShowfield

// https://stackoverflow.com/questions/14573223/set-cookie-and-get-cookie-with-javascript
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

// https://stackoverflow.com/questions/14573223/set-cookie-and-get-cookie-with-javascript
function setCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

const _get_browser_dark = () => {
  if(!window.matchMedia) return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const _save_dark_theme = (isdark) => {
  setCookie('theme-mode', isdark?'dark':'light', 999);
};

const _get_dark_theme = () => {
  let cookie = getCookie('theme-mode');
  if(!cookie) return null;
  return cookie == 'dark';
};

const _enable_animation = (b) => {
  let body = document.querySelector('body');

  if(b) {
    let style = document.createElement('style');
    style.id = "_global_animation";
    style.innerHTML= "* { transition: linear 0.2s!important }";
    body.appendChild(style);
    setTimeout(()=>_enable_animation(false), 300);
  }

  else {
    let style = document.querySelector('#_global_animation');
    if(style) style.remove();
  }

};

let thememode = {};
let themelist = ['dark', 'light'];
const _download_themes = () => {

  let _promises = [];
  themelist.forEach( x => {
    _promises[themelist.indexOf(x)] =
      fetch('/css/default-' + x + '.css')
      .then(res => res.text())
      .then(txt => thememode[x] = txt);
  });

  return Promise.all(_promises);
};

// apply theme on start
_download_themes()
  .then(_ => _get_dark_theme())
  .then(val => { if(val != null) return val; else return _get_browser_dark(); })
  .then(val => { document.querySelector('#theme-switcher').innerHTML = thememode[val ? 'dark' : 'light']; return val; })
  .then(val => { _save_dark_theme(val); return val; });

// mount onclick event for button
document.addEventListener('DOMContentLoaded', async () => {

  let _is_dark = _get_dark_theme();

  let button = document.querySelector('.navbar-item[title="Dark Mode"]');
  let icon = document.querySelector('.navbar-item[title="Dark Mode"] > i');

  // remove icarus default event
  button.attributes.removeNamedItem('target');
  button.attributes.removeNamedItem('href');

  // apply icon
  if(_is_dark)
    button.classList.add('is-active');
  else
    button.classList.remove('is-active');
  
  icon.className = _get_dark_theme() ? 'fa-solid fa-moon' : 'fa-solid fa-sun';

  // handle event
  button.onclick = async() => {
    
    // switch the theme modes
    let is_darkmode = !(_get_dark_theme());
    if(is_darkmode == null) is_darkmode = false;

    // save cookie
    _save_dark_theme(is_darkmode);

    // apply animation to all elements
    _enable_animation(true);
    let switcher = document.querySelector('#theme-switcher');
    switcher.innerHTML = thememode[is_darkmode ? 'dark' : 'light'];

    if(is_darkmode)
      button.classList.add('is-active');
    else
      button.classList.remove('is-active');

    let icon = document.querySelector('.navbar-item[title="Dark Mode"] > i');
    icon.className = is_darkmode ? 'fa-solid fa-moon' : 'fa-solid fa-sun';

  };

});
