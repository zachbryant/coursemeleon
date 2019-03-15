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
        return axios.post(url, {
            text
            //text: text
        });
    }

    //Delete post
    static deletePost(id) {
        return axios.delete(`${url}${id}`);
    }
    
    //Modify post
    static modifyPost(id) {
        //console.log(id + "lllll")
        //console.log(id)
        return axios.put(`${url}${id}`);
    }

}

export default PostService; 