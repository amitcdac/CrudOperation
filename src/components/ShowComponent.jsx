import React,{useState,useEffect} from 'react'
import postService from '../services/postService'
import UpdateModal from './UpdateModal';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'


         
const ShowComponent = () => {

   const[posts,setPosts] = useState({});
   const fetchPosts = async()=>{
       setPosts(await postService.getPosts());
   }

   useEffect(()=>{
    fetchPosts()
   },[posts]);
 

//  const deletePost =async (id,e)=>{ 
//     alert(id);
//    var response= await  postService.deletePost(id);
//    if(response.data.success == true){
//     alert(response.data.msg);
//    document.getElementById(id).parentElement.parentElement.remove();
//    }else{
//     alert(response.data.msg)
//    }

const deletePost = async (id,e) => {
    try {
      const response = await postService.deletePost(id);
      if (response.data.success) {
        alert(response.data.msg);
        setPosts(posts.filter(post => post.id !== id)); 
      } else {
        alert(response.data.msg);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
        <h1>Posts</h1>
        {
            posts.data != undefined && posts.data.data.length > 0 &&(
                <table width='100%' border='2' cellPadding='10px' cellSpacing='20px' >
                    <thead style={{color:'red'}}>
                        <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Image</th>
                        <th>Delete</th>
                        <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts.data.data.map(post=><tr key={post._id} style={{backgroundColor:'aliceblue'}}> 
                                <td style={{border:'2px solid black'}}>{post.title}</td>
                                <td style={{border:'2px solid black'}}>{post.date}</td>
                                <td style={{border:'2px solid black'}}><img src={`http://localhost:8000/api/postImages/${post.image}`} style={{width:'100px', height:'100px'}}/>
                                </td >
                                <td style={{border:'2px solid black'}}>
                                    <button id={post._id} onClick={(e)=>deletePost(post._id,e)}>Delete</button>
                                </td>
                                <td style={{border:'2px solid black'}}>
                                    <UpdateModal id={post._id} title={post.title} date={post.date}/>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            )
        }
    </div>
  )
}
export default ShowComponent