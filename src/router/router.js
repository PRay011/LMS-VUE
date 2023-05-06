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
        path:'/login',
        name: "login",
        component: () =>
            import ('../pages/User/login.vue'),
      },
      { 
        path:'/register',
        name: "register",
        component: () =>
            import ('../pages/User/register.vue'),
      },
      { 
        path:'/selfCenter',
        name: "selfCenter",
        component: () =>
            import ('../pages/User/selfCenter.vue'),
      }, 
      { 
        path:'/library',
        name: "library",
        component: () =>
            import ('../pages/Library/library.vue'),
      }, 
      {
        // path: '/detial/:id', // /:id 对应携带的参数，子组件即可获取传递的参数值。获取方式：this.$route.params.id
        path: '/detail',
        name: 'detail',
        component: () =>
            import ('../pages/Library/detail.vue'),
      },
      { 
        path: '/scan', 
        name: 'scan', 
        component: () => 
            import('../pages/Home/scan.vue'),
      },
      { 
        path: '/search', 
        name: 'search', 
        component: () => 
            import('../pages/Library/search.vue'),
      },
      { 
        path: '/userManagement', 
        name: 'userManagement', 
        component: () => 
            import('../pages/Manage/userManagement.vue'),
      },
      { 
        path: '/managerManagement', 
        name: 'managerManagement', 
        component: () => 
            import('../pages/Manage/managerManagement.vue'),
      }
    ],
})
export default router;