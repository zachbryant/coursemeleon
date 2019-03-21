<template>
 <div id="grade">
   <h1>Grade Statistics</h1>
   <input id="mean" type="text" value="" />
   <input id="median" type="text" value="" />
   <input id="sd" type="text" value="" />
   <h4>a</h4>
   <h2>Grade Distribution</h2>
   <canvas id="myC" width="200" height="100"></canvas> 
   <h4>a</h4>
   <h2>Grade Distribution</h2>
    <canvas id="myChart" width="200" height="100"></canvas> 
    <h2>Grade Distribution</h2>
    <canvas id="scatterChart" width="200" height="100"></canvas> 
 </div>
</template>
<script>
import CourseService from '../CourseService';

export default {
    name: "Grade",
    data() {
    (function()
    {
    if( window.localStorage )
    {
        if( !localStorage.getItem('firstLoad') )
        {
        localStorage['firstLoad'] = true;
        window.location.reload();
        }  
        else
        localStorage.removeItem('firstLoad');
    }
    })()
    return {
        courses: []
        
    };
    },async created() { //runs automatically when component created
            try {
                this.courses = await CourseService.getPosts(); //populate courses array
            } catch(err) {
                this.error = err.message;
            }
    },
    methods: {
        
    }
};


var str = "These are the score on the last midterm 60 30 40 50 30 32 100 97 80 44 32 44 55 78 88 Thats it";
var res = str.split(" ");
var k;
var sum=0;
var num_array= [];
var A_cut=90;
var A_num=0;
var B_cut=80;
var B_num=0;
var C_cut=70;
var C_num=0;
var D_cut=60;
var D_num=0;
var F_cut=50;
var F_num=0;
for (k = 0; k < res.length; k++) {
if(!isNaN(res[k])){
 num_array.push(Number(res[k]))
 if(res[k]>A_cut){
   A_num++;
 }
 else if(res[k]<A_cut && res[k]>=B_cut){
   B_num++;
 }
 else if(res[k]<B_cut && res[k]>=C_cut){
   C_num++;
 }
 else if(res[k]<C_cut && res[k]>=D_cut){
   D_num++;
 }
 else{
   F_num++;
 }
} 
}
console.log(A_num);
console.log(B_num);
console.log(C_num);
console.log(D_num);
console.log(F_num);
console.log(num_array);
var total = 0, i;
var mean=0;
   for (i = 0; i < num_array.length; i += 1) {
       total += num_array[i];
   }
   mean=total / num_array.length;
   mean=Math.round(mean * 100) / 100
   console.log("The Mean is :" + mean);
   //document.getElementById("myInput").value = "crap";
 var median = 0, numsLen = num_array.length;
   num_array.sort();
   if (
       numsLen % 2 === 0 // is even
   ) {
       // average of two middle numbers
       median = (num_array[numsLen / 2 - 1] + num_array[numsLen / 2]) / 2;
   } else { // is odd
       // middle number only
       median = num_array[(numsLen - 1) / 2];
   }
   median=Math.round(median * 100) / 100
   console.log("The Median is :" + median);
   //document.getElementById("med").value = "4";
var SDprep = 0;
   for(var key in num_array)
        SDprep += Math.pow((parseFloat(num_array[key]) - mean),2);
    var SDresult = Math.sqrt(SDprep/(num_array.length-1));
   console.log("The SD is :" + SDresult);
   SDresult=Math.round(SDresult * 100) / 100
   
  
window.addEventListener("load", function(event) {
    document.getElementById('mean').value = "Mean: " + mean ;
    document.getElementById('median').value = "Median: " + median ;
    document.getElementById('sd').value = "SD: " + SDresult ;   
  
    var ctx = document.getElementById("myC").getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
       datasets: [
       {
         data: [A_num, B_num, C_num,D_num,F_num],
         backgroundColor: ["#fcc43c", "#e8ad1e", "#eaad19","#d6a224","#bc8705"],
         hoverBackgroundColor: ["#5B6870", "#5B6870", "#5B6870","#5B6870","#5B6870"]
       }
     ],
     labels: ["F", "D", "C","B","A"],
     option: {}
    },
    
});
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'bar',
    width:200,
    data: {
        labels: ["A", "B", "C", "D", "F"],
        datasets: [{
            label: '# of students',
            data: [F_num, D_num, C_num,A_num,B_num],
            backgroundColor: ["#fcc43c", "#e8ad1e", "#eaad19","#d6a224","#bc8705"],
            hoverBackgroundColor: ["#5B6870", "#5B6870", "#5B6870","#5B6870","#5B6870"],
            borderWidth: 1
        }]
    },
    
    maintainAspectRatio: false,
    options: {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
}
   
});
var ctx = document.getElementById("scatterChart").getContext('2d');
var scatterChart = new Chart(ctx, {
    type: 'scatter',
    
    data: {
        datasets: [{
            backgroundColor: "#fcc43c",
            label: 'Scatter Dataset',
            data: [{
                x: 70,
                y: 80
            }, {
                x: 87,
                y: 90
            }, {
                x: 67,
                y: 90    
            },{
                x: 69,
                y: 70 
            }
            ,{
                x: 45,
                y: 70 
            }
            ]
        }]
    },
    options: {
        scales: {
          
            yAxes: [{ 
              ticks: {
                beginAtZero: true
            },
           scaleLabel: {
            display: true,
            labelString: "Grade Exam 1"
          }
        }],
        xAxes: [{ 
          ticks: {
                beginAtZero: true
            },
        scaleLabel: {
            display: true,
            labelString: "Grade Exam 2 "
          } 
            
        }]
                   
        }
    }
});
});
</script>

<style>
#grade {
   font-family: "Nunito", Helvetica, Arial, sans-serif;
 -webkit-font-smoothing: antialiased;
 -moz-osx-font-smoothing: grayscale;
 text-align: center;
 font-size: 70px;
 margin-top: 60px;
 height: 100%;
}
#mean{
font-family: "Nunito", Helvetica, Arial, sans-serif;
font-size: 30px;
 color:#C28E0E;
 font-weight: bold;
  text-align: center;
}
#median{
font-family: "Nunito", Helvetica, Arial, sans-serif;
font-size: 30px;
 color:#C28E0E;
 font-weight: bold;
  text-align: center;
}
#sd{
font-family: "Nunito", Helvetica, Arial, sans-serif;
font-size: 30px;
 color:#C28E0E;
 font-weight: bold;
  text-align: center;
}
#grade h1 {
 font-size: 90px;
 text-decoration: underline;
 color:#C28E0E;
 font-weight: bold;
}
#grade h2 {
 font-size: 40px;
 color:#C28E0E;
 font-weight: normal;
}
#grade h3 {
 font-size: 40px;
 background-color: #C28E0E;
 color:white;
  text-align: center;
 font-weight: normal;
}
#grade h4 {
 font-size: 40px;
 background-color:transparent;
 color:white;
  text-align: center;
 font-weight: normal;
}
#myChart {
  max-width: 70%;
  max-height: 70%;
  margin: auto;
}
#scatterChart {
   max-width: 70%;
  max-height: 70%;
  margin: auto;
  color: #C28E0E
}
#myC {
   max-width: 85%;
  max-height: 85%;
  margin: auto;
  color: #C28E0E
}
</style>
