const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')

function togglePlay() {
    video.paused ? video.play() : video.pause()
}

function updateButton() {
    const icon = this.paused ? '►' : '▌▌'
    toggle.textContent = icon
    console.log('update');
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate() {
    video[this.name] = this.value
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = scrubTime
    console.log(scrubTime)
}

video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)

skipButtons.forEach(button => button.addEventListener('click', skip))
toggle.addEventListener('click', togglePlay)

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))

progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) => e.buttons === 1 && scrub(e) )
