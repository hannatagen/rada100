import Router from 'vue-router';
import Main from '@/components/User/Main';
import KKK from '@/components/User/KKK';
import Contact from '@/components/User/Contact';
import Rules from '@/components/User/Rules';
import Profile from '@/components/User/Profile';
import Settings from '@/components/User/Settings';
import ScoreBoard from '@/components/User/ScoreBoard';
import Login from '@/components/User/Login';
import TrailsList from '@/components/User/TrailsList';
import AdminMain from '@/components/Admin/AdminMain';
// import Admin from '@/components/Admin/Admin';
import AdminRules from '@/components/Admin/AdminRules';
import AdminLogin from '@/components/Admin/AdminLogin';
import Vue from 'vue';

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
            path: '/settings',
            name: 'Settings',
            component: Settings,
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
            path: '/trails-list',
            name: 'TrailsList',
            component: TrailsList,
        },
    ],
});
