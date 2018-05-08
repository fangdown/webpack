import React, { Component } from 'react';
import { LocaleProvider } from 'antd';
import { addLocaleData, IntlProvider } from 'react-intl';
import enUS from 'antd/lib/locale-provider/en_US';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import enMessages from './locales/en_US.js';
import zhMessages from './locales/zh_CN.js';


const lang = window.location.href.indexOf('lang=en') >= 0 ? 'en' : 'zh';
const antdLang = lang === 'en' ? enUS : {};
const intlMessages = lang === 'en' ? enMessages : zhMessages;
const intlLang = lang === 'en' ? 'en-US' : 'zh-CN';
addLocaleData([...en, ...zh]);

class I18n extends Component {
    render() {
        return (
            <LocaleProvider locale={antdLang}>
                <IntlProvider
                    locale={intlLang}
                    messages={intlMessages}
                >
                    {this.props.children}
                </IntlProvider>
            </LocaleProvider>
        );
    }
}

export default I18n;
