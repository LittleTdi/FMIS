/**
 * 2018/12/5.
 * 封装本地缓存方法
 */


export function setString(key,value){
  localStorage.setItem(key,value);
};

export function getString(key){
  return localStorage.getItem(key);
}

export function setObject(key,value){
  localStorage.setItem(key,JSON.stringify(value));
};

export function getObject(key){
  return JSON.parse(localStorage.getItem(key));
}

export function removeItem(key){
  localStorage.removeItem(key);
}
