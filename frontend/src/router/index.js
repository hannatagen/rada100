import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/User/Main';
import KKK from '@/components/User/KKK';
import Contact from '@/components/User/Contact';
import Rules from '@/components/User/Rules';
import Profile from '@/components/User/Profile';
import ScoreBoard from '@/components/User/ScoreBoard';
import Login from '@/components/User/Login';
import Register from '@/components/User/Register';
import TrailsList from '@/components/User/TrailsList';
import AdminMain from '@/components/Admin/AdminMain';
// import Admin from '@/components/Admin/Admin';
import AdminRules from '@/components/Admin/AdminRules';
import AdminLogin from '@/components/Admin/AdminLogin';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Main,
        },
        {
            path: '/kkk',
            name: 'KKK',
            component: KKK,
        },
        {
            path: '/contact',
            name: 'Contact',
            component: Contact,
        },
        {
            path: '/rules',
            name: 'Rules',
            component: Rules,
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile,
        },
        {
            path: '/scoreboard',
            name: 'ScoreBoard',
            component: ScoreBoard,
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
        },
        {
            path: '/admin/main',
            name: 'AdminMain',
            component: AdminMain,
        },
        {
            path: '/admin/rules',
            name: 'AdminRules',
            component: AdminRules,
        },
        {
            path: '/admin',
            name: 'AdminLogin',
            component: AdminLogin,
        },
        {
            path: '/radade-nimekiri',
            name: 'TrailsList',
            component: TrailsList,
        },
    ],
});
