import './sass/main.scss'
import './assets/flipclock.min'

const $successMsg = $('#successMsg');
const $errorMsg = $('#errorMsg');
const $contactForm = $('#contact-form');
const $clock = $('.clock');
const endDate = new Date("17 June 2019");
const startDate = new Date();
const remainingSeconds = Math.abs((endDate.getTime() - startDate.getTime()) / 1000);

$successMsg.hide();
$errorMsg.hide();

$clock.FlipClock(remainingSeconds, {countdown: true, clockFace: 'DailyCounter', showSeconds: false});

$contactForm.on('submit', (ev)=> {
    const email = $('input[name="email"]');

    ev.preventDefault();
    ev.stopPropagation();

    let success = (data)=> {
      if(data.status === 200) {
          $contactForm.hide();
          $successMsg.show();
      } else {
          $contactForm.hide();
          $errorMsg.show();
      }
    };

    $.ajax({
        type: "POST",
        url: '/api/register',
        data: email,
        success: success,
        dataType: "json"
    });
});

