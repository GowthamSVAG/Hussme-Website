// #a560ff6f
// #f0824359

import { BiTrash } from "react-icons/bi";

/* !<--Start of Carousal Section-->! */
// .slider {
//     width: 95%;
//     max-width: 1200px;
//     height: auto;
//     max-height: 700px;
//     /* max-height: 100vh; */
//     border-radius: 10px 0px 10px 0px;
//     overflow: hidden;
//     position: relative;
//   }
//   .slides {
//     display: flex;
//     transition: all 3s ease-in-out; /* Increased from 2s */
//   }

//   .slides input {
//     display: none;
//   }
//   .slide {
//     height: 80%;
//     position: relative;
//     flex: 0 0 100%;
//   }

//   .slide img {
//     width: 100%;
//     object-fit: contain;
//   }

//   .slide-text {
//     min-height: fit-content;
//     width: auto;
//     max-width: 750px;
//     position: absolute;
//     bottom: 20%;
//     right: 0%;
//     color: rgb(0, 0, 0);
//     text-align: left;
//     background: rgba(255, 255, 255, 0.952);
//     padding: 8px;
//     border-radius: 8px 0px 0px 0px;
//   }

//   .slide-text h2 {
//     padding-left: 5px;
//     max-width: 800px;
//     font-style: italic;
//     text-align: left;
//     margin: 0 0 0 0;
//   }

//   /* Adjust styles for larger screens */
//   @media screen and (max-width: 1440px) {
//     .slide-text {
//       bottom: 25%;
//       right: 0px;
//     }
//     .slide-text h2 {
//       font-size: medium;
//       color: #000000;
//     }
//   }

//   /* For smaller devices */
//   @media screen and (max-width: 1090px) {
//     .slide-text {
//       top: 70%;
//       right: 0%;
//     }
//     .slide-text h2 {
//       max-width: 330px;
//       height: fit-content;
//       font-size: small;
//       color: rgb(6, 6, 6);
//     }
//   }

//   @media screen and (max-width: 650px) {
//     /* <--mobile view--> */
//     .slide-text {
//       top: 75%;
//     }
//     .slide img {
//       border-radius: 0px 0px 10px 0px;
//     }
//   }

//   /* For mobile devices */
//   @media screen and (max-width: 480px) {
//     .slide-text {
//       bottom: 12%;
//       text-align: left;
//       width: auto;
//     }
//     .slide-text h2 {
//       font-size: xx-small;
//       width: auto;
//       max-width: 240px;
//       color: rgb(0, 0, 0);
//     }
//   }

//   .navigation-manual {
//     position: absolute;
//     bottom: 10px;
//     left: 50%;
//     transform: translateX(-50%);
//     display: flex;
//   }

//   .manual-btn {
//     width: 47px;
//     max-width: 85px;
//     height: 0px;
//     max-height: 5px;
//     transform: skew(20deg);
//     border: 1.5px solid rgb(255, 255, 255);
//     padding: 4px 5px 4px 4px;
//     border-radius: 1%;
//     cursor: pointer;
//     transition: background-color 0.3s ease;
//   }
//   .manual-btn:not(:last-child) {
//     margin-right: 15px;
//   }
//   .manual-btn:hover {
//     background-color: rgb(255, 255, 255);
//   }

//   #radio1:checked ~ .first {
//     margin-left: 0%;
//   }
//   #radio2:checked ~ .first {
//     margin-left: -100%;
//     transition: all 3s ease-in-out;
//   }

//   #radio3:checked ~ .first {
//     margin-left: -200%;
//     transition: all 1.5s ease-in-out;
//   }

//   .navigation-auto {
//     position: absolute;
//     display: flex;
//     justify-content: center;
//     bottom: 9px;
//     left: 50%;
//     transform: translateX(-50%);
//   }
//   .navigation-auto div {
//     width: 51px;
//     max-width: 80px;
//     height: 5px;
//     max-height: 5px;
//     transform: skew(20deg);
//     border: 2.1px solid rgb(255, 255, 255);
//     padding: 2px;
//     border-radius: 1%;
//     transition: background-color 3s ease;
//   }
//   .navigation-auto div:not(:last-child) {
//     margin-right: 15px;
//   }

//   #radio1:checked ~ .navigation-auto .auto-btn1,
//   #radio2:checked ~ .navigation-auto .auto-btn2,
//   #radio3:checked ~ .navigation-auto .auto-btn3 {
//     background: rgb(255, 255, 255);
//   }

//   /* Responsive Design */
//   @media screen and (max-width: 1440px) {
//     .home {
//       background-color: rgb(255, 255, 255);
//     }
//     .slider {
//       max-width: 900px;
//       max-height: 500px;
//     }
//     .manual-btn {
//       padding: 4px;
//     }
//     .navigation-auto div {
//       padding: 1.5px;
//     }
//   }

//   @media screen and (max-width: 1024px) {
//     .home {
//       background-color: rgb(255, 255, 255);
//     }
//     .slider {
//       max-width: 900px;
//       max-height: 500px;
//     }
//     .manual-btn {
//       padding: 4px;
//     }
//     .navigation-auto div {
//       padding: 1.5px;
//     }
//   }

//   @media screen and (max-width: 768px) {
//     .home {
//       background-color: rgb(255, 255, 255);
//     }
//     .slider {
//       max-width: 700px;
//       max-height: 400px;
//     }
//     .manual-btn {
//       padding: 4px;
//     }
//     .navigation-auto div {
//       padding: 1.5px;
//     }
//   }

//   @media screen and (max-width: 480px) {
//     .home {
//       background-color: rgb(255, 255, 255);
//     }
//     .slider {
//       max-width: 90%;
//       max-height: 300px;
//     }
//     .manual-btn {
//       padding: 4px;
//     }
//     .navigation-auto div {
//       /* for mobile  */
//       width: 50px;
//       max-width: 80px;
//       height: 5px;
//       max-height: 5px;
//       padding: 2px;
//     }
//   }

/* !<--End of Carousal Section-->! */

/* scroll */
/* From Uiverse.io by mrhyddenn */
// .scrolldown {
//     background-color: rgba(148, 53, 196, 0.281);
//     --color: rgb(154, 39, 226);
//     --sizeX: 30px;
//     --sizeY: 50px;
//     position: relative;
//     width: var(--sizeX);
//     height: var(--sizeY);
//     margin-left: var(sizeX / 2);
//     border: calc(var(--sizeX) / 10) solid var(--color);
//     border-radius: 50px;
//     box-sizing: border-box;
//     margin-bottom: 16px;
//     cursor: pointer;
//   }

//   .scrolldown::before {
//     content: "";
//     position: absolute;
//     bottom: 30px;
//     left: 50%;
//     width: 6px;
//     height: 6px;
//     margin-left: -3px;
//     background-color: var(--color);
//     border-radius: 100%;
//     animation: scrolldown-anim 2s infinite;
//     box-sizing: border-box;
//     box-shadow: 0px -5px 3px 1px #2a547066;
//   }

//   @keyframes scrolldown-anim {
//     0% {
//       opacity: 0;
//       height: 6px;
//     }

//     40% {
//       opacity: 1;
//       height: 10px;
//     }

//     80% {
//       transform: translate(0, 20px);
//       height: 10px;
//       opacity: 0;
//     }

//     100% {
//       height: 3px;
//       opacity: 0;
//     }
//   }

//   .chevrons {
//     padding: 6px 0 0 0;
//     margin-left: -3px;
//     margin-top: 48px;
//     width: 30px;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//   }

//   .chevrondown {
//     margin-top: -6px;
//     position: relative;
//     border: solid var(--color);
//     border-width: 0 3px 3px 0;
//     display: inline-block;
//     width: 10px;
//     height: 10px;
//     transform: rotate(45deg);
//   }

//   .chevrondown:nth-child(odd) {
//     animation: pulse54012 500ms ease infinite alternate;
//   }

//   .chevrondown:nth-child(even) {
//     animation: pulse54012 500ms ease infinite alternate 250ms;
//   }

//   @keyframes pulse54012 {
//     from {
//       opacity: 0;
//     }

//     to {
//       opacity: 0.5;
//     }
//   }
/* scroll */
// Function For Carousal auto slide change
// useEffect(() => {
//   let counter = 1;

//   // Immediately change to the first slide
//   document.getElementById("radio" + counter).checked = true;

//   const interval = setInterval(() => {
//     counter++;
//     if (counter > 3) counter = 1;

//     const radio = document.getElementById("radio" + counter);
//     if (radio) {
//       radio.checked = true;
//     }
//   }, 6000); // Keep interval duration

//   return () => clearInterval(interval);
// }, []);
//   // Function to handle manual slide change
//   <div className="slider">
//   <div className="slides">
//     <input type="radio" name="radio-btn" id="radio1" />
//     <input type="radio" name="radio-btn" id="radio2" />
//     <input type="radio" name="radio-btn" id="radio3" />
//     <div className="slide first">
//       <img src={s1} alt="" />
//       <div className="slide-text">
//         <h2>ONE PLATFORM FOR BUSINESS AND TALENT</h2>
//       </div>
//     </div>
//     <div className="slide">
//       <img src={s2} alt="" />
//       <div className="slide-text">
//         <h2>
//           BUSINESS LEVERAGE US FOR ON DEMAND STAFFING AND DIGITAL
//           MARKETINGSINESS AND TALENT{" "}
//         </h2>
//       </div>
//     </div>
//     <div className="slide">
//       <img src={s3} alt="" />
//       <div className="slide-text">
//         <h2>
//           TALENT LEVERAGE US FOR FLEXIBLE WORK SCHEDULE AND CAREER
//           ASSISTANCE
//         </h2>
//       </div>
//     </div>

//     <div className="navigation-auto">
//       <div className="auto-btn1"></div>
//       <div className="auto-btn2"></div>
//       <div className="auto-btn3"></div>
//     </div>
//   </div>
//   <div className="navigation-manual">
//     <label htmlFor="radio1" className="manual-btn"></label>
//     <label htmlFor="radio2" className="manual-btn"></label>
//     <label htmlFor="radio3" className="manual-btn"></label>
//   </div>
// </div>

// const handleScrollHome = () => {
//   const element = document.querySelector(".our-levers");
//   if (element) {
//     const topPos =
//       element.getBoundingClientRect().top + window.pageYOffset - 100;
//     window.scrollTo({ top: topPos, behavior: "smooth" });
//   }
// };
{
  /* <div className="scrolldown" onClick={handleScrollHome}>
                <div className="chevrons">
                  <div className="chevrondown"></div>
                  <div className="chevrondown"></div>
                </div>
              </div> */
}

// business page BiTrash
{
  /* <div className="img-content">
      <div className="home-slogan">
            <div className="slogan-part">
              <span className="slogan-1">Y</span>our Brand
              <span className="slogan-2">O</span>ur Boost
            </div>
          </div>
        <div className="blog-slogan">
          <div className="blog-text-box">
            <div className="blog-line-1">Leverage us</div>
            <div className="blog-line-2">for your</div>
            <div className="blog-line-3">Growth</div>
          </div>
        </div>
        <div className="img-detail">
          <div className="blog-img">
            <img src={blogImg} alt="" />
          </div>
          <div className="blog-detail">
            <p>
              We partner with you to understand your business needs, providing
              on-demand staffing and digital marketing solutions.
            </p>
          </div>
        </div>
      </div> */
}



// contact us page excem 
{/* <div className="contact-intro">
        <div className="left-contact"></div>
        <div className="right-contact">
          <div className="contact-slogan">
            <div className="contact-line-1">Get in Touch</div>
            <div className="contact-line-2">
              <span className="symbol-color"></span>
            </div>
          </div>
          <div className="contact-detail">
            Have questions or need assistance? We're here to help! Reach out to
            us for inquiries about franchise opportunities, application support,
            or any other queries. Let’s build your franchise journey together!
          </div>

          <div onClick={handleScroll} className="contact-button">Contact Us</div>
        </div>
      </div> */}


      // .contact-title {
      //   width: 100%;
      //   min-height: 50px;
      //   font-family: " font-family: "Kumbh Sans", sans-serif;";
      //   font-size: 45px;
      //   font-weight: 700;
      // }
      // .contact-intro {
      //   width: 100%;
      //   min-height: 700px;
      //   /* background-color: antiquewhite; */
      //   display: flex;
      //   flex-direction: row;
      //   justify-content: center;
      //   align-items: center;
      // }
      // @media screen and (max-width: 1140px) {
      //   .contact-intro {
      //     flex-direction: column;
      //     min-height: 800px;
      //     width: 100%;
      //     /* background-color: aquamarine; */
      //   }
      //   .left-contact {
      //     min-width: 100%;
      //     background-size: cover;
      //     max-height: 400px;
      //     /* background-color: antiquewhite; */
      //     /* min-height: 250px; */
      //   }
      //   .right-contact {
      //     min-height: 400px;
      //     min-width: 95%;
      //     /* background-color: orange; */
      //     margin-bottom: 50px;
      //   }
      // }
      // .left-contact {
      //   width: 50%;
      
      //   min-height: 600px;
      //   background-image: url("../Assets/Home-Blog/contactus.png");
      //   background-repeat: no-repeat;
      //   background-position: center;
      //   background-size: contain;
      // }
      // .right-contact {
      //   width: 50%;
      //   max-height: 550px;
      //   display: flex;
      //   flex-direction: column;
      //   justify-content: center;
      //   align-items: center;
      //   /* background-color:gray ; */
      //   gap: 30px;
      // }
      // .contact-slogan {
      //   width: 80%;
      //   height: fit-content;
      //   display: flex;
      //   flex-direction: column;
      //   /* background-color: blue; */
      // }
      // .contact-line-1,
      // .contact-line-2 {
      //   text-align: left;
      //   width: fit-content;
      //   height: fit-content;
      //   font-family: " font-family: "Kumbh Sans", sans-serif;";
      //   font-size: 75px;
      //   line-height: 80px;
      //   font-weight: 700;
      // }
      // .contact-line-2 {
      //   display: flex;
      //   flex-direction: row;
      // }
      // .symbol-color {
      //   color: blueviolet;
      // }
      // .contact-detail {
      //   width: 80%;
      //   font-size: x-large;
      //   font-weight: 500;
      //   text-align: left;
      // }
      // .contact-button {
      //   height: 50px;
      //   width: 200px;
      //   display: flex;
      //   justify-content: center;
      //   align-items: center;
      //   font-family: " font-family: "Kumbh Sans", sans-serif;";
      // cursor: pointer;
      //   font-size: 25px;
      //   font-weight: 450;
      //   color: white;
      //   border-radius: 3px;
      //   background-color: #9747ff;
      // }