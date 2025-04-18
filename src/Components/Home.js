import "../Components/Home.css";
import React, { useEffect } from "react";
import s1 from "../Components/Assets/Carousal/slide-1.jpg";
import s2 from "../Components/Assets/Carousal/slide-2.png";
import s3 from "../Components/Assets/Carousal/slide-3.png";
import hand from "../Components/Assets/Home-Header-Footer/handshake.jpg";
import d1 from "../Components/Assets/Our Levers/digital.jpg";
import staff1 from "../Components/Assets/Our Levers/staff.jpg";
import c1 from "../Components/Assets/Our Levers/consultation.jpg";
import play1 from "../Components/Assets/Our Levers/our-ser.png";
import play2 from "../Components/Assets/Our Levers/our-ser-back.png";
import b1 from "../Components/Assets/Bus-Talent/business-img.jpg";
import t1 from "../Components/Assets/Bus-Talent/talent-img.png";
import arrow from "./Assets/For-status/Arrow.svg";
import mes from "./Assets/Home-Header-Footer/message-color.png";
import { Link } from "react-router-dom";
import { useRef } from "react";

export function Home() {
  const scrollRef = useRef(null);

  const scrollBlog = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 500;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
  const handleScrollHome = () => {
    const element = document.querySelector(".our-levers");
    if (element) {
      const topPos =
        element.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: topPos, behavior: "smooth" });
    }
  };

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

  // Function for work status count increase
  window.onload = () => {
    const nums = document.querySelectorAll(".count");
    const container = document.querySelector(".work-status-container");

    if (!container) {
      console.error("Container not found");
      return;
    }

    let test = false; // To ensure the function runs only once

    window.onscroll = () => {
      const containerPosition = container.offsetTop - window.innerHeight;

      if (window.scrollY >= containerPosition && !test) {
        nums.forEach((e) => {
          let start = 0;
          const end = parseInt(e.dataset.num, 10);

          const count = setInterval(() => {
            start++;
            e.textContent = start + (e.dataset.num.includes("+") ? "+" : "");
            if (start === end) {
              clearInterval(count);
            }
          }, 2000 / end);
        });
        test = true;
      }
    };
  };

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
  return (
    <div className="home">
      {/* Start of Carousal Section  */}
      {/* End of Carousal Section  */}

      {/*Start of New landing Section */}
      <div className="starting-container">
        <div className="illu-section"></div>
        <div className="company-motive-slogan-section">
          <div className="home-slogan">
            <div className="slogan-part">
              <span className="slogan-letter slogan-1">F</span>ind Work
            </div>
            <div className="slogan-part no-break">
              That
              <span className="slogan-letter slogan-2">W</span>orks for You
            </div>
          </div>

          <div className="underline">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1729 149">
              <path
                d="M1689.89 26.59a4479.17 4479.17 0 0 0-89.64-7.41C1354.1.45 1106.56-5.76 859.92 5.93c-227.31-4.25-454.79 8.96-681.36 27.95C121.94 38.9 65.1 40.2 8.38 42.12c-16.57 2.86-5.23 26.39 5.6 14.46 160.76-1.27 331.82-27.38 620.54-34.8A4574.9 4574.9 0 0 0 498.9 36.57C376.43 52.24 253.01 65.21 132.88 94.51c-36.16 8.94-71.67 20.31-106.69 32.95-7.14 4.4-27.74 3.63-24.98 15.62 1.99 7.19 13.63 7.05 18.04 2.59 143.67-54.58 297.49-70.64 448.88-90.24 129.01-16.82 258.61-28.01 388.46-34.27 285.02 6.07 570.13 38.15 848.22 100.65 3.84 1.09 8.24-1.32 9.23-5.24 1.98-7.31-5.66-9.96-11.42-10.6-48.05-10.76-96.18-21.26-144.56-30.43-160.68-28.2-322.86-46.78-485.4-60.19l-2.34-.16c161.55-1.33 323.21 4.35 484.31 15.71 37.11 2.65 125.06 8.85 164.97 13.96a7.58 7.58 0 0 0 8.45-6.41c.94-13.18-23.48-8.77-38.14-11.86Z"
                fill="#9a56f3f7"
              ></path>
            </svg>
          </div>

          <div className="home-des">
            Discover flexible opportunities tailored to your skills and
            lifestyle. Whether you're freelancing, side-hustling, or job-hunting
            — Hussme has your back. <br />
            <div className="last-slogan">
              <span>Start your journey to smarter work today.</span>
              <div className="scrolldown" onClick={handleScrollHome}>
                <div className="chevrons">
                  <div className="chevrondown"></div>
                  <div className="chevrondown"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*End of New landing Section */}
      {/* Start of Our Levers Section  */}
      <div className="our-levers">
        <div className="levers">
          <div className="tex">Our Levers</div>
        </div>
        <div className="row-container">
          <div className="img-container">
            <img src={hand} alt="" />
          </div>
          <div className="containers">
            <div className="container-1">
              <div className="our-card">
                <div className="card-inner">
                  <div className="card-front ddk">
                    <div className="circle">
                      <img
                        src={d1}
                        className="img-circle-1"
                        alt="Digital Marketing"
                      />
                    </div>
                    <h2 className="our-card-h2-front">Digital Marketing</h2>
                  </div>

                  <div className="card-back">
                    <div className="content">
                      <p>
                        Enhance the website and utilize social platforms
                        (Facebook, Instagram, X) for branding and generating
                        leads for business growth.
                      </p>
                    </div>
                    <div className="bottom-title">
                      <h2 className="our-card-h2-back">Digital Marketing</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="play-button">
              <div className="play-button-inner">
                <div className="play-button-front">
                  <img src={play2} alt="Front" />
                </div>
                <div className="play-button-back">
                  <img src={play1} alt="Back" />
                </div>
              </div>
            </div>

            <div className="container-2">
              <div className="our-card">
                <div className="card-inner">
                  <div className="card-front ssk">
                    <div className="circle">
                      <img
                        src={staff1}
                        className="img-circle-1"
                        alt="Staffing Services"
                      />
                    </div>
                    <h2 className="our-card-h2-front">Staffing Services</h2>
                  </div>

                  <div className="card-back">
                    <div className="content">
                      <p>
                        Innovative on-demand staffing solutions - Hussme Hiring
                        platform for business needs and flexible work schedule
                        for talents.
                      </p>
                    </div>
                    <div className="bottom-title">
                      <h2 className="our-card-h2-back">Staffing Services</h2>
                    </div>
                  </div>
                </div>
              </div>

              <div className="our-card">
                <div className="card-inner">
                  <div className="card-front cck">
                    <div className="circle">
                      <img
                        src={c1}
                        className="img-circle-1"
                        alt="Digital Marketing"
                      />
                    </div>
                    <h2 className="our-card-h2-front">Consultation</h2>
                  </div>

                  <div className="card-back">
                    <div className="content">
                      <p>
                        Streaming the business process for growth and bring in
                        the out of the box solution to reduce expenses.
                      </p>
                    </div>
                    <div className="bottom-title">
                      <h2 className="our-card-h2-back">Consultation</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End of Our Levers Section  */}

      {/* Start of Business & Talent Card Section  */}
      <div className="bus-tal-container">
        <div className="business-container">
          <div className="business-img-section">
            <img src={b1} alt="" />
          </div>
          <div className="business-content-section">
            <div className="content-list">
              <div className="content-heading">Business</div>
              <ul>
                <li>Business profiling and plan</li>
                <li>Quick on-demand staff selection on contract basis</li>
                <li>Dedicated recruitment team for full-time hiring</li>
                <li>New hire online training</li>
                <li>Website hosting and regular maintenance</li>
                <li>Facebook, Instagram, and X marketing</li>
              </ul>
              <Link to="/business">
                <button className="button-57">
                  <span className="text">Package & Pricing</span>
                  <span>Package & Pricing</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Talent Card */}
        <div className="talent-container">
          <div className="talent-img-section">
            <img src={t1} alt="" />
          </div>
          <div className="talent-content-section">
            <div className="content-list">
              <div className="content-heading">Talent</div>
              <ul>
                <li>Individual profiling</li>
                <li>Flexible working schedule and on-demand rate</li>
                <li>Business reach out with the work request</li>
                <li>Online trainings and carrier assistance</li>
              </ul>
              <Link to="/talent">
                <button className="button-57">
                  <span className="text">Package & Pricing</span>
                  <span>Package & Pricing</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* End of Business & Talent Card Section  */}

      {/* Start of Company Work Progress Count */}
      <div className="work-status-container">
        <div className="status-list">
          <div className="status-box">
            <div className="icon icon-1"></div>
            <div className="count" data-num="20+">
              5
            </div>
            <div className="progress-name">Projects Completed</div>
          </div>
          <div className="status-box">
            <div className="icon icon-2"></div>
            <div className="count" data-num="50">
              5
            </div>
            <div className="progress-name">Employer Solution</div>
          </div>
          <div className="status-box">
            <div className="icon icon-3"></div>
            <div className="count" data-num="100">
              5
            </div>
            <div className="progress-name">Job Seekers</div>
          </div>
          <div className="status-box">
            <div className="icon icon-4"></div>
            <div className="count" data-num="10+">
              1
            </div>
            <div className="progress-name">Happy Customers</div>
          </div>
        </div>
      </div>

      {/* End of Company Work Progress Count */}

      {/*Start of Home Contact card */}
      <div className="contact-card">
        <div className="left-detail">
          <div className="line-1">Trusted source for</div>
          <div className="line-2">business growth</div>
        </div>
        <div className="center-icn">
          <img src={mes} alt="" />
        </div>
        <div className="right-detail">
          <div className="line-1"> Have any questions?</div>
          <div className="line-2">
            Call Us <a href="tel:+1 803 803 9889">+1 803 803 9889</a>  
          </div>
        </div>
      </div>
      {/* End of  of Home Contact card */}

      {/*Start of Home Blog */}
      <div className="blog-heading">Blog</div>
      <div className="home-blog-section">
        <div className="home-blog-cards-container" ref={scrollRef}>
          <div className="home-blog-card">
            <div className="background-img cr-1" loading="lazy">
              <div className="btm-card">
                <div className="date-comment">
                  <div className="date">
                    <div className="date-icn"></div>
                    15,Feb, 2024
                  </div>
                  <div className="comment">
                    <div className="comment-icn"></div>
                    05, Comments
                  </div>
                </div>
                <div className="blog-title">
                  <Link to="/digital">
                    <h2>Digital Marketing</h2>
                  </Link>
                </div>
                <div className="last-box">
                  <div className="more-info">
                    <Link to="/digital">Get more info</Link>
                  </div>
                  <div className="arrow">
                    <Link to="/digital">
                      <img src={arrow} alt="" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="home-blog-card">
            <div className="background-img cr-2" loading="lazy">
              <div className="btm-card">
                <div className="date-comment">
                  <div className="date">
                    <div className="date-icn"></div>
                    18,Feb, 2024
                  </div>
                  <div className="comment">
                    <div className="comment-icn"></div>
                    09 Comments
                  </div>
                </div>
                <div className="blog-title">
                  <Link to="/digital">
                    <h2>Hire easily HR candidates in few seconds</h2>
                  </Link>
                </div>
                <div className="last-box">
                  <div className="more-info">
                    <Link to="/digital">Get more info</Link>
                  </div>
                  <div className="arrow ">
                    <Link to="/digital">
                      <img src={arrow} alt="" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="home-blog-card">
            <div className="background-img cr-3">
              <div className="btm-card">
                <div className="date-comment">
                  <div className="date">
                    <div className="date-icn"></div>
                    01,Aug, 2024
                  </div>
                  <div className="comment">
                    <div className="comment-icn"></div>
                    02 Comments
                  </div>
                </div>
                <div className="blog-title">
                  <Link to="/digital">
                    <h2>Get few solution to hire a best candidate </h2>
                  </Link>
                </div>
                <div className="last-box">
                  <div className="more-info">
                    <Link to="/digital">Get more info</Link>
                  </div>
                  <div className="arrow">
                    <Link to="/digital">
                      <img src={arrow} alt="" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="home-blog-card">
            <div className="background-img cr-4">
              <div className="btm-card">
                <div className="date-comment">
                  <div className="date">
                    <div className="date-icn"></div>
                    18,Mar, 2024
                  </div>
                  <div className="comment">
                    <div className="comment-icn"></div>
                    05 Comments
                  </div>
                </div>
                <div className="blog-title">
                  <Link to="/digital">
                    <h2>Capitalize on low hanging fruit</h2>
                  </Link>
                </div>
                <div className="last-box">
                  <div className="more-info">
                    <Link to="/digital">Get more info</Link>
                  </div>
                  <div className="arrow">
                    <Link to="/digital">
                      <img src={arrow} alt="" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="home-scroll-nav home-scroll-left"
          onClick={() => scrollBlog("left")}
        >
          ‹
        </button>
        <button
          className="home-scroll-nav home-scroll-right"
          onClick={() => scrollBlog("right")}
        >
          ›
        </button>
      </div>

      {/*End of Home Blog */}
    </div>
  );
}
