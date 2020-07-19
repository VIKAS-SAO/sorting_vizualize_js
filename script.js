 const canvas = document.getElementById('canvas')
 const ctx = canvas.getContext('2d')

 canvas.height = window.innerHeight*2/3;
 canvas.width = window.innerWidth*2/3;  

 var slider = document.getElementById("myRange"); 
 var buttons = document.querySelectorAll('.buttons');
 var bubble = document.getElementById('bubble');
 var insertion = document.getElementById('insertion');
 var quick = document.getElementById('quick');
 var merge = document.getElementById('merge');
 var selection = document.getElementById('selection');

 

 


 // on moving the slider
 let running;
  slider.oninput = function() {
    var numbers = this.value*4; 
    for (let i = 1; i < 9999; i++)
     window.clearInterval(i);
       // clearInterval(running)
        bubble.removeAttribute('disabled') 
        insertion.removeAttribute('disabled') 
        quick.removeAttribute('disabled') 
        selection.removeAttribute('disabled') 
        merge.removeAttribute('disabled') 
    set_bars(numbers)
    draw_array()
    
 
 }

 // declaring the array
var array =  new Array()  


// ot initialize and set the array anf first bar function
function set_bars(n){ 
    const height = canvas.height;
    const width = canvas.width;  
    ctx.clearRect(0,0,canvas.width , canvas.height);
    array =[] 
    for(let i=0;i<n;i++){
         array.push({value:Math.random()*height,color:'white'})
    } 
}
set_bars(200); 
 let outer_colors = new Array()
for(let i=0;i<array.length; i++){
    outer_colors[i] = 'white'
 }
 

function draw_array( ){
    const n = array.length;
    ctx.clearRect(0,0,canvas.width , canvas.height);
    const height = canvas.height;
    const width = canvas.width;  
    const wide = 3*width/(5*n);
    const x=width/5;
    for(let i=0;i<n;i++){
        ctx.beginPath()
         ctx.fillStyle = array[i].color;
       //  ctx.fillStyle = outer_colors[i];
        ctx.fillRect(x+i*wide , 0 ,wide , array[i].value);
        ctx.fill();
        ctx.closePath(); 
    } 

}

// the first initialization of the array build
 draw_array() 






// event listeners of sorting buttons
bubble.addEventListener('click',function(){ 
    buttons.forEach(function(item){
        item.setAttribute('disabled','disabled');  
    })
    bubble_sorter() 
})
insertion.addEventListener('click',function(){ 
    buttons.forEach(function(item){
        item.setAttribute('disabled','disabled');  
    })  
      insertion_sorter() 
})

selection.addEventListener('click',function(){ 
    buttons.forEach(function(item){
        item.setAttribute('disabled','disabled');  
    })  
    selection_sorter() 
})
merge.addEventListener('click',function(){ 
    buttons.forEach(function(item){
        item.setAttribute('disabled','disabled');  
    })  
    merge_sorter(0,array.length-1) 
    setInterval(() => {
          draw_array()
     }, 15);

})
quick.addEventListener('click',  function(){ 
    buttons.forEach(function(item){
        item.setAttribute('disabled','disabled');  
    })  
    quick_sorter(0,array.length-1)

     setInterval(() => {
          draw_array()
      }, 15);

      
   
})





 





// functtion fot the bubble sort 
    function bubble_sorter(){
     let i=0,j=0;
    let n = array.length;
  running =   setInterval(() => {
    //   for(let j=1;j<n;j++){
    //       if(array[j]==undefined || array[j-1] == undefined){
    //           console.log(j,j-1,array.length)
    //       }
    //    // console.log(array[j])

    //       if(array[j-1].value>array[j].value){
    //           let swap = array[j-1];
    //           array[j-1] = array[j];
    //           array[j] = swap;
    //       }
    //   }

    j=0; 
     let   running1 = setInterval(function(){

        if(j>=n-2){
                  clearInterval(running1); 
          }  

           if(array[j].value > array[j+1].value){
              let swap = array[j+1];
              array[j+1] = array[j];
              array[j] = swap;
          }
          j++; 
          array[j].color='red';
          draw_array(); 
          array[j].color='white';

    }, 20);

      i++;
     if(i>=n*2){clearTimeout(running);return;}
    // draw_array()
 }, 40); 
 }


// functtion fot the insertion sort  
 async function insertion_sorter(){
    let n = array.length;
    let i=1,j=0;

    if(j==1){clearInterval(running1);}
     running =   await    setInterval(() => {
    j=i;

   let running1 = setInterval(function(){
        if(array[j].value<array[j-1].value){
            let swap = array[j-1];
            array[j-1] = array[j];
            array[j] = swap; 
        }
        array[j].color = 'red'
        draw_array()
        array[j].color = 'white'

        if(j==1){clearInterval(running1);}

        j--; 
   }, 40);


    //  while(j>=1 && array[j].value<array[j-1].value){
    //     let swap = array[j-1];
    //     array[j-1] = array[j];
    //     array[j] = swap; 
    //     j--;
    //       draw_array()
    // }
    draw_array()

      i++;  
     if(i==n){clearTimeout(running)}
     //array[i].color = 'red';
     //draw_array()
 
 }, 80); 
 }


 // function for the selection sort
 async function selection_sorter(){
     //console.log('selection')
    let n = array.length;
    let i=0,j=0;
    running = await setInterval(() => {
        let mini = i;
        for(j=i;j<n;j++){
            if(array[mini].value > array[j].value){ 
                mini = j; 
            } 
        }

        array[mini].color = 'yellow'
        // j=i;
        // let running1 = setInterval(function(){
        //     if(array[mini].value>array[j].value){
        //       mini = j;
        //     }
        //     j++; 
        //     if(j>=n){clearInterval(running1);}
        //     array[mini].color = 'red'
        //     //draw_array()
        //     array[mini].color = 'white' 
            
        // }, 40);


        let swap = array[i];
        array[i] = array[mini];
        array[mini] = swap; 
        i++;
        if(i>=n){clearInterval(running);}
        draw_array()
        array[i].color = 'white'
    }, 80); 

 }

  


 
// partition function for quick sort 
async function partition(  low, high)
{
    for(let i=low;i<=high;i++){
        array[i].color = 'yellow'
    }
    let pivot_value = array[high].value;
    let pivot_index = low;
    array[pivot_index].color  = 'red';
    for(let i =low ;i <high ;i++){
        if(array[i].value<pivot_value){
            await swapper(array ,i,pivot_index)
            array[pivot_index].color = 'white'
            pivot_index++;
            array[pivot_index].color = 'red'

        }
    }
    await swapper(array , pivot_index , high);
    for(let i=low;i<high;i++){
        if(i != pivot_index){
            array[i].color  = 'white';

        }
    }
    return pivot_index; 

}

// function for the quick sort 
 async function quick_sorter(  low, high)
 {
     if(low<high){
         let pi = await partition(low , high);
         
       
         array[pi].color  ='white'
        await  Promise.all([
            quick_sorter(low,pi-1),
            quick_sorter(pi+1,high)
        ])


        for(let i=low;i<=high;i++){
            array[i].color = 'white'
        }
 

     } 
  }
 




 // fuunction fot the merge sort function  
async function merge_sorter(low , high){
    if(low<high){
         let mid  = low  +  Math.floor((high - low)/2);
        
        
             
         await Promise.all([
             
            merge_sorter(low , mid),
            merge_sorter(mid+1 , high) 
        ]) 
 
       await  merge_array(low  ,  mid ,high); 
    //    for(let  i = 0 ;i<low ;i++){
    //     array[i].color = 'white';
    //   // outer_colors[i] = 'white';
    //     } 
    //     for(let  i = mid+1 ;i<=high ;i++){
    //         array[i].color = 'white';
    //         //outer_colors[i]  = 'white';
    //     } 
    //     for(let  i = low ;i<=high ;i++){
    //         array[i].color = 'yellow';
    //         //outer_colors[i]  = 'yellow';
    //     }

       array[mid].color  = 'yellow'
     
    }
    
    
}
async function  merge_array(low  , mid , high){
         let i,j,k;
         let n1 = mid-low+1;
         let n2 = high - mid;
         var left = [] , right = []
         



         for(i=0;i<n1;i++){
             left[i] = array[low+i]
         }
         for(j=0;j<n2;j++){
            right[j] = array[mid+j+1]
        }
        i=0;j=0;k=low;
        while(i<n1 && j<n2){
            if(left[i].value<=right[j].value){
                array[k] = left[i];
                i++; 
            }else{
                array[k] = right[j];
                j++; 
            }
            k++;
           await sleep_for_time(30);
        }
        while(i<n1){
            array[k] = left[i];
            i++;
            k++;
            await sleep_for_time(30);

        }
        while(j<n2){
            array[k] = right[j];
            j++;
            k++;
            await sleep_for_time(30);

        }
        
      
       

}




  
async function sleep_for_time(time){
    return new Promise(resolve=> setTimeout( resolve, time)) 
}
 async function  swapper(arr , a,b){
     await sleep_for_time(25) ;
    let x = arr[a]
    arr[a] = arr[b];
    arr[b] = x; 
 }
