import axios from "axios";

const url = "http://localhost:5000/api/course/";

class PostService {
  //Get posts
  static getPosts() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(
          data.map(post => ({
            ...post
          }))
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  static getNames() {
    return new Promise(async (resolve, reject) => {
        try{
            const res = await axios.get(url);
            const data = res.data;
            console.log(this.data);
            var i=0;
            var j=0;
            var sss = [];
                while(data[i]!=null){
                    //console.log("HelloHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH");
                    console.log(data[i].course_name);
                    if(data[i].pri.localeCompare("no") == 0){
                        //add name only if it's not hidden
                        sss[j]=data[i].course_name;
                        j++;
                    } 
                    i++;
                }
            console.log(sss)
            resolve(
                sss
            );
        } catch(err) {
            reject(err);
        }
    });
}

  //Create post
  static insertPost(text) {
    //console.log({text});
    return axios.post(url, { text });
  }

  //Delete post
  static deletePost(id) {
    return axios.delete(`${url}${id}`);
  }

  //Modify post
  static modifyPost(id) {
    console.log(id);
    return axios.put(`${url}${id}`);
  }
}

export default PostService;
