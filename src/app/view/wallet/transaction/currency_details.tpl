<div w-class="base">
    <div w-class="header" title="36px" ev-back-click="doClose">
        <app-components-topBar-topBar>{title:{{it.currencyName}}}</app-components-topBar-topBar>

        <div w-class="search" on-tap="doSearch">
            <span>...</span>
        </div>
    </div>

    <div style="height: 250px;background: #FFFFFF;position: relative;">
        <div w-class="balance">{{it1.showBalance}}</div>
        <div w-class="balance-conversion">{{it1.showBalanceConversion}}</div>
    </div>
    <div w-class="body">
        <div w-class="transaction-record">
            <div w-class="record-text">交易记录</div>
            <div w-class="introduction-text" on-tap="showIntroduction">简介</div>
            <div w-class="line"></div>
            {{if it1.list.length<=0}}
            <div w-class="no-record"></div>
            <div w-class="no-record-text">还没有交易记录</div>
            {{end}}
            <div w-class="transaction-list">
                <currency_details_list$>{list:{{it1.list}}}</currency_details_list>
            </div>
        </div>
    </div>
    <div w-class="footer">
        <div w-class="btn transfer" on-tap="doTransfer">
            <img src="../../../res/image/icon_trans_transfer.png" alt="" />
            <span style="margin-left: 20px;">转账</span>
        </div>
        <div w-class="btn receipt" on-tap="doReceipt">
            <img src="../../../res/image/icon_trans_receipt.png" alt="" />
            <span style="margin-left: 20px;">收款</span>
        </div>
    </div>

</div>