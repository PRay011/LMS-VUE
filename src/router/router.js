import { createRouter, createWebHashHistory } from "vue-router";
  

const router = createRouter({
    history:createWebHashHistory(),
    routes:[
      { 
        //path属性是url的地址
        path:'/', 
        //component属性就是显示的组件名称
        name: "index",
        component: () =>
            import ('../pages/Home/index.vue'),   
      },
      { 
        //path属性是url的地址
        path:'/login',
        //component属性就是显示的组件名称
        name: "login",
        component: () =>
            import ('../pages/User/login.vue'),
      },
      { 
        //path属性是url的地址
        path:'/register',
        //component属性就是显示的组件名称
        name: "register",
        component: () =>
            import ('../pages/User/register.vue'),
      },
      { 
        //path属性是url的地址
        path:'/selfCenter',
        //component属性就是显示的组件名称
        name: "selfCenter",
        component: () =>
            import ('../pages/User/selfCenter.vue'),
      }, 
      { 
        //path属性是url的地址
        path:'/library',
        //component属性就是显示的组件名称
        name: "library",
        component: () =>
            import ('../pages/Library/library.vue'),
      }, 
    ],
})
export default router;