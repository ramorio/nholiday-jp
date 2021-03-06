import test from 'ava';
import NHolidayJp from '../lib/index';

const holidays = {
  '2018': [
    [1, 1, '元日'],
    [1, 8, '成人の日'],
    [2, 11, '建国記念の日'],
    [2, 12, '振替休日'],
    [3, 21, '春分の日'],
    [4, 29, '昭和の日'],
    [4, 30, '振替休日'],
    [5, 3, '憲法記念日'],
    [5, 4, 'みどりの日'],
    [5, 5, 'こどもの日'],
    [7, 16, '海の日'],
    [8, 11, '山の日'],
    [9, 17, '敬老の日'],
    [9, 23, '秋分の日'],
    [9, 24, '振替休日'],
    [10, 8, '体育の日'],
    [11, 3, '文化の日'],
    [11, 23, '勤労感謝の日'],
    [12, 23, '天皇誕生日'],
    [12, 24, '振替休日'],
  ],
  '2019': [
    [1, 1, '元日'],
    [1, 14, '成人の日'],
    [2, 11, '建国記念の日'],
    [3, 21, '春分の日'],
    [4, 29, '昭和の日'],
    [4, 30, '国民の休日'],
    [5, 1, '即位の日'],
    [5, 2, '国民の休日'],
    [5, 3, '憲法記念日'],
    [5, 4, 'みどりの日'],
    [5, 5, 'こどもの日'],
    [5, 6, '振替休日'],
    [7, 15, '海の日'],
    [8, 11, '山の日'],
    [8, 12, '振替休日'],
    [9, 16, '敬老の日'],
    [9, 23, '秋分の日'],
    [10, 14, '体育の日'],
    [10, 22, '即位の礼正殿の儀'],
    [11, 3, '文化の日'],
    [11, 4, '振替休日'],
    [11, 23, '勤労感謝の日'],
  ],
  '2020': [
    [1, 1, '元日'],
    [1, 13, '成人の日'],
    [2, 11, '建国記念の日'],
    [2, 23, '天皇誕生日'],
    [2, 24, '振替休日'],
    [3, 20, '春分の日'],
    [4, 29, '昭和の日'],
    [5, 3, '憲法記念日'],
    [5, 4, 'みどりの日'],
    [5, 5, 'こどもの日'],
    [5, 6, '振替休日'],
    [7, 23, '海の日'],
    [7, 24, 'スポーツの日'],
    [8, 10, '山の日'],
    [9, 21, '敬老の日'],
    [9, 22, '秋分の日'],
    [11, 3, '文化の日'],
    [11, 23, '勤労感謝の日'],
  ],
  '2021': [
    [1, 1, '元日'],
    [1, 11, '成人の日'],
    [2, 11, '建国記念の日'],
    [2, 23, '天皇誕生日'],
    [3, 20, '春分の日'],
    [4, 29, '昭和の日'],
    [5, 3, '憲法記念日'],
    [5, 4, 'みどりの日'],
    [5, 5, 'こどもの日'],
    [7, 22, '海の日'],
    [7, 23, 'スポーツの日'],
    [8, 8, '山の日'],
    [8, 9, '振替休日'],
    [9, 20, '敬老の日'],
    [9, 23, '秋分の日'],
    [11, 3, '文化の日'],
    [11, 23, '勤労感謝の日'],
  ],
};

function getArrayByYear(year) {
  return NHolidayJp.getByYear(year).map(v => [v.month, v.date, v.name]);
}

function getArrayByMonth(year, month) {
  return NHolidayJp.getByMonth(year, month).map(v => [v.month, v.date, v.name]);
}

// 年
test('2018', t => t.deepEqual(getArrayByYear(2018), holidays['2018']));
test('2019', t => t.deepEqual(getArrayByYear(2019), holidays['2019']));
test('2020', t => t.deepEqual(getArrayByYear(2020), holidays['2020']));
test('2021', t => t.deepEqual(getArrayByYear(2021), holidays['2021']));

// 年月
test('201801', t => t.deepEqual(getArrayByMonth(2018, 1), holidays['2018'].filter(v => v[0] === 1)));

// 年月日
test('20180101', t => t.is(NHolidayJp.getName(2018, 1, 1), holidays['2018'].find(v => v[0] === 1 && v[1] === 1)[2]));
test('20180102', t => t.is(NHolidayJp.getName(2018, 1, 2), null));

// Date
test('20210101', t => t.is(NHolidayJp.getNameByDate(new Date(2021, 0, 1)), holidays['2021'].find(v => v[0] === 1 && v[1] === 1)[2]));
