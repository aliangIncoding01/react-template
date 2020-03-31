import EndType from '~/enumeration/EndType';
import browser, {inClient} from './browser';

const endType = inClient
    ? browser.mac ? EndType.MAC_CLIENT : EndType.PC_CLIENT
    : EndType.PC_BROWSER;

export default Number(endType);
