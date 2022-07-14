//引入mock模块
import Mock from 'mockjs'
var getQuery = (url, name) => {
    // console.log(url, name);
    // 找到？的索引位置
    const index = url.indexOf("?");
    if (index !== -1) {
      const queryStrArr = url.substr(index + 1).split("&");
      for (var i = 0; i < queryStrArr.length; i++) {
        const itemArr = queryStrArr[i].split("=");
        // console.log(itemArr);
        if (itemArr[0] === name) {
          return itemArr[1];
        }
      }
    }
    return null;
  };
  

// 新闻数据内容自动创建
const {newList}=Mock.mock({
    "newList|11":[
        {
            "id":"@increment",
            "title":"@ctitle(8)",
            "content":"@cparagraph()",
            "img_url": "@image('50*50','#FF83FA','#FCFCFC','png','mono')",
            'add_time':"@date(yyyy-MM-dd hh:mm:ss)"}
        ]
})


// 定义获取新闻列表的数据
// 通过控制页数和页面显示多少条数据进行控制
// /api/get/news?pageinde1&pagesize=10
Mock.mock(/\/api\/get\/news/, "get", (options) => {
    // 获取传递参数pageindex，pagesize
    const pageindex = getQuery(options.url, "pageindex");
    const pagesize = getQuery(options.url, "pagesize");
    // console.log(pageindex);
    // console.log(pagesize);
    const start = (pageindex - 1) * pagesize;
    const end = pagesize * pageindex;
    const totalPage = Math.ceil(newList.length / pagesize);
  
    //  pageindex:1 pagesize:10 返回0-9条数据  2-10-（10-19） 3-10（20-29）
    // 数据的起始位置：（pageindex-1）*pagesize 结束位置：pageindex*pagesize
    const list = pageindex > totalPage ? [] : newList.slice(start, end);
    return {
      status: 200,
      message: "获取新闻列表成功",
      list: list,
      total: totalPage,
    };
  });
  
  // 定义添加新闻的数据
Mock.mock("/api/add/news", "post", (options) => {
    // console.log("options",options.body);//{"title":"1","content":"1"}
      const body = JSON.parse(options.body);
    // console.log(body);//{title: '1', content: '1'}
      newList.push(
      Mock.mock({
        id: "@increment",
        title: body.title,
        content: body.content,
        img_url: "@image('50*50','#FF83FA','#FCFCFC','png','mono')",
        add_time: "@date(yyyy-MM-dd hh:mm:ss)",
      })
    );
    console.log(newList);
    return {
      status: 200,
      message: "添加成功",
      list: newList,
      total: newList.length,
 
    };
  });

  // 定义删除新闻
Mock.mock("/api/delete/news", "post", (options) => {
    // console.log(options);
    const body = JSON.parse(options.body);
    // console.log(body);
    const index = newList.findIndex((item) => {
      return item.id === body.id;
    });
    newList.splice(index, 1);
    console.log( newList.length);
    return {
      status: 200,
      message: "删除成功",
      list: newList,
      total: newList.length,
    };
  });