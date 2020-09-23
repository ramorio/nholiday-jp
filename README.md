# nholiday-jp

## About

日本の祝日を取得します。  
ここでの祝日は、国民の祝日、振替休日、国民の休日を含みます。  
1949年から2099年まで対応しています。

## Usage

### getByYear(年)

指定した年の祝日一覧を取得します。  
month, date, name プロパティをもつオブジェクトの配列を返します。

```js
const NHolidayJp = require('nholiday-jp');

const holidays = NHolidayJp.getByYear(2019);
holidays.forEach(v=>
  console.log(`${v.month}月${v.date}日 ${v.name}`)
);
//=> 1月1日 元日
//   1月14日 成人の日
//   2月11日 建国記念の日
//   3月21日 春分の日
//   4月29日 昭和の日
//   4月30日 国民の休日
//   5月1日 即位の日
//   5月2日 国民の休日
//   5月3日 憲法記念日
//   5月4日 みどりの日
//   5月5日 こどもの日
//   5月6日 振替休日
//   7月15日 海の日
//   8月11日 山の日
//   8月12日 振替休日
//   9月16日 敬老の日
//   9月23日 秋分の日
//   10月14日 体育の日
//   10月22日 即位の礼正殿の儀
//   11月3日 文化の日
//   11月4日 振替休日
//   11月23日 勤労感謝の日
```

### getByMonth(年, 月)

指定した年月の祝日一覧を取得します。  
month, date, name プロパティをもつオブジェクトの配列を返します。

```js
const NHolidayJp = require('nholiday-jp');

const holidays = NHolidayJp.getByMonth(2019, 1);
holidays.forEach(v=>
  console.log(`${v.month}月${v.date}日 ${v.name}`)
);
//=> 1月1日 元日
//   1月14日 成人の日
```

### getName(年, 月, 日)

指定した日付が祝日ならその名称を、祝日でなければnullを返します。

```js
const NHolidayJp = require('nholiday-jp');

const name = NHolidayJp.getName(2019, 1, 1); // 元日
```

### getNameByDate(Dateオブジェクト)

指定した日付が祝日ならその名称を、祝日でなければnullを返します。

```js
const NHolidayJp = require('nholiday-jp');

// 2021年1月1日
const name = NHolidayJp.getNameByDate(new Date(2021, 0, 1)); // 元日
```
