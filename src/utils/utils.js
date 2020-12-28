const _phone = /^1[3456789]\d{9}$/

export function validatePhone(rule, value) {
  if (value) {
    if (_phone.test(value)) {
      return Promise.resolve();
    } else {
      return Promise.reject('手机号不合法');
    }
  }
  return Promise.reject('手机号不能为空');
}


const _IDRe18 = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
const _IDre15 = /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/

export function validateID(rule, value) {
  if (value) {
    if (_IDRe18.test(value) || _IDre15.test(value)) {
      return Promise.resolve();
    } else {
      return Promise.reject('身份证信息不合法');
    }
  }
  return Promise.reject('身份证号不能为空');
}

export function checkResponse(result) {
  if (result && result.status === 200 && result.data.code === 0) {
    return true
  } else {
    return false
  }
}

export function isEmptyObject(object) {
  if (object) {
    return Object.keys(object).length === 0
  } else {
    return false
  }
}

export function changeNum2StrType(num) {
  switch (num) {
    case 0:
      return '校工作人员(非教师)'
    case 1:
      return '本科生'
    case 2:
      return '研究生'
    case 3:
      return '教师(授)'
    default:
      return '学生'
  }
}

export function deleteItemInArr(arr, item) {
  const result = arr.filter((arrItem) => {
    return arrItem.id !== item.id
  })
  if(result){
    return result
  }
  else{
    return []
  }
}
