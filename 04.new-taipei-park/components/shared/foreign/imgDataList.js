import messages from '../../../data/i18n/messages';

const getForeignData = (locale) => {
  return {
    area_01: {        // 五股
      title: messages[`${locale}`]?.map_title_01,
      picture: [
        {
          name: messages[`${locale}`]?.park_area1_01,
          fileName: `foreign_01_01.jpg`
        },
        {
          name: messages[`${locale}`]?.park_area1_02,
          fileName: `foreign_01_02.jpg`,
        },
      ]
    },
    area_02: {        // 微風運河
      title: messages[`${locale}`]?.map_title_02,
      picture: [
        {
          name: messages[`${locale}`]?.park_area2_01,
          fileName: `foreign_02_01.jpg`
        },
        {
          name: messages[`${locale}`]?.park_area2_02,
          fileName: `foreign_02_02.jpg`,
        },
        {
          name: messages[`${locale}`]?.park_area2_03,
          fileName: `foreign_02_03.jpg`,
        },
        {
          name: messages[`${locale}`]?.park_area2_04,
          fileName: `foreign_02_04.jpg`,
        },
      ]
    },
    area_03: {        // 都會運動區
      title: messages[`${locale}`]?.map_title_03,
      picture: [
        {
          name: messages[`${locale}`]?.park_area3_01,
          fileName: `foreign_03_01.jpg`
        },
        {
          name: messages[`${locale}`]?.park_area3_02,
          fileName: `foreign_03_02.jpg`,
        },
        {
          name: messages[`${locale}`]?.park_area3_03,
          fileName: `foreign_03_03.jpg`,
        },
        {
          name: messages[`${locale}`]?.park_area3_04,
          fileName: `foreign_03_04.jpg`,
        },
        {
          name: messages[`${locale}`]?.park_area3_05,
          fileName: `foreign_03_05.jpg`,
        },
        {
          name: messages[`${locale}`]?.park_area3_06,
          fileName: `foreign_03_06.jpg`,
        },
      ]
    },
    area_04: {        // 親子休閒區
      title: messages[`${locale}`]?.map_title_04,
      picture: [
        {
          name: messages[`${locale}`]?.park_area4_01,
          fileName: `foreign_04_01.jpg`
        },
        {
          name: messages[`${locale}`]?.park_area4_02,
          fileName: `foreign_04_02.jpg`,
        },
        {
          name: messages[`${locale}`]?.park_area4_03,
          fileName: `foreign_04_03.jpg`,
        },
        {
          name: messages[`${locale}`]?.park_area4_04,
          fileName: `foreign_04_04.jpg`,
        },
        {
          name: messages[`${locale}`]?.park_area4_05,
          fileName: `foreign_04_05.jpg`,
        },
        {
          name: messages[`${locale}`]?.park_area4_06,
          fileName: `foreign_04_06.jpg`,
        },
        {
          name: messages[`${locale}`]?.park_area4_07,
          fileName: `foreign_04_07.jpg`,
        },
        {
          name: messages[`${locale}`]?.park_area4_08,
          fileName: `foreign_04_08.jpg`,
        },
      ]
    },
  }
}

export default getForeignData