import{l as g,d as L}from"./assets/main-6a39d421.js";import{P}from"./assets/vendor-4563c95f.js";const I="/js_98_KateMassa/assets/book-pile-c3b346c2.png",a=3;let i;function m(e,t){const s=(t-1)*a,r=s+a;return e.slice(s,r)}function u(e){const t=document.querySelector(".shopping-list");if(!t){console.error("Element with class 'shopping-list' not found.");return}e.length===0?t.classList.add("empty-page-content"):t.classList.remove("empty-page-content"),t.innerHTML="";const s=`<p class="shopping-list-empty-text">This page is empty, add some books and proceed to order.</p>
          <img
          class="no-book"
          src="${I}"
          alt="Book"
          />`,r=e.map(({book_image:c,title:p,author:n,_id:o,description:b,list_name:f,buy_links:v})=>{let h,k;return v.forEach(l=>{l.name==="Amazon"?h=l.url:l.name==="Apple Books"&&(k=l.url)}),`<li class="one-book">
                  <img
                      class="img-book"
                      src="${c}"
                      alt="Book"
                  />
                  <div class="description">
                      <div class="up-part">
                        <h2 class="book-name">${p}</h2>
                        <h3 class="type-name">${f}</h3>

                        <button data-id="${o}" class="basket" type="button">
                            <svg class="trash" width="16" height="16">
                            <use href="./img/icons.svg#icon-trash"></use>
                            </svg>
                        </button>
                      </div>
                      <p class="text-description">
                      ${b}
                      </p>

                      <div class="book-app">
                        <h3 class="name-author">${n}</h3>
                        <div class="book-links">
                          <a href="${h}" class="book-links-amazon" target="_blank"></a>
                          <a href="${k}" class="book-links-applebook" target="_blank"></a>
                        </div>
                      </div>
                  </div>
                  </li>`}).join("");t.innerHTML=e.length>0?r:s,document.querySelectorAll(".shopping-list .basket").forEach(c=>{const p=c.getAttribute("data-id");c.addEventListener("click",()=>{L(p);const n=g();let o=i.getCurrentPage();d(n.length),(o-1)*a>=n.length?(o-=1,i.movePageTo(o)):u(m(n,o))})})}function y(e){i=new P("tui-pagination-container",{totalItems:e,itemsPerPage:a,visiblePages:3,usageStatistics:!1}),d(e),i.on("afterMove",function(t){const s=g();d(s.length),u(m(s,t.page))})}function d(e){const t=document.getElementById("tui-pagination-container");e<=a?t.classList.add("hidden"):t.classList.remove("hidden"),i.setTotalItems(e)}document.addEventListener("DOMContentLoaded",function(){const e=g();y(e.length),u(m(e,1))});
//# sourceMappingURL=commonHelpers2.js.map
