(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[3],{77:function(e,t,n){},78:function(e,t,n){},79:function(e,t,n){"use strict";var c=n(10),a=n.n(c),s=n(15),r=n(4),o=n(2),i=n(27),l=n(9),d=n(29),j=(n(77),n(1)),u=function(e){var t=Object(o.useRef)(),n=e.center,c=e.zoom;return Object(o.useEffect)((function(){var e=new window.google.maps.Map(t.current,{center:n,zoom:c});new window.google.maps.Marker({position:n,map:e})}),[n,c]),Object(j.jsx)("div",{ref:t,className:"map ".concat(e.className),style:e.style})},p=n(26),h=n(18),m=n(16),b=n(25);n(78),t.a=function(e){var t=Object(b.a)(),n=t.isLoading,c=t.error,O=t.sendRequest,x=t.clearError,f=Object(o.useContext)(m.a),v=Object(o.useState)(!1),g=Object(r.a)(v,2),w=g[0],y=g[1],N=Object(o.useState)(!1),_=Object(r.a)(N,2),k=_[0],C=_[1],D=function(){return y(!1)},E=function(){C(!1)},S=function(){var t=Object(s.a)(a.a.mark((function t(){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return C(!1),t.prev=1,t.next=4,O("".concat("https://snap-app-howie.herokuapp.com/api","/snaps/").concat(e.id),"DELETE",null,{Authorization:"Bearer "+f.token});case 4:e.onDelete(e.id),t.next=9;break;case 7:t.prev=7,t.t0=t.catch(1);case 9:case"end":return t.stop()}}),t,null,[[1,7]])})));return function(){return t.apply(this,arguments)}}();return Object(j.jsxs)(o.Fragment,{children:[Object(j.jsx)(p.a,{error:c,onClear:x}),Object(j.jsx)(d.a,{show:w,onCancel:D,header:e.address,contentClass:"snap-item__modal-content",footerClass:"snap-item__modal-actions",footer:Object(j.jsx)(l.a,{onClick:D,secondary:!0,children:"Close"}),children:Object(j.jsx)("div",{className:"map-container",children:Object(j.jsx)(u,{center:e.coordinates,zoom:14})})}),Object(j.jsx)(d.a,{show:k,onCancel:E,header:"Are you sure?",contentClass:"snap-item__modal-content",footerClass:"snap-item__modal-actions",footer:Object(j.jsxs)(o.Fragment,{children:[Object(j.jsx)(l.a,{onClick:E,inverse:!0,secondary:!0,children:"Cancel"}),Object(j.jsx)(l.a,{onClick:S,danger:!0,secondary:!0,children:"Delete"})]}),children:Object(j.jsx)("p",{children:"Do you want to proceed and delete this snap? You can't undo this action."})}),Object(j.jsxs)(i.a,{className:"snap-item",children:[n&&Object(j.jsx)(h.a,{asOverlay:!0}),Object(j.jsxs)("li",{children:[Object(j.jsx)("div",{className:"snap-item__image",children:Object(j.jsx)("img",{src:"".concat("https://snap-app-howie.herokuapp.com","/").concat(e.image),alt:e.title})}),Object(j.jsxs)("div",{className:"center-flex-column small-gap",children:[Object(j.jsxs)("div",{className:"center-flex-column extra-small-gap snap-item__info",children:[Object(j.jsx)("p",{className:"snap-item__info-title",children:e.title}),Object(j.jsx)("p",{className:"snap-item__info-address",children:e.address}),Object(j.jsx)("p",{className:"snap-item__info-description",children:e.description})]}),Object(j.jsxs)("div",{className:"center-flex-row tiny-gap snap-item__actions",children:[Object(j.jsx)(l.a,{onClick:function(){return y(!0)},secondary:!0,children:"View on Map"}),f.userId===e.creatorId&&Object(j.jsx)(l.a,{to:"/snaps/".concat(e.id),secondary:!0,inverse:!0,children:"Edit"}),f.userId===e.creatorId&&Object(j.jsx)(l.a,{onClick:function(){C(!0)},secondary:!0,danger:!0,children:"Delete"})]})]})]})]})]})}},82:function(e,t,n){"use strict";var c=n(79),a=n(9),s=(n(37),n(83),n(1));t.a=function(e){return 0===e.items.length?Object(s.jsxs)("div",{className:"center-flex-column medium-gap no-data-found",children:[Object(s.jsx)("p",{children:"No snaps found. Maybe create one?"}),Object(s.jsx)(a.a,{to:"/snaps/new",secondary:!0,children:"Create Snap"})]}):Object(s.jsx)("ul",{className:"snaps-list",children:e.items.map((function(t){return Object(s.jsx)(c.a,{id:t.id,image:t.image,title:t.title,description:t.description,address:t.address,creatorId:t.creator,coordinates:t.location,onDelete:e.onDeleteSnap},t.id)}))})}},83:function(e,t,n){},88:function(e,t,n){},92:function(e,t,n){"use strict";n.r(t);var c=n(10),a=n.n(c),s=n(15),r=n(4),o=n(2),i=n(3),l=n(30),d=n(19),j=n(25),u=n(82),p=n(18),h=(n(88),n(1));t.default=function(){var e=Object(j.a)(),t=e.isLoading,n=e.error,c=e.sendRequest,m=e.clearError,b=Object(o.useState)(),O=Object(r.a)(b,2),x=O[0],f=O[1],v=Object(o.useState)(),g=Object(r.a)(v,2),w=g[0],y=g[1],N=Object(i.g)(),_=Object(i.h)().keyword;Object(o.useEffect)((function(){var e=function(){var e=Object(s.a)(a.a.mark((function e(t){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,c("".concat("https://snap-app-howie.herokuapp.com/api","/snaps/search/").concat(t));case 3:n=e.sent,f(n.snaps),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}();m(),_&&e(_)}),[_,c,m]);var k=Object(o.useCallback)((function(e){y(e)}),[]);return Object(h.jsxs)("div",{className:"center-flex-column",children:[Object(h.jsxs)("div",{className:"center-text search-hero center-flex-column extra-small-gap",children:[Object(h.jsxs)("p",{className:"search-hero-text",children:["Here is your searching result for",!t&&Object(h.jsx)("span",{className:"search-hero-keyword",children:" ".concat(_||w)})]}),Object(h.jsx)("div",{children:Object(h.jsx)("form",{onSubmit:function(e){e.preventDefault(),N.push("/search/".concat(w))},children:Object(h.jsx)(l.a,{validators:[Object(d.c)()],errorText:"Please enter valid search.",onSearch:k})})})]}),t&&Object(h.jsx)("div",{className:"center-text",children:Object(h.jsx)(p.a,{})}),!t&&n&&Object(h.jsx)("p",{className:"center-text no-data-found",children:"Could not find any snap. Please try again."}),!t&&!n&&x&&Object(h.jsx)(u.a,{items:x})]})}}}]);
//# sourceMappingURL=3.8c357047.chunk.js.map