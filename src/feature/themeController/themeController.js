import query from '~/data/query';

export default {
    // 在项目入口处调用此方法，引用主题文件
    loadCSS() {
        const $1 = null; // 从定义主题的地方取值，判断需要引用那个theme的样式文件
        const $2 = null;
        import(`~/css/theme/${$1}/${$2}/style`);
    }
};