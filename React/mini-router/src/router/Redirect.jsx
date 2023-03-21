import React from "react";
import { createLocation, locationsAreEqual } from "history";

import Lifecycle from "./Lifecycle.js";
import RouterContext from "./RouterContext.js";
import generatePath from "./generatePath.js";

/**
 * The public API for navigating programmatically with a component.
 */
/**
 *
 */
function Redirect({ computedMatch, to, push = false }) {
  return (
    <RouterContext.Consumer>
      {(context) => {
        const { history, staticContext } = context;

        // 根据 push 参数判断使用的方法
        const method = push ? history.push : history.replace;
        /**
         * 创建一个 location 对象
         * computedMatch 是使用 <Switch /> 传递过来的
         * to 可以是 string 或 object
         * generatePath 根据 to 和 params 生成 path
         * 最后 createLocation 生成 location 对象
         */
        const location = createLocation(
          computedMatch
            ? typeof to === "string"
              ? generatePath(to, computedMatch.params)
              : {
                  ...to,
                  pathname: generatePath(to.pathname, computedMatch.params),
                }
            : to
        );

        // When rendering in a static context,
        // set the new location immediately.
        if (staticContext) {
          method(location);
          return null;
        }

        return (
          // 通过生命周期函数对 from 和 to 两个路径进行测试
          // 先通过onMount周期修改url
          // 通过 onUpdate 周期监听更新
          //    - 拿到组件实例，如果对应的path不同，就进行重定向
          <Lifecycle
            onMount={() => {
              method(location);
            }}
            onUpdate={(self, prevProps) => {
              const prevLocation = createLocation(prevProps.to);
              if (
                !locationsAreEqual(prevLocation, {
                  ...location,
                  key: prevLocation.key,
                })
              ) {
                method(location);
              }
            }}
            to={to}
          />
        );
      }}
    </RouterContext.Consumer>
  );
}

export default Redirect;
