
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    { path: '/login', exact:true, component: '../layouts/Login' },
    { path: '/sign-up', exact:true, component: '../layouts/SignUp' },
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/dashboard', component: '../pages/Dashboard' },
        { path: '/choose-your-courses', component: '../pages/ChooseCourses' },
        { path: '/track-your-courses', component: '../pages/TrackCourses' },
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
