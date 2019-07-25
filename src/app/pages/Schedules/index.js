import _ from 'lodash';
import fp from 'lodash/fp';
import { Component } from 'preact';

// Template renderers
import { renderSchedulesHTML } from 'app/templates';

// Reusables
import NavBar from 'app/components/NavBar';

// Utils
import { zipAndSave } from 'app/utils';

import CustomerInfo from './CustomerInfo';
import EmailComposer from './EmailComposer';
import FormControls from './FormControls';
import PersonalizedTable from './PersonalizedTable';
import defaultState from './defaultState';

export default class Schedules extends Component {
  state = defaultState;

  onUpdateCustomerInfo = partial =>
    this.setState(({ customerInfo }) => ({ customerInfo: { ...customerInfo, ...partial } }));

  onUpdatePersonalizedData = partial =>
    this.setState(({ personalizedData }) => ({ personalizedData: { ...personalizedData, ...partial } }));

  onRenderSchedulesHTML = () => renderSchedulesHTML(this.state);

  onDownloadSchedules = async () => {
    const { checksum, dailySchedules, weeklySchedule } = renderSchedulesHTML(this.state);
    const prefix = `${this.state.customerInfo.customerId}_${checksum.substring(checksum.length - 6)}`;
    const dailyFiles = _.map(dailySchedules, ({ html, weekday }) => {
      if (_.isEmpty(html)) return undefined;

      return {
        content: html,
        fileName: `${prefix}-daily-${weekday}.html`,
      };
    });

    const allFiles = [{ content: weeklySchedule.html, fileName: `${prefix}-weekly.html` }, ..._.compact(dailyFiles)];

    try {
      await zipAndSave(allFiles, `${prefix}.zip`);
    } catch (error) {
      alert(error.message); // eslint-disable-line no-alert
    }
  };

  onPreviewSchedules = event => {
    event.preventDefault();

    const { dailySchedules, weeklySchedule } = renderSchedulesHTML(this.state);

    const schedulesHtml = fp.flow(
      fp.map('html'),
      fp.join('\n')
    )([weeklySchedule, ...dailySchedules]);

    window.$('#schedules-wrapper').html(schedulesHtml);
  };

  render() {
    const { customerInfo, personalizedData } = this.state;

    return (
      <div>
        <NavBar page="schedules" title="Công cụ tạo lịch" />
        <div className="container">
          <form action="#" onSubmit={this.onPreviewSchedules}>
            <div className="row">
              <CustomerInfo data={customerInfo} onUpdate={this.onUpdateCustomerInfo} />
              <PersonalizedTable
                customerInfo={customerInfo}
                data={personalizedData}
                onUpdate={this.onUpdatePersonalizedData}
              />
            </div>
            <FormControls onDownload={this.onDownloadSchedules} />
          </form>
          <EmailComposer
            customerName={this.state.customerInfo.name}
            onRenderSchedulesHTML={this.onRenderSchedulesHTML}
          />
        </div>
        <div className="mt-3 mx-auto" id="schedules-wrapper"></div>
      </div>
    );
  }
}
