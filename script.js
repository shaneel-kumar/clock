// ANALOG CLOCK PRESENTING CURRENT TIME

// DOM Elements
const hoursArm = document.querySelector('.clock__hours')
const minutesArm = document.querySelector('.clock__minutes')
const secondsArm = document.querySelector('.clock__seconds')
const soundButton = document.querySelector('.sound_btn')

const clockSound = document.getElementById('click')
let soundAllowed = false

soundButton.addEventListener('click', () => {
  soundAllowed = !soundAllowed
  if (!soundAllowed) {
    clockSound.muted = true
    soundButton.classList.toggle('sound_disabled')
    soundButton.innerText = 'Play Sound'
  } else {
    soundButton.classList.toggle('sound_disabled')
    soundButton.innerText = 'Stop Sound'
    clockSound.muted = false
  }
})

updateTime()

// Get current time once
function getTime() {
  let today = new Date()
  let hours = today.getHours()
  let minutes = today.getMinutes()
  let seconds = today.getSeconds()

  return {
    hours,
    minutes,
    seconds,
  }
}

// Move clock arms
function updateHand(hand, angle) {
  hand.style.transform = `rotateZ(${angle}deg) translateX(-50%)`
}

function updateTime() {
  // Get current time
  const currentTime = getTime()

  // Separate time into components
  const currentHour = currentTime.hours
  const currentMinute = currentTime.minutes
  const currentSecond = currentTime.seconds

  // Get arm angles
  const getMinuteAngle = currentMinute * 6
  const getSecondAngle = currentSecond * 6
  const getHourAngle = (currentHour > 12 ? currentHour % 12 : currentHour) * 30

  // Update arm position with new angle
  updateHand(hoursArm, getHourAngle)
  updateHand(minutesArm, getMinuteAngle)
  updateHand(secondsArm, getSecondAngle)
}

// Update seconds hand
let playSound = false
const intervalId = setInterval(() => {
  updateTime()
  playSound = !playSound
  if (playSound && soundAllowed) {
    clockSound.currentTime = 0
    clockSound.play()
  }
}, 1000)

// setTimeout(() => {
//   clearInterval(intervalId)
// }, 10000)

function getSecMin(arm) {
  const currentTime = getTime()
  return currentTime[arm]
}

// Display date
// Add animations
