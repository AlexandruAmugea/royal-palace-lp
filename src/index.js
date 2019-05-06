import './sass/main.scss'
import './assets/flipclock.min'

// TODO: replace the date with the real date
const endDate = new Date("10 May 2019");
const startDate = new Date();
const remainingSeconds = Math.abs((endDate.getTime() - startDate.getTime()) / 1000);

$('.clock').FlipClock(remainingSeconds, {countdown: true, clockFace: 'DailyCounter', showSeconds: false});

