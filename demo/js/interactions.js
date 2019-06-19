(function () {

  var triggerClick = function (item) {
    setTimeout(function () {
      item.click();
    }, 0);
  };

  var clickTab = function () {
    var tabs = document.querySelectorAll('[class*="tab-click_"]');
    var body = document.querySelector('body');
    var clicked = false;

    body.addEventListener('click', function (e) {
      if (e.target && e.target.className.indexOf('tab-click_') > -1 && !clicked) {
        var className;

        if (!tabs.length) {
          tabs = document.querySelectorAll('[class*="tab-click_"]');
        }

        for (var i = 0; i < e.target.classList.length; i++) {
          if (e.target.classList[i].indexOf('tab-click_') > -1) {
            className = e.target.classList[i];
          }
        }

        for (var i = 0; i < tabs.length; i++) {
          if (tabs[i].classList.contains(className) && tabs[i] !== e.target) {
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
