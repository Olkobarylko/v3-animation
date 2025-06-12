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
      markers: true,
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




