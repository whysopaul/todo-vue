import{d as u,r,w as i,c as d,a as p,_ as m,b as _,e,f,g as k,F as v,u as w,h,o as n,i as x,A as V}from"./index-BFzN9trN.js";const g={class:"todo-view-status"},B=["checked"],R=u({__name:"TodoView",setup(C){const l=w(),t=r(null);return i(async()=>{const o=await fetch(V+"?title="+l.params.slug.replace(/\-/g," "));t.value=(await o.json())[0]}),(o,a)=>{var s;const c=h("RouterLink");return n(),d(v,null,[t.value?(n(),p(m,{key:0,title:t.value.title},null,8,["title"])):_("",!0),e("main",null,[e("div",g,[e("label",null,[a[0]||(a[0]=e("span",null,"Статус: ",-1)),e("input",{type:"checkbox",checked:(s=t.value)==null?void 0:s.completed},null,8,B)])]),e("div",null,[f(c,{to:"/"},{default:k(()=>a[1]||(a[1]=[x("Вернуться назад")])),_:1})])])],64)}}});export{R as default};
