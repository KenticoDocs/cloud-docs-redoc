import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
// import DevTools from 'mobx-react-devtools';

import { Redoc, RedocProps } from '../../src/components/Redoc/Redoc';
import { AppStore } from '../../src/services/AppStore';
import { RedocRawOptions } from '../../src/services/RedocNormalizedOptions';
import { loadAndBundleSpec } from '../../src/utils/loadAndBundleSpec';

const renderRoot = (props: RedocProps) =>
  render(
    <AppContainer>
      <Redoc {...props} />
    </AppContainer>,
    document.getElementById('example'),
  );

/*const big = window.location.search.indexOf('big') > -1;
const swagger = window.location.search.indexOf('swagger') > -1;

const userUrl = window.location.search.match(/url=(.*)$/);*/

const specUrl = 'test.json';
// (userUrl && userUrl[1]) || (swagger ? 'swagger.yaml' : big ? 'big-openapi.json' : 'openapi.yaml');

let store;
const options: RedocRawOptions = {
  nativeScrollbars: false,
  disableSearch: true,
  pathInMiddlePanel: true,
  theme: {
    spacing: {
      unit: 4,
    },
    colors: {
      primary: {
        main: '#231F20',
      },
      responses: {
        success: {
          color: '#36A284',
          backgroundColor: '#ecf6f2',
          backgroundColorHover: '#ecf6f2',
        },
        error: {
          color: '#B72929',
          backgroundColor: '#f7e9e9',
          backgroundColorHover: '#f7e9e9',
        },
        redirect: {
          color: '#FBC15E',
        },
        info: {
          color: '#F05A22',
        },
      },
      http: {
        get: '#36A284',
        post: '#8951A5',
        put: '#4863BE',
        options: '#EBB500',
        patch: '#F05A22',
        delete: '#B72929',
        basic: '#96A236',
        link: '#908E8F',
        head: '#231F20',
      },
    },
    typography: {
      fontFamily: 'GT Walsheim Pro, Helvetica, Arial, sans-serif',
      fontSize: '1em',
      fontWeightBold: '700',
      headings: {
        fontFamily: 'GT Walsheim Pro, Helvetica, Arial, sans-serif',
        fontWeight: '700',
        lineHeight: '1.25em',
      },
      links: {
        color: '#F05A22',
        hover: '#F05A22',
      },
      code: {
        fontFamily: 'Inconsolata, monospace',
        fontSize: '.875em',
        color: '#E73430',
        backgroundColor: '#f3f6f7',
      },
    },
    rightPanel: {
      backgroundColor: '#fff',
      width: '40%',
      textColor: '#231F20',
    },
    menu: {
      width: '352px',
      textColor: '#908E8F',
      backgroundColor: '#fff',
      arrow: {
        size: '1.125em',
        color: '#F05A22',
      },
    },
    schema: {
      linesColor: '#bcbbbb',
      typeNameColor: '#908E8F',
      typeTitleColor: '#F49300',
      requireLabelColor: '#ED6A56',
      labelsTextSize: '0.875em',
      nestedBackground: '#f3f3f3',
    },
  },
};

async function init() {
  const spec = await loadAndBundleSpec(specUrl);
  store = new AppStore(spec, specUrl, options);
  renderRoot({ store });
}

init();

if (module.hot) {
  const reload = (reloadStore = false) => async () => {
    if (reloadStore) {
      // create a new Store
      store.dispose();

      const state = await store.toJS();
      store = AppStore.fromJS(state);
    }

    renderRoot({ store });
  };

  module.hot.accept(['../../src/components/Redoc/Redoc'], reload());
  module.hot.accept(['../../src/services/AppStore'], reload(true));
}
