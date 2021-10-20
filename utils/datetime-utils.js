// This function get javascript datetime object and returns jalali (shamsi) date
// Return value: object of {year, month, day}  
export const gregorianToJalali = datetime => {
    var gy = datetime.getFullYear();
    var gm = datetime.getMonth()+1;
    var gd = datetime.getDate();

    var g_d_m, jy, jm, jd, gy2, days;
    g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    gy2 = (gm > 2) ? (gy + 1) : gy;
    days = 355666 + (365 * gy) + ~~((gy2 + 3) / 4) - ~~((gy2 + 99) / 100) + ~~((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
    jy = -1595 + (33 * ~~(days / 12053));
    days %= 12053;
    jy += 4 * ~~(days / 1461);
    days %= 1461;
    if (days > 365) {
        jy += ~~((days - 1) / 365);
        days = (days - 1) % 365;
    }
    if (days < 186) {
        jm = 1 + ~~(days / 31);
        jd = 1 + (days % 31);
    } else {
        jm = 7 + ~~((days - 186) / 30);
        jd = 1 + ((days - 186) % 30);
    }

    return {year: jy, month: jm, day: jd}
}

export const gregorianToJalaliStr = datetime => {
    var jalaliDate = gregorianToJalali(datetime);

    var jalaliDateStr = jalaliDate.day + " " +  getJalaliMonthName(jalaliDate.month) + " " + jalaliDate.year
    return jalaliDateStr
}

export const gregorianToJalaliShortStr = datetime => {
    var jalaliDate = gregorianToJalali(datetime);

    var jalaliDateShortStr = jalaliDate.day + " " +  getJalaliMonthName(jalaliDate.month)
    return jalaliDateShortStr
}

export const jalaliToGregorian = (jalaliDate) => {
    var jy = jalaliDate.year
    var jm = jalaliDate.month
    var jd = jalaliDate.day

    var sal_a, gy, gm, gd, days;
    jy += 1595;
    days = -355668 + (365 * jy) + (~~(jy / 33) * 8) + ~~(((jy % 33) + 3) / 4) + jd + ((jm < 7) ? (jm - 1) * 31 : ((jm - 7) * 30) + 186);
    gy = 400 * ~~(days / 146097);
    days %= 146097;
    if (days > 36524) {
        gy += 100 * ~~(--days / 36524);
        days %= 36524;
        if (days >= 365) days++;
    }
    gy += 4 * ~~(days / 1461);
    days %= 1461;
    if (days > 365) {
        gy += ~~((days - 1) / 365);
        days = (days - 1) % 365;
    }
    gd = days + 1;
    sal_a = [0, 31, ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    for (gm = 0; gm < 13 && gd > sal_a[gm]; gm++) gd -= sal_a[gm];
    return {year: gy, month: gm, day: gd};
}

export const getJalaliMonthName = month =>{
    const monthName = [
        'فروردين',
        'ارديبهشت',
        'خرداد',
        'تير',
        'مرداد',
        'شهريور',
        'مهر',
        'آبان',
        'آذر',
        'دی',
        'بهمن',
        'اسفند',
    ]

    return monthName[month - 1];
}
export const fuzzyPassedTime = datetimeStr => {
    let datetime = new Date(datetimeStr)
    let now = new Date();

    let passedMilliseconds = (now - datetime); // milliseconds between now & datetime
    let passedMinutes = passedMilliseconds / 60000; // minutes

    if (passedMinutes <= 5)
        return 'همين لحظه'

    if (passedMinutes < 30)
        return 'دقایقی پیش'

    if (passedMinutes < 45)
        return 'نیم ساعت پیش'

    let passedHours = Math.round(passedMinutes / 60)

    let nowDays = now.getFullYear() * 365 + now.getMonth() * 30.5 + now.getDate()
    let datetimeDays = datetime.getFullYear() * 365 + datetime.getMonth() * 30.5 + datetime.getDate()

    let passedDays = Math.round(nowDays - datetimeDays)

    if ((passedDays == 0) || ((passedDays == 1) && (passedHours <= 6)))
        return passedHours + ' ساعت پيش'

    if (passedDays == 1)
        return 'ديروز'

    if (passedDays < 30)
        return passedDays + ' روز پيش'

    let passedMonths = Math.round(passedDays / 30)
    if (passedMonths < 12)
        return passedMonths + ' ماه پيش'

    let passedYears = Math.round(passedMonths / 12)
    return passedYears + ' سال پيش'
}