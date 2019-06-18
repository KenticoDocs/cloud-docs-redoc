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

const big = window.location.search.indexOf('big') > -1;
const swagger = window.location.search.indexOf('swagger') > -1;

const userUrl = window.location.search.match(/url=(.*)$/);

const specUrl =
  (userUrl && userUrl[1]) || (swagger ? 'swagger.yaml' : big ? 'big-openapi.json' : 'openapi.yaml');

let store;
const options: RedocRawOptions = {
  nativeScrollbars: false,
  disableSearch: true,
  theme: {
    spacing: {
      unit: 4,
    },
    colors: {
      primary: {
        main: '#2D373B',
      },
      responses: {
        success: {
          color: '#00A54B',
          backgroundColor: '#e3f0e1',
          backgroundColorHover: '#C8E2C4',
        },
        error: {
          color: '#E73430',
          backgroundColor: '#fdf0ec',
          backgroundColorHover: '#FCE2D9',
        },
        redirect: {
          color: '#FBC15E',
        },
        info: {
          color: '#007DCC',
        },
      },
      http: {
        get: '#67B870',
        post: '#007DCC',
        put: '#937AB4',
        options: '#FBC15E',
        patch: '#FBC15E',
        delete: '#ED6A56',
        basic: '#6B7C85',
        link: '#6B7C85',
        head: '#937AB4',
      },
    },
    typography: {
      fontFamily: 'Source Sans Pro, Helvetica, Arial, sans-serif',
      fontSize: '1em',
      fontWeightBold: '700',
      headings: {
        fontFamily: 'Source Sans Pro, Helvetica, Arial, sans-serif',
        fontWeight: '400',
        lineHeight: '1.25em',
      },
      links: {
        color: '#007DCC',
        hover: '#e46952',
      },
      code: {
        fontFamily: 'Inconsolata, monospace',
        fontSize: '.875em',
        color: '#E73430',
        backgroundColor: '#f3f6f7',
      },
    },
    rightPanel: {
      backgroundColor: '#2D373B',
      width: '40%',
      textColor: '#F3F6F7',
    },
    menu: {
      width: '352px',
      textColor: '#6B7C85',
      backgroundColor: '#fff',
      arrow: {
        size: '1.25em',
        color: '#008AE1',
      },
    },
    schema: {
      linesColor: '#AEBCC5',
      typeNameColor: '#80939e',
      typeTitleColor: '#F49300',
      requireLabelColor: '#ED6A56',
      labelsTextSize: '0.875em',
      nestedBackground: '#f3f6f7',
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
