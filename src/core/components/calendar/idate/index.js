/*
  Copyright nainemom <nainemom@gmail.com>
  https://github.com/nainemom/idate/blob/dev/package.json
*/
import {toGregorian, toJalaali, fixDate} from './utils.js'

const methods = [
  'getHours',
  'getMilliseconds',
  'getMinutes',
  'getSeconds',
  'getTime',
  'getTimezoneOffset',
  'getUTCDate',
  'getUTCDay',
  'getUTCFullYear',
  'getUTCHours',
  'getUTCMilliseconds',
  'getUTCMinutes',
  'getUTCMonth',
  'getUTCSeconds',
  'now',
  'parse',
  'setHours',
  'setMilliseconds',
  'setMinutes',
  'setSeconds',
  'setTime',
  'setUTCDate',
  'setUTCFullYear',
  'setUTCHours',
  'setUTCMilliseconds',
  'setUTCMinutes',
  'setUTCMonth',
  'setUTCSeconds',
  'toDateString',
  'toISOString',
  'toJSON',
  'toLocaleDateString',
  'toLocaleTimeString',
  'toLocaleString',
  'toTimeString',
  'toUTCString',
  'UTC',
  'valueOf'
]

const DAY_NAMES = ['Shanbe', 'Yekshanbe', 'Doshanbe', 'Seshanbe', 'Chaharshanbe', 'Panjshanbe', 'Jom\'e']
const PERSIAN_DAY_NAMES = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه']
const MONTH_NAMES = ['Farvardin', 'Ordibehesht', 'Khordad', 'Tir', 'Mordad', 'Shahrivar', 'Mehr', 'Aban', 'Azar', 'Dey', 'Bahman', 'Esfand']
const PERSIAN_MONTH_NAMES = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند']
const PERSIAN_NUMBERS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

export default class IDate extends Date {
  constructor (...args) {
    super()

    let date
    if (args.length === 0) {
      date = Date.now()
    } else if (args.length === 1) {
      date = args[0] instanceof Date ? args[0].getTime() : args[0]
    } else {
      const fixed = fixDate(
        args[0],
        args[1] || 0,
        typeof args[2] === 'undefined' ? 1 : args[2])
      const converted = toGregorian(fixed[0], fixed[1] + 1, fixed[2])
      date = [converted.gy, converted.gm - 1, converted.gd].concat([args[3] || 0, args[4] || 0, args[5] || 0, args[6] || 0])
    }

    if (Array.isArray(date)) {
      this.gdate = new Date(...date)
    } else {
      this.gdate = new Date(date)
    }

    const converted = toJalaali(this.gdate.getFullYear(), this.gdate.getMonth() + 1, this.gdate.getDate())
    this.jdate = [converted.jy, converted.jm - 1, converted.jd]

    methods.forEach(method => {
      IDate.prototype[method] = function () {
        return this.gdate[method](...arguments)
      }
    })
  }

  getFullYear () {
    return this.jdate[0]
  }

  setFullYear (value) {
    this.jdate = fixDate(value, this.jdate[1], this.jdate[2])
    this.syncDate()
    return this.gdate.getTime()
  }

  getMonth () {
    return this.jdate[1]
  }

  setMonth (value) {
    this.jdate = fixDate(this.jdate[0], value, this.jdate[2])
    this.syncDate()
    return this.gdate.getTime()
  }

  getDate () {
    return this.jdate[2]
  }

  setDate (value) {
    this.jdate = fixDate(this.jdate[0], this.jdate[1], value)
    this.syncDate()
    return this.gdate.getTime()
  }

  getDay () {
    return (this.gdate.getDay() + 1) % 7
  }

  syncDate () {
    const converted = toGregorian(this.jdate[0], this.jdate[1] + 1, this.jdate[2])
    this.gdate.setFullYear(converted.gy)
    this.gdate.setMonth(converted.gm - 1)
    this.gdate.setDate(converted.gd)
  }
  toString (persianString = true) {
    const replaceNums = (str) => {
      return str.replace(/./g, c => PERSIAN_NUMBERS[c] || c)
    }
    const padNumber = (num) => num.toString().length === 1 ? `0${num}` : num.toString()
    const time = `${padNumber(this.getHours())}:${padNumber(this.getMinutes())}:${padNumber(this.getSeconds())}`
    if (persianString) {
      return replaceNums(`${PERSIAN_DAY_NAMES[this.getDay()]} ${this.getDate()} ${PERSIAN_MONTH_NAMES[this.getMonth()]} ${this.getFullYear()} ساعت ${time}`)
    }
    return `${DAY_NAMES[this.getDay()]} ${this.getDate()} ${MONTH_NAMES[this.getMonth()]} ${this.getFullYear()} ${time}`
  }
}
