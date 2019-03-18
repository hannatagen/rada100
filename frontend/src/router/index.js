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
import TrailsManagement from '@/components/Admin/TrailsManagement';
import TasksManagement from '@/components/Admin/TasksManagement';
import AdminManagement from '@/components/Admin/AdminManagement';
import ContentManagement from '@/components/Admin/ContentManagement';
import Languages from '@/components/Admin/Languages';
import UsersList from '@/components/Admin/UsersList';
import AdminProfile from '@/components/Admin/AdminProfile';
import AddTrail from '@/components/Admin/AddTrail';
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
        {
            path: '/admin/profile',
            name: 'AdminProfile',
            component: AdminProfile,
        },
        {
            path: '/admin/trails',
            name: 'TrailsManagement',
            component: TrailsManagement,
        },
        {
            path: '/admin/tasks',
            name: 'TasksManagement',
            component: TasksManagement,
        },
        {
            path: '/admin/content',
            name: 'ContentManagement',
            component: ContentManagement,
        },
        {
            path: '/admin/languages',
            name: 'Languages',
            component: Languages,
        },
        {
            path: '/admin/admin-management',
            name: 'AdminManagement',
            component: AdminManagement,
        },
        {
            path: '/admin/users',
            name: 'UsersList',
            component: UsersList,
        },
        {
            path: '/admin/new-trail',
            name: 'AddTrail',
            component: AddTrail,
        },
    ],
});
