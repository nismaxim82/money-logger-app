(this["webpackJsonpmoney-logger-app"]=this["webpackJsonpmoney-logger-app"]||[]).push([[0],{151:function(e,a,t){e.exports={page:"App_page__2L-Jj",footer:"App_footer__12-B7"}},152:function(e,a,t){e.exports={grid:"CashPanel_grid__1M0h2",card:"CashPanel_card__2ETq-",cardLabel:"CashPanel_cardLabel__3f2v_",lastCard:"CashPanel_lastCard__2tePY"}},156:function(e,a,t){},158:function(e,a,t){e.exports={modalContainer:"TypeEditPanel_modalContainer__o8c64",emptyBox:"TypeEditPanel_emptyBox__2akL7",body:"TypeEditPanel_body__2pBnt",colorDialogHeader:"TypeEditPanel_colorDialogHeader__2qD8B",iconDialogHeader:"TypeEditPanel_iconDialogHeader__2Q3n4",colorDialogFooter:"TypeEditPanel_colorDialogFooter__2ZN7j",iconDialogFooter:"TypeEditPanel_iconDialogFooter__3L6_X"}},160:function(e,a,t){e.exports={body:"Body_body__2G_GS"}},162:function(e,a,t){e.exports={headerBox:"Menu_headerBox__1Me5e",headerTitle:"Menu_headerTitle__2LUUc",comboButton:"Menu_comboButton__OoKdQ",comboButtonTextBox:"Menu_comboButtonTextBox__1axJS"}},164:function(e){e.exports=JSON.parse('{"a":"0.1.2"}')},177:function(e,a,t){e.exports=t(354)},182:function(e,a,t){},354:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),c=t(12),o=t.n(c),l=(t(182),t(423)),i=t(16),s=t(40),u=t(151),m=t.n(u),d=t(386),p=t(427),b=t(407),f=t(161),h=t.n(f),g=t(27),y=t(388),E=t(390),x=t(88),v=function(){return Object(n.useContext)(i.a).store},O=t(165),j=t(34),I=function e(){Object(j.a)(this,e)};I.combineStyles=function(){for(var e,a=arguments.length,t=new Array(a),n=0;n<a;n++)t[n]=arguments[n];if(t.length){e=Object(O.a)({},t[0]);var r=t.slice(1);r.length&&r.forEach((function(a){Object.keys(a).forEach((function(t){e[t]?e[t]+=" ".concat(a[t]):e[t]=a[t]}))}))}return e};var _,k=I,C=t(152),M=t.n(C),S=Object(d.a)((function(e){return Object(p.a)({tabPanel:{gridGap:e.spacing(2)},cardLabelText:{marginTop:e.spacing(1),color:e.palette.text.primary}})})),N=Object(i.c)((function(){var e=v().typesStore,a=S(),t=k.combineStyles(a,M.a),n=Object(g.a)(),c=function(e){if(!e||!e.length)return"";if("#"===e[0])return e;var a=n;return e.split(".").forEach((function(e){a=a[e]})),a};return r.a.createElement(y.a,{container:!0,className:t.grid,spacing:2},e.types.map((function(e){return r.a.createElement(y.a,{key:e.name,item:!0,xs:!0,container:!0,alignItems:"center",justify:"center"},r.a.createElement(E.a,{className:t.card,classes:{label:t.cardLabel}},r.a.createElement(e.IconComponent,{style:{color:c(e.iconColor),fontSize:"2rem"},className:t.cardIcon}),r.a.createElement(x.a,{variant:"subtitle1",className:t.cardLabelText},e.label)))})))})),B=Object(i.c)((function(){return r.a.createElement("div",null,"Not realized yet")})),w=t(391),D=t(356),T=t(392),z=t(393),P=t(394),U=t(156),H=t.n(U),L=Object(i.c)((function(){var e=v().typesStore,a=k.combineStyles({},H.a),t=Object(g.a)(),n=function(e){if(!e||!e.length)return"";if("#"===e[0])return e;var a=t;return e.split(".").forEach((function(e){a=a[e]})),a};return r.a.createElement(w.a,{component:"nav",className:a.list},e.types.map((function(e){return r.a.createElement("div",{key:e.name},r.a.createElement(D.a,{button:!0},r.a.createElement(T.a,null,r.a.createElement(e.IconComponent,{style:{color:n(e.iconColor),fontSize:"2rem"}})),r.a.createElement(z.a,{primary:e.label,primaryTypographyProps:{variant:"subtitle1"}})),r.a.createElement(P.a,{component:"div"}))})))})),F=Object(i.c)((function(){return r.a.createElement(r.a.Fragment,null)}));!function(e){e.Cash="cash",e.Records="records",e.Types="types",e.Menu="menu"}(_||(_={}));var A,R,G,J,W,q,K,V,Q=t(53),X=t(357),Y=t(395),Z=t(425),$=t(396),ee=t(397),ae=t(424),te=t(400),ne=t(401),re=t(402),ce=t(403),oe=t(358),le=t(404),ie=t(406),se=t(398),ue=t(399),me=t(405),de=t(157),pe=t(158),be=t.n(pe),fe=Object(d.a)((function(e){return Object(p.a)({modalContainer:{zIndex:e.zIndex.modal,background:e.palette.background.paper},firstBar:{background:e.palette.primary.light},secondBar:{background:e.palette.primary.dark},closeIcon:{color:e.palette.background.default},doneIcon:{color:e.palette.background.default},body:{padding:e.spacing(2),gridGap:e.spacing(2)},backdrop:{zIndex:e.zIndex.modal},colorDialogBox:{zIndex:e.zIndex.modal},colorDialogHeader:{minHeight:e.mixins.toolbar.minHeight,background:e.palette.primary.light,paddingLeft:e.spacing(2),paddingRight:e.spacing(2),color:e.palette.background.default},colorDialogBody:{padding:e.spacing(2)},colorDialogFooter:{padding:e.spacing(2),gridGap:e.spacing(2)},iconDialogBox:{zIndex:e.zIndex.modal},iconDialogHeader:{minHeight:e.mixins.toolbar.minHeight,background:e.palette.primary.light,paddingLeft:e.spacing(2),paddingRight:e.spacing(2),color:e.palette.background.default},iconDialogBody:{padding:e.spacing(2)},iconDialogFooter:{padding:e.spacing(2),gridGap:e.spacing(2)}})})),he=Object(i.c)((function(){var e=fe(),a=k.combineStyles(e,be.a),t=Object(g.a)(),n=r.a.useRef(null),c=r.a.useState(!1),o=Object(Q.a)(c,2),l=o[0],i=o[1],s=function(){i(!1)},u=r.a.useState(t.palette.primary.main),m=Object(Q.a)(u,2),d=m[0],p=m[1],b=r.a.useState(t.palette.primary.main),f=Object(Q.a)(b,2),h=f[0],y=f[1],v=r.a.useRef(null),O=r.a.useState(!1),j=Object(Q.a)(O,2),I=j[0],_=j[1],C=function(){_(!1)},M=r.a.useState(""),S=Object(Q.a)(M,2),N=(S[0],S[1]),B=r.a.useState(""),w=Object(Q.a)(B,2),D=(w[0],w[1]);return r.a.createElement(X.a,{in:!0,timeout:1e3},r.a.createElement(Y.a,{direction:"up",in:!0,mountOnEnter:!0,unmountOnExit:!0,timeout:300},r.a.createElement("div",{className:a.modalContainer},r.a.createElement(Z.a,{className:a.overlay,style:{display:l?"block":"none"}}),r.a.createElement($.a,{position:"static",className:a.firstBar},r.a.createElement(ee.a,null,r.a.createElement(x.a,{variant:"h6"},"\u041d\u043e\u0432\u044b\u0439 \u0442\u0438\u043f"))),r.a.createElement($.a,{position:"static",color:"primary",className:a.secondBar},r.a.createElement(ee.a,null,r.a.createElement(Z.a,{className:a.emptyBox}),r.a.createElement(E.a,null,r.a.createElement(se.a,{className:a.closeIcon})),r.a.createElement(E.a,null,r.a.createElement(ue.a,{className:a.doneIcon})))),r.a.createElement("div",{className:a.body},r.a.createElement(ae.a,{error:!0,fullWidth:!0,label:"Name",helperText:"Type name is required"}),r.a.createElement(ae.a,{fullWidth:!0,label:"Position",helperText:"If empty then it will be placed to the end of list"}),r.a.createElement(ae.a,{ref:n,select:!0,disabled:!0,fullWidth:!0,label:"Color",InputLabelProps:{style:{color:h}},SelectProps:{style:{color:h}},value:0,onClick:function(){i(!0)}},r.a.createElement(te.a,{value:0},h)),r.a.createElement(ne.a,{open:l,className:a.backdrop},r.a.createElement(re.a,{open:l,anchorEl:n.current,role:void 0,transition:!0,disablePortal:!0,className:a.colorDialogBox},r.a.createElement(ce.a,{onClickAway:s},r.a.createElement(oe.a,null,r.a.createElement("div",{className:a.colorDialogHeader},r.a.createElement(x.a,{variant:"h6"},"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0446\u0432\u0435\u0442")),r.a.createElement("div",{className:a.colorDialogBody},r.a.createElement(de.ChromePicker,{color:d,onChange:function(e){p(e.hex)}})),r.a.createElement("div",{className:a.colorDialogFooter},r.a.createElement(le.a,{color:"primary",variant:"contained",onClick:function(){y(d),s()}},"\u0412\u044b\u0431\u0440\u0430\u0442\u044c"),r.a.createElement(le.a,{variant:"contained",onClick:function(){p(h),s()}},"\u041e\u0442\u043c\u0435\u043d\u0430")))))),r.a.createElement(ae.a,{ref:v,select:!0,disabled:!0,fullWidth:!0,label:"Icon",value:0,onClick:function(){_(!0)}},r.a.createElement(te.a,{value:0},r.a.createElement(me.a,null))),r.a.createElement(ne.a,{open:I,className:a.backdrop},r.a.createElement(re.a,{open:I,anchorEl:v.current,role:void 0,transition:!0,disablePortal:!0,className:a.iconDialogBox},r.a.createElement(ce.a,{onClickAway:C},r.a.createElement(oe.a,null,r.a.createElement("div",{className:a.iconDialogHeader},r.a.createElement(x.a,{variant:"h6"},"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u043a\u043e\u043d\u043a\u0443")),r.a.createElement("div",{className:a.iconDialogBody},r.a.createElement(ie.a,null,"assignment_turned_in")),r.a.createElement("div",{className:a.iconDialogFooter},r.a.createElement(le.a,{color:"primary",variant:"contained",onClick:function(){D(d),C()}},"\u0412\u044b\u0431\u0440\u0430\u0442\u044c"),r.a.createElement(le.a,{variant:"contained",onClick:function(){N(h),C()}},"\u041e\u0442\u043c\u0435\u043d\u0430"))))))))))})),ge=[{path:"/",exact:!0,components:N},{path:"/".concat(_.Cash),exact:!0,components:N},{path:"/".concat(_.Records),exact:!0,components:B},{path:"/".concat(_.Types),exact:!0,components:L},{path:"/".concat(_.Types,"/add"),exact:!0,components:he},{path:"/".concat(_.Menu),exact:!0,components:F}],ye=t(15),Ee=function(e){return r.a.createElement(ye.a,{exact:e.exact,path:e.path,render:function(a){return Array.isArray(e.components)?e.components.map((function(t,n){return r.a.createElement(t,Object.assign({key:n},a,{routes:e.routes}))})):r.a.createElement(e.components,Object.assign({},a,{routes:e.routes}))}})},xe=t(160),ve=t.n(xe),Oe=Object(d.a)((function(e){return Object(p.a)({body:{padding:e.spacing(2)},fab:{position:"fixed",bottom:e.spacing(2),right:e.spacing(2)}})})),je=Object(i.c)((function(){var e=v().appStore,a=Oe(),t=k.combineStyles(a,ve.a);return r.a.createElement("div",{className:t.body},ge.map((function(e,a){return r.a.createElement(Ee,Object.assign({key:a},e))})),e.selectedMenuUrl!=="/".concat(_.Menu)&&r.a.createElement(s.b,{to:function(){var a=e.selectedMenuUrl;return"/"===a&&(a+=_.Cash),"".concat(e.selectedMenuUrl,"/add")}()},r.a.createElement(b.a,{size:"medium",color:"primary","aria-label":"add",className:t.fab},r.a.createElement(h.a,null))))})),Ie=t(426),_e=t(409),ke=t(410),Ce=t(411),Me=t(412),Se=t(413),Ne=t(414),Be=t(408),we=Object(i.c)((function(e){return r.a.createElement(Be.a,{component:s.b,to:e.to,label:e.label,icon:e.icon,onClick:function(a){e.currentUrl===a.currentTarget.pathname&&a.preventDefault()}})})),De=t(162),Te=t.n(De),ze=Object(d.a)((function(e){return Object(p.a)({firstBar:{background:e.palette.primary.light},secondBar:{background:e.palette.primary.dark},menuIcon:{color:e.palette.background.default},comboButton:{color:e.palette.background.default},searchIcon:{color:e.palette.background.default}})})),Pe=Object(i.c)((function(){var e=v().appStore,a=ze(),t=k.combineStyles(a,Te.a),c=Object(ye.e)();Object(n.useEffect)((function(){e.loadSelectedMenuIndex(c.location.pathname);var a=c.listen((function(){e.loadSelectedMenuIndex(c.location.pathname)}));return function(){a()}}));var o=function(a,t){return{id:"menu-tab-".concat(a),"aria-controls":"menu-tab-".concat(a),to:t||"/".concat(a),currentUrl:e.selectedMenuUrl}};return r.a.createElement(r.a.Fragment,null,r.a.createElement($.a,{position:"static",className:t.firstBar},r.a.createElement(ee.a,null,0===e.selectedMenuIndex&&r.a.createElement(x.a,{variant:"h6",className:t.headerTitle},"\u0412\u043d\u0435\u0441\u0442\u0438 \u043e\u043f\u043b\u0430\u0442\u0443"),1===e.selectedMenuIndex&&r.a.createElement(Z.a,{className:t.headerBox},r.a.createElement(E.a,null,r.a.createElement(me.a,{className:t.menuIcon})),r.a.createElement(le.a,{className:t.comboButton,endIcon:r.a.createElement(_e.a,null)},r.a.createElement("span",{className:t.comboButtonTextBox},r.a.createElement("span",null,(new Date).toDateString()),r.a.createElement("span",null,"\u0417\u0430\u043f\u0438\u0441\u0435\u0439 21"))),r.a.createElement(E.a,null,r.a.createElement(ke.a,{className:t.searchIcon}))),2===e.selectedMenuIndex&&r.a.createElement(x.a,{variant:"h6",className:t.headerTitle},"\u0422\u0438\u043f\u044b"),3===e.selectedMenuIndex&&r.a.createElement(x.a,{variant:"h6",className:t.headerTitle},"\u0415\u0449\u0435"))),r.a.createElement($.a,{position:"static",color:"primary",className:t.secondBar},r.a.createElement(Ie.a,{value:e.selectedMenuIndex,onChange:function(a,t){e.setSelectedMenuIndex(t)},"aria-label":"menu tabs",variant:"fullWidth"},r.a.createElement(we,Object.assign({},o("cash","/"),{icon:r.a.createElement(Ce.a,null)})),r.a.createElement(we,Object.assign({},o("records"),{icon:r.a.createElement(Me.a,null)})),r.a.createElement(we,Object.assign({},o("types"),{icon:r.a.createElement(Se.a,null)})),r.a.createElement(we,Object.assign({},o("menu"),{icon:r.a.createElement(Ne.a,null)})))))})),Ue=t(52),He=t.n(Ue),Le=t(87),Fe=t(163),Ae=function(){function e(a){var t=this;Object(j.a)(this,e),this.appStore=void 0,this.appStore=a,this.get("appVersion",new Date).then((function(e){a.version!==e&&(t.clear(),t.add("appVersion",a.version))}))}return Object(Fe.a)(e,[{key:"add",value:function(){var e=Object(Le.a)(He.a.mark((function e(a,t){var n,r;return He.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="string"!==typeof t?JSON.stringify({date:new Date,entry:t}):t,e.next=3,localStorage.setItem(a,n);case 3:return r=e.sent,e.abrupt("return",r);case 5:case"end":return e.stop()}}),e)})));return function(a,t){return e.apply(this,arguments)}}()},{key:"get",value:function(){var e=Object(Le.a)(He.a.mark((function e(a,t){var n,r;return He.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=null,this.appStore.enableCache){e.next=3;break}return e.abrupt("return",n);case 3:return e.next=5,localStorage.getItem(a);case 5:if((n=e.sent)&&console.log("Key: ".concat(a," loaded from cache")),n&&n.length){e.next=9;break}return e.abrupt("return",n);case 9:if(e.prev=9,r=JSON.parse(n),!t){e.next=16;break}if(!(new Date(r.date)<t)){e.next=14;break}return e.abrupt("return",r.entry);case 14:return console.log("Key: ".concat(a," date expired. ValidAt: ").concat(t,". ExpiredAt: ").concat(r.date)),e.abrupt("return",null);case 16:return e.abrupt("return",r.entry);case 19:return e.prev=19,e.t0=e.catch(9),e.abrupt("return",n);case 22:case"end":return e.stop()}}),e,this,[[9,19]])})));return function(a,t){return e.apply(this,arguments)}}()},{key:"clear",value:function(){var e=Object(Le.a)(He.a.mark((function e(){return He.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,localStorage.clear();case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()}]),e}(),Re=t(46),Ge=t(47),Je=(t(150),t(8)),We=t(164),qe=(A=function e(){Object(j.a)(this,e),this.version=We.a,this.services=void 0,Object(Re.a)(this,"enableCache",R,this),Object(Re.a)(this,"selectedMenuIndex",G,this),Object(Re.a)(this,"selectedMenuUrl",J,this),Object(Re.a)(this,"setSelectedMenuIndex",W,this),Object(Re.a)(this,"loadSelectedMenuIndex",q,this)},R=Object(Ge.a)(A.prototype,"enableCache",[Je.m],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!0}}),G=Object(Ge.a)(A.prototype,"selectedMenuIndex",[Je.m],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),J=Object(Ge.a)(A.prototype,"selectedMenuUrl",[Je.m],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return"/"}}),W=Object(Ge.a)(A.prototype,"setSelectedMenuIndex",[Je.f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return function(a){e.selectedMenuIndex=a}}}),q=Object(Ge.a)(A.prototype,"loadSelectedMenuIndex",[Je.f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return function(a){var t=a.split("/");t.length>1?t[1]===_.Records?e.selectedMenuIndex=1:t[1]===_.Types?e.selectedMenuIndex=2:t[1]===_.Menu?e.selectedMenuIndex=3:e.selectedMenuIndex=0:e.selectedMenuIndex=0,0===e.selectedMenuIndex?e.selectedMenuUrl="/".concat(_.Cash):1===e.selectedMenuIndex?e.selectedMenuUrl="/".concat(_.Records):2===e.selectedMenuIndex?e.selectedMenuUrl="/".concat(_.Types):3===e.selectedMenuIndex&&(e.selectedMenuUrl="/".concat(_.Menu))}}}),A),Ke=function e(a){Object(j.a)(this,e),this.cache=void 0,this.cache=a},Ve=t(415),Qe=t(416),Xe=t(417),Ye=t(418),Ze=t(419),$e=t(420),ea=t(421),aa=t(422),ta=(K=function e(){var a=this;Object(j.a)(this,e),Object(Re.a)(this,"types",V,this),this.initializeDefaultTypes=function(){a.types=[],a.types.push({IconComponent:Ve.a,name:"menuFood",iconColor:"palette.secondary.dark",label:"\u0415\u0434\u0430"}),a.types.push({IconComponent:Qe.a,name:"menuStore",iconColor:"palette.success.dark",label:"\u041c\u0430\u0433\u0430\u0437\u0438\u043d"}),a.types.push({IconComponent:Xe.a,name:"menuBus",iconColor:"palette.warning.dark",label:"\u0410\u0432\u0442\u043e\u0431\u0443\u0441"}),a.types.push({IconComponent:Ye.a,name:"menuClothes",iconColor:"palette.primary.dark",label:"\u0412\u0435\u0449\u0438"}),a.types.push({IconComponent:Ze.a,name:"menuGasStation",iconColor:"palette.primary.light",label:"\u0417\u0430\u043f\u0440\u0430\u0432\u043a\u0430"}),a.types.push({IconComponent:$e.a,name:"menuChilds",iconColor:"palette.warning.light",label:"\u0414\u0435\u0442\u0438"}),a.types.push({IconComponent:ea.a,name:"menuServices",iconColor:"palette.secondary.light",label:"\u0423\u0441\u043b\u0443\u0433\u0438"}),a.types.push({IconComponent:aa.a,name:"menuOther",iconColor:"palette.success.light",label:"\u0414\u0440\u0443\u0433\u043e\u0435"})},this.initializeDefaultTypes()},V=Object(Ge.a)(K.prototype,"types",[Je.m],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),K),na=new qe,ra=new Ke(new Ae(na));na.services=ra;var ca={appStore:na,typesStore:new ta},oa=function(){return r.a.createElement(i.b,{store:ca},r.a.createElement(s.a,null,r.a.createElement(l.a,null),r.a.createElement("div",{className:m.a.page},r.a.createElement(Pe,null),r.a.createElement(je,null))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(oa,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[177,1,2]]]);
//# sourceMappingURL=main.29c3e8b0.chunk.js.map