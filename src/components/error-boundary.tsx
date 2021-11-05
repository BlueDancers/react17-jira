import React, { ReactNode } from "react";

type FallBackRender = (props: { error: Error | null }) => React.ReactElement;

// 1 2 两种写法一致
type Components1 = { children: ReactNode; fallbackRender: FallBackRender };
type Components2 = React.PropsWithChildren<{ fallbackRender: FallBackRender }>;

export class ErrorBoundary extends React.Component<
  Components2,
  { error: Error | null }
> {
  state = {
    error: null,
  };
  // 当子组件抛出异常, state中的errir就会被调用
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      console.log("错误执行", error);
      return fallbackRender(error);
    } else {
      return children;
    }
  }
}
