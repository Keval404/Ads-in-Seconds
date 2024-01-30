import React, { useState, useEffect, useRef } from 'react';
import './style.css';


const CanvasEditor = (templateData) => {
    const canvasRef = useRef(null);
    const url = templateData.templateData;

    //State variables for dynamic updating of caption, CTA, and image
    const [uploadedImage, setUploadedImage] = useState(null);
    const [ctaText, setCtaText] = useState(templateData.templateData.cta.text || '');
    const [captionText, setCaptionText] = useState(templateData.templateData.caption.text || '');
    const [backgroundColor, setBackgroundColor] = useState('#0369A1'); 

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadedImage(file);
        }
    };

    const handleCtaTextChange = (event) => {
        setCtaText(event.target.value);
    };

    const handleCaptionTextChange = (event) => {
        setCaptionText(event.target.value);
    };

    const handleBackgroundColorChange = (event) => {
        setBackgroundColor(event.target.value);
    };


    const designPattern = new Image();
    const strokeImg = new Image();
    const maskImg = new Image();   
    const newImg = new Image()  
    
    maskImg.src = url.urls.mask;   
    designPattern.src = url.urls.design_pattern;
    strokeImg.src = url.urls.stroke;

    if (uploadedImage) {
        newImg.src = URL.createObjectURL(uploadedImage);
    } else {
        maskImg.src = url.urls.mask;
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        
        const imagesToLoad = uploadedImage ? [designPattern, strokeImg, maskImg] : [designPattern, strokeImg];
        let imagesLoaded = 0;

        function checkImagesLoaded() {
            imagesLoaded++;

            if (imagesLoaded === imagesToLoad.length) {
                animate();
            }
        }

        // Set onload event listeners for each image
        imagesToLoad.forEach((image) => {
            image.onload = checkImagesLoaded;
        });
        
        //fixed charachters in one line
        function printAtWordWrap(context, text, x, y, lineHeight, maxChars) {
            maxChars = maxChars || 0;
          
            if (maxChars <= 0) {
              context.fillText(text, x, y);
              return;
            }
          
            const words = text.split(' ');
            let currentLine = '';
            let charCount = 0;
          
            for (let i = 0; i < words.length; i++) {
              const word = words[i];
              if (charCount + word.length <= maxChars) {
                currentLine += (currentLine === '' ? '' : ' ') + word;
                charCount += word.length + (currentLine === '' ? 0 : 1); 
              } else {
                context.fillText(currentLine, x, y);
                currentLine = word;
                charCount = word.length;
                y += lineHeight;
              }
            }
          
            if (currentLine !== '') {
              context.fillText(currentLine, x, y);
            }
        }

        animate();
        function animate(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            //Text Part
            const caption = {
                ...url.caption,
                text: captionText,
            };
            ctx.font = `${caption.font_size || 44}px Arial`;
            printAtWordWrap(ctx, caption.text, caption.position.x, caption.position.y, caption.font_size+12 , 30);
            ctx.textalign=caption.alignment || "center";
            ctx.fillStyle=caption.text_color || "#000000";
            
            //Image part - Pending
            // ctx.drawImage(designPattern, 0, 0, designPattern.width, designPattern.height);
            // ctx.drawImage(strokeImg, 0, 0, strokeImg.width, strokeImg.height);
            // ctx.drawImage(maskImg, 0, 0, maskImg.width, maskImg.height);   
            
            ctx.drawImage(designPattern, 0, 0, designPattern.width, designPattern.height);
            ctx.drawImage(strokeImg, 0, 0, strokeImg.width, strokeImg.height);
            ctx.drawImage(maskImg, 0, 0, maskImg.width, maskImg.height);

            ctx.globalCompositeOperation = 'source-in';
            ctx.drawImage(newImg, 0, 0, maskImg.width, maskImg.height);
            ctx.globalCompositeOperation = 'source-over';
            

            // CTA part
            const cta = {
                ...url.cta,
                text: ctaText,
            };   
            const textWidth = ctx.measureText(cta.text).width;
            ctx.beginPath();
            ctx.roundRect(cta.position.x, cta.position.y, textWidth, 30+48, [20]);
            ctx.stroke();
            ctx.fillStyle = cta.background_color || '#000000'; 
            
            ctx.fill();
            ctx.fillStyle = cta.text_color;
            ctx.textBaseline = 'middle';
            ctx.font = `${cta.font_size || 30}px Arial`;
            ctx.fillText(cta.text, cta.position.x+32, cta.position.y+38); 
            ctx.closePath();
        }

        
    }, [templateData, uploadedImage, captionText, ctaText]);

    return (
    <>

        <div className="container">
            <div className="leftContainer">    
                <canvas ref={canvasRef}
                style={{ background: backgroundColor }}
                width='1080' height='1080'
                id='mycanvas'>
                </canvas>
            </div>            

            <div className="rightContainer">    
                <label>Add Image: </label>
                <input className='inputs' type="file" onChange={handleImageUpload} accept="image/*" />

                <br />
                <label>Caption Text: </label>
                <input className='inputs' type="text" value={captionText} onChange={handleCaptionTextChange} />
                
                <br />
                <br />
                <label>CTA Text: </label>
                <input className='inputs' type="text" value={ctaText} onChange={handleCtaTextChange} />

                <br />
                <br />
                <label>Background Color: </label>
                <input type="color" value={backgroundColor} onChange={handleBackgroundColorChange} />


            </div>


        </div>
        
    </>
  )
}

export default CanvasEditor