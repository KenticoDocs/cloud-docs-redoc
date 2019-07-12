(function () {

  /* Helper methods */
  var setCookie = (name, value, days) => {
    var expires = '';
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  };

  var getCookie = (name) => {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  var triggerClick = function (item) {
    setTimeout(function () {
      item.click();
    }, 0);
  };

  /* Code blocks inside documentation body */
  var getPrismClassName = function (item) {
    var lang = 'lang-';
    item = item.toLowerCase();

    if (item) {
      switch (item) {
        case 'rest':
          lang += 'shell';
          break;
        case 'shell':
          lang += 'shell';
          break;
        case 'curl':
          lang += 'shell';
          break;
        case '_net':
          lang += 'dotnet';
          break;
        case 'javascript':
          lang += 'js';
          break;
        case 'typescript':
          lang += 'ts';
          break;
        case 'java':
          lang += 'java';
          break;
        case 'android':
          lang += 'java';
          break;
        case 'javarx':
          lang += 'java';
          break;
        case 'php':
          lang += 'php';
          break;
        case 'ios':
          lang += 'swift';
          break;
        case 'python':
          lang += 'python';
          break;
        case 'ruby':
          lang += 'ruby';
          break;
        default:
          lang += 'clike';
      }
    } else {
      lang += 'clike';
    }

    return lang;
  };

  var codeBlocks = function () {
    var blocks = document.querySelectorAll('[data-platform-code]');

    var interval = setInterval(function () {
      blocks = document.querySelectorAll('[data-platform-code]');
      if (blocks.length) {
        initCodeBlocks(blocks);
        clearInterval(interval);
      }
    }, 100);
  };

  var createHighlightedBlock = function (block) {
    setTimeout(function () {
      var cleanCode = block.querySelector('.clean-code').innerHTML;
      var codeElem = document.createElement('code');
      codeElem.innerHTML = cleanCode;
      codeElem.classList.add(getPrismClassName(block.getAttribute('data-platform-code')));
      block.appendChild(codeElem);
      block.classList.add('hidden');
    }, 0);
  };

  var initCodeBlocks = function (blocks) {
    for (var i = 0; i < blocks.length; i++) {
      createHighlightedBlock(blocks[i]);
    }
  };

  codeBlocks();

  document.addEventListener('click', (e) => {
    if (e.target && e.target.matches('.language-selector__link')) {
      e.preventDefault();


      var platform = e.target.getAttribute('data-platform');
      var links = document.querySelectorAll('.language-selector__link');
      var linkRedoc = document.querySelector('.tab-click_' + platform);
      var blocks = document.querySelectorAll('[data-platform-code]');

      setCookie('KCDOCS.preselectedLanguage', platform);

      for (var i = 0; i < links.length; i++) {
        if (links[i].getAttribute('data-platform') === platform) {
          links[i].classList.add('language-selector__link--active');
        } else {
          links[i].classList.remove('language-selector__link--active');
        }
      }

      for (var i = 0; i < blocks.length; i++) {
        if (blocks[i].getAttribute('data-platform-code') === platform) {
          blocks[i].classList.remove('hidden');
          Prism.highlightElement(blocks[i].querySelector('code'));
        } else {
          blocks[i].classList.add('hidden');
        }
      }

      if (linkRedoc) {
        linkRedoc.click();
      }
    }
  });


  /* Code blocks for requests and responses */
  var initPlatfromFromCookie = function () {
    var clicked = false;

    var cookie = getCookie('KCDOCS.preselectedLanguage');

    if (cookie && !clicked) {
      var tabs = document.querySelectorAll('[class="tab-click_' + cookie + '"], [data-platform="' + cookie + '"]');
      for (var i = 0; i < tabs.length; i++) {
        clicked = true;
        triggerClick(tabs[i]);
      }

      setTimeout(function () {
        clicked = false;
      }, 0);
    } else {
      triggerClick(document.querySelector('[data-platform]'));
    }
  };

  var getPlatformFromClassName = function (className) {
    var classNames = className.split(' ');
    var platform = '';
    for (var i = 0; i < classNames.length; i++) {
      if (classNames[i].indexOf('tab-click_') > -1) {
        platform = classNames[i].replace('tab-click_', '');
      }
    }

    return platform;
  };

  var clickTab = function () {
    var tabs = document.querySelectorAll('[class*="tab-click_"], [data-platform]');
    var body = document.querySelector('body');
    var clicked = false;

    var interval = setInterval(function () {
      tabs = document.querySelectorAll('[class*="tab-click_"], [data-platform]');
      if (tabs.length) {
        initPlatfromFromCookie();
        clearInterval(interval);
      }
    }, 100);

    body.addEventListener('click', function (e) {
      if (e.target && e.target.className.indexOf('tab-click_') > -1 && !clicked) {

        var platform = getPlatformFromClassName(e.target.className);
        var className = 'tab-click_' + platform;

        setCookie('KCDOCS.preselectedLanguage', platform);

        if (!tabs.length) {
          tabs = document.querySelectorAll('[class*="tab-click_"], [data-platform]');
        }

        for (var i = 0; i < tabs.length; i++) {
          if ((tabs[i].classList.contains(className) || tabs[i].getAttribute('data-platform') === platform) && tabs[i] !== e.target) {
            clicked = true;
            triggerClick(tabs[i]);
          }
        }

        setTimeout(function () {
          clicked = false;
        }, 0);
      }
    });
  };

  clickTab();
})();
