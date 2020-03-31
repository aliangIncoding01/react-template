// example模块需引用此controller
export default {
    ref: null, // 业务模块didmount时把业务模块的this赋值给此ref
    onExampleSuccess() {
        if (this.ref) {
            this.ref.onExampleSuccess(); // 并在业务模块定义此方法的响应处理
        }
    }
};