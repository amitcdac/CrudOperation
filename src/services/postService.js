import axios from "axios";

class Post{
    create(formData){
       const url ="http://localhost:8000/api/create-post";
       const config ={
        headers:{
            'content-type':'multipart/form-data',
        }
       };
      return axios.post(url,formData,config);
    }

    getPosts(){
        const url ="http://localhost:8000/api/get-posts";
        return axios.get(url);
    }
    deletePost(id){
        const url ="http://localhost:8000/api/delete-post/"+id;
        return axios.get(url);
    }
    update(formData){
        const url ="http://localhost:8000/api/update-post";
        const config ={
         headers:{
             'content-type':'multipart/form-data',
          }
        };
       return axios.post(url,formData,config);
     }

    //  pagination(){
    //     const url ="http://localhost:8000/api/pagination";
    //     return axios.get(url,{
    //         params:{
    //             page:1,limit:5
    //         }
    //     });
    //}
    // pagination(){   
    //     const url = "http://localhost:8000/api/pagination"
    //     axios.get('url', {
    //     params: {
    //       page: activePage,
    //       size: LIMIT
    //     }
    //   })}
}
   
export default new Post();