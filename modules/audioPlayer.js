import { addZero } from './addZero.js';
import { playlist } from './playlist.js';

const audio = document.querySelector('.audio-wrapper');
const audioImg = document.querySelector('.audio-img');
const singerTitle = document.querySelector('.audio-singer');
const songTitle = document.querySelector('.audio-song');
const player = document.querySelector('.audio-player');
const audioNavigation = document.querySelector('.audio-navigation');
const audioTimePassed = document.querySelector('.audio-time__passed');
const audioTimeTotal = document.querySelector('.audio-time__total');
const audioProgress = document.querySelector('.audio-progress');
const audioProgressTiming = document.querySelector('.audio-progress__timing');
const iconPlaySvg = document.querySelector('.icon-play-svg');
const videoBackground = document.querySelector('.audio-background');
const volumeProgress = document.querySelector('.volume-progress');
const iconSoundSvg = document.querySelector('.icon-sound-svg');
const volumeDown = document.querySelector('.volume-down');
const volumeUp = document.querySelector('.volume-up');

const audioPlayer = () => {
  let currentTrack = 0;

  const loadTrack = () => {
    const isPlayed = player.paused; //стоит ли текущая песня на паузе

    audioImg.src = `assets/img/${playlist[currentTrack].singer}.webp`;
    singerTitle.textContent = playlist[currentTrack].singer;
    songTitle.textContent = playlist[currentTrack].song;
    player.src = `assets/audio/${playlist[currentTrack].singer}.mp3`;

    isPlayed ? player.pause() : player.play();
  };

  const prevTrack = () => {
    currentTrack = currentTrack === 0 ? playlist.length - 1 : currentTrack - 1;
    loadTrack();
  };

  const nextTrack = () => {
    currentTrack = currentTrack === playlist.length - 1 ? 0 : currentTrack + 1;
    loadTrack();
  };

  audioNavigation.addEventListener('click', e => {
    const target = e.target;

    if (target.closest('.audio-button__play')) {
      audio.classList.toggle('play');

      if (player.paused) {
        player.play();
        videoBackground.play();
        iconPlaySvg.setAttribute('href', 'assets/svg/sprite.svg#icon-pause');
      } else {
        player.pause();
        videoBackground.pause();
        iconPlaySvg.setAttribute('href', 'assets/svg/sprite.svg#icon-play');
      }

      singerTitle.textContent = playlist[currentTrack].singer;
      songTitle.textContent = playlist[currentTrack].song;
    }

    if (target.closest('.audio-button__prev')) prevTrack();
    if (target.closest('.audio-button__next')) nextTrack();
  });

  // if track ends we will launch next track
  player.addEventListener('ended', () => {
    nextTrack();
    player.play();
  });

  // scroll-bar progress + time
  player.addEventListener('timeupdate', () => {
    const currentTime = player.currentTime;
    const duration = player.duration;

    // count how much time passed in %
    const progress = (currentTime / duration) * 100;

    audioProgressTiming.style.width = progress + '%';

    let minutePassed = Math.floor(currentTime / 60) || '0';
    let secondsPassed = Math.floor(currentTime % 60) || '0';

    let minuteTotal = Math.floor(duration / 60) || '0';
    let secondsTotal = Math.floor(duration % 60) || '0';

    audioTimePassed.textContent = `${addZero(minutePassed)}:${addZero(
      secondsPassed,
    )}`;

    audioTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(
      secondsTotal,
    )}`;
  });

  // change track by progress bar
  audioProgress.addEventListener('click', e => {
    const x = e.offsetX; // click position from the left point of element
    const allWidth = audioProgress.clientWidth; // progress bar length
    const progress = (x / allWidth) * player.duration; // current click position
    player.currentTime = progress; // set current click position
  });

  // volume
  const changeColorVolume = () => {
    const colorValue = volumeProgress.value;
    volumeProgress.style.background =
      'linear-gradient(to right, #e20e5b 0%, #e20e5b ' +
      colorValue +
      '%, #ffffff ' +
      colorValue +
      '%, #ffffff 100%)';
  };

  const changeInputThumb = () => {
    volumeProgress.value = player.volume * 100; // return thumb
    changeColorVolume();
  };

  player.volume = 0.5; // initial position
  volumeProgress.value = player.volume * 100;

  volumeProgress.addEventListener('input', () => {
    player.volume = volumeProgress.value / 100;
    changeColorVolume();

    if (player.volume === 0) {
      iconSoundSvg.setAttribute('href', 'assets/svg/sprite.svg#icon-mute');
    } else {
      iconSoundSvg.setAttribute('href', 'assets/svg/sprite.svg#sound-on');
    }
  });

  volumeDown.addEventListener('click', () => {
    if (player.volume != 0) {
      player.volume = 0;
      iconSoundSvg.setAttribute('href', 'assets/svg/sprite.svg#icon-mute');
      changeInputThumb();
    } else {
      player.volume = 0.5;
      iconSoundSvg.setAttribute('href', 'assets/svg/sprite.svg#sound-on');
      changeInputThumb();
    }
  });

  volumeUp.addEventListener('click', () => {
    if (player.volume != 1) {
      player.volume = 1;
      changeInputThumb();
    } else {
      player.volume = 0.5;
      changeInputThumb();
    }
  });
};

export default audioPlayer;
