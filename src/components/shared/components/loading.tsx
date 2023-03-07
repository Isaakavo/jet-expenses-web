import { Spin } from "antd";
import React from "react";
import '../styles/shared.css';

export const LoadingScreen = () => {

  return (
    <section className='main-container'>
      <Spin tip='Loading' size="large"/>
    </section>
  );
}