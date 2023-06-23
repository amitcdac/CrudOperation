import React, { useState } from 'react'
import {Modal,Button} from 'react-bootstrap'
import postService from '../services/postService'

const UpdateModal = (props) => {
    const[isShow,invokeModal] = useState(false)
    const[title,setTitle]= useState(props.title)
    const[date,setDate]= useState(props.date)
    const[id,setId]= useState(props.id)
    const[image,setImage]= useState('')
    
    let initModal =()=>{
        return invokeModal(!isShow)
     }
     const handleSubmit = async(event)=> {
          event.preventDefault();
          const formData = new FormData();
          formData.append('id',id);
          formData.append('title',title);
          formData.append('date',date);

          if(image != '' && image.length != 0){
            formData.append('image',image);
          }

          const response = await postService.update(formData);
          if(response.data.success == true){
           
                alert(response.data.msg)
          }
          else{
            alert(response.data.msg);
          }
          initModal();
    }
  return (
    <div>
        <Button variants="success" onClick={initModal}>
            Edit
        </Button>
        <Modal show={isShow}>
             <Modal.Header closeButton onClick={initModal}>
                 <Modal.Title>update Post</Modal.Title>

             </Modal.Header>
             <form onSubmit={handleSubmit}>
             <Modal.Body>
               <input type='text' name='title' placeholder='Enter post title' value={title} 
                onChange={event=>setTitle(event.target.value)} required
               />
               <br></br>
               <input type='date' name='date' value={date} 
                onChange={event=>setDate(event.target.value)} required
               />
                <input type='file' name='image' 
                onChange={event=>setImage(event.target.files[0])} 
               />
             </Modal.Body>
             <Modal.Footer>
                <Button variant='danger' onClick={initModal}>
                    Close
                </Button>
                <Button type='submit' variant='dark' >
                    Update
                </Button>
             </Modal.Footer>
             </form> 
        </Modal>
    </div>
  )
}
export default UpdateModal