import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import * as iq from 'image-q';
import ImageToColors from 'image-to-colors';
import sizeOf from 'image-size';


function App() {
  useEffect(() => {
    (async() => {
      const image = "https://ipfs.getsplice.io/ipfs/QmUZ1EUcfHjYvYPhnDXYCHupX72pyUjwVpo1LMZz9EjAkn/cx_12945.png";
      const pixels = await ImageToColors.getFromExternalSource(image, {
        setImageCrossOriginToAnonymous: true
      });
      const sz = sizeOf(image);
      const rgb = Uint8Array.from(pixels.flatMap((p) => [...p, 255]));
      console.log(sz, rgb);

      const pointContainer = iq.utils.PointContainer.fromUint8Array(
        rgb,
        sz.width || 100,
        sz.height || 100,
      );
    
    const distanceCalculator = new iq.distance.EuclideanBT709NoAlpha();
    const paletteQuantizer = new iq.palette.WuQuant(distanceCalculator, 10);
    paletteQuantizer.sample(pointContainer);
    const qPalette = paletteQuantizer.quantizeSync();

    console.log(qPalette.getPointContainer().toUint8Array());
  })();
  })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
