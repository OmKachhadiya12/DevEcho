import React from 'react'
import { useState } from 'react';
import useShowToast from './useShowToast';

const usePreviewImage = () => {

    const [img,setImg ] = useState(null);
    const showToast = useShowToast();

    const handleImageChange = () => {
        const file = e.target.files[0];
        if(file && file.type.startsWith("image/")) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImg(reader.result);
            }
            reader.readAsDataURL(file);
        } else {
            showToast("Invalid file type.","Please select the valid image.","error");
            setImg(null);
        }
    }

  return{handleImageChange,imgUrl};
}

export default usePreviewImage;
