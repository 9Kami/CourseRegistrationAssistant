
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    { title:"Login | Course Registration Assistant", path: '/login', exact:true, component: '../layouts/Login' },
    { title:"Sign Up | Course Registration Assistant", path: '/sign-up', exact:true, component: '../layouts/SignUp' },
    {
      title:"Course Registration Assistant",
      path: '/',
      component: '../layouts/index',
      routes: [
        { title:"Dashboard | Course Registration Assistant", path: '/dashboard', exact:true,
          component: '../pages/Dashboard' },
        { title:"Choose Your Courses | Course Registration Assistant", path: '/choose-your-courses', exact:true,
          component: '../pages/ChooseCourses' },
        { title:"Track Your Courses | Course Registration Assistant", path: '/track-your-courses', exact:true,
          component: '../pages/TrackCourses' },
      ]
    }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'CourseRegistrationAssistant',
      dll: false,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
}
