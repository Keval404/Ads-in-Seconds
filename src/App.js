import React, {useState} from 'react';
import CanvasEditor from './CanvasEditor'
import './style.css'

const App = () => {
  const [templateData, setTemplateData] = useState({caption:{"text":"1 & 2 BHK Luxury Apartments at just Rs.34.97 Lakhs","position":{"x":50,"y":50},"max_characters_per_line":31,"font_size":44,"alignment":"left","text_color":"#FFFFFF"},"cta":{"text":"Shop Now","position":{"x":190,"y":320},"text_color":"#FFFFFF","background_color":"#000000"},"image_mask":{"x":56,"y":442,"width":970,"height":600},"urls":{"mask":"https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_mask.png","stroke":"https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Mask_stroke.png","design_pattern":"https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Design_Pattern.png"}});
  return (
    <>
      <h1 className='titlebar'>Canvas Editor App</h1>
      <div>
        <CanvasEditor templateData={templateData}/>
      </div>
    </>
  );
};

export default App;