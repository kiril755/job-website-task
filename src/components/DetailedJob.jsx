import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import S from "string";
import parser from "parse-address";

const DetailedJob = () => {
  const rawData = localStorage.getItem("jobDetail");
  const parseData = JSON.parse(rawData);
  const PostedDays = localStorage.getItem("postedDays");
  const cityData = localStorage.getItem("corectCity");

  const [screenWidth, setScreenWidth] = useState("desc");
  const [bottomPageLayout, setBottomPageLayout] = useState("");
  const [topPageLayout, setTopPageLayout] = useState("");

  const detailedDescription = (data) => {
    const clearText = S(data).collapseWhitespace().s;
    const indexOfResp = clearText.indexOf("Responsopilities");
    const indexOfBenefits = clearText.indexOf("Compensation & Benefits");

    const lengthText = clearText.length;

    const companyInfo = clearText.slice(0, indexOfResp - 1);
    const responsopilities = clearText.slice(indexOfResp, indexOfBenefits - 1);
    const benefits = clearText.slice(indexOfBenefits, lengthText);

    const listOfBenefitsString = benefits.slice(25, benefits.length);
    let listOfBenefitsArr = listOfBenefitsString.split(". ");
    const list = listOfBenefitsArr[listOfBenefitsArr.length - 1].slice(0, -1);
    listOfBenefitsArr.pop();
    listOfBenefitsArr.push(list);

    return (
      <>
        <p className="company-info">{companyInfo}</p>
        <h3 className="responsopilities-title">
          {responsopilities.slice(0, 17)}
        </h3>
        <p className="responsopilities-text">
          {responsopilities.slice(17, responsopilities.length)}
        </p>
        <h3 className="benefits-title">{benefits.slice(0, 24)}</h3>
        <ul className="benefits-list">
          {listOfBenefitsArr.map((benefits, i) => (
            <li key={i} className="benefits-item">
              <p className="benefits-text">
                <span className="benef-svg">
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 9 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="9"
                      height="9"
                      fill="#384564"
                      fillOpacity="0.632594"
                    />
                  </svg>
                </span>
                {benefits}.
              </p>
            </li>
          ))}
        </ul>
      </>
    );
  };

  const roundingSalary = (salary) => {
    const slaryArr = salary.split("-");
    const fromSalary = slaryArr[0].slice(0, slaryArr[0].length - 1);
    const toSalary = slaryArr[1].slice(0, slaryArr[1].length - 1);

    return "€ " + fromSalary + "000" + "—" + toSalary + "000";
  };

  const screenWidthCheck = (width) => {
    if (window.screen.width < width && screenWidth === "desc") {
      setScreenWidth("mob");
    } else if (window.screen.width >= width && screenWidth === "mob") {
      setScreenWidth("desc");
    }
  };

  React.useEffect(() => {
    console.log(window.screen.width);
    screenWidthCheck(1160);
  }, []);

  window.addEventListener("resize", function () {
    screenWidthCheck(1160);
  });

  const additionalOrAttachedLay = (screen) => {
    if (screen === "desc") {
      setBottomPageLayout(
        <>
          <div className="additional-info">
            <h2 className="additional-title">Additional info</h2>
            <p className="employment-type-title">Employment type</p>
            <ul className="employment-type-list">
              {parseData.employment_type.map((type, i) => (
                <li key={i} className="employment-type-item">
                  <p className="employment-type-text">{type}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="benefits-short">
            <h2 className="benefits-short-title">Benefits</h2>
            <ul className="benefits-short-list">
              {parseData.benefits.map((benefits, i) => (
                <li key={i} className="benefits-short-item">
                  <p className="benefits-short-text">{benefits}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="attached">
            <h2 className="attached-title">Attached images</h2>
            <ul className="attached-list">
              {parseData.pictures.map((img, i) => (
                <li key={i} className="attached-item">
                  <img
                    src={img}
                    alt="company pictures"
                    className="attached-images"
                  />
                </li>
              ))}
            </ul>
          </div>
        </>
      );
    } else
      setBottomPageLayout(
        <>
          <div className="attached">
            <h2 className="attached-title">Attached images</h2>
            <ul className="attached-list">
              {parseData.pictures.map((img, i) => (
                <li key={i} className="attached-item">
                  <img
                    src={img}
                    alt="company pictures"
                    className="attached-images"
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="additional-info">
            <h2 className="additional-title">Additional info</h2>
            <p className="employment-type-title">Employment type</p>
            <ul className="employment-type-list">
              {parseData.employment_type.map((type, i) => (
                <li key={i} className="employment-type-item">
                  <p className="employment-type-text">{type}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="benefits-short">
            <h2 className="benefits-short-title">Benefits</h2>
            <ul className="benefits-short-list">
              {parseData.benefits.map((benefits, i) => (
                <li key={i} className="benefits-short-item">
                  <p className="benefits-short-text">{benefits}</p>
                </li>
              ))}
            </ul>
          </div>
        </>
      );
  };

  const topOfTheJob = (screen) => {
    if (screen === "desc") {
      setTopPageLayout(
        <>
          <div className="title-slary-desc">
            <h3 className="job-name">{parseData.title}</h3>
            <div>
              <h3 className="salary">{roundingSalary(parseData.salary)}</h3>
              <p className="clarification-salary">Brutto, per year</p>
            </div>
          </div>
          <p className="posted-days">{PostedDays}</p>
        </>
      );
    } else
      setTopPageLayout(
        <>
          <h3 className="job-name">{parseData.title}</h3>
          <div className="posted-days-salary_wrap">
            <p className="posted-days">{PostedDays}</p>
            <div className="salary-wrap">
              <p className="clarification-salary">Brutto, per year</p>
              <h3 className="salary">{roundingSalary(parseData.salary)}</h3>
            </div>
          </div>
        </>
      );
  };

  function adressChange(string) {
    const clearStroke = parser.parseLocation(string);

    return `${clearStroke.type}. ${clearStroke.street}, ${clearStroke.number}`;
  }

  function numberChange(number) {
    const numberArr = number.split("");

    return `${number.slice(0, 3)} (${numberArr[3]}${
      numberArr[4]
    }) ${number.slice(5, 9)}-${number.slice(9, number.length)},`;
  }

  React.useEffect(() => {
    additionalOrAttachedLay(screenWidth);
    topOfTheJob(screenWidth);
  }, [screenWidth]);

  return (
    <div className="container container-detailed-job">
      <div className="job-detail">
        <div className="job-detail-head">
          <h2 className="job-detail-title">Job Details</h2>

          <div className="saved-share-wrap">
            <div className="saved-wrap">
              {screenWidth === "mob" ? (
                <span className="saved-svg star">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                  >
                    <path
                      stroke="#3A4562"
                      strokeWidth="2"
                      d="M11.285 1.362c-0.080-0.165-0.217-0.308-0.397-0.397-0.433-0.214-0.958-0.036-1.172 0.397l-2.501 5.065-5.592 0.818c-0.182 0.025-0.36 0.111-0.5 0.255-0.338 0.347-0.33 0.9 0.016 1.237l4.045 3.94-0.955 5.567c-0.031 0.181-0.005 0.377 0.088 0.555 0.225 0.428 0.754 0.592 1.182 0.367l5-2.629 5.001 2.629c0.163 0.087 0.357 0.122 0.555 0.088 0.476-0.081 0.796-0.534 0.715-1.011l-0.955-5.567 4.045-3.94c0.132-0.128 0.227-0.301 0.256-0.5 0.070-0.478-0.261-0.922-0.739-0.992l-5.591-0.817zM10.5 3.727l1.919 3.889c0.132 0.267 0.382 0.437 0.658 0.479l4.293 0.627-3.105 3.025c-0.214 0.208-0.298 0.498-0.252 0.774l0.732 4.273-3.838-2.019c-0.263-0.138-0.566-0.13-0.815 0l-3.838 2.019 0.732-4.273c0.051-0.294-0.052-0.578-0.252-0.774l-3.105-3.025 4.294-0.628c0.294-0.043 0.533-0.227 0.658-0.478z"
                    ></path>
                  </svg>
                </span>
              ) : (
                <span className="saved-svg">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8 8.00016C8 6.5274 9.19391 5.3335 10.6667 5.3335H21.3333C22.8061 5.3335 24 6.5274 24 8.00016V23.9936C24 25.1595 22.609 25.7639 21.7567 24.9682L16.9099 20.4428C16.3976 19.9645 15.6024 19.9645 15.0901 20.4428L10.2433 24.9682C9.39104 25.7639 8 25.1595 8 23.9936V8.00016Z"
                      stroke="#70778B"
                      strokeWidth="2"
                    />
                  </svg>
                </span>
              )}
              <p className="saved-text">Save to my list</p>
            </div>
            <div className="share-wrap">
              <span className="share-svg">
                <svg
                  width="19"
                  height="20"
                  viewBox="0 0 19 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.54 14.9096L6.41 10.743C6.46 10.512 6.5 10.2811 6.5 10.0402C6.5 9.7992 6.46 9.56827 6.41 9.33735L13.46 5.21084C14 5.71285 14.71 6.0241 15.5 6.0241C17.16 6.0241 18.5 4.67871 18.5 3.01205C18.5 1.34538 17.16 0 15.5 0C13.84 0 12.5 1.34538 12.5 3.01205C12.5 3.25301 12.54 3.48394 12.59 3.71486L5.54 7.84137C5 7.33936 4.29 7.02811 3.5 7.02811C1.84 7.02811 0.5 8.37349 0.5 10.0402C0.5 11.7068 1.84 13.0522 3.5 13.0522C4.29 13.0522 5 12.741 5.54 12.239L12.66 16.4157C12.61 16.6265 12.58 16.8474 12.58 17.0683C12.58 18.6847 13.89 20 15.5 20C17.11 20 18.42 18.6847 18.42 17.0683C18.42 15.4518 17.11 14.1365 15.5 14.1365C14.74 14.1365 14.06 14.4378 13.54 14.9096Z"
                    fill={screenWidth === "mob" ? "#38415D" : "#70778B"}
                  />
                </svg>
              </span>
              <p className="share">Share</p>
            </div>
          </div>
        </div>
        <button className="apply-btn apply-btn-first">Apply now</button>
        <div className="description">
          {topPageLayout}
          <div className="job-description-wrap">
            {detailedDescription(parseData.description)}
          </div>
          <button className="apply-btn apply-btn-second">Apply now</button>
          {bottomPageLayout}
        </div>
      </div>
      <div className="map">
        <div className="map-short-info">
          <h3 className="map-department-name">{parseData.name}</h3>
          <p className="map-address">
            <span className="map-address-svg">
              <svg
                width="13"
                height="18"
                viewBox="0 0 13 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.5 18C6.5 18 13 11.9706 13 7C13 2.02944 10.0899 0 6.5 0C2.91015 0 0 2.02944 0 7C0 11.9706 6.5 18 6.5 18ZM6.5 10C8.433 10 10 8.433 10 6.5C10 4.567 8.433 3 6.5 3C4.567 3 3 4.567 3 6.5C3 8.433 4.567 10 6.5 10Z"
                  fill="#878D9D"
                />
              </svg>
            </span>

            {adressChange(parseData.address)}
          </p>
          <p className="map-tel-email">
            {numberChange(parseData.phone)}
            <br></br>
            {parseData.email}
          </p>
        </div>
        <div className="map-gradient">
          <img
            className="map-img"
            src={
              cityData.includes("Kyiv")
                ? "https://maps.geoapify.com/v1/staticmap?style=dark-matter&width=402&height=218&center=lonlat:30.524136,50.450034&zoom=17&marker=lonlat:30.524136,50.450034;type:material;color:%23d8d8d8;icon:directions-boat;icontype:awesome&apiKey=9f29b56b584b436e893eac380bcf1110"
                : `https://maps.geoapify.com/v1/staticmap?style=dark-matter&width=402&height=218&center=lonlat:${parseData.location.long},${parseData.location.lat}&zoom=17&marker=lonlat:${parseData.location.long},${parseData.location.lat};type:material;color:%23d8d8d8;icon:directions-boat;icontype:awesome&apiKey=9f29b56b584b436e893eac380bcf1110`
            }
            alt="map"
          />
        </div>
      </div>
      <Link to="/" className="back-btn">
        <p className="back-btn-text">
          <span className="arrow">
            <svg
              width="10"
              height="18"
              viewBox="0 0 10 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.66053 0.401157C10.1272 0.915451 10.108 1.72975 9.61804 2.21833L3.37247 8.69844C3.21164 8.8613 3.21164 9.13559 3.37247 9.29845L9.62137 15.7786C10.1105 16.2671 10.128 17.0814 9.66053 17.5957C9.19305 18.1186 8.41725 18.1357 7.92894 17.6386L0.390931 9.96703C-0.114047 9.45274 -0.13238 8.61272 0.350933 8.08129L7.92894 0.358299C8.41809 -0.138852 9.19389 -0.113138 9.66053 0.401157Z"
                fill="#384564"
              />
            </svg>
          </span>
          RETURN TO JOB BOARD
        </p>
      </Link>
    </div>
  );
};

export default DetailedJob;
