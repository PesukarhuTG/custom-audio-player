import { addZero } from './addZero.js';

const audioPlayer = () => {
  const audio = document.querySelector('.audio-wrapper');
  const audioImg = document.querySelector('.audio-img');
  const singerTitle = document.querySelector('.audio-singer');
  const songTitle = document.querySelector('.audio-song');
  const audioPlayer = document.querySelector('.audio-player');
  const audioNavigation = document.querySelector('.audio-navigation');
  const audioTimePassed = document.querySelector('.audio-time__passed');
  const audioTimeTotal = document.querySelector('.audio-time__total');
  const audioProgress = document.querySelector('.audio-progress');
  const audioProgressTiming = document.querySelector('.audio-progress__timing');
  const iconPlaySvg = document.querySelector('.icon-play-svg');

  const playlist = [
    {
      singer: 'Beyonce',
      song: 'Don\'t Hurt Yourself'
    },
    {
      singer: 'Blackjack-Billy',
      song: 'The Booze Cruise'
    },
    {
      singer: 'Bodyrockers',
      song: 'Round & Round'
    },
    {
      singer: 'Masked-Wolf',
      song: 'Astronaut In The Ocean'
    },
    {
      singer: 'Duа-Lipa',
      song: 'Don\'t Start Now'
    }
  ];

  let currentTrack = 0;

  const loadTrack = () => {
    const isPlayed = audioPlayer.paused; //стоит ли текущая песня на паузе

    audioImg.src = `assets/img/${playlist[currentTrack].singer}.jpg`;
    singerTitle.textContent = playlist[currentTrack].singer;
    songTitle.textContent = playlist[currentTrack].song;
    audioPlayer.src = `assets/audio/${playlist[currentTrack].singer}.mp3`;

    (isPlayed) ? audioPlayer.pause() : audioPlayer.play();
  };

  const prevTrack = () => {
    currentTrack = (currentTrack === 0) ? (playlist.length - 1) : (currentTrack - 1);
    loadTrack();
  };

  const nextTrack = () => {
    currentTrack = (currentTrack === playlist.length - 1) ? 0 : (currentTrack + 1);
    loadTrack();
  }

  audioNavigation.addEventListener('click', e => {
    const target = e.target;

    if (target.closest('.audio-button__play')) {
      audio.classList.toggle('play');

      if (audioPlayer.paused) {
        audioPlayer.play();
        iconPlaySvg.setAttribute('href', 'assets/svg/sprite.svg#icon-pause');
      } else {
        audioPlayer.pause();
        iconPlaySvg.setAttribute('href', 'assets/svg/sprite.svg#icon-play');
      }

      singerTitle.textContent = playlist[currentTrack].singer;
      songTitle.textContent = playlist[currentTrack].song;
    }

    if (target.closest('.audio-button__prev')) prevTrack();
    if (target.closest('.audio-button__next')) nextTrack();

  });

  //когда трек закончился, автоматом переключается на следующий
  audioPlayer.addEventListener('ended', () => {
    nextTrack();
    audioPlayer.play();
  });

  //отображение прогресса бегунка скролл-бара + время
  audioPlayer.addEventListener('timeupdate', () => {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    const progress = (currentTime / duration) * 100; //определяем, ск прошло времени из всего времени в %

    audioProgressTiming.style.width = progress + '%';

    let minutePassed = Math.floor(currentTime / 60) || '0';
    let secondsPassed = Math.floor(currentTime % 60) || '0';

    let minuteTotal = Math.floor(duration / 60) || '0';
    let secondsTotal = Math.floor(duration % 60) || '0';

    audioTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
    audioTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
  });

  //возможность переключения по треку через строку прогресса
  audioProgress.addEventListener('click', e => {
    const x = e.offsetX; //клик отсчитывается от крайней левой точки элемента
    const allWidth = audioProgress.clientWidth; //получить длину строки прогресса
    const progress = (x / allWidth) * audioPlayer.duration; //получаем значение прогресса
    audioPlayer.currentTime = progress; //то место, на которое кликнули
  });

}

export default audioPlayer;