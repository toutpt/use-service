(this["webpackJsonpuse-service"]=this["webpackJsonpuse-service"]||[]).push([[0],{13:function(e,n,t){},15:function(e,n,t){"use strict";t.r(n);var c=t(1),r=t.n(c),o=t(6),i=t.n(o),s=(t(13),t(4)),u=t(8),d=t(7),a=new Map,l=new Map,f=new Map;function b(e){var n=l.get(e);if(!n){var t=a.get(e);n=Object(u.a)(t.fn,[function(){(f.get(e)||[]).forEach((function(n){return n(Object.assign({},l.get(e)))}))}].concat(Object(d.a)(t.dependencies.map(b)))),l.set(e,n)}return n}function j(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{subscribe:!0},t=Object(c.useState)(l.get(e)),r=Object(s.a)(t,2),o=r[1];return Object(c.useEffect)((function(){return function(){f.get(e).has(o)&&f.get(e).delete(o)}}),[]),n.subscribe&&(void 0===f.get(e)?f.set(e,new Set([o])):f.get(e).has(o)||f.get(e).add(o)),b(e)}function g(e,n){var t=e,c=n;if(n||(t=e.$id,c=e),a.get(t))throw new Error("A service is already registred under the key ".concat(t));a.set(t,{fn:c,dependencies:c.dependencies||[]})}var v=t(0);function h(){this.info=function(){var e;return(e=console).info.apply(e,arguments)}}function p(e,n){var t=this;return this.count=0,n.info("create service#$count should be called only once"),this.increment=function(){t.count+=1,e()},this.decrement=function(){t.count-=1,e()},this}function O(e){var n=j("$count");return console.log("Counter.render()",e.id),Object(v.jsxs)("p",{id:e.id,children:["Count state value(",e.id,"): ",n.count]})}function x(e){var n=j("$count");return console.log("CountController.render()"),Object(v.jsxs)("div",{children:[Object(v.jsx)("button",{onClick:function(){return n.increment()},children:"+"}),Object(v.jsx)("button",{onClick:function(){return n.decrement()},children:"-"})]})}h.$id="$log",p.$id="count",p.dependencies=["$log"],g("$log",h),g("$count",p);var $=function(){console.log("App.render");var e=Object(c.useState)(!0),n=Object(s.a)(e,2),t=n[0],o=n[1];return Object(v.jsxs)("div",{className:"App",children:['React.version = "',r.a.version,'"',Object(v.jsx)(O,{id:"first"}),Object(v.jsx)(x,{}),t&&Object(v.jsx)(O,{id:"second"}),Object(v.jsx)("button",{onClick:function(){return o(!t)},children:"Toggle second Counter instance"})]})};i.a.render(Object(v.jsx)($,{}),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.f055bb45.chunk.js.map