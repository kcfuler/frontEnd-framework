import React from "react";

import HistoryContext from "./HistoryContext.js";
import RouterContext from "./RouterContext.js";

class Router extends React.Component {
  static computeRootMatch(pathname) {
    return { path: "/", url: "/", params: {}, isExact: pathname === "/" };
  }

  constructor(props) {
    super(props);

    this.state = {
      location: props.history.location,
    };

    // This is a bit of a hack. We have to start listening for location
    // changes here in the constructor in case there are any <Redirect>s
    // on the initial render. If there are, they will replace/push when
    // they mount and since cDM fires in children before parents, we may
    // get a new location before the <Router> is mounted.
    this._isMounted = false;
    this._pendingLocation = null;

    // staticContext 是 StaticRouter 传入的，使用 BrowserRouter 时是没有的
    if (!props.staticContext) {
      // 开始监听 url 变化，变化时会执行传入的回调函数
      this.unlisten = props.history.listen((location) => {
        // 这里做了一层兼容操作，有可能这里执行的时候，
        // 组件还没加载完成，就会把 location 暂存起来，
        // 等组件加载完成后再去更新 location
        if (this._isMounted) {
          this.setState({ location });
        } else {
          this._pendingLocation = location;
        }
      });
    }
  }

  componentDidMount() {
    this._isMounted = true;

    if (this._pendingLocation) {
      this.setState({ location: this._pendingLocation });
    }
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
      this._isMounted = false;
      this._pendingLocation = null;
    }
  }

  render() {
    return (
      /*
       * RouterContext 为子组件提供 history,location,match,staticContext 数据
       * 这里 history 已经包含了 location，为什么这里还要将 location 单独传递呢？
       * 因为 location 通过 state 保存，用于当 url 发生变化时，更新 state 实现同步渲染页面
       */
      <RouterContext.Provider
        value={{
          history: this.props.history,
          location: this.state.location,
          match: Router.computeRootMatch(this.state.location.pathname),
          staticContext: this.props.staticContext,
        }}
      >
        // HistoryContext 主要为 子组件 提供 children 和 history 数据
        <HistoryContext.Provider
          children={this.props.children || null}
          value={this.props.history}
        />
      </RouterContext.Provider>
    );
  }
}

export default Router;
