import { useState } from 'react'

function ImageUpload() {

    const [image, setImage] = useState('')
    function handleImage(){
        console.log(e.target.files)
        setImage(e.target.files[0])
    }
    function handleApi(){
        const formData = new formData()
        formData.append('image', image)
        axios.post('url', formData).then((res) => {
            console.log(res)
        })
    }
  return (
    <div>
        <input type="file" name='file' onChange={handleImage}/>
        <button onClick={handleApi}>Submit</button>
    </div>
  )
}

export default ImageUpload