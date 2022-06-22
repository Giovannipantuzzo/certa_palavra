import React, { useState, useRef } from "react";
import CanvasDraw from "react-canvas-draw";
import FileSaver from 'file-saver';

export const combineDrawing = (canvasRef) => {
  const width = canvasRef.current.props.canvasWidth;
  const height = canvasRef.current.props.canvasHeight;
  const background = canvasRef.current.canvasContainer.children[0];
  const drawing = canvasRef.current.canvasContainer.children[1]; 
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  // composite now
  canvas.getContext('2d').drawImage(background, 0, 0);
  canvas.getContext('2d').globalAlpha = 1.0; 
  canvas.getContext('2d').drawImage(drawing, 0, 0);

  const dataUri = canvas.toDataURL('image/jpeg', 1.0);
  const data = dataUri.split(',')[1];
  const mimeType = dataUri.split(';')[0].slice(5);

  const bytes = window.atob(data);
  const buf = new ArrayBuffer(bytes.length);
  const arr = new Uint8Array(buf);

  for (let i = 0; i < bytes.length; i++) {
      arr[i] = bytes.charCodeAt(i);
  }

  const blob = new Blob([arr], { type: mimeType });
  return { blob: blob, dataUri: dataUri };
}

export const saveImage = (blob, filename) => {
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.style = 'display: none';

  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}

export default function Editor() {
  const canvasRef = useRef();

  function getDownloads(file) {
    try {
        FileSaver.saveAs(file, 'teste');
    } catch (error) {
      toast.error('Não foi possível baixar o arquivo', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
  }

  console.log("🚀 ~ file: index.js ~ line 7 ~ Editor ~ canvasRef", canvasRef)
  const defaultProps = {
    onChange: null,
    loadTimeOffset: 5,
    lazyRadius: 0,
    brushRadius: 12,
    brushColor: "#444",
    catenaryColor: "#0a0302",
    gridColor: "rgba(150,150,150,0.17)",
    hideGrid: false,
    canvasWidth: 1000,
    canvasHeight: 1000,
    disabled: false,
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Reftinsky_reservoir_of_Sverdlovsk_region.jpg",
    immediateLoading: false,
    hideInterface: false,
    gridSizeX: 25,
    gridSizeY: 25,
    gridLineWidth: 0.5,
    hideGridX: false,
    hideGridY: false,
    enablePanAndZoom: true,
    mouseZoomFactor: 0.01,
    zoomExtents: { min: 0.33, max: 3 },
  };

  const [url, setUrl] = useState("img/sampleImage.jpg");
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "5%",
      }}
    >
      <CanvasDraw ref={canvasRef} { ...defaultProps } ></CanvasDraw>
      <button
            onClick={() => {
              console.log(canvasRef.current.getDataURL());
              const {blob, dataUri} = combineDrawing(canvasRef);
              saveImage(blob, 'test.jpg') 
              alert("DataURL written to console")
            }}
          >
            GetDataURL
          </button>
    </div>
  );
}
