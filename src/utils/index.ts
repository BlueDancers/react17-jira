import { useEffect, useState } from "react";

export function cancelObj(object) {
  const result = { ...object };
  Object.keys(result).map((key) => {
    const value = result[key];
    if (value === undefined || value === "") {
      delete result[key];
    }
    return key;
  });
  return result;
}

/**
 *
 * @param fn
 */
export function useMount(fn: () => void) {
  useEffect(() => {
    fn();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}

/**
 * 去抖函数
 * @param value 监听的值
 * @param delay 防抖时间
 * @returns 变化后变量
 */
export function useDebounce(value: any, delay: number = 2000) {
  // 声明一个保存防抖结果的字段
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    // 每次value,delay发生变化的时候生成一个定时器
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    // 在执行下一个useEffect之前,会执行上一个useEffect的返回函数
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounceValue;
}
