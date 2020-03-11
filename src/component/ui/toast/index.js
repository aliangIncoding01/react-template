import createModal from './createModal';

import './style';

let timer = null;

const show = createModal('toast', 'toast');

const hide = () => {
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }
    show.hide();
};

const toast = (content, duration = 3000) => {
    show(content);
    if (duration !== 0) {
        timer = setTimeout(() => {
            hide();
        }, duration);
    }
};

toast.hide = hide;

export default toast;
