import React,{useState} from 'react'
import postService from '../services/postService'
import TextField from '@mui/material/TextField';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'

const CreateComponent = () => {
    const [title,setTitle] = useState('')
    const [date,setDate] = useState('')
    const [image,setImage] = useState('')
    const [message,setMessage] = useState('')
    
    
    const handleSumbit = async(event)=>{
          event.preventDefault();
      
          const formData = new FormData();
          formData.append('title',title);
          formData.append('date',date);
          formData.append('image',image);

    const responce =  await postService.create(formData);
    console.log(responce)
    if(responce.data.success == true){
      
        setMessage('Post created successfully');
     }
    else{
        setMessage("post failed")
    }
    setTimeout(()=>{
        setMessage('');
    },2000)
    event.target.reset();
    }
  return (
    <div style={{backgroundColor:'aliceblue'}}>
    <div >
       {/*  <h2>Create Component</h2>
         <form onSubmit={handleSumbit} >
           <input type='text' name='title' 
          placeholder='Enter post title' 
          onChange={e=>setTitle(e.target.value)}
          required
          /> 
           <TextField type='text' name='title' id="outlined-basic" 
            placeholder='Enter post title' 
            onChange={e=>setTitle(e.target.value)}
            required
           label="Outlined" variant="outlined" />
          <br/><br/>
          <input type='date' name='date' 
          onChange={e=>setDate(e.target.value)}
          required
          />
          <br/><br/>
          <input type='file' name='image' style={{}}
          //placeholder='Enter post title' 
          onChange={e=>setImage(e.target.files[0])}
          required
          />
           
          <br></br>
          <button>submit</button> 
  */}

    <Form onSubmit={handleSumbit} >
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control type='text' name='title' placeholder="title" onChange={e=>setTitle(e.target.value)}
            required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control type='date' name='date' 
          onChange={e=>setDate(e.target.value)}
          required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Image</Form.Label>
        <Form.Control type='file' name='image' 
        onChange={e=>setImage(e.target.files[0])}
        required />
      </Form.Group>
     
      <Button type='submit'>submit</Button>
    </Form>
    
        {/* </form> */}
        <Alert style={{color:'red'}}>{message}</Alert>
        
     </div>
     </div>
  )
}
export default CreateComponent