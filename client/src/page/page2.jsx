import React, { useState } from 'react';
import './page2.css';
import ObjectDetection from '../component/ObjectDetection';


const Page = () => {
  return (
    <div>
      <header className="App-header">
        <h1>Object Detection UI</h1>
      </header>
      <main>
        <ObjectDetection />
      </main>

    </div>

  );
};
export default Page;
