import React, {useEffect, useRef} from 'react'

const Clipper = (templateData) => {
    const canvasRef = useRef(null);
    const url = templateData.templateData;

    const designPattern = new Image();
    const strokeImg = new Image();
    const maskImg = new Image();     
        
    maskImg.src = url.urls.mask;  
    designPattern.src = url.urls.design_pattern;
    strokeImg.src = url.urls.stroke;
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        ctx.drawImage(designPattern, 0, 0, designPattern.width, designPattern.height);
        ctx.drawImage(strokeImg, 0, 0, strokeImg.width, strokeImg.height);
        ctx.drawImage(maskImg, 0, 0, maskImg.width, maskImg.height); 
    })
    


    return (
        <>
            <canvas ref={canvasRef}
            style={{ background: '#0369A1' }}
            width='1080' height='1080'>
            </canvas>
        </>
      )
}

export default Clipper