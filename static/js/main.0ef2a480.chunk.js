(this["webpackJsonpmoney-logger-app"]=this["webpackJsonpmoney-logger-app"]||[]).push([[0],{47:function(e,t,a){e.exports={page:"App_page__2L-Jj",footer:"App_footer__12-B7"}},48:function(e,t,a){e.exports={tabPanel:"CashPanel_tabPanel__Y91Tq",grid:"CashPanel_grid__1M0h2",card:"CashPanel_card__2ETq-",cardLabel:"CashPanel_cardLabel__3f2v_",lastCard:"CashPanel_lastCard__2tePY"}},53:function(e,t,a){},54:function(e,t,a){},55:function(e,t,a){e.exports={body:"Body_body__2G_GS"}},57:function(e,t,a){e.exports={headerBox:"Menu_headerBox__1Me5e",headerTitle:"Menu_headerTitle__2LUUc",comboButton:"Menu_comboButton__OoKdQ",comboButtonTextBox:"Menu_comboButtonTextBox__1axJS"}},58:function(e){e.exports=JSON.parse('{"a":"0.1.1"}')},66:function(e,t,a){e.exports=a(79)},71:function(e,t,a){},79:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(18),o=a.n(c),l=(a(71),a(121)),i=a(13),s=a(47),u=a.n(s),p=a(95),m=a(125),d=a(102),b=a(56),h=a.n(b),f=a(59),y=a(15),v=function e(){Object(y.a)(this,e)};v.combineStyles=function(){for(var e,t=arguments.length,a=new Array(t),n=0;n<t;n++)a[n]=arguments[n];if(a.length){e=Object(f.a)({},a[0]);var r=a.slice(1);r.length&&r.forEach((function(t){Object.keys(t).forEach((function(a){e[a]?e[a]+=" ".concat(t[a]):e[a]=t[a]}))}))}return e};var g,E,x,O,j,_,I=v,S=a(52),C=a(96),w=a(97),k=a(39),M=function(){return Object(n.useContext)(i.a).store},N=function(e){var t=e.children,a=e.id,n=e.labelledby,c=e.value,o=e.index,l=e.other;return r.a.createElement("div",Object.assign({role:"tabpanel",hidden:c!==o,id:"".concat(a,"-").concat(o),"aria-labelledby":"".concat(n,"-").concat(o)},l),c===o&&t)},B=a(48),T=a.n(B),P=Object(p.a)((function(e){return Object(m.a)({tabPanel:{gridGap:e.spacing(2)},cardLabelText:{marginTop:e.spacing(1),color:e.palette.text.primary}})})),z=Object(i.c)((function(){var e=M(),t=e.appStore,a=e.typesStore,n=P(),c=I.combineStyles(n,T.a),o=Object(S.a)(),l=function(e){if(!e||!e.length)return"";if("#"===e[0])return e;var t=o;return e.split(".").forEach((function(e){t=t[e]})),t};return r.a.createElement(N,{id:"menu-cash-tab-panel",labelledby:"menu-cash-tab-panel",value:t.selectedMenuIndex,index:0},r.a.createElement(C.a,{container:!0,className:c.grid,spacing:2},a.types.map((function(e){return r.a.createElement(C.a,{key:e.name,item:!0,xs:!0,container:!0,alignItems:"center",justify:"center"},r.a.createElement(w.a,{className:c.card,classes:{label:c.cardLabel}},r.a.createElement(e.IconComponent,{style:{color:l(e.iconColor),fontSize:"2rem"},className:c.cardIcon}),r.a.createElement(k.a,{variant:"subtitle1",className:c.cardLabelText},e.label)))}))))})),D=a(53),J=a.n(D),L=Object(p.a)((function(e){return Object(m.a)({})})),A=Object(i.c)((function(){var e=M().appStore,t=L(),a=I.combineStyles(t,J.a);return r.a.createElement(N,{id:"menu-last-records-tab-panel",labelledby:"menu-last-records-tab-panel",value:e.selectedMenuIndex,index:1,other:{className:a.tabPanel}},r.a.createElement("div",null,"Not realized yet"))})),G=a(98),K=a(126),V=a(99),W=a(100),q=a(101),F=a(54),U=a.n(F),Y=Object(p.a)((function(e){return Object(m.a)({})})),Q=Object(i.c)((function(){var e=M(),t=e.appStore,a=e.typesStore,n=Y(),c=I.combineStyles(n,U.a),o=Object(S.a)(),l=function(e){if(!e||!e.length)return"";if("#"===e[0])return e;var t=o;return e.split(".").forEach((function(e){t=t[e]})),t};return r.a.createElement(N,{id:"menu-types-tab-panel",labelledby:"menu-types-tab-panel",value:t.selectedMenuIndex,index:2,other:{className:c.tabPanel}},r.a.createElement(G.a,{component:"nav",className:c.list},a.types.map((function(e){return r.a.createElement("div",{key:e.name},r.a.createElement(K.a,{button:!0},r.a.createElement(V.a,null,r.a.createElement(e.IconComponent,{style:{color:l(e.iconColor),fontSize:"2rem"}})),r.a.createElement(W.a,{primary:e.label,primaryTypographyProps:{variant:"subtitle1"}})),r.a.createElement(q.a,{component:"div"}))}))))})),$=a(55),H=a.n($),R=Object(p.a)((function(e){return Object(m.a)({body:{padding:e.spacing(2)},fab:{position:"fixed",bottom:e.spacing(2),right:e.spacing(2)}})})),X=Object(i.c)((function(){var e=R(),t=I.combineStyles(e,H.a);return r.a.createElement("div",{className:t.body},r.a.createElement(z,null),r.a.createElement(A,null),r.a.createElement(Q,null),r.a.createElement(d.a,{size:"medium",color:"primary","aria-label":"add",className:t.fab},r.a.createElement(h.a,null)))})),Z=a(127),ee=a(103),te=a(122),ae=a(105),ne=a(123),re=a(108),ce=a(104),oe=a(106),le=a(107),ie=a(109),se=a(110),ue=a(111),pe=a(112),me=a(57),de=a.n(me),be=Object(p.a)((function(e){return Object(m.a)({firstBar:{background:e.palette.primary.light},secondBar:{background:e.palette.primary.dark},menuIcon:{color:e.palette.background.default},comboButton:{color:e.palette.background.default},searchIcon:{color:e.palette.background.default}})})),he=Object(i.c)((function(){var e=M().appStore,t=be(),a=I.combineStyles(t,de.a),n=function(e){return{id:"menu-tab-".concat(e),"aria-controls":"menu-tab-".concat(e)}};return r.a.createElement(r.a.Fragment,null,r.a.createElement(Z.a,{position:"static",className:a.firstBar},r.a.createElement(ee.a,null,0===e.selectedMenuIndex&&r.a.createElement(k.a,{variant:"h6",className:a.headerTitle},"\u0412\u043d\u0435\u0441\u0442\u0438 \u043e\u043f\u043b\u0430\u0442\u0443"),1===e.selectedMenuIndex&&r.a.createElement(te.a,{className:a.headerBox},r.a.createElement(w.a,null,r.a.createElement(ce.a,{className:a.menuIcon})),r.a.createElement(ae.a,{className:a.comboButton,endIcon:r.a.createElement(oe.a,null)},r.a.createElement("span",{className:a.comboButtonTextBox},r.a.createElement("span",null,(new Date).toDateString()),r.a.createElement("span",null,"\u0417\u0430\u043f\u0438\u0441\u0435\u0439 21"))),r.a.createElement(w.a,null,r.a.createElement(le.a,{className:a.searchIcon}))),2===e.selectedMenuIndex&&r.a.createElement(k.a,{variant:"h6",className:a.headerTitle},"\u0422\u0438\u043f\u044b"),3===e.selectedMenuIndex&&r.a.createElement(k.a,{variant:"h6",className:a.headerTitle},"\u0415\u0449\u0435"))),r.a.createElement(Z.a,{position:"static",color:"primary",className:a.secondBar},r.a.createElement(ne.a,{value:e.selectedMenuIndex,onChange:function(t,a){e.setSelectedMenuIndex(a)},"aria-label":"menu tabs",variant:"fullWidth"},r.a.createElement(re.a,Object.assign({},n("cash"),{icon:r.a.createElement(ie.a,null)})),r.a.createElement(re.a,Object.assign({},n("last-records"),{icon:r.a.createElement(se.a,null)})),r.a.createElement(re.a,Object.assign({},n("types"),{icon:r.a.createElement(ue.a,null)})),r.a.createElement(re.a,Object.assign({},n("menu"),{icon:r.a.createElement(pe.a,null)})))))})),fe=a(17),ye=a.n(fe),ve=a(23),ge=a(38),Ee=function(){function e(t){var a=this;Object(y.a)(this,e),this.appStore=void 0,this.appStore=t,this.get("appVersion",new Date).then((function(e){t.version!==e&&(a.clear(),a.add("appVersion",t.version))}))}return Object(ge.a)(e,[{key:"add",value:function(){var e=Object(ve.a)(ye.a.mark((function e(t,a){var n,r;return ye.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="string"!==typeof a?JSON.stringify({date:new Date,entry:a}):a,e.next=3,localStorage.setItem(t,n);case 3:return r=e.sent,e.abrupt("return",r);case 5:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"get",value:function(){var e=Object(ve.a)(ye.a.mark((function e(t,a){var n,r;return ye.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=null,this.appStore.enableCache){e.next=3;break}return e.abrupt("return",n);case 3:return e.next=5,localStorage.getItem(t);case 5:if((n=e.sent)&&console.log("Key: ".concat(t," loaded from cache")),n&&n.length){e.next=9;break}return e.abrupt("return",n);case 9:if(e.prev=9,r=JSON.parse(n),!a){e.next=16;break}if(!(new Date(r.date)<a)){e.next=14;break}return e.abrupt("return",r.entry);case 14:return console.log("Key: ".concat(t," date expired. ValidAt: ").concat(a,". ExpiredAt: ").concat(r.date)),e.abrupt("return",null);case 16:return e.abrupt("return",r.entry);case 19:return e.prev=19,e.t0=e.catch(9),e.abrupt("return",n);case 22:case"end":return e.stop()}}),e,this,[[9,19]])})));return function(t,a){return e.apply(this,arguments)}}()},{key:"clear",value:function(){var e=Object(ve.a)(ye.a.mark((function e(){return ye.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,localStorage.clear();case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()}]),e}(),xe=a(24),Oe=a(25),je=(a(46),a(5)),_e=a(58),Ie=(g=function(){function e(){var t=this;Object(y.a)(this,e),this.version=_e.a,this._services=void 0,Object(xe.a)(this,"enableCache",E,this),Object(xe.a)(this,"selectedMenuIndex",x,this),Object(xe.a)(this,"setSelectedMenuIndex",O,this),this._loadSelectedMenuIndex=Object(ve.a)(ye.a.mark((function e(){var a;return ye.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.services||!t.services.cache){e.next=5;break}return e.next=3,t.services.cache.get("selectedMenuIndex");case 3:(a=e.sent)&&(t.selectedMenuIndex=a);case 5:case"end":return e.stop()}}),e)})))}return Object(ge.a)(e,[{key:"services",get:function(){return this._services},set:function(e){this._services=e,this._loadSelectedMenuIndex()}}]),e}(),E=Object(Oe.a)(g.prototype,"enableCache",[je.m],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!0}}),x=Object(Oe.a)(g.prototype,"selectedMenuIndex",[je.m],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),O=Object(Oe.a)(g.prototype,"setSelectedMenuIndex",[je.f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return function(t){e.selectedMenuIndex=t,e.services.cache.add("selectedMenuIndex",e.selectedMenuIndex)}}}),g),Se=function e(t){Object(y.a)(this,e),this.cache=void 0,this.cache=t},Ce=a(113),we=a(114),ke=a(115),Me=a(116),Ne=a(117),Be=a(118),Te=a(119),Pe=a(120),ze=(j=function e(){var t=this;Object(y.a)(this,e),Object(xe.a)(this,"types",_,this),this.initializeDefaultTypes=function(){t.types=[],t.types.push({IconComponent:Ce.a,name:"menuFood",iconColor:"palette.secondary.dark",label:"\u0415\u0434\u0430"}),t.types.push({IconComponent:we.a,name:"menuStore",iconColor:"palette.success.dark",label:"\u041c\u0430\u0433\u0430\u0437\u0438\u043d"}),t.types.push({IconComponent:ke.a,name:"menuBus",iconColor:"palette.warning.dark",label:"\u0410\u0432\u0442\u043e\u0431\u0443\u0441"}),t.types.push({IconComponent:Me.a,name:"menuClothes",iconColor:"palette.primary.dark",label:"\u0412\u0435\u0449\u0438"}),t.types.push({IconComponent:Ne.a,name:"menuGasStation",iconColor:"palette.primary.light",label:"\u0417\u0430\u043f\u0440\u0430\u0432\u043a\u0430"}),t.types.push({IconComponent:Be.a,name:"menuChilds",iconColor:"palette.warning.light",label:"\u0414\u0435\u0442\u0438"}),t.types.push({IconComponent:Te.a,name:"menuServices",iconColor:"palette.secondary.light",label:"\u0423\u0441\u043b\u0443\u0433\u0438"}),t.types.push({IconComponent:Pe.a,name:"menuOther",iconColor:"palette.success.light",label:"\u0414\u0440\u0443\u0433\u043e\u0435"})},this.initializeDefaultTypes()},_=Object(Oe.a)(j.prototype,"types",[je.m],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),j),De=new Ie,Je=new Se(new Ee(De));De.services=Je;var Le={appStore:De,typesStore:new ze},Ae=function(){return r.a.createElement(i.b,{store:Le},r.a.createElement(l.a,null),r.a.createElement("div",{className:u.a.page},r.a.createElement(he,null),r.a.createElement(X,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(Ae,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[66,1,2]]]);
//# sourceMappingURL=main.0ef2a480.chunk.js.map