'use strict';

const constants = {
  // 祝日を取得する年の最小
  from: 1949,
  // 祝日を取得する年の最大
  to: 2099,
  // 振替休日の施行日と名称
  furikaeKyuujitsu: {
    from: new Date(1973, 3, 12),
    name: '振替休日',
  },
  // 国民の休日の施行日と名称
  kokuminNoKyuujitsu: {
    from: new Date(1985, 11, 27),
    name: '国民の休日',
  },
  // 固定日
  // month: 1月は1
  fixed: [
    { from: 1949, to: null, month: 1, date: 1, name: '元日' },
    { from: 1949, to: 1999, month: 1, date: 15, name: '成人の日' },
    { from: 1967, to: null, month: 2, date: 11, name: '建国記念の日' },
    { from: 2020, to: null, month: 2, date: 23, name: '天皇誕生日' },
    { from: 1989, to: 1989, month: 2, date: 24, name: '昭和天皇の大喪の礼' },
    { from: 1959, to: 1959, month: 4, date: 10, name: '皇太子明仁親王の結婚の儀' },
    { from: 1949, to: 1988, month: 4, date: 29, name: '天皇誕生日' },
    { from: 1989, to: 2006, month: 4, date: 29, name: 'みどりの日' },
    { from: 2007, to: null, month: 4, date: 29, name: '昭和の日' },
    { from: 2019, to: 2019, month: 5, date: 1, name: '即位の日' },
    { from: 1949, to: null, month: 5, date: 3, name: '憲法記念日' },
    { from: 2007, to: null, month: 5, date: 4, name: 'みどりの日' },
    { from: 1949, to: null, month: 5, date: 5, name: 'こどもの日' },
    { from: 1993, to: 1993, month: 6, date: 9, name: '皇太子徳仁親王の結婚の儀' },
    { from: 1996, to: 2002, month: 7, date: 20, name: '海の日' },
    { from: 2020, to: 2020, month: 7, date: 23, name: '海の日' },
    { from: 2020, to: 2020, month: 7, date: 24, name: 'スポーツの日' },
    { from: 2016, to: 2019, month: 8, date: 11, name: '山の日' },
    { from: 2020, to: 2020, month: 8, date: 10, name: '山の日' },
    { from: 2021, to: null, month: 8, date: 11, name: '山の日' },
    { from: 1966, to: 2002, month: 9, date: 15, name: '敬老の日' },
    { from: 1966, to: 1999, month: 10, date: 10, name: '体育の日' },
    { from: 2019, to: 2019, month: 10, date: 22, name: '即位の礼正殿の儀' },
    { from: 1948, to: null, month: 11, date: 3, name: '文化の日' },
    { from: 1990, to: 1990, month: 11, date: 12, name: '即位の礼正殿の儀' },
    { from: 1948, to: null, month: 11, date: 23, name: '勤労感謝の日' },
    { from: 1989, to: 2018, month: 12, date: 23, name: '天皇誕生日' },
  ],
  // ハッピーマンデー
  // month: 1月は1
  // turn: 月内で何回目の月曜日か
  happyMonday: [
    { from: 2000, to: null, month: 1, turn: 2, name: '成人の日' },
    { from: 2003, to: 2019, month: 7, turn: 3, name: '海の日' },
    { from: 2021, to: null, month: 7, turn: 3, name: '海の日' },
    { from: 2003, to: null, month: 9, turn: 3, name: '敬老の日' },
    { from: 2000, to: 2019, month: 10, turn: 2, name: '体育の日' },
    { from: 2021, to: null, month: 10, turn: 2, name: 'スポーツの日' },
  ],
  // 春分の日 3月
  // mod4: 配列のindexが西暦を4で割った余り
  shunbun: [
    { from: 1924, to: 1959, mod4: [21, 21, 21, 21] },
    { from: 1960, to: 1991, mod4: [20, 21, 21, 21] },
    { from: 1992, to: 2023, mod4: [20, 20, 21, 21] },
    { from: 2024, to: 2055, mod4: [20, 20, 20, 21] },
    { from: 2056, to: 2091, mod4: [20, 20, 20, 20] },
    { from: 2092, to: 2099, mod4: [19, 20, 20, 20] },
  ],
  shunbunName: '春分の日',
  // 秋分の日 9月
  // mod4: 配列のindexが西暦を4で割った余り
  shuubun: [
    { from: 1948, to: 1979, mod4: [23, 23, 23, 24] },
    { from: 1980, to: 2011, mod4: [23, 23, 23, 23] },
    { from: 2012, to: 2043, mod4: [22, 23, 23, 23] },
    { from: 2044, to: 2075, mod4: [22, 22, 23, 23] },
    { from: 2076, to: 2099, mod4: [22, 22, 22, 23] },
  ],
  shuubunName: '秋分の日',
};

class NHolidayJp {
  /**
   * 指定した年の祝日(国民の祝日、振替休日、国民の休日)の一覧を取得
   *
   * @param {number} year 年
   * @returns {Holiday[]} 祝日の一覧
   */
  static getByYear(year) {
    const holidays = [];

    if (year < constants.from || constants.to < year) {
      return holidays;
    }

    // 国民の祝日(固定日)
    constants.fixed.forEach(v => {
      if (v.from <= year && (v.to === null || year <= v.to)) {
        holidays.push(new Holiday(v.month, v.date, v.name));
      }
    });

    // 国民の祝日(ハッピーマンデー)
    constants.happyMonday.forEach(v => {
      if (v.from <= year && (v.to === null || year <= v.to)) {
        holidays.push(new Holiday(v.month, NHolidayJp.getDateByTurn(year, v.month, v.turn), v.name));
      }
    });

    // 国民の祝日(春分の日、秋分の日)
    holidays.push(new Holiday(3, NHolidayJp.getEquinox(year, 'shunbun'), constants.shunbunName));
    holidays.push(new Holiday(9, NHolidayJp.getEquinox(year, 'shuubun'), constants.shuubunName));

    // 振替休日
    const furikaeList = holidays.reduce((a, v) => {
      const furikae = NHolidayJp.getFurikae(holidays, v, year);
      if (furikae) {
        a.push(furikae);
      }
      return a;
    }, []);

    // 国民の休日
    const kokuminNoKyuujitsuList = holidays.reduce((a, v) => {
      const kokuminNoKyuujitsu = NHolidayJp.getKokuminNoKyuujitsu(holidays, v, year, furikaeList);
      if (kokuminNoKyuujitsu) {
        a.push(kokuminNoKyuujitsu);
      }
      return a;
    }, []);

    // 国民の祝日に振替休日と国民の休日をマージ
    holidays.push(...furikaeList);
    holidays.push(...kokuminNoKyuujitsuList);

    // 日付順にソート
    holidays.sort((a, b) => {
      if (a.month < b.month) {
        return -1;
      } else if (a.month > b.month) {
        return 1;
      } else {
        if (a.date < b.date) {
          return -1;
        } else if (a.date > b.date) {
          return 1;
        } else {
          return 0;
        }
      }
    });

    return holidays;
  }

  /**
   * 振替休日を取得
   * holidayが日曜でないか施行日以前ならnull
   * 
   * @param {Holiday[]} holidays 国民の祝日のリスト
   * @param {Holiday} holiday 国民の祝日
   * @param {number} year 年
   * @returns {Holiday} 振替休日
   */
  static getFurikae(holidays, holiday, year) {
    const date = new Date(year, holiday.month - 1, holiday.date);
    if (date.getDay() !== 0 || date < constants.furikaeKyuujitsu.from) {
      return null;
    }
    while (holidays.find(v =>
      (v.month - 1 === date.getMonth() && v.date === date.getDate())
    ) || date.getDay() === 0) {
      date.setDate(date.getDate() + 1);
    }
    return new Holiday(date.getMonth() + 1, date.getDate(), constants.furikaeKyuujitsu.name);
  }

  /**
   * 国民の休日を取得
   * 翌日が平日(国民の祝日でも振替休日でも日曜でもない)かつ翌々日が国民の祝日
   * 翌日が国民の休日でないか施行日以前ならnull
   * 
   * @param {Holiday[]} holidays 国民の祝日のリスト
   * @param {Holiday} holiday 国民の祝日
   * @param {number} year 年
   * @param {Holiday[]} furikaeList 振替休日のリスト
   * @returns {Holiday} 国民の休日
   */
  static getKokuminNoKyuujitsu(holidays, holiday, year, furikaeList) {
    const date = new Date(year, holiday.month - 1, holiday.date);
    if (date < constants.kokuminNoKyuujitsu.from) {
      return null;
    }
    const nextDate = NHolidayJp.getNextDate(date);
    const next2Date = NHolidayJp.getNextDate(nextDate);
    if (!holidays.find(v =>
      (v.month - 1 === nextDate.getMonth() && v.date === nextDate.getDate())
    ) && !furikaeList.find(v =>
      (v.month - 1 === nextDate.getMonth() && v.date === nextDate.getDate())
    ) && nextDate.getDay() !== 0 && holidays.find(v =>
      (v.month - 1 === next2Date.getMonth() && v.date === next2Date.getDate())
    )) {
      return new Holiday(nextDate.getMonth() + 1, nextDate.getDate(), constants.kokuminNoKyuujitsu.name);
    }
  }

  /**
   * 翌日のDateオブジェクトを取得
   * 
   * @param {Date} date 当日
   * @returns {Date} 翌日
   */
  static getNextDate(date) {
    const nextDate = new Date(date.getTime());
    nextDate.setDate(date.getDate() + 1);
    return nextDate;
  }

  /**
   * ハッピーマンデーの日を取得
   *
   * @param {number} year 年
   * @param {number} month 月 1月は1
   * @param {number} turn 何回目か
   * @returns {number} 日
   */
  static getDateByTurn(year, month, turn) {
    return (8 - (new Date(year, month - 1, 1)).getDay()) % 7 + 1 + (turn - 1) * 7;
  }

  /**
   * 春分の日または秋分の日の日を取得
   * 
   * @param {number} year 年
   * @param {string} type shunbun(春分)またはshuubun(秋分)
   * @returns {number} 日
   */
  static getEquinox(year, type) {
    return constants[type].find(v =>
      v.from <= year && (v.to === null || year <= v.to)
    ).mod4[year % 4];
  }
}

module.exports = NHolidayJp;

class Holiday {
  /**
   * 
   * @param {number} month 月 1月は1
   * @param {number} date 日 1から31
   * @param {string} name 名称
   */
  constructor(month, date, name) {
    this.month = month;
    this.date = date;
    this.name = name;
  }
}
