(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[6],{74:function(e,t,a){"use strict";var n=a(4),i=a(12),s=a(2),c=a(19),r=(a(75),a(1)),l=function(e,t){switch(t.type){case"CHANGE":return Object(i.a)(Object(i.a)({},e),{},{value:t.val,isValid:Object(c.d)(t.val,t.validators)});case"TOUCH":return Object(i.a)(Object(i.a)({},e),{},{isTouched:!0});default:return e}};t.a=function(e){var t=Object(s.useReducer)(l,{value:e.initialValue||"",isTouched:!1,isValid:e.initialIsValid||!1}),a=Object(n.a)(t,2),i=a[0],c=a[1],o=e.id,u=e.onInput,d=i.value,p=i.isValid;Object(s.useEffect)((function(){u(o,d,p)}),[o,d,p,u]);var j=function(t){c({type:"CHANGE",val:t.target.value,validators:e.validators})},b=function(){c({type:"TOUCH"})},O="input"===e.element?Object(r.jsx)("input",{id:e.id,type:e.type,placeholder:e.placeholder,onChange:j,onBlur:b,value:i.value}):Object(r.jsx)("textarea",{id:e.id,rows:e.rows||5,onChange:j,onBlur:b,value:i.value});return Object(r.jsxs)("div",{className:"form-control ".concat(!i.isValid&&i.isTouched&&"form-control--invalid"),children:[Object(r.jsx)("label",{htmlFor:e.id,children:e.label}),O,!i.isValid&&i.isTouched&&Object(r.jsx)("p",{children:e.errorText})]})}},75:function(e,t,a){},76:function(e,t,a){"use strict";a.d(t,"a",(function(){return l}));var n=a(4),i=a(28),s=a(12),c=a(2),r=function(e,t){switch(t.type){case"INPUT_CHANGE":var a=!0;for(var n in e.inputs)e.inputs[n]&&(a=n===t.inputId?a&&t.isValid:a&&e.inputs[n].isValid);return Object(s.a)(Object(s.a)({},e),{},{inputs:Object(s.a)(Object(s.a)({},e.inputs),{},Object(i.a)({},t.inputId,{value:t.value,isValid:t.isValid})),isValid:a});case"SET_DATA":return{inputs:t.inputs,isValid:t.isValid};default:return e}},l=function(e,t){var a=Object(c.useReducer)(r,{inputs:e,isValid:t}),i=Object(n.a)(a,2),s=i[0],l=i[1],o=Object(c.useCallback)((function(e,t,a){l({type:"INPUT_CHANGE",value:t,isValid:a,inputId:e})}),[]),u=Object(c.useCallback)((function(e,t){l({type:"SET_DATA",inputs:e,isValid:t})}),[]);return[s,o,u]}},80:function(e,t,a){"use strict";var n=a(4),i=a(2),s=a(9),c=(a(81),a(1));t.a=function(e){var t=Object(i.useState)(),a=Object(n.a)(t,2),r=a[0],l=a[1],o=Object(i.useState)(),u=Object(n.a)(o,2),d=u[0],p=u[1],j=Object(i.useState)(!1),b=Object(n.a)(j,2),O=b[0],v=b[1],m=Object(i.useRef)();return Object(i.useEffect)((function(){if(r){var e=new FileReader;e.onload=function(){p(e.result)},e.readAsDataURL(r)}}),[r]),Object(c.jsxs)("div",{className:"form-control",children:[Object(c.jsx)("input",{id:e.id,style:{display:"none"},type:"file",accept:".jpg,.png,.jpeg,.webp",ref:m,onChange:function(t){var a,n=O;t.target.files&&1===t.target.files.length?(a=t.target.files[0],l(a),v(!0),n=!0):(v(!1),n=!1),e.onInput(e.id,a,n)}}),Object(c.jsxs)("div",{className:"".concat(e.center&&"center-flex-column"),children:[Object(c.jsxs)("div",{className:"image-upload__preview",children:[d&&Object(c.jsx)("img",{src:d,alt:"preview"}),!d&&Object(c.jsx)("p",{children:"Please pick an image."})]}),Object(c.jsx)(s.a,{type:"button",secondary:!0,onClick:function(){m.current.click()},children:"Pick image"}),!O&&Object(c.jsx)("p",{children:e.errorText})]})]})}},81:function(e,t,a){},85:function(e,t,a){},89:function(e,t,a){"use strict";a.r(t);var n=a(10),i=a.n(n),s=a(15),c=a(12),r=a(4),l=a(2),o=a(27),u=a(74),d=a(9),p=a(26),j=a(18),b=a(80),O=a(76),v=a(25),m=a(16),f=(a(85),a(19)),h=a(1);t.default=function(){var e=Object(l.useContext)(m.a),t=Object(l.useState)(!0),a=Object(r.a)(t,2),n=a[0],x=a[1],g=Object(v.a)(),y=g.isLoading,w=g.error,V=g.sendRequest,T=g.clearError,k=Object(O.a)({email:{value:"",isValid:!1},password:{value:"",isValid:!1}},!1),C=Object(r.a)(k,3),N=C[0],I=C[1],E=C[2],S=function(){n||E(Object(c.a)(Object(c.a)({},N.inputs),{},{name:void 0,image:void 0,motto:void 0}),N.inputs.email.isValid&&N.inputs.password.isValid),n&&E(Object(c.a)(Object(c.a)({},N.inputs),{},{name:{value:"",isValid:!1},image:{value:null,isValid:!1},motto:{value:"",isValid:!1}}),!1),x((function(e){return!e}))},P=function(){var t=Object(s.a)(i.a.mark((function t(a){var s,c,r;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a.preventDefault(),!n){t.next=11;break}return t.prev=2,t.next=5,V("".concat("https://snap-app.onrender.com/api","/users/login"),"POST",JSON.stringify({email:N.inputs.email.value,password:N.inputs.password.value}),{"Content-Type":"application/json"});case 5:s=t.sent,e.login(s.userId,s.token),t.next=11;break;case 9:t.prev=9,t.t0=t.catch(2);case 11:if(n){t.next=27;break}return t.prev=12,(c=new FormData).append("email",N.inputs.email.value),c.append("name",N.inputs.name.value),c.append("password",N.inputs.password.value),c.append("motto",N.inputs.motto.value),c.append("image",N.inputs.image.value),t.next=21,V("".concat("https://snap-app.onrender.com/api","/users/signup"),"POST",c);case 21:r=t.sent,e.login(r.userId,r.token),t.next=27;break;case 25:t.prev=25,t.t1=t.catch(12);case 27:case"end":return t.stop()}}),t,null,[[2,9],[12,25]])})));return function(e){return t.apply(this,arguments)}}();return Object(h.jsxs)(l.Fragment,{children:[Object(h.jsx)(p.a,{error:w,onClear:T}),Object(h.jsxs)(o.a,{className:"authentication-form",children:[y&&Object(h.jsx)(j.a,{asOverlay:!0}),Object(h.jsx)("h2",{className:"authentication-form-header",children:"Login Required"}),Object(h.jsxs)("form",{onSubmit:P,children:[!n&&Object(h.jsx)(b.a,{id:"image",center:!0,errorText:"",onInput:I}),!n&&Object(h.jsx)(u.a,{element:"input",id:"name",type:"text",label:"Name",validators:[Object(f.c)()],errorText:"Please enter a name.",onInput:I}),!n&&Object(h.jsx)(u.a,{element:"input",id:"motto",type:"motto",label:"Motto",validators:[Object(f.c)()],errorText:"Please enter a motto.",onInput:I}),!n&&Object(h.jsx)("p",{className:"authentication-form-text",children:"Example: Happiness is Travelling"}),Object(h.jsx)(u.a,{element:"input",id:"email",type:"email",label:"Email",validators:[Object(f.a)()],errorText:"Please enter a valid email address.",onInput:I}),!n&&Object(h.jsx)("p",{className:"authentication-form-text",children:"Example: John@company.com"}),Object(h.jsx)(u.a,{element:"input",id:"password",type:"password",label:"Password",validators:[Object(f.b)(8)],errorText:"Please enter a valid password, at least 8 characters.",placeholder:n?"":"Must be at least 8 characters",onInput:I}),Object(h.jsxs)("div",{className:"authentication-form-actions",children:[Object(h.jsx)(d.a,{type:"submit",secondary:!0,disabled:!N.isValid,children:n?"Login":"Signup"}),n?Object(h.jsx)(d.a,{type:"button",onClick:S,inverse:!0,secondary:!0,children:"Join now"}):Object(h.jsx)(d.a,{type:"button",onClick:S,inverse:!0,secondary:!0,children:"Switch to login"})]})]})]})]})}}}]);
//# sourceMappingURL=6.d0f21b5d.chunk.js.map