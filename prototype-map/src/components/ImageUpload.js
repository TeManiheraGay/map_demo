import { useRef, useState } from 'react'
import CustomizedSnackbar from './SimpleSnackbar'

function ImageUpload(props) {
    const inputRef = useRef(null)
    const [image, setImage] = useState('')
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleImageClick = () => {
        inputRef.current.click();
    }

    function handleImage(e){
        console.log(e)
        setImage(URL.createObjectURL(e.target.files[0]))
        // if (e.target.files && e.target.files[0]) {
        //     var reader = new FileReader();
        
        //     // reader.onload = function (e) {
        //     //   $('#blah').attr('src', e.target.result).width(150).height(200);
        //     // };
        
        //     reader.readAsDataURL(e.target.files[0]);
        //     console.log(reader.readAsDataURL(e.target.files[0]))
        //   }
    }

    

    // function handleApi(){
    //     const formData = new FormData()
    //     formData.append('image', image)
    //     axios.post('url', formData).then((res) => {
    //         console.log(res)
    //     })
    // }

  return (
    <>
        <div className='imageContainer'>
            <h4>Front of the sign</h4>
            <div className="imageBox" onClick={handleImageClick}>
                {image ? <img src={image} className='uploadedImage' alt='' width={300} /> : <img src='./add.png' alt='' width={100} style={{cursor: "pointer"}}/>}
                <input 
                    type='file'
                    ref={inputRef}
                    onChange={handleImage}
                    style={{ display: "none" }}
                />
            </div>
            <button 
                className="btn-submit"
                onClick={() => {
                    setOpenSnackbar(true)
                }}
            >Upload</button>
            <CustomizedSnackbar 
                isOpen={openSnackbar}
                onClose={() => {
                    setOpenSnackbar(false);
                }}
            />
        </div>
    </>
  )
}

export default ImageUpload