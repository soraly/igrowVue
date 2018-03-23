/**
 * 表单校验
 */
const reg = {
  NUM: {
    test: /^\d+(\.\d+)?$/,
    error: '请输入正确数字'
  },
  EMAIL: {
    name: '邮箱',
    test: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
    error: '邮箱格式不正确'
  },
  DATE: {
    name: '日期',
    test: /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/,
    error: '日期格式不正确'
  },
  TIME: {
    name: '时间',
    test: /\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}/,
    error: '时间格式不正确'
  },
  ID_NO: {
    name: '身份证号码',
    test: /(^\d{15}$)|(^\d{17}([0-9]|X)$)/,
    error: '身份证格式不正确'
  },
  MOBILE: {
    name: '手机号码',
    test: /^1(3\d{1}|4[57]|5[^4,\D]|8\d{1}|70)\d{8}$/,
    error: '手机号码由11位数字组成'
  },
  TELEPHONE: {
    name: '电话号码',
    test: /^\d{7,13}?$/,
    error: '电话号码由7~13位数字组成'
  },
  PRICE: {
    test: /^([+-]?[1-9][\d]{0,3}|0)([.]?[\d]{1,2})?$/,
    error: '请输入正确金额'
  }
};

let fieldRequired = (option, i) => {
  let res = {
    status: false,
    type: option[i].type,
    error: option[i].customName || ((reg[option[i].type].name || option[i].name) + '必填'),
    index: i
  };
  return res;
};

export default (option) => {
  let res = {status: true};
	
  for (let i in option) {
    let type = option[i].type;
    let noValue = option[i].value === '' || option[i].value === undefined;
    let hasReg = (option[i].customReg !== undefined) || (typeof reg[type] !== 'undefined');
		
    if (!hasReg) { // 没有类型
      if (option[i].required && noValue) {
        res = fieldRequired(option, i);
        break;
      }
    } else { // 有校验类型
      if (option[i].required && noValue) { // 必填
        res = fieldRequired(option, i);
        break;
      } else {
        let flag = true;
        if (option[i].customReg !== undefined) {
          if (typeof option[i].customReg === 'boolean') {
            flag = option[i].customReg;
          } else { // function
            flag = option[i].customReg(option[i]);
          }
        } else {
          flag = reg[option[i].type].test.test(option[i].value);
        }
        if (!noValue && !flag) {
          res = {
            status: false,
            type: option[i].type,
            error: (option[i].customReg !== undefined) ? option[i].customName : reg[type].error,
            index: i
          };
					
          if (option[i].customName) { // 优先根据 customName name 来报错
            res.error = option[i].customName ? option[i].customName : res.error;
          }
          break;
        }
      }
    }
  }
  if (!res.status) {
    if (window.MyAlipayJSBridge) {
      window.MyAlipayJSBridge('toast', {
        content: res.error,
        duration: 2000
      });
    } else {
      console.log(res.error);
    }
  }
  return res;
};
