(function () {
  /* Helper methods */
  var triggerClick = function (item) {
    setTimeout(function () {
      item.click();
    }, 0);
  };

  /* Code blocks inside documentation body */
  var getPrismClassName = function (item) {
    var lang;
    var pairings = {
      'rest': 'shell',
      'shell': 'shell',
      'curl': 'shell',
      '_net': 'dotnet',
      'c_': 'dotnet',
      'javascript': 'js',
      'json': 'js',
      'typescript': 'ts',
      'java': 'java',
      'android': 'java',
      'javarx': 'java',
      'php': 'php',
      'swift': 'swift',
      'python': 'python',
      'ruby': 'ruby'
    }

    if (item && item.codename) {
      lang = pairings[item.codename];
    }

    if (!lang) {
      lang = 'clike';
    }

    return 'lang-' + lang;
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

  codeBlocks();

  document.addEventListener('click', (e) => {
    if (e.target && e.target.matches('.language-selector__link')) {
      e.preventDefault();

      var platform = e.target.getAttribute('data-platform');
      var links = document.querySelectorAll('.language-selector__link');
      var linkRedoc = document.querySelector('.tab-click_' + platform);
      var blocks = document.querySelectorAll('[data-platform-code]');

      window.helper.setCookie('KCDOCS.preselectedLanguage', platform);

      for (var i = 0; i < links.length; i++) {
        if (links[i].getAttribute('data-platform') === platform) {
          links[i].classList.add('language-selector__link--active');
        } else {
          links[i].classList.remove('language-selector__link--active');
        }
      }

      for (var j = 0; j < blocks.length; j++) {
        if (blocks[j].getAttribute('data-platform-code') === platform) {
          blocks[j].classList.remove('hidden');
          window.Prism.highlightElement(blocks[j].querySelector('code'));
        } else {
          blocks[j].classList.add('hidden');
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

    var cookie = window.helper.getCookie('KCDOCS.preselectedLanguage');

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

        window.helper.setCookie('KCDOCS.preselectedLanguage', platform);

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

  var setButtonPosition = function (button) {
    if (window.pageYOffset < 56) {
      if (!button.classList.contains('nav-trigger-top')) {
        button.classList.add('nav-trigger-top');
      }
    } else {
      button.classList.remove('nav-trigger-top');
    }
  };

  var floatingButtonPosition = function () {
    var button = document.querySelector('[class*="__FloatingButton"]');

    var interval = setInterval(function () {
      button = document.querySelector('[class*="__FloatingButton"]');
      if (button) {
        setButtonPosition(button);
        clearInterval(interval);
      }
    }, 100);
  };

  floatingButtonPosition();
  window.addEventListener('scroll', function () {
    var button = document.querySelector('[class*="__FloatingButton"]');
    setButtonPosition(button);
  });
})();
