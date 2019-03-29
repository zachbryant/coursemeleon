import axios from 'axios';

const url = 'http://localhost:5000/api/course/';

class PostService {
    //Get posts
    static getPosts() {
        return new Promise(async (resolve, reject) => {
            try{
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(post => ({
                        ...post,
                    })),
                );
            } catch(err) {
                reject(err);
            }
        });
    }

//Create post
static insertPost(text) {
    //console.log({text});
    return axios.post(url, {text});
}

    //Delete post
    static deletePost(id) {
        return axios.delete(`${url}${id}`);
    }
    
  //Modify post
  static modifyPost(id) {
     var rad = id.split("cmsplit");
     var idb=rad[0];
     var body=rad[1];
     //console.log(rad[0])
     //console.log(rad[1])
    return axios.put(`${url}${idb}`,{course_name:body});
    //return axios.put(`${url}${idb}`);
}

}

export default PostService; 