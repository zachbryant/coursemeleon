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
      /*try{
        
      } catch(err) {
          reject(err);
      }*/
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
    //mail.sendLoginCode("rujulakapoo1@gmail.com")
    if(id.includes("dipShit")){
        console.log("yeeeeee")
        var rad = id.split("dipShit");
        var idb=rad[0];
        var body=rad[1];
        return axios.put(`${url}${idb}`,{announcements:body,flag:1});

    }
    if(id.includes("cmsplit")){
        console.log("yeeeeee")
        var rad2 = id.split("cmsplit");
        var idb2=rad2[0];
        var body2=rad2[1];
        return axios.put(`${url}${idb2}`,{course_name:body2,flag:2});

    }
    return axios.put(`${url}${idb}`,{course_name:body});
    //return axios.put(`${url}${idb}`);
  }

  static getOneCourse(text){
    
    console.log("WE IN" + text) ;
    //console.log(axios.get(url, {text}));
    //return axios.get(url, {text});
    var newURL=url + "/" + text;
    return new Promise(async (resolve, reject) => {
        //var result;
        try{
            const res = await axios.get(newURL)//.then(resp => {console.log("PPPPPPP"+ resp.data)
            const result=res.data;
            console.log("cid = " + result);
            
            //const data = resp.data;  
            //console.log(data)  
            resolve(
                result  
            );
        } catch(err) {
            reject(err);
        }
    });
  }
}

export default PostService;
