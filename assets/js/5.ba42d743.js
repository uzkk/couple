(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{65:function(t,e,o){},80:function(t,e){const o=[[[1,"Vick"],[2,"老猫"],[3,"老咸鱼"],[4,"栖瓜"],[5,"妖梦"],[6,"电玩⑨"],[7,"薛定谔"],[8,"绯桐"],[9,"量子希"],[10,"平A"],[11,"快乐水"],[12,"哈桑"],[13,"红姨"],[15,"针妙丸"],[16,"子祈"],[17,"秦喵"],[18,"酒心"],[19,"荭茶"],[20,"孤梦"],[21,"Echo"],[22,"Rachael"],[23,"起司"],[24,"Butterfly"],[25,"二向箔"],[26,"GIGOGIDE"],[27,"K"],[28,"仁忆"],[29,"葡萄干"],[30,"IkuA"],[31,"fransing"],[32,"幻想乡的眼睛"],[33,"UMP45"],[34,"hk416"],[35,"蓝光"],[36,"龙翼雨"]]];t.exports=o.length<=1?o[0]:o},81:function(t,e){const o=[[[1,2],[2,3,"猫鱼组，管理组"],[3,4,"瓜鱼组"],[2,5,"妖梦组"],[1,6],[7,8],[9,10,"平希组"],[12,13],[15,16],[17,18,"秦心组"],[19,20,"梦茶组"],[2,19],[21,22],[5,23],[1,19],[6,24,"妖精组"],[11,25,"快乐水组"],[19,26,"SM 组"],[1,26,"SM 组"],[19,27],[19,28],[7,29],[13,27],[30,31,"无所畏惧组"],[13,25,"发图组，大佬组"],[33,34],[9,32],[35,17,"面具组"],[5,19],[3,28,"仁鱼组"],[29,3],[2,15],[9,19],[36,19,"雨荭组"],[36,20],[36,9]]];t.exports=o.length<=1?o[0]:o},82:function(t,e,o){"use strict";var n=o(65);o.n(n).a},87:function(t,e,o){"use strict";o.r(e);var n=o(84),s=o(80),i=o.n(s),a=o(81),r=o.n(a);const c={},u=i.a.map(([t,e])=>c[t]={id:t,name:e,x:0,y:0,active:!1,focused:!1}),d=r.a.map(([t,e,o])=>({name:o,source:c[t],target:c[e]}));function l(t){return t.type.startsWith("touch")?[...t.targetTouches,...t.changedTouches][0]:t}var h={mixins:[{data:()=>({nodes:u,links:d,size:320,draggedNode:null}),computed:{viewBox(){return`-${this.size/2}, -${this.size/2}, ${this.size}, ${this.size}`}},created(){this.DRAGGABLE_RADIUS=this.size/2-10,this.forceLink=n.a(this.links).id(t=>t.id).distance(35),this.forceManyBody=n.b().strength(-40),this.forceX=n.d().strength(.07),this.forceY=n.e().strength(.07),this.simulation=n.c(this.nodes).force("link",this.forceLink).force("charge",this.forceManyBody).force("x",this.forceX).force("y",this.forceY).stop()},mounted(){this.simulation.restart(),addEventListener("mousemove",this.onDragMove),addEventListener("touchmove",this.onDragMove),addEventListener("mouseup",this.onDragEnd),addEventListener("touchend",this.onDragEnd)},destroyed(){removeEventListener("mousemove",this.onDragMove),removeEventListener("touchmove",this.onDragMove),removeEventListener("mouseup",this.onDragEnd),removeEventListener("touchend",this.onDragEnd)},methods:{onDragStart(t,e){this.draggedNode=t,t.active=!0,t.timeStamp=e.timeStamp},onDragMove(t){const e=this.draggedNode;if(e)if(e.timeStamp){if(t.timeStamp-e.timeStamp>200){e.timeStamp=null,this.simulation.alphaTarget(.3).restart();const o=l(t);e.fx=e.x,e.fy=e.y,e.lastX=e.x-o.clientX,e.lastY=e.y-o.clientY}}else{const o=l(t);e.fx=o.clientX+e.lastX,e.fy=o.clientY+e.lastY;const n=e.fx**2+e.fy**2;if(n>this.DRAGGABLE_RADIUS**2){const t=this.DRAGGABLE_RADIUS/Math.sqrt(n);e.fx*=t,e.fy*=t}}},onDragEnd(t){const e=this.draggedNode;e&&(e.timeStamp?(this.setFocusedNodes(e),this.setTooltip(e.name,t)):(this.simulation.alphaTarget(0),this.draggedNode.fx=null,this.draggedNode.fy=null),e.active=!1,this.draggedNode=null)},onClick(){this.setFocusedNodes(),this.$uzkk.coupleTooltip.inactivate(0,!0)},setFocusedNodes(...t){this.nodes.forEach(e=>{e.focused=!!t.find(({id:t})=>t===e.id)})},onMouseEnterNode(t,e){t.active=!0,this.setTooltip(t.name,e)},onMouseEnterLink(t,e){t.source.active=!0,t.target.active=!0;let o=`${t.source.name} & ${t.target.name}`;t.name&&(o=`${t.name}<br/>${o}`),this.setTooltip(o,e)},setTooltip(t,e){const o=this.$uzkk.coupleTooltip;o&&t&&(o.title=t,o.activate(l(e)))},onMouseLeaveNode(t){t.active=!1,this.$uzkk.coupleTooltip.inactivate(300)},onMouseLeaveLink(t){t.source.active=!1,t.target.active=!1,this.$uzkk.coupleTooltip.inactivate(300)}}}]},v=(o(82),o(1)),f=Object(v.a)(h,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("svg",{ref:"svg",attrs:{id:"couple",width:t.size,height:t.size,viewBox:t.viewBox},on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.onClick(e)}}},[o("g",{staticClass:"links"},t._l(t.links,function(e,n){return o("line",{key:n,attrs:{x1:e.source.x,y1:e.source.y,x2:e.target.x,y2:e.target.y},on:{mouseenter:function(o){return o.stopPropagation(),o.preventDefault(),t.onMouseEnterLink(e,o)},mouseleave:function(o){return o.stopPropagation(),o.preventDefault(),t.onMouseLeaveLink(e,o)}}})}),0),t._v(" "),o("g",{staticClass:"nodes"},t._l(t.nodes,function(e,n){return o("circle",{key:n,class:{active:e.active||e.focused},attrs:{cx:e.x,cy:e.y},on:{mouseenter:function(o){return o.stopPropagation(),o.preventDefault(),t.onMouseEnterNode(e,o)},mouseleave:function(o){return o.stopPropagation(),o.preventDefault(),t.onMouseLeaveNode(e,o)},mousedown:function(o){return o.stopPropagation(),o.preventDefault(),t.onDragStart(e,o)},touchstart:function(o){return o.stopPropagation(),o.preventDefault(),t.onDragStart(e,o)}}})}),0)])])},[],!1,null,null,null);e.default=f.exports}}]);