function toggleLoading(loading) {
  if (!loading) {
    $('#loading-spinner').addClass('d-none');
    return;
  }

  $('#loading-spinner').removeClass('d-none');
  $('#schedules-container').empty();
}

async function performAsyncTask(callback) {
  try {
    toggleLoading(true);
    await callback();
    toggleLoading(false);
  } catch (error) {
    toggleLoading(false);
    console.warn(error);
    alert(error.message);
  }
}

function getUserInfo() {
  const customerId = $('#customer-id').val();
  const name = $('#full-name').val();
  const birthYear = $('#birth-year').val();
  const height = $('#height').val();
  const weight = $('#weight').val();

  return {
    customerId,
    height,
    name,
    weight,
    age: new Date().getFullYear() - parseInt(birthYear),
  };
}

function getPersonalizedData() {
  const codes = _.map($('#personalized-table th[scope=row]').toArray(), 'dataset.code');
  const rpes = _.map($('#personalized-table input[name=rpe]').toArray(), 'value');
  const rests = _.map($('#personalized-table input[name=rest]').toArray(), 'value');
  const recommendedWeights = _.map($('#personalized-table input[name=recommended_weight]').toArray(), 'value');

  const rows = _.zip(codes, rpes, rests, recommendedWeights);

  return _.map(rows, ([code, rpe, rest, recommendedWeight]) => ({
    code, rpe, rest, recommendedWeight,
  }));
}

function generateScheduleFromInputs() {
  const userInfo = getUserInfo();
  const personalizedData = getPersonalizedData();
  const workoutLevel = $('#workout-level').val();
  const weeklyCode = $('#weekly-code').val();
  const weekVariant = $('#week-variant').val();
  const weekPeriod = $('#week-period')[0].valueAsDate;

  const { customerId } = userInfo;
  const checksum = VSG.UTILS.computeChecksum(customerId, workoutLevel, weeklyCode, weekVariant, weekPeriod);
  const renderingParams = {
    personalizedData, userInfo, weekPeriod, weekVariant, weeklyCode, workoutLevel,
  };

  const dailySchedules = _.map(
    _.range(VSG.CONSTANTS.WEEKDAYS.length),
    dayIndex => VSG.UTILS.renderDailySchedule({ ...renderingParams, dayIndex }),
  );

  const weeklySchedule = VSG.UTILS.renderWeeklySchedule(renderingParams);

  return { checksum, dailySchedules, customerId, weeklySchedule };
}

async function onDownloadSchedules() {
  const { checksum, dailySchedules, customerId, weeklySchedule } = await generateScheduleFromInputs();
  const prefix = `${customerId}_${checksum.substring(checksum.length - 6)}`;

  try {
    const zip = new JSZip();
    
    zip.file(`${prefix}-weekly.html`, weeklySchedule);
    _.each(dailySchedules, (dailySchedule, index) => {
      if (_.isEmpty(dailySchedule)) return;
      const weekday = VSG.CONSTANTS.WEEKDAYS[index];
      zip.file(`${prefix}-daily-${weekday}.html`, dailySchedule);
    });

    const downloadContent = await zip.generateAsync({ type: 'blob' })
    saveAs(downloadContent, `${prefix}.zip`);
  } catch (error) {
    console.error(error);
  }
}

async function onShowSchedules() {
  const { checksum, dailySchedules, weeklySchedule, customerId } = await generateScheduleFromInputs();
  const allSchedules = [
    weeklySchedule,
    ..._.reject(dailySchedules, _.isEmpty),
  ];
  $('#schedules-wrapper').html(_.join(allSchedules, '\n'));
}

function downloadSchedules() {
  performAsyncTask(onDownloadSchedules);
}

function showSchedules() {
  performAsyncTask(onShowSchedules);
}