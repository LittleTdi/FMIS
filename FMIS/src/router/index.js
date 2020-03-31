import Vue from 'vue'
import Router from 'vue-router'
import Addprojectitem from '@/pages/addprojectitem'
import CreateMonthlyReport from '@/pages/createMonthlyReport'
import MonthlyList from '@/pages/monthlyList'
import ReportForm from '@/pages/reportForm'
import MonthlyFormList from '@/pages/monthlyFormList'
import EditSitte from '@/pages/editSite'
import CreateSite from '@/pages/createSite'
import NavHeader from '@/components/navHeader'
import SiteList from '@/pages/siteList'
import User from '@/pages/user'
import Login from '@/pages/Login'
import EditcwReport from '@/pages/editcwReport'
import Accounting from '@/pages/accounting'
import Generalledger from '@/pages/generalledger'
import UserManagement from '@/pages/userManagement'
import Verify from '@/pages/verify'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/generalledger',
            name: 'generalledger',
            component: Generalledger
        },
        {
            path: '/accounting',
            name: 'accounting',
            component: Accounting
        },
        {
            path: '/editcwReport',
            name: 'editcwReport',
            component: EditcwReport
        }, {
            path: '/editSite',
            name: 'editSite',
            component: EditSitte
        }, , {
            path: '/siteList',
            name: 'siteList',
            component: SiteList
        }, {
            path: '/createSite',
            name: 'createSite',
            component: CreateSite
        }, {
            path: '/createMonthlyReport',
            name: 'createMonthlyReport',
            component: CreateMonthlyReport
        }, {
            path: '/addprojectitem',
            name: 'addprojectitem',
            component: Addprojectitem
        }, {
            path: '/monthlyFormList',
            name: 'monthlyFormList',
            component: MonthlyFormList
        }, {
            path: '/reportform',
            name: 'reportform',
            component: ReportForm
        }, {
            path: '/monthlyList',
            name: 'monthlyList',
            component: MonthlyList
        }, {
            path: '/verify',
            name: 'verify',
            component: Verify
        }, {
            path: '/navHeader',
            name: 'navHeader',
            component: NavHeader
        }, {
            path: '/user',
            name: 'user',
            component: User
        },
        {
            path: '/userManagement',
            name: 'userManagement',
            component: UserManagement
        }
    ]
})