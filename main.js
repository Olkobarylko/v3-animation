document.addEventListener("DOMContentLoaded", (event) => {
  const infoItems = document.querySelectorAll(
    ".wp-block-animation-v3__info-item"
  );
  const images = document.querySelectorAll(
    ".wp-block-animation-v3__images-block"
  );
  const pinBlock = ".pin-spacer:has(.wp-block-animation-v3__pin-block)";
  const timeArea = document.querySelector('.time-area');
  const timeElements = document.querySelectorAll('.time > div > div, .time .time-between-num');

  const infoItemShowDuration = 1000;
  const infoItemHoldDuration = 2000;
  const infoItemTotalDuration = infoItemShowDuration + infoItemHoldDuration;
  const totalScrollHeight = infoItems.length * infoItemTotalDuration;

  ScrollTrigger.create({
    trigger: ".wp-block-animation-v3__pin-block",
    start: "top top",
    end: `+=${totalScrollHeight}`,
    pin: true,
  });

  gsap.fromTo(
    ".wp-block-animation-v3__time",
    {
      x: "50vw",
      y: "0%",
    },
    {
      x: "0",
      y: "-50%",
      top: "50%",
      scrollTrigger: {
        trigger: ".wp-block-animation-v3__wrapper",
        start: "top+=200 bottom",
        end: "center center",
        scrub: 1,
      },
    }
  );

  infoItems.forEach((item, index) => {
    const subtitle = item.querySelector(
      ".wp-block-animation-v3__info-subtitle"
    );
    const title = item.querySelector(".wp-block-animation-v3__info-title");
    const text = item.querySelector(".wp-block-animation-v3__info-text");
    const isLastItem = index === infoItems.length - 1;

    const itemStart = index * infoItemTotalDuration;
    const itemEnd = itemStart + infoItemTotalDuration;

    if (isLastItem) {
      gsap.to(item, {
        scrollTrigger: {
          trigger: pinBlock,
          start: `top+=${itemStart} top`,
          end: `top+=${itemEnd} top`,
          scrub: 1,
        },
        keyframes: [
          { top: 500, opacity: 0, duration: 0.5 },
          { top: 0, opacity: 1, duration: 0.5 },
          { top: 0, opacity: 1, duration: 2 },
        ],
      });
    } else {
      gsap.to(item, {
        scrollTrigger: {
          trigger: pinBlock,
          start: `top+=${itemStart} top`,
          end: `top+=${itemEnd} top`,
          scrub: 1,
        },
        keyframes: [
          { top: 500, opacity: 0, duration: 0.5 },
          { top: 0, opacity: 1, duration: 0.5 },
          { top: 0, opacity: 1, duration: 2 },
          { top: -500, opacity: 0, duration: 0.5 },
        ],
      });
    }

    gsap.fromTo(
      subtitle,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        scrollTrigger: {
          trigger: pinBlock,
          start: `top+=${itemStart} top`,
          end: `top+=${itemStart + infoItemShowDuration} top`,
          scrub: 1,
        },
      }
    );

    gsap.fromTo(
      title,
      { y: 300, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: pinBlock,
          start: `top+=${itemStart} top`,
          end: `top+=${itemStart + infoItemShowDuration} top`,
          scrub: 1,
        },
      }
    );

    gsap.fromTo(
      text,
      { y: 500, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.4,
        scrollTrigger: {
          trigger: pinBlock,
          start: `top+=${itemStart} top`,
          end: `top+=${itemStart + infoItemShowDuration} top`,
          scrub: 1,
        },
      }
    );
  });

  images.forEach((image, index) => {
    const imageStart = index * infoItemTotalDuration + infoItemShowDuration;
    const imageEnd = imageStart + infoItemHoldDuration;

    gsap.fromTo(
      image,
      { height: "0%", scale: 1 },
      {
        height: "100%",
        scale: 1.5,
        scrollTrigger: {
          trigger: pinBlock,
          start: `top+=${imageStart} top`,
          end: `top+=${imageEnd} top`,
          scrub: 1,
        },
      }
    );
  });

  const timeBlock = document.querySelector(".time");
  const timeValue = timeBlock.getAttribute("data-time");
  const [targetHours, targetMinutes] = timeValue.split(":").map(Number);

  const columns = [
    ".time-first-num",
    ".time-second-num",
    ".time-third-num",
    ".time-fourth-num",
  ];

  // Ініціалізуємо колонки
  columns.forEach((col) => {
    gsap.set(col, { y: "0%" });
  });

  let currentHours = 0;
  let currentMinutes = 0;
  let lastScrollTime = 0;
  const scrollDelay = 500;

  function animateDigit(selector, targetValue, currentValue) {
    if (
      (currentValue === 9 && targetValue === 0) ||
      (currentValue === 0 && targetValue === 9)
    ) {
      gsap.set(selector, { y: `-${targetValue * 100}%` });
    } else {
      gsap.to(selector, {
        y: `-${targetValue * 100}%`,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  }

  function updateTime(hours, minutes) {
    if (hours !== currentHours) {
      const firstNum = Math.floor(hours / 10);
      const secondNum = hours % 10;

      animateDigit(
        ".time-first-num",
        firstNum,
        currentHours > 0 ? Math.floor(currentHours / 10) : 0
      );

      animateDigit(
        ".time-second-num",
        secondNum,
        currentHours > 0 ? currentHours % 10 : 0
      );

      currentHours = hours;
    }

    if (minutes !== currentMinutes) {
      const thirdNum = Math.floor(minutes / 10);
      const fourthNum = minutes % 10;

      animateDigit(
        ".time-third-num",
        thirdNum,
        currentMinutes > 0 ? Math.floor(currentMinutes / 10) : 0
      );

      animateDigit(
        ".time-fourth-num",
        fourthNum,
        currentMinutes > 0 ? currentMinutes % 10 : 0
      );

      currentMinutes = minutes;
    }
  }

  ScrollTrigger.create({
    trigger: ".wp-block-animation-v3__pin-block",
    start: "top top",
    end: `+=${totalScrollHeight}`,
    scrub: 20,
    onUpdate: (self) => {
      const now = Date.now();
      if (now - lastScrollTime > scrollDelay) {
        const progress = self.progress;
        const totalTargetMinutes = targetHours * 60 + targetMinutes;
        const currentTotalMinutes = Math.min(
          Math.floor(progress * totalTargetMinutes),
          totalTargetMinutes
        );

        const hours = Math.floor(currentTotalMinutes / 60);
        const minutes = Math.floor(currentTotalMinutes % 60);

        updateTime(hours, minutes);
        lastScrollTime = now;
      }
    },
    onEnter: () => updateTime(0, 0),
    onLeave: () => updateTime(targetHours, targetMinutes),
    onRefresh: () => updateTime(0, 0),
  });

  const titles = document.querySelectorAll('.wp-block-animation-v3__info-title');
  const lastTitle = titles[titles.length - 1];

 ScrollTrigger.create({
  trigger: ".pin-spacer:has(.wp-block-animation-v3__pin-block)",
  start: `bottom-=700 center`,
  end: `bottom-=350 center`,
  scrub: 1,
  onEnter: () => {
      timeElements.forEach(el => {
        el.style.animation = 'blink 0.5s ease-in-out infinite';
      });
      lastTitle.style.animation = 'blink 0.5s ease-in-out infinite';
  },
  onEnterBack: () => {
    timeElements.forEach(el => {
      el.style.animation = '';
    });
    lastTitle.style.animation = '';
  },
  onLeaveBack: () => {
    timeElements.forEach(el => {
      el.style.animation = '';
    });
    lastTitle.style.animation = '';
  }
});


  ScrollTrigger.create({
    trigger: ".pin-spacer:has(.wp-block-animation-v3__pin-block)",
    start: `bottom-=350 center`,
    end: `bottom center`,
    scrub: true,
    
    onEnter: () => {
      timeArea.classList.add('finished');
      lastTitle.classList.add('finished');
    },
    onLeaveBack: () => {
      timeArea.classList.remove('finished');
      lastTitle.classList.remove('finished');
    }
  });
});
