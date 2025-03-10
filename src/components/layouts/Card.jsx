// import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import styles from "../../styles/Card.module.css";
import Button from "./Button";

/* eslint-disable */
const Card = ({ x, heading, text }) => {
  return (
    <motion.div
      className={styles.testimonialWrapper}
      animate={{ x: `${x}%` }}
      transition={{ duration: 0.5 }}
    >
      <StyledWrapper className={styles.wrapper}>
        <div className="card">
          <div className="imgDiv">
            <img src="./img/favicons/192.png" alt="Prasaar" className="img" />
          </div>
          <p className="heading">{heading}</p>
          <div className="text">{text}</div>
          <Button />
        </div>
      </StyledWrapper>
    </motion.div>
  );
};

const StyledWrapper = styled.div`
  .card {
    font-size: 1.6rem;
    width: 62%;
    height: 100%;
    color: white;
    background: #333b4f;
    // border: 2px solid black;
    transition: 1s ease-in-out;
    clip-path: polygon(
      30px 0%,
      100% 0,
      100% calc(100% - 30px),
      calc(100% - 30px) 100%,
      0 100%,
      0% 30px
    );
    position: absolute;
    padding: 2rem;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
  }

  .card .heading {
    font-weight: 400;
    color: white;
    display: block;
    text-align: center;
    font-size: 1.8rem;
    margin: 0.2 1em;
    font-weight: 500;
  }

  .card .imgDiv {
    width: 4.8em;
    height: 4.8em;
    background: white;
    border-radius: 15px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card .img {
    width: 50%;
    height: 50%;
  }

  .card .text {
    margin-top: 1em;
    font-size: 1.6rem;
    display: flex;
    justify-content: center;
    gap: 1em;
    margin-bottom: 2rem;
  }

  .card a {
    color: white;
    transition: 0.4s ease-in-out;
  }

  .card a:hover {
    color: black;
  }

  .card button {
    padding: 0.8em 1.7em;
    display: block;
    margin: auto;
    border-radius: 25px;
    border: none;
    font-weight: 600;
    background: #ffffff;
    color: rgb(0, 0, 0);
    transition: 0.4s ease-in-out;
    width: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
  }

  .card button:hover {
    background: var(--color-primary);
    color: white;
    cursor: pointer;
  }

  @media (max-width: 85em) {
    .card {
      width: 75%;
    }
  }
  @media (max-width: 66em) {
    .card {
      width: 85%;
    }
  }
  @media (max-width: 50em) {
    .card {
      width: 75%;
    }
  }
  @media (max-width: 37em) {
    .card {
      width: 85%;
    }
  }
`;

export default Card;
