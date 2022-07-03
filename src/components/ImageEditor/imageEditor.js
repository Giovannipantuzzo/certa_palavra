/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import reactCSS from 'reactcss';
import ImageEditor from '@toast-ui/react-image-editor';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { toast } from 'react-toastify';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import 'tui-image-editor/dist/tui-image-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import { SketchPicker } from 'react-color';
import $ from 'jquery';
import {
  Submit,
  LinearProgressContainer,
  ButtonsMenuContainer,
  ColorSelectedText,
  ColorPickerContainer,
} from '../../../styles/imageEditorStyles';
import { theme } from './theme';
import { dataURLtoFile } from './dataUrlToFile';
import { storage } from './firebaseStorage';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">
          {`${Math.round(
            props.value,
          )}%`}

        </Typography>
      </Box>
    </Box>
  );
}

const presetColors = [
  '#ffff00',
  '#993399',
  '#008000',
  '#ffa500',
  '#ffcbdb',
];

const colorWidth = 10;

toast.configure();

function CustomImageEditor({ url, canvasRef, progresspercent, setProgresspercent }) {
  const [selectedColor, setSelectedColor] = useState({
    displayColorPicker: false,
    start: false,
    color: {
      r: '255',
      g: '255',
      b: '0',
      a: '1',
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    const imageEditor = canvasRef.current.getInstance();

    const file = dataURLtoFile(
      imageEditor.toDataURL(),
      `teste.${imageEditor.toDataURL().match(/[^:/]\w+(?=;|,)/)[0]}`,
    );
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          toast.success('Editado com sucesso', {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        });
      },
    );
  }

  function LoadImage() {
    if (!url) return;
    const imageEditor = canvasRef.current.getInstance();
    imageEditor.loadImageFromURL = (function () {
      const cached_function = imageEditor.loadImageFromURL;
      function waitUntilImageEditorIsUnlocked(imageEditor2) {
        return new Promise((resolve, reject) => {
          const interval = setInterval(() => {
            if (!imageEditor2._invoker._isLocked) {
              clearInterval(interval);
              resolve();
            }
          }, 100);
        });
      }
      return async function () {
        await waitUntilImageEditorIsUnlocked(imageEditor);
        return cached_function.apply(this, arguments);
      };
    }());
    imageEditor
      .loadImageFromURL(
        url,
        'SampleImage',
      )
      .then((result) => {
        imageEditor.ui.resizeEditor({
          imageSize: {
            oldWidth: result.oldWidth,
            oldHeight: result.oldHeight,
            newWidth: result.newWidth,
            newHeight: result.newHeight,
          },
        });
      })
      .catch((err) => {
        console.error('Something went wrong:', err);
      });
  }

  const handleClick = () => {
    setSelectedColor({
      ...selectedColor,
      displayColorPicker: !selectedColor.displayColorPicker,
    });
  };

  const handleClose = () => {
    setSelectedColor({ ...selectedColor, displayColorPicker: false });
  };

  const handleChange = (color) => {
    const imageEditor = canvasRef.current.getInstance();

    imageEditor.stopDrawingMode();
    imageEditor.startDrawingMode('FREE_DRAWING', {
      width: colorWidth,
      color: color.hex,
    });

    setSelectedColor({ ...selectedColor, color: color.rgb, start: true });
  };

  useEffect(() => {
    $(
      '.tui-image-editor-container .tui-image-editor-header-buttons div',
    ).replaceWith(
      '<button class="tui-image-editor-loader-btn" style="background-color: #fff;border: 1px solid #ddd;color: #222;font-family: NotoSans, sans-serif;font-size: 12px" >Recarregar</button>',
    );

    $(
      '.tui-image-editor-header-buttons .tui-image-editor-download-btn',
    ).remove();

    document
      .querySelector(
        '.tui-image-editor-header-buttons .tui-image-editor-loader-btn',
      )
      ?.addEventListener('click', LoadImage);
  }, [canvasRef]);

  useEffect(() => {
    if (canvasRef.current.getInstance()._invoker._isLocked) {
      LoadImage();
    }
  }, [canvasRef]);

  const styles = reactCSS({
    default: {
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: `rgba(${selectedColor.color.r}, ${selectedColor.color.g}, ${selectedColor.color.b}, ${selectedColor.color.a})`,
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  });

  return (
    <>
      <ButtonsMenuContainer>
        <ColorPickerContainer>
          <div>
            <div style={styles.swatch} onClick={handleClick}>
              <div style={styles.color} />
            </div>
            {selectedColor.displayColorPicker ? (
              <div style={styles.popover}>
                <div style={styles.cover} onClick={handleClose} />
                <SketchPicker
                  color={selectedColor.color}
                  presetColors={presetColors}
                  disableAlpha
                  onChange={handleChange}
                />
              </div>
            ) : null}
          </div>
          {!selectedColor?.start && (
            <ColorSelectedText>
              Selecione uma cor para começar
            </ColorSelectedText>
          )}
        </ColorPickerContainer>
        <Submit onClick={(e) => handleSubmit(e)}>Salvar</Submit>
      </ButtonsMenuContainer>

      <LinearProgressContainer>
        <LinearProgressWithLabel
          variant="determinate"
          value={progresspercent}
        />
      </LinearProgressContainer>

      <ImageEditor
        ref={canvasRef}
        includeUI={{
          loadImage: {
            path: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            name: 'Blank',
          },
          theme,
          menu: [
            'shape',
            'filter',
            'text',
            'mask',
            'icon',
            'crop',
            'flip',
            'rotate',
          ],
          uiSize: {
            width: '80%',
            height: '100%',
          },
          menuBarPosition: 'bottom',
        }}
        cssMaxHeight={700}
        cssMaxWidth={1300}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70,
        }}
        usageStatistics
      />
    </>
  );
}

export default CustomImageEditor;
