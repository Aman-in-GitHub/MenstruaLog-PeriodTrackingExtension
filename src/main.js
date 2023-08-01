const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const header = document.querySelector('header');
const main = document.querySelector('main');
const footer = document.querySelector('footer');
const starter = document.querySelector('.starter');

const name = document.querySelector('#welcomeName');
const birthdate = document.querySelector('#welcomeBirthdate');
const averageDays = document.querySelector('#welcomeDays');
const submitBtn = document.querySelector('#submit');

const greet = document.querySelector('.greet');
const nickname = document.querySelector('.nickname');
const emoji = document.querySelector('.emoji');
const specialOccasion = document.querySelector('.specialOccasion');
const onceADay = document.querySelector('.onceADay');

const jokeBox = document.querySelector('.joke');
const setupSpan = document.querySelector('.setup');
const punchlineSpan = document.querySelector('.answer');
const jokeBtn = document.querySelector('.jokeBtn');
const nextJoke = document.querySelector('.nextJoke');
const exitJoke = document.querySelector('.exitJoke');
const jokeArrow = document.querySelector('.jokeArrow');

const checkPeriod = document.querySelector('.checkPeriod');
const period = document.querySelector('.period');
const periodDiv = document.querySelector('.pDiv');
const dateInput = document.querySelector('.periodInput');
const periodDate = document.querySelector('.periodDate');
const periodPrediction = document.querySelector('.periodPrediction');
const leftPeriod = document.querySelector('.leftPeriod');
const changePeriodDate = document.querySelector('.changeDate');
const periodArrow = document.querySelector('.periodArrow');

const listenMusic = document.querySelector('.listenMusic');
const musicSection = document.querySelector('.music');
const musicArrow = document.querySelector('.musicArrow');

const memes = document.querySelector('.memes');

const quoteSection = document.querySelector('.quoteSection');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');

const messageMe = document.querySelector('.messageMe');
const message = document.querySelector('.message');
const messageArrow = document.querySelector('.messageArrow');
const messageInput = document.querySelector('#messageInput');

if (!localStorage.getItem('nameOf')) {
  header.style.display = 'none';
  main.style.display = 'none';
  footer.style.display = 'none';
} else {
  starter.style.display = 'none';
  runCode();
}

starter.addEventListener('submit', (e) => {
  e.preventDefault();
  header.style.display = 'block';
  main.style.display = 'block';
  footer.style.display = 'block';
  starter.style.display = 'none';

  localStorage.setItem('nameOf', name.value);
  localStorage.setItem('avgDays', averageDays.value);
  localStorage.setItem('birthday', birthdate.value);
  runCode();
});

function runCode() {
  const userNameFull = localStorage.getItem('nameOf');

  const userName = userNameFull.split(' ')[0];
  nickname.innerText = userName;

  const averageTime = Number(localStorage.getItem('avgDays'));

  const dob = new Date(localStorage.getItem('birthday'));

  const bMonth = dob.getMonth();
  const bDate = dob.getDate();

  const hour = new Date().getHours();

  function changeGreeting() {
    if (hour < 12) {
      greet.innerText = 'Good Morning';
    } else if (hour >= 12 && hour < 17) {
      greet.innerText = 'Good Afternoon';
    } else {
      greet.innerText = 'Good Evening';
    }
  }

  changeGreeting();

  const url = 'https://official-joke-api.appspot.com/random_joke';

  async function getJokes() {
    jokeBox.style.display = 'block';

    const response = await fetch(url);
    const data = await response.json();
    const setup = data.setup;
    const punchline = data.punchline;
    setupSpan.innerText = setup;

    setTimeout(() => {
      punchlineSpan.innerText = punchline;
    }, 1200);
  }

  jokeBtn.addEventListener('click', () => {
    header.style.display = 'none';

    memes.style.display = 'none';

    quoteSection.style.display = 'none';

    getJokes();
  });

  jokeArrow.addEventListener('click', () => {
    jokeBox.style.display = 'none';

    header.style.display = 'block';

    memes.style.display = 'block';

    quoteSection.style.display = 'block';
  });

  nextJoke.addEventListener('click', () => {
    setupSpan.innerText = '';
    punchlineSpan.innerText = '';
    getJokes();
  });

  exitJoke.addEventListener('click', () => {
    jokeBox.style.display = 'none';

    header.style.display = 'block';

    memes.style.display = 'block';

    quoteSection.style.display = 'block';
  });

  checkPeriod.addEventListener('click', () => {
    header.style.display = 'none';

    memes.style.display = 'none';

    quoteSection.style.display = 'none';

    if (localStorage.getItem('pDate')) {
      periodDiv.style.display = 'none';
    }

    showPeriodInfo();
  });

  dateInput.addEventListener('input', () => {
    localStorage.removeItem('pDate');
    showPeriodInfo();
  });

  periodArrow.addEventListener('click', () => {
    period.style.display = 'none';

    header.style.display = 'block';

    memes.style.display = 'block';

    quoteSection.style.display = 'block';
  });

  function showPeriodInfo() {
    period.style.display = 'block';

    if (dateInput.value == '') {
      if (!localStorage.getItem('pDate')) return;
    }

    const currentDate = new Date();

    const averagePeriodDuration = 28;
    const averagePeriodDays = averageTime;
    let lastPeriodDate;

    if (localStorage.getItem('pDate')) {
      lastPeriodDate = new Date(localStorage.getItem('pDate'));
    } else {
      lastPeriodDate = new Date(dateInput.value);
    }

    const nextPeriodDate = calculateNextPeriodDate(
      lastPeriodDate,
      averagePeriodDuration,
      averagePeriodDays
    );

    const daysLeft = calculateDaysLeft(nextPeriodDate);

    if (lastPeriodDate > currentDate || daysLeft < 0) {
      alert('Enter a valid date😑');
      return;
    }

    const formattedNextPeriodDate = nextPeriodDate.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric'
    });

    periodDate.innerText = `Previous period: ${lastPeriodDate.toLocaleString(
      'en-US',
      {
        month: 'long',
        day: 'numeric'
      }
    )}`;

    periodPrediction.innerText = `Next period expected date: ${formattedNextPeriodDate}`;

    if (daysLeft == 0) {
      leftPeriod.innerText = `Finally! The day has come🩸`;
    } else {
      leftPeriod.innerText = `${daysLeft} days left`;
    }

    if (!localStorage.getItem('pDate')) {
      localStorage.setItem('pDate', lastPeriodDate);
    }

    if (
      currentDate.getMonth() === nextPeriodDate.getMonth() &&
      currentDate.getDate() === nextPeriodDate.getDate()
    ) {
      periodPrediction.innerText = `${userName} your period date was predicted to be today`;
      lastPeriodDate = currentDate;
      localStorage.setItem('pDate', lastPeriodDate);
    }

    localStorage.setItem('nextDate', nextPeriodDate);
  }

  function checkPeriodClosingDate() {
    if (!localStorage.getItem('nextDate')) return;

    const nextDate = new Date(localStorage.getItem('nextDate'));

    const daysLeftAre = calculateDaysLeft(nextDate);

    const lastPeriodDate = localStorage.getItem('periodLeftData');

    const currentDateL = new Date().toLocaleDateString();

    if (daysLeftAre && daysLeftAre <= 3) {
      if (daysLeftAre == 0) {
        alertCongratulations();
        return;
      }

      if (lastPeriodDate !== currentDateL) {
        alertMe(daysLeftAre);
        localStorage.setItem('periodLeftData', currentDateL);
      }
    }
  }

  checkPeriodClosingDate();

  function calculateNextPeriodDate(
    lastPeriodDate,
    averagePeriodDuration,
    averagePeriodDays
  ) {
    const nextPeriodDate = new Date(lastPeriodDate);

    nextPeriodDate.setDate(
      nextPeriodDate.getDate() + averagePeriodDuration + averagePeriodDays
    );

    return nextPeriodDate;
  }

  function calculateDaysLeft(nextPeriodDate) {
    const today = new Date();
    const daysLeft = (nextPeriodDate - today) / (1000 * 60 * 60 * 24);
    return Math.ceil(daysLeft);
  }

  if (localStorage.getItem('pDate')) {
    periodDiv.style.display = 'none';
  }

  changePeriodDate.addEventListener('click', () => {
    periodDiv.style.display = 'block';
    localStorage.removeItem('pDate');
  });

  const urlMeme = 'https://meme-api.com/gimme';

  async function getMemes() {
    const res = await fetch(urlMeme);
    const data = await res.json();
    const link = data.preview[4] || data.preview[3] || data.preview[2];
    document.querySelector('.memeImg').src = link;
  }

  getMemes();

  listenMusic.addEventListener('click', () => {
    header.style.display = 'none';

    memes.style.display = 'none';

    quoteSection.style.display = 'none';

    musicSection.style.display = 'block';
  });

  musicArrow.addEventListener('click', () => {
    header.style.display = 'block';

    memes.style.display = 'block';

    quoteSection.style.display = 'block';

    musicSection.style.display = 'none';
  });

  const apiKeyQuote = 'nZnOq9JZkyrg/DjDlm0Bag==CB9LZB38r36tmjlq';

  const urlQuote = 'https://api.api-ninjas.com/v1/quotes';

  async function getQuotes() {
    const headers = {
      'X-Api-Key': apiKeyQuote
    };

    const res = await fetch(urlQuote, {
      method: 'GET',
      headers: headers
    });

    const data = await res.json();
    quote.innerText = `“${data[0].quote}”`;
    author.innerText = `~ ${data[0].author}`;
  }

  getQuotes();

  if (!localStorage.getItem('linkTo')) {
    messageMe.addEventListener('click', (e) => {
      e.preventDefault();

      header.style.display = 'none';

      memes.style.display = 'none';

      quoteSection.style.display = 'none';

      message.style.display = 'block';
    });
  }

  messageArrow.addEventListener('click', () => {
    message.style.display = 'none';

    header.style.display = 'block';

    memes.style.display = 'block';

    quoteSection.style.display = 'block';
  });

  message.addEventListener('submit', (e) => {
    e.preventDefault();
    localStorage.setItem('linkTo', messageInput.value);
    messageArrow.click();
  });

  messageMe.href = localStorage.getItem('linkTo');

  const dayOfNow = new Date();

  const newYear = new Date();
  newYear.setMonth(0);
  newYear.setDate(1);

  const birthDay = new Date();
  birthDay.setMonth(bMonth);
  birthDay.setDate(bDate);

  const menstruationDay = new Date();
  menstruationDay.setMonth(4);
  menstruationDay.setDate(28);

  const womenDay = new Date();
  womenDay.setMonth(2);
  womenDay.setDate(8);

  if (
    dayOfNow.getMonth() === newYear.getMonth() &&
    dayOfNow.getDate() === newYear.getDate()
  ) {
    specialOccasion.style.display = 'block';
    specialOccasion.innerText = `Happy New Year ${userName} 🤍`;
  }

  if (
    dayOfNow.getMonth() === birthDay.getMonth() &&
    dayOfNow.getDate() === birthDay.getDate()
  ) {
    specialOccasion.style.display = 'block';
    specialOccasion.innerText = `Happy Birthday ${userName} 🥳`;
  }

  if (
    dayOfNow.getMonth() === menstruationDay.getMonth() &&
    dayOfNow.getDate() === menstruationDay.getDate()
  ) {
    specialOccasion.style.display = 'block';
    specialOccasion.innerText = `Happy Menstrual Hygiene Day 🩸`;
  }

  if (
    dayOfNow.getMonth() === womenDay.getMonth() &&
    dayOfNow.getDate() === womenDay.getDate()
  ) {
    specialOccasion.style.display = 'block';
    specialOccasion.innerText = `Happy Women's Day ${userName} 👸`;
  }

  function alertMe(days) {
    if (Notification.permission === 'granted') {
      const notification = new Notification(
        `Days left for your period: ${days}`,
        {
          icon: '../icon.png',
          body: `Take Care ${userName}`
        }
      );
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          const notification = new Notification(
            `Days left for your period: ${days}`,
            {
              icon: '../icon.png',
              body: `Take Care ${userName}`
            }
          );
        }
      });
    }
  }

  function alertCongratulations() {
    if (Notification.permission === 'granted') {
      const notification = new Notification(
        `Congratulations!\nToday's your predicted periods date`,
        {
          icon: '../icon.png',
          body: `Hope you are doing well ${userName}`
        }
      );
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          const notification = new Notification(
            `Congratulations!\nToday's your predicted periods date`,
            {
              icon: '../icon.png',
              body: `Hope you are doing well ${userName}`
            }
          );
        }
      });
    }
  }

  if (
    new Date().getMonth() == dob.getMonth() &&
    new Date().getDate() == dob.getDate()
  ) {
    const birthdateDay = localStorage.getItem('bdayLeft');

    const currentDateB = new Date().toLocaleDateString();

    if (birthdateDay !== currentDateB) {
      alertBirthday();
      localStorage.setItem('bdayLeft', currentDateB);
    }
  }

  function alertBirthday() {
    if (Notification.permission === 'granted') {
      const notification = new Notification(
        `Happy Birthday ${userNameFull} 🎂`,
        {
          icon: '../icon.png',
          body: `Sending you lots of love, laughter, and good vibes on your special day! 🥳💖\nMay this year be filled with exciting adventures and beautiful moments that make you smile. 🌟🎈\nEnjoy your celebration! 🎁🎊`
        }
      );
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          const notification = new Notification(
            `Happy Birthday ${userNameFull} 🎂`,
            {
              icon: '../icon.png',
              body: `Sending you lots of love, laughter, and good vibes on your special day! 🥳💖\nMay this year be filled with exciting adventures and beautiful moments that make you smile. 🌟🎈\nEnjoy your celebration! 🎁🎊`
            }
          );
        }
      });
    }
  }
}
