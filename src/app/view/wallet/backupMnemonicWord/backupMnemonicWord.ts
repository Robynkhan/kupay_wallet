/**
 * Mnemonic backup 
 */
import { popNew } from '../../../../pi/ui/root';
import { arrayBufferToBase64, base64ToArrayBuffer } from '../../../../pi/util/base64';
import { Widget } from '../../../../pi/widget/widget';
import { Cipher } from '../../../core/crypto/cipher';
import { GlobalWallet } from '../../../core/globalWallet';
import { DataCenter } from '../../../store/dataCenter';
import { createSecret, restoreSecret, shareSecret } from '../../../utils/secretsBase';
import {
    bytes2Str, decrypt, getCurrentWallet, getLocalStorage, hexstrToU8Array, reductionCipherMnemonic
    , simplifyCipherMnemonic, str2ab, str2Bytes, u8ArrayToHexstr
} from '../../../utils/tools';

export class backupMnemonicWord extends Widget {
    public ok: () => void;
    constructor() {
        super();
    }
    public create() {
        super.create();
        this.init();
    }
    public init() {
        const wallets = getLocalStorage('wallets');
        const wallet = getCurrentWallet(wallets);
        const gwlt = GlobalWallet.fromJSON(wallet.gwlt);
        const walletPsw = decrypt(wallet.walletPsw);
        const mnemonic = gwlt.exportMnemonic(walletPsw).split(' ');
        this.state = {
            mnemonic
        };
    }
    
    public jumpOver() {
    	popNew('app-components-message-messagebox', {
    		itype: 'confirm',
    		title: '提示',
            content: '为了确保您的资产安全，建议不要跳过验证！',
            okButton:"取消",
            cancelButton:"跳过",
            okButtonStyle:"color:rgba(26,112,221,1);"
    	},null,()=>{
            this.ok && this.ok();
        });
    }
    public next() {
    	this.ok && this.ok();
    	popNew('app-view-wallet-backupMnemonicWordConfirm-backupMnemonicWordConfirm');
    }
    public back() {
    	this.ok && this.ok();
    }
    public shareClick() {
    	popNew('app-view-wallet-share-share');
    }
}