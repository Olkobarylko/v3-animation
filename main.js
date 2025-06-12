document.addEventListener("DOMContentLoaded", (event) => {
  ScrollTrigger.create({
    trigger: ".wp-block-animation-v3__pin-block",
    start: "top top",
    end: "+=5000",
    pin: true,
    pinSpacing: true,
  });

  gsap.to(".wp-block-animation-v3__time", {
    right: "50%",
    top: "50%",
    x: "50%",
    y: "-50%",
    scrollTrigger: {
      trigger: ".wp-block-animation-v3__wrapper",
      start: "top+=200 bottom",
      end: "center center",

      scrub: 1,
    },
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".wp-block-animation-v3__info-item");
  const blockDuration = 1000;

 items.forEach((item, index) => {
  const triggerBlock = ".pin-spacer:has(.wp-block-animation-v3__pin-block)";
  const subtitle = item.querySelector(".wp-block-animation-v3__info-subtitle");
  const title = item.querySelector(".wp-block-animation-v3__info-title");
  const text = item.querySelector(".wp-block-animation-v3__info-text");

  const overlap = 500;
  const baseStart = index * (2000 - overlap) ;
  const baseEnd = baseStart + 2000;

  gsap.to(item, {
    scrollTrigger: {
      trigger: triggerBlock,
      start: `top+=${baseStart} top`,
      end: `top+=${baseEnd} top`,
      scrub: 1,
    },
    keyframes: [
      { top: 500, opacity: 0 },
      { top: 0, opacity: 1, duration: 1 },
      { top: 0, opacity: 1, duration: 1 },
      { top: -500, opacity: 0, duration: 0.5 },
    ],
  });

//   gsap.to(subtitle, {
//     scrollTrigger: {
//       trigger: triggerBlock,
//       start: `top+=${baseStart} top`,
//       end: `top+=${baseEnd} top`,
//       scrub: 1,
//     },
//     keyframes: [
//       { y: 0 },
//       { y: 0, duration: 1 },
//       { y: 0, duration: 1 },
//       { y: -400, duration: 0.5 },
//     ],
//   });

//   gsap.to(title, {
//     scrollTrigger: {
//       trigger: triggerBlock,
//       start: `top+=${baseStart} top`,
//       end: `top+=${baseEnd} top`,
//       scrub: 1,
//     },
//     keyframes: [
//       { y: 100 },
//       { y: 0, duration: 1 },
//       { y: 0, duration: 1 },
//       { y: -300, duration: 0.5 },
//     ],
//   });

//   gsap.fromTo(
//     text,
//     { y: 200 },
//     {
//       y: 0,
//       opacity: 1,
//       scrollTrigger: {
//         trigger: triggerBlock,
//         start: `top+=${baseStart + 200} top`,
//         end: `top+=${baseEnd / 2} top`,
//         scrub: 1,
//       },
//     }
//   );
});

 const images = document.querySelectorAll(
    ".wp-block-animation-v3__images-block"
  );

  let countPhaseStart = 0;
  let countPhaseEnd = 0;

  images.forEach((item, index) => {
    gsap.fromTo(
      item,
      { height: "0%", scale: 1 },
      {
        height: "100%",
        scale: 1.5,
        scrollTrigger: {
          trigger: ".pin-spacer:has(.wp-block-animation-v3__pin-block)",
          start: `top+=${(index * 1500) + 1000} top`,
          end: `top+=${((index + 1) * 1500) + 1000} top`,
          scrub: 1,
        },
      }
    );
  });

 
});


document.addEventListener('DOMContentLoaded', () => {
	const scrollSection = ".pin-spacer:has(.wp-block-animation-v3__pin-block)";

	let timerActive = false;
	const timeBlock = document.querySelector('.time');
	const timeArea = document.querySelector('.time-area');
	const timeValue = timeBlock.getAttribute('data-time');
	let [targetMinutes, targetSeconds] = timeValue.split(':').map(Number);

	let minutes = 0;
	let seconds = 0;

	const columns = [
		'.time-first-num',
		'.time-second-num',
		'.time-third-num',
		'.time-fourth-num',
	];

	let timerInterval;

	function animateTime(min, sec) {
		const timeDigits = [
			Math.floor(min / 10),
			min % 10,
			Math.floor(sec / 10),
			sec % 10,
		];

		columns.forEach((selector, index) => {
			const column = document.querySelector(selector);
			const digit = timeDigits[index];

			if (!isNaN(digit)) {
				gsap.to(column, {
					y: `-${digit * 100}%`,
					ease: 'power2.out',
					duration: 1,
				});
			}
		});
	}
	let blinkingTriggered = false;

	function updateTime() {
		if (minutes >= targetMinutes && seconds >= targetSeconds) {
			clearInterval(timerInterval);
			timeArea.classList.add('finished');
			timeArea.classList.remove('blinking');
			return;
		}

		if (
			minutes === targetMinutes &&
			seconds >= targetSeconds - 1 &&
			!blinkingTriggered
		) {
			blinkingTriggered = true;
			timeArea.classList.add('blinking');
			setTimeout(() => {
				timeArea.classList.remove('blinking');
			}, 3000);
		}

		seconds++;
		if (seconds === 60) {
			seconds = 0;
			minutes++;
		}

		animateTime(minutes, seconds);
	}

	function pauseTimer() {
		clearInterval(timerInterval);
	}

	function resumeTimer() {
		timerInterval = setInterval(updateTime, 1000);
	}

	function resetTimer() {
		minutes = 0;
		seconds = 0;
		blinkingTriggered = false;
		animateTime(minutes, seconds);
		timeArea.classList.remove('finished');
		timeArea.classList.remove('blinking');
	}
	let selfPgogress =  0;

	setTimeout(() => {
		ScrollTrigger.create({
		trigger: scrollSection,
		start: 'top center',
		end: 'bottom center+=300',
		once: false,
		toggleActions: 'play none none none',
		invalidateOnRefresh: true,
		onUpdate: (self) => {
			if (self.progress > 0 && !timerActive) {
				resumeTimer();
				timerActive = true;
				timeArea.classList.remove('finished');
			} else if (self.progress === 0 && timerActive) {
				pauseTimer();
				timerActive = false;
				timeArea.classList.remove('finished');
			}
		},
		onEnter: () => {
			if (!timerActive) {
				resumeTimer();
				timerActive = true;
			}
			resetTimer();
		},
		onLeave: () => {
			pauseTimer();
			timerActive = false;
			timeArea.classList.add('blinking');

			setTimeout(() => {
				timeArea.classList.add('finished');
			}, 1000);
		},
		onEnterBack: () => {
			resetTimer();
		},
		onLeaveBack: () => {
			resetTimer();
			timerActive = false;
		},
	});
	}, 500);

	pauseTimer();
});



