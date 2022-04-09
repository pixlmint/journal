import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import MonthList from "./components/MonthList";
import Login from "./components/auth/Login";
import EditEntry from "./components/admin/EditEntry";
import EditGallery from "./components/admin/EditGallery";
import NotFound from './components/error/NotFound';

const routes = [
    {
        path: '/',
        name: "Home",
        component: MonthList,
    },
    {
        path: '/edit',
        name: "Edit",
        props: route => ({ entry: route.query.entry }),
        component: EditEntry,
    },
    {
        path: '/edit/gallery',
        name: "Gallery",
        props: route => ({ entry: route.query.entry }),
        component: EditGallery,
    },
    {
        path: '/login',
        name: "Login",
        component: Login,
    },
    {
        path: "*",
        name: "notFound",
        component: NotFound,
    }
];

export const router = new VueRouter({
    mode: 'history',
    routes,
})