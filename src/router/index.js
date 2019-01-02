import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import PrivilegeList from '@/components/privilege/PrivilegeList'
import PrivilegeEdit from '@/components/privilege/PrivilegeEdit'
import PrivilegeAdd from '@/components/privilege/PrivilegeAdd'
import RoleAdd from '@/components/role/RoleAdd'
import RoleEdit from '@/components/role/RoleEdit'
import RoleList from '@/components/role/RoleList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/privilege',
      name: 'PrivilegeList',
      component: PrivilegeList
    },
    {
      path: '/privilege/edit/:id',
      name: 'PrivilegeEdit',
      component: PrivilegeEdit
    },
    {
      path: '/privilege/add',
      name: 'PrivilegeAdd',
      component: PrivilegeAdd
    },
    {
      path: '/role',
      name: 'RoleList',
      component: RoleList
    },
    {
      path: '/role/edit/:id',
      name: 'RoleEdit',
      component: RoleEdit
    },
    {
      path: '/role/add',
      name: 'RoleAdd',
      component: RoleAdd
    }
  ]
})
