<div w-class="base">
    <div w-class="header" title="36px" ev-back-click="doClose">
        <app-components-topBar-topBar>{title:{{it1.title}}}</app-components-topBar-topBar>
        <div w-class="search" style="cursor: pointer;" on-tap="doSearch">
        </div>
    </div>

    <div w-class="body">
        {{for i,each of it1.list}}
        <div w-class="each">
            <div w-class="icon">
                <img src="../../../res/image/{{each.name}}.png" />
            </div>
            <div w-class="name">{{each.name}}</div>
            <div w-class="description">{{each.description}}</div>
            <div w-class="{{each.isChoose?'switch-choose':'switch'}}" on-tap="onSwitchChange(e,{{i}})">
            </div>
        </div>
        {{end}}
    </div>

</div>