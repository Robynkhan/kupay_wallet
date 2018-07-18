/**
 * mnemonic backup confirm page
 */
import { popNew } from '../../../../pi/ui/root';
import { Widget } from '../../../../pi/widget/widget';
import { GlobalWallet } from '../../../core/globalWallet';
import { decrypt, getCurrentWallet, getLocalStorage,setLocalStorage,shuffle } from '../../../utils/tools';

export class backupMnemonicWordConfirm extends Widget {
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
        const shuffledMnemonic = this.initMnemonic(mnemonic);
        this.state = {
            mnemonic,
            confirmedMnemonic: [],
            shuffledMnemonic
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
    public back() {
    	this.ok && this.ok();
    }

    // 对助记词乱序和标识处理
    public initMnemonic(arr: any[]) {
        return this.initActive(shuffle(arr));
    }

    // 初始化每个助记词标识是否被点击
    public initActive(arr: any[]): any[] {
        const res = [];
        const len = arr.length;
        for (let i = 0; i < len; i++) {
            const obj = {
                word: '',
                isActive: false
            };
            obj.word = arr[i];
            res.push(obj);
        }

        return res;
    }

    public nextStepClick() {
        if (!this.compareMnemonicEqualed()) {
            popNew('app-components-message-messagebox', { itype: 'alert', title: '请检查助记词', content: '' });
        } else {
            popNew('app-components-message-messagebox',
             { itype: 'confirm', title: '是否移除助记词？', content: '确认抄写助记词，此操作不可撤销' }, 
             () => {
                 this.deleteMnemonic();
                 this.ok && this.ok();
             }, () => {
                 this.ok && this.ok();
             });
        }
    }

    public deleteMnemonic() {
        const wallets = getLocalStorage('wallets');
        const wallet = getCurrentWallet(wallets);
        const psw = decrypt(wallet.walletPsw);
        const gwlt = GlobalWallet.fromJSON(wallet.gwlt);
        // 删除主线助记词
        gwlt.deleteMnemonic(psw);
        wallet.gwlt = gwlt.toJSON();
        setLocalStorage('wallets', wallets,true);
    }

    public shuffledMnemonicItemClick(e:Event, v:number) {
        const mnemonic = this.state.shuffledMnemonic[v];
        if (mnemonic.isActive) return;
        mnemonic.isActive = true;
        this.state.confirmedMnemonic.push(mnemonic);
        this.paint();
    }

    public confirmedMnemonicItemClick(e:Event, v:number) {
        const arr = this.state.confirmedMnemonic.splice(v, 1);
        arr[0].isActive = false;
        this.paint();
    }

    public compareMnemonicEqualed(): boolean {
        let isEqualed = true;
        const len = this.state.mnemonic.length;
        if (this.state.confirmedMnemonic.length !== len) return false;
        for (let i = 0; i < len; i++) {
            if (this.state.confirmedMnemonic[i].word !== this.state.mnemonic[i]) {
                isEqualed = false;
                break;
            }
        }
        
        return isEqualed;
    }
}