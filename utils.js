if (Vue) {
    var utils = utils || {}
    /**
    * 过滤组件函数 拿到父组件下指定名称的子组件
    * 适用于 无状态组件 获取子组件
    * @param context 函数式组件下的context
    * @param componentName 子组件名称
    */
    utils.filterSlotsComponents = function (context, componentName) {
        if (!context.children) return '';
        for (var i = 0; i < context.children.length; i++) {
            if (context.children[i].functionalOptions &&
                context.children[i].functionalOptions['name'] === componentName) {
                return context.children[i];
            }
        }
        return '';
    };

    //扩展Vue
    Vue.$utils = utils;
}else {
    throw new Error('Vue is not defined')
}
