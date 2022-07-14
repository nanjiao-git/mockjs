//引入mock模块
import Mock from 'mockjs'
// console.log("mock",Mock);
// const data = Mock.mock({
//     "string|4":"哈哈"
//     })
//     console.log("data",data);

Mock.mock('api/get/news','get',{
        status:200,
        message:"获取数据成功"
    }
)

Mock.mock('api/post/news','post',()=>{
    return{
        status:200,
        message:"post获取数据成功"
    }
})
    