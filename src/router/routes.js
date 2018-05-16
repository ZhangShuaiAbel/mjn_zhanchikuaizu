
/**
 *  // 免押认证部分 @龙
 *  /mustauthentication?userId=1 免押必要认证
 *  /addauthentication 免押增额认证
 *  /successauthentication 免押增额认证成功 
 * 
 *  // 协议附件 @辉
 *  /enclosure?orderId=1
 * 
 *  // 协议附件详情 @辉
 *  /enclosureDetails?orderId=1&num=0
 *   
 *  // 优惠券 @辉
 *  /coupon
 * 
 *  // 售后服务 @辉
 *  /saleAfter
 * 
 *  // 协议附件部分 @辉
 *  /enclosure?orderId=1
 * 
 * *  // 公众号 @辉
 *  /weixin
 * 
 *  * *  // 展翅快租注册及使用协议书 @辉
 *  /xieyi
 * 
 *  // 协议附件详情 @辉
 *  /enclosureDetails?orderId=1&num=0
 * 
 *  // 关于我们 @帅帅
 *  /about
 * 
 *  // 帮助中心 @帅帅
 *  /help
 * 
 *  // 我要出售 @帅帅
 *  /sold
 * 
 * // 收到信息成功页面 @帅帅
 *  /msgsuccess
 * 
 * // 购物车订单成功页面 @帅帅
 *  /ordersuccess
 * 
 * // 支付成功页面 @帅帅
 *  /paysuccess
 * 
 * // 实名认证页面 @帅帅
 *  /realNameAuthentication
 * 
 * // 实名认证成功页面 @帅帅
 *  /realNamesuccess
*/

// const Help = () => import(/* webpackChunkName: "Help" */'@/views/help');

import MustAuthentication from '@/views/mustauthentication';
import AddAuthentication from '@/views/addauthentication';
import successAuthentication from '@/views/successauthentication';

import Enclosure from '@/views/enclosure';
import EnclosureDetails from '@/views/enclosureDetails';
import Coupon from '@/views/coupon';
import About from '@/views/about';
import Weixin from '@/views/weixin';
import banner from '@/views/banner';
import Help from '@/views/help';
import Xieyi from '@/views/xieyi';
import Sold from '@/views/sold';
import paysuccess from '@/views/paysuccess';
import ordersuccess from '@/views/ordersuccess';
import msgsuccess from '@/views/msgsuccess';
import realNameAuthentication from '@/views/realNameAuthentication';
import realNamesuccess from '@/views/realNamesuccess';

import SaleAfter from '@/views/saleAfter';
import saleAfterMain from '@/views/saleAfter/children/saleAfterMain';

import available from '@/views/coupon/children/available';
import Noavailable from '@/views/coupon/children/noavailable';
import dwonload from '@/views/dwonload';


const routes = [
    { // 免押必要认证
        path: '/mustauthentication',
        meta: {
            title: '认证信息'
        },
        component: MustAuthentication
    },
    { // 免押增额认证
        path: '/addauthentication',
        meta: {
            title: '认证附件'
        },
        component: AddAuthentication
    },
    { // 免押增额认证成功页面
        path: '/successauthentication',
        meta: {
            title: '提交成功'
        },
        component: successAuthentication
    },
    { // 协议附件部分
        path: '/enclosure',
        meta: {
            title: '协议附件'
        },
        component: Enclosure
    },
    { // 协议附件详情
        path: '/enclosureDetails',
        meta: {
            title: '协议附件'
        },
        component: EnclosureDetails
    },
    { // 优惠券
        path: '/coupon',
        meta: {
            title: '优惠券'
        },
        component: Coupon,
        children: [
            { // 卡券子路由购物卡
                path: '',
                meta: {
                    index: 1,
                    title: '可用优惠券'
                },
                // 卡券子路由购物卡 '@/views/card/children/shopping/index.vue'
                component: available
            },
            { // 卡券子路由购物卡
                path: 'Noavailable',
                meta: {
                    index: 2,
                    title: '不可用优惠券'
                },
                // 卡券子路由购物卡 '@/views/card/children/shopping/index.vue'
                component: Noavailable
            },
        ]
    },
    { // 售后服务
        path: '/saleAfter',
        meta: {
            title: '售后服务'
        },
        component: SaleAfter,
    },
    { // 关于我们
        path: '/about',
        meta: {
            title: '关于我们'
        },
        component: About
    },
    { // 微信
        path: '/weixin',
        meta: {
            title: '公众号'
        },
        component: Weixin
    },
    { // 协议
        path: '/xieyi',
        meta: {
            title: '用户注册协议'
        },
        component: Xieyi
    },
    { // 帮助中心
        path: '/help',
        meta: {
            title: '帮助中心'
        },
        component: Help
    },
    { // 我要出售
        path: '/sold',
        meta: {
            title: '我要出售'
        },
        component: Sold
    },
    { // 收到信息成功页面
        path: '/msgsuccess',
        meta: {
            title: '提交成功'
        },
        component: msgsuccess
    },  
    { // 支付成功页面
        path: '/paysuccess',
        meta: {
            title: '支付成功'
        },
        component: paysuccess
    },  
    { // 订单已提交成功页面
        path: '/ordersuccess',
        meta: {
            title: '订单已提交'
        },
        component: ordersuccess
    },   
    { // 实名认证页面
        path: '/realNameAuthentication',
        meta: {
            title: '实名认证'
        },
        component: realNameAuthentication
    }, 
    { // 实名认证成功页面
        path: '/realNamesuccess',
        meta: {
            title: '认证成功'
        },
        component: realNamesuccess
    }, 
    { // H5  dwonload
        path: '/dwonload',
        meta: {
            title: '展翅块租'
        },
        component: dwonload
    }, 
    { // H5  dwonload
        path: '/banner',
        meta: {
            title: '五一大放送'
        },
        component: banner
    }, 
    // {
    //     path: '*',
    //     redirect: '/home'
    // }
]

export default routes;
