import { observer } from 'mobx-react';
import * as React from 'react';
import { isPayloadSample, OperationModel, RedocNormalizedOptions } from '../../services';
import { PayloadSamples } from '../PayloadSamples/PayloadSamples';
import { SourceCodeWithCopy } from '../SourceCode/SourceCode';

import { RightPanelHeader, Tab, TabList, TabPanel, Tabs } from '../../common-elements';
import { OptionsContext } from '../OptionsProvider';

export interface RequestSamplesProps {
  operation: OperationModel;
}

@observer
export class RequestSamples extends React.Component<RequestSamplesProps> {
  static contextType = OptionsContext;
  context: RedocNormalizedOptions;
  operation: OperationModel;

  render() {
    const { operation } = this.props;
    const samples = operation.codeSamples;

    const hasSamples = samples.length > 0;
    const hideTabList = samples.length === 1 ? this.context.hideSingleRequestSampleTab : false;
    return (
      (hasSamples && (
        <div>
          <RightPanelHeader> Request samples </RightPanelHeader>

          <Tabs defaultIndex={0}>
            <TabList hidden={hideTabList}>
            {hasBodySample && <Tab key="payload" className="tab-click_payload" className="tab-click_payload"> Payload </Tab>}
              {samples.map(sample => (
                  <Tab key={sample.lang + '_' + (sample.label || '')}
                      className={(sample.label !== undefined
                          ? 'tab-click_' + sample.label
                          : 'tab-click_' + sample.lang
                      )
                          .toLowerCase()
                          .replace(/ /g, '_')
                          .replace(/\./g, '_')}
                  >
                  {sample.label !== undefined ? sample.label : sample.lang}
                </Tab>
              ))}
            </TabList>
            {samples.map(sample => (
            <TabPanel key={sample.lang + '_' + (sample.label || '')}
                className={(sample.label !== undefined
                    ? 'tab-click_' + sample.label
                    : 'tab-click_' + sample.lang
                )
                    .toLowerCase()
                    .replace(/ /g, '_')
                    .replace(/\./g, '_')}
            >
                {isPayloadSample(sample) ? (
                  <div>
                    <PayloadSamples content={sample.requestBodyContent} />
                  </div>
                ) : (
                  <SourceCodeWithCopy lang={sample.lang} source={sample.source} />
                )}
              </TabPanel>
            ))}
          </Tabs>
        </div>
      )) ||
      null
    );
  }
}
