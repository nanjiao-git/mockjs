<template>
  <div></div>
</template>
<script>
import axios from 'axios'
export default {

created(){
  axios.get('api/get/news').then(res=>{  console.log(res.data);}

),
 axios.post('api/post/news').then(res=>{  console.log(res.data);}

)
}
  
}
</script>