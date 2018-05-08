import 'whatwg-fetch';
import { Modal, message } from 'antd';
import Config from '@common/constants';
// import Utils from '@utils';

const formatUrl = (url) => {
    return /https?:\/\//gi.test(url) ? url : `${Config.NEWAPI}${url}`;
};

const errMsg = {
    msg: '',
    time: 0,
};

const checkMsgTime = (msg) => {
    const time = new Date().getTime();
    if (errMsg.msg && errMsg.time && errMsg.msg === msg) {
        const sec = time - errMsg.time;
        errMsg.msg = msg;
        errMsg.time = time;
        if (sec < 2000) { // 2秒内相同的消息不提示
            return false;
        }
    }
    errMsg.msg = msg;
    errMsg.time = time;
    return true;
};

const showErrorMsg = (errMsgModal, msg) => {
    if (!checkMsgTime(msg)) {
        return;
    }

    if (errMsgModal) {
        Modal.error({
            title: msg,
        });
        return;
    }
    message.error(msg);
};

const OPTIONS = {
    errMsgModal: false,
    throwError: false, // 抛出api返回错误给用户处理
    // throwNetError: false, // 网络异常, 指用户无网络
    // throwServerError: false, // 服务器status返回 3xx 4xx 5xx
    // throwApiError: false, // 接口返回错误
};

const throwError = (code, msg, data) => {
    const err = new Error('fetchv2.error');
    err.data = { code, msg, data };
    throw err;
};

const goToLogin = (fresh) => {
    window.location.href = `/login`;
    fresh === 'fresh' && setTimeout(() => {
        window.location.reload();
    });
};

const requestOptions = {
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    mode: 'cors',
    credentials: 'include', // 带上cookie
    cache: 'default',
    method: 'post',
};

/**
 * @param {string} url
 * @param {json} data
 * @param {function} callback
 * @param {object} options 配置参数
 * @param {boolean} [options.needJson]
 * @return null 如果出错并且
 */
export const postJson = async (url, data, callback, options) => {
    const newOptions = { ...OPTIONS, ...options };
    const newUrl = formatUrl(url);
    const request = { ...requestOptions };
    request.body = JSON.stringify(data);

    let response = {};
    try {
        response = await fetch(newUrl, request);
    } catch (error) {
    // 用户应该不需要处理此类错误
        callback && callback();
        showErrorMsg(newOptions.errMsgModal, '网络异常');
        return null;
    }
    callback && callback();
    const { status } = response;
    if (status >= 300) {
        showErrorMsg(newOptions.errMsgModal, '服务异常');
        return null;
    // 用户应该不需要处理此类错误
    // if (options.throwError) {
    //     throwError(11, '服务异常', null);
    //     return null;
    // } else {
    //     showErrorMsg(options.errMsgModal, '服务异常');
    //     return null;
    // }
    }
    const rs = await response.json();
    rs.responseCode = Number(rs.responseCode);
    if (rs.responseCode === 10001) {
        return rs;
    } else if (!rs.responseMsg) {
        rs.responseMsg = '系统未知错误';
    }

    switch (rs.responseCode) {
        case 10003:
            // eslint-disable-next-line
    console.log('登陆超时', newUrl);
            goToLogin();
            break;
        case 10004:
            // eslint-disable-next-line
    console.log('这里可以处理登陆错误', newUrl);
            break;
        case 10005:
            // eslint-disable-next-line
    console.log('用户未登陆', newUrl);
            goToLogin();
            break;
        case 10006:
            // eslint-disable-next-line
    console.log('权限认证失败', newUrl);
            break;
        default:
    }

    // 用户有可能要处理此类错误
    if (newOptions.throwError) {
        throwError(12, '接口错误', rs);
    } else {
        showErrorMsg(newOptions.errMsgModal, rs.responseMsg);
    }
    return null;
};
