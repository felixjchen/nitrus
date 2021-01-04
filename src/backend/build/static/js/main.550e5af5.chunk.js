(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{101:function(e,t,a){},127:function(e,t){},130:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(23),o=a(35),i=a.n(o),u=a(52),l=a(5),s=a(53),m=a(60),d=a(54),f=a(61),p=a(137),E=a(31),v=a(12),b=a(149),g=a(148),y=a(34),k=a(32),h=a(33),O=(a(72),a(138)),j={useZebraStyles:!0,rows:[],headers:[{key:"image",header:"Song"},{key:"desc",header:""},{key:"overflow",header:""}]},w=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,c=new Array(n),o=0;o<n;o++)c[o]=arguments[o];return(a=Object(m.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(c)))).shouldComponentUpdate=function(e,t){return!1},a.render=function(){return r.a.createElement(p.a,{id:"search",placeHolderText:"Find a song",size:"lg",labelText:"search",onChange:function(){a.props.searchQueryOnChangeHandler(document.getElementById("search").value)}})},a}return Object(f.a)(t,e),t}(r.a.Component),I=function(e){var t=e.items,a=e.queue,n={};a.length>0&&(n=a.reduce(function(e,t){return e[t.track.uri]=!0,e},{}));var c=(t=t.filter(function(e){return!(e.uri in n)})).map(function(t){return r.a.createElement(E.a,{id:t.id,key:t.id},r.a.createElement(v.a,{key:"".concat(t.id,":image")},r.a.createElement("img",{src:"".concat(t.album.images[0].url),className:"albumPhoto"})),r.a.createElement(v.a,{key:"".concat(t.id,":desc")},t.name," - ",t.artists[0].name),r.a.createElement(v.a,{key:"".concat(t.id,":overflow")},r.a.createElement(b.a,{className:"addToQueueButton",renderIcon:O.a,iconDescription:"Add to queue",kind:"secondary",hasIconOnly:!0,size:"small",onClick:function(){e.addTrackToQueueHandler(t)}})))});return r.a.createElement(g.a,j,function(e){e.rows,e.headers,e.getHeaderProps,e.getRowProps;var t=e.getTableProps,a=e.getTableContainerProps;return r.a.createElement(y.a,a(),r.a.createElement(k.a,t(),r.a.createElement(h.a,null,c)))})},T=function(e){var t=e.socket,a=e.spotifyID,c=new AbortController,o=Object(n.useState)(""),s=Object(l.a)(o,2),m=s[0],d=s[1],f=Object(n.useState)([]),p=Object(l.a)(f,2),E=p[0],v=p[1],b=Object(n.useState)([]),g=Object(l.a)(b,2),y=g[0],k=g[1];Object(n.useEffect)(function(){return t.on("setAccessToken",function(e){d(e)}),function(){c.abort()}},[m]),Object(n.useEffect)(function(){return t.on("setQueue",function(e){v(e)}),function(){}},[E]);var h=function(){var e=Object(u.a)(i.a.mark(function e(t){var a,n,r,o;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(a=[],!t){e.next=12;break}return n={method:"GET",headers:{Authorization:"Bearer ".concat(m)},redirect:"follow",signal:c.signal},e.next=5,fetch("https://api.spotify.com/v1/search?q=".concat(t,"&type=track&limit=50"),n);case 5:return r=e.sent,e.t0=JSON,e.next=9,r.text();case 9:e.t1=e.sent,o=e.t0.parse.call(e.t0,e.t1),a=o.tracks.items;case 12:k(a);case 13:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",{id:"SearchPane"},r.a.createElement(w,{searchQueryOnChangeHandler:h}),r.a.createElement(I,{items:y,queue:E,addTrackToQueueHandler:function(e){var n=e,r=n.id,c=n.uri,o=n.name,i=n.duration_ms;e={id:r,uri:c,name:o,albumImageURL:e.album.images[0].url,artistName:e.artists[0].name,duration_ms:i},t.emit("addTrackToQueue",{spotifyID:a,track:e})}}))},D=(a(76),function(e){var t=e.socket,a=Object(n.useState)([]),c=Object(l.a)(a,2),o=c[0],i=c[1];Object(n.useEffect)(function(){return t.on("setUsers",function(e){i(e)}),function(){}});var u=[];for(var s in o){var m=void 0;o[s].profileImageURL&&(m=r.a.createElement("div",{key:"".concat(s,"_profilePhoto"),className:"profilePhoto",style:{backgroundImage:"url(".concat(o[s].profileImageURL,")")}})),u.push(m)}return r.a.createElement(r.a.Fragment,null," ",u)}),S=(a(77),function(e){var t=e.socket,a=Object(n.useState)([]),c=Object(l.a)(a,2),o=c[0],i=c[1],u=Object(n.useState)([]),s=Object(l.a)(u,2),m=s[0],d=s[1],f=Object(n.useState)(""),p=Object(l.a)(f,2),E=p[0],v=p[1],b=Object(n.useState)({}),g=Object(l.a)(b,2),y=g[0],k=g[1];return Object(n.useEffect)(function(){return t.on("setUsers",function(e){i(e)}),t.on("setQueue",function(e){d(e)}),t.on("setAccessToken",function(e){v(e)}),t.on("setCurrentlyPlaying",function(e){k(e)}),function(){}}),r.a.createElement("pre",null,JSON.stringify({accessToken:E,currentlyPlaying:y,queue:m,users:o},null,2)," ")}),N=a(59),P=(a(78),a(132)),C=function(e){var t=e.track,a=Object(n.useState)(Date.now()),c=Object(l.a)(a,2),o=c[0],i=c[1];if(Object(n.useEffect)(function(){var e=setInterval(function(){return i(Date.now())},100);return function(){clearInterval(e)}},[]),t){var u=(t.duration_ms-t.complete_at+o)/t.duration_ms*100;return r.a.createElement("div",{className:"currently-playing",style:{background:"linear-gradient(90deg, #0043ce ".concat(u-1,"%, #0f62fe ").concat(u,"%)")}},r.a.createElement("div",null,r.a.createElement("img",{src:"".concat(t.albumImageURL)})),r.a.createElement("div",null,t.name+" - "+t.artistName))}return r.a.createElement("div",{className:"queue-track"})},Q=function(e){var t=e.spotifyID,a=e.voteHandler,n=e.track,c=t in e.votes?e.votes[t]:0;return r.a.createElement("div",{className:"queue-track"},r.a.createElement("div",null,r.a.createElement("img",{src:"".concat(n.albumImageURL)})),r.a.createElement("div",null,n.name+" - "+n.artistName),r.a.createElement("div",{className:"queue-track-vote-col",onClick:function(e){a(1===c?0:1,n.id),e.stopPropagation()}},r.a.createElement("div",null,r.a.createElement(P.b,{className:1===c?"active":""})),r.a.createElement("div",null,e.priority)))},x=function(e){var t=e.spotifyID,a=e.socket,c=Object(n.useState)([]),o=Object(l.a)(c,2),i=o[0],u=o[1],s=Object(n.useState)(null),m=Object(l.a)(s,2),d=m[0],f=m[1];Object(n.useEffect)(function(){return a.on("setQueue",function(e){u(e)}),a.on("setCurrentlyPlaying",function(e){f(e)}),function(){}},[i]);var p=function(e,n){a.emit("voteTrack",{spotifyID:t,vote:e,trackID:n})},E=i.map(function(e){return r.a.createElement(Q,Object.assign({key:"QueueTrack".concat(e.track.id),spotifyID:t,voteHandler:p},e))});return r.a.createElement("div",{id:"Queue"},[r.a.createElement(C,{key:"currentlyPlaying",track:d})].concat(Object(N.a)(E)))},H=a(57),L=a.n(H),U={overflowHeight:60,shadowTip:!1,topShadow:!1,overlay:!1,scrollTopAtClose:!0},q=function(e){var t=e.spotifyID,a=e.socket,c=Object(n.useState)(!1),o=Object(l.a)(c,2),i=o[0],u=o[1];return r.a.createElement("div",{onClick:function(){u(!i)}},r.a.createElement(L.a,Object.assign({},U,{open:i}),r.a.createElement("div",{id:"MobileQueueWrapper"},r.a.createElement(x,{socket:a,spotifyID:t}))))},A=a(139),R=a(140),F=a(141),_=a(142),z=a(150),B=a(143),J=a(144),W=a(145),G=a(147),M=a(146),Z=(a(101),function(){window.location.replace("https://www.spotify.com/logout/")}),K=function(e){var t=e.socket,a=e.spotifyID,n=e.production?r.a.createElement(r.a.Fragment,null):r.a.createElement(A.a,null,r.a.createElement(r.a.Fragment,null,r.a.createElement(R.a,null,r.a.createElement(S,{socket:t}))));return r.a.createElement("div",{id:"page"},r.a.createElement(F.a,{render:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(_.a,{"aria-label":"Nitrus"},r.a.createElement(z.a,{prefix:""},"Nitrus"),r.a.createElement(B.a,{"aria-label":"Nitrus"},r.a.createElement(r.a.Fragment,null,r.a.createElement(D,{socket:t}))),r.a.createElement(J.a,null,r.a.createElement(W.a,{id:"logoutIcon","aria-label":"Logout",onClick:Z},r.a.createElement(M.a,null)))),r.a.createElement(G.a,{condensed:!0},r.a.createElement(A.a,null,r.a.createElement(R.a,{sm:{span:0},md:2,lg:2},r.a.createElement("div",{id:"DesktopQueueWrapper"},r.a.createElement(x,{socket:t,spotifyID:a}))),r.a.createElement(R.a,{sm:4,md:6,lg:10},r.a.createElement(T,{socket:t,spotifyID:a})),r.a.createElement(R.a,{sm:1,md:{span:0},lg:{span:0}},r.a.createElement(q,{socket:t,spotifyID:a}))),n))}}))},V=a(58),X=a.n(V),Y=.01*window.innerHeight;document.documentElement.style.setProperty("--vh","".concat(Y,"px")),window.addEventListener("resize",function(){var e=.01*window.innerHeight;document.documentElement.style.setProperty("--vh","".concat(e,"px"))});var $=new URLSearchParams(window.location.search).get("spotifyID"),ee="https://nitrus.azurewebsites.net",te=X()(ee);te.on("connect",function(){te.emit("init",$)}),te.on("redirectToLogin",function(){window.location.replace("".concat(ee,"/login"))}),Object(c.render)(r.a.createElement(K,{spotifyID:$,socket:te,production:!0}),document.getElementById("root"))},65:function(e,t,a){e.exports=a(130)},72:function(e,t,a){},76:function(e,t,a){},77:function(e,t,a){},78:function(e,t,a){}},[[65,1,2]]]);
//# sourceMappingURL=main.550e5af5.chunk.js.map