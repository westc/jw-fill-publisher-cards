function getPublisherCardXFDFCode(publisher, firstServiceYear) {
  const secondServiceYear = firstServiceYear + 1;
  
  const SERVICE_MONTHS = ["September", "October", "November", "December", "January", "February", "March", "April", "May", "June", "July", "August"];

  const fieldTranslations = {
    "Name": "name",
    "Date of birth": "birthDate",
    "Date immersed": "baptismDate",
    "Check Box1": "isMale",
    "Check Box2": "isFemale",
    "Check Box3": "isOtherSheep",
    "Check Box4": "isAnointed",
    "Check Box5": "isElder",
    "Check Box6": "isServant",
    "Check Box7": "isRegularPioneer",
  };

  publisher.serviceYears.forEach((serviceYearRecord, serviceYearRecordIndex) => {
    if ([firstServiceYear, secondServiceYear].includes(serviceYearRecord.year)) {
      const isFirstYear = serviceYearRecord.year === firstServiceYear;
      const barYearNum = isFirstYear ? '' : '_2';
      const yearNum = isFirstYear ? 1 : 2;
      fieldTranslations[`Service Year${barYearNum}`] = ["serviceYears", serviceYearRecordIndex, "year"];
      serviceYearRecord.months.forEach((month, monthIndex) => {
        const monthName = SERVICE_MONTHS[monthIndex];
        const monthNum = monthIndex + 1;
        const path = ["serviceYears", serviceYearRecordIndex, "months", monthIndex];
        Object.assign(fieldTranslations, {
          [`${yearNum}-Place_${monthNum}`]: path.concat(["placements"]),
          [`${yearNum}-Video_${monthNum}`]: path.concat(["videos"]),
          [`${yearNum}-Hours_${monthNum}`]: path.concat(["hours"]),
          [`${yearNum}-RV_${monthNum}`]: path.concat(["rvs"]),
          [`${yearNum}-Studies_${monthNum}`]: path.concat(["studies"]),
          [`Remarks${monthName}${barYearNum}`]: path.concat(["notes"]),
        });
      });
    }
  });

  const escapeValue = value => (
    value === true
      ? 'Yes'
      : value === false
        ? 'Off'
        : `${value}`.replace(/\W/g, c => '&#' + c.charCodeAt(0) + ';')
  );

  return Object.entries(fieldTranslations).reduce(
    (xmlLines, [key, pathInReport]) => {
      if (!Array.isArray(pathInReport)) {
        pathInReport = [pathInReport];
      }
      let value = publisher;
      let failed;
      for (let pathPart of pathInReport) {
        if (failed = !({}).hasOwnProperty.call(value, pathPart)) {
          break;
        }
        value = value[pathPart];
      }
      if (!failed) {
        xmlLines.splice.apply(xmlLines, [
          -2,
          0,
          `\t\t<field name="${escapeValue(key)}">`,
          `\t\t\t<value>${escapeValue(value)}</value>`,
          '\t\t</field>'
        ]);
      }
      return xmlLines;
    },
    [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<xfdf xmlns="http://ns.adobe.com/xfdf/" xml:space="preserve">',
      '\t<fields>',
      '\t</fields>',
      '</xfdf>',
    ]
  ).join('\n')
}


const publisher = {
  name: "Juan Mamani Beltrán",
  birthDate: "3 agosto 2001",
  baptismDate: "15 enero 2019",
  isMale: true,
  isFemale: false,
  isOtherSheep: true,
  isAnointed: false,
  isElder: false,
  isServant: false,
  isRegularPioneer: true,
  serviceYears: [
    {
      year: 2021,
      months: [
        {}, // September
        {}, // October
        {rvs: 12, hours: 18}, // November
        {}, // December
        {}, // January
        {}, // February
        {}, // March
        {}, // April
        {}, // May
        {}, // June
        {placements: 13, hours: 13}, // July
        {hours: 10, studies: 4, notes: 'Hello world!!!'}, // August
      ]
    }
  ]
};


const now = new Date();
const firstServiceYear = now.getFullYear() + (now.getMonth() >= 9 ? 1 : 0) - 1;
require('fs').writeFileSync('PublisherCard.es.xfdf', getPublisherCardXFDFCode(publisher, firstServiceYear));
