(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{101:function(e,t,a){},127:function(e,t){},130:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(23),o=a(35),i=a.n(o),l=a(52),u=a(5),s=a(53),m=a(60),d=a(54),f=a(61),p=a(137),E=a(31),v=a(12),g=a(149),y=a(148),k=a(34),b=a(32),h=a(33),w=(a(72),a(138)),O={useZebraStyles:!0,rows:[],headers:[{key:"image",header:"Song"},{key:"desc",header:""},{key:"overflow",header:""}]},j=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,c=new Array(n),o=0;o<n;o++)c[o]=arguments[o];return(a=Object(m.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(c)))).shouldComponentUpdate=function(e,t){return!1},a.render=function(){return r.a.createElement(p.a,{id:"search",placeHolderText:"Find a song",size:"lg",labelText:"search",onChange:function(){a.props.searchQueryOnChangeHandler(document.getElementById("search").value)}})},a}return Object(f.a)(t,e),t}(r.a.Component),I=function(e){var t=e.items,a=e.queue,n={};a.length>0&&(n=a.reduce(function(e,t){return e[t.track.uri]=!0,e},{}));var c=(t=t.filter(function(e){return!(e.uri in n)})).map(function(t){return r.a.createElement(E.a,{id:t.id,key:t.id},r.a.createElement(v.a,{key:"".concat(t.id,":image")},r.a.createElement("img",{src:"".concat(t.album.images[0].url),className:"albumPhoto"})),r.a.createElement(v.a,{key:"".concat(t.id,":desc")},t.name," - ",t.artists[0].name),r.a.createElement(v.a,{key:"".concat(t.id,":overflow")},r.a.createElement(g.a,{className:"addToQueueButton",renderIcon:w.a,iconDescription:"Add to queue",kind:"secondary",hasIconOnly:!0,size:"small",onClick:function(){e.addTrackToQueueHandler(t)}})))});return r.a.createElement(y.a,O,function(e){e.rows,e.headers,e.getHeaderProps,e.getRowProps;var t=e.getTableProps,a=e.getTableContainerProps;return r.a.createElement(k.a,a(),r.a.createElement(b.a,t(),r.a.createElement(h.a,null,c)))})},D=function(e){var t=e.socket,a=e.spotifyID,c=new AbortController,o=Object(n.useState)(""),s=Object(u.a)(o,2),m=s[0],d=s[1],f=Object(n.useState)([]),p=Object(u.a)(f,2),E=p[0],v=p[1],g=Object(n.useState)([]),y=Object(u.a)(g,2),k=y[0],b=y[1];Object(n.useEffect)(function(){return t.on("setAccessToken",function(e){d(e)}),function(){c.abort()}},[m]),Object(n.useEffect)(function(){return t.on("setQueue",function(e){v(e)}),function(){}},[E]);var h=function(){var e=Object(l.a)(i.a.mark(function e(t){var a,n,r,o;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(a=[],!t){e.next=12;break}return n={method:"GET",headers:{Authorization:"Bearer ".concat(m)},redirect:"follow",signal:c.signal},e.next=5,fetch("https://api.spotify.com/v1/search?q=".concat(t,"&type=track"),n);case 5:return r=e.sent,e.t0=JSON,e.next=9,r.text();case 9:e.t1=e.sent,o=e.t0.parse.call(e.t0,e.t1),a=o.tracks.items;case 12:b(a);case 13:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",{id:"SearchPane"},r.a.createElement(j,{searchQueryOnChangeHandler:h}),r.a.createElement(I,{items:k,queue:E,addTrackToQueueHandler:function(e){var n=e,r=n.id,c=n.uri,o=n.name,i=n.duration_ms;console.log(e),e={id:r,uri:c,name:o,albumImageURL:e.album.images[0].url,artistName:e.artists[0].name,duration_ms:i},t.emit("addTrackToQueue",{spotifyID:a,track:e})}}))},T=(a(76),function(){for(var e="#",t=0;t<6;t++)e+="0123456789ABCDEF"[Math.floor(16*Math.random())];return e}),C=function(e){var t=e.socket,a=Object(n.useState)([]),c=Object(u.a)(a,2),o=c[0],i=c[1];Object(n.useEffect)(function(){return t.on("setUsers",function(e){i(e)}),function(){}});var l=[];for(var s in o){var m=o[s].display_name?o[s].display_name[0]:"?",d=r.a.createElement("div",{className:"emptyPhoto",key:"".concat(s,"_profilePhoto"),style:{backgroundColor:T()}},m);console.log(),o[s].profileImageURL&&(d=r.a.createElement("img",{key:"".concat(s,"_profilePhoto"),src:o[s].profileImageURL})),l.push(d)}return l},N=(a(77),a(59)),P=(a(78),a(132)),S=function(e){var t=e.track;return t?r.a.createElement("div",{className:"currently-playing"},r.a.createElement("div",null,r.a.createElement("img",{src:"".concat(t.albumImageURL)})),r.a.createElement("div",null,t.name+" - "+t.artistName)):r.a.createElement("div",{className:"queue-track"})},Q=function(e){var t=e.spotifyID,a=e.voteHandler,n=e.track,c=t in e.votes?e.votes[t]:0;return r.a.createElement("div",{className:"queue-track"},r.a.createElement("div",null,r.a.createElement("img",{src:"".concat(n.albumImageURL)})),r.a.createElement("div",null,n.name+" - "+n.artistName),r.a.createElement("div",{className:"queue-track-vote-col",onClick:function(e){a(1===c?0:1,n.id),e.stopPropagation()}},r.a.createElement("div",null,r.a.createElement(P.b,{className:1===c?"active":""})),r.a.createElement("div",null,e.priority)))},x=function(e){var t=e.spotifyID,a=e.socket,c=Object(n.useState)([]),o=Object(u.a)(c,2),i=o[0],l=o[1],s=Object(n.useState)(null),m=Object(u.a)(s,2),d=m[0],f=m[1];Object(n.useEffect)(function(){return a.on("setQueue",function(e){l(e)}),a.on("setCurrentlyPlaying",function(e){f(e)}),function(){}},[i]);var p=function(e,n){a.emit("voteTrack",{spotifyID:t,vote:e,trackID:n})},E=i.map(function(e){return r.a.createElement(Q,Object.assign({key:"QueueTrack".concat(e.track.id),spotifyID:t,voteHandler:p},e))});return r.a.createElement("div",{id:"Queue"},[r.a.createElement(S,{track:d})].concat(Object(N.a)(E)))},H=a(57),L=a.n(H),U={overflowHeight:60,shadowTip:!1,topShadow:!1,overlay:!1,scrollTopAtClose:!0},q=function(e){var t=e.spotifyID,a=e.socket,c=Object(n.useState)(!1),o=Object(u.a)(c,2),i=o[0],l=o[1];return r.a.createElement("div",{onClick:function(){l(!i)}},r.a.createElement(L.a,Object.assign({},U,{open:i}),r.a.createElement("div",{id:"MobileQueueWrapper"},r.a.createElement(x,{socket:a,spotifyID:t}))))},A=a(139),R=a(140),_=a(150),z=a(141),B=a(142),F=a(143),J=a(145),M=a(146),W=a(147),G=a(144),Z=(a(101),function(){window.location.replace("https://www.spotify.com/logout/")}),K=function(e){var t=e.socket,a=e.spotifyID;return r.a.createElement("div",{id:"page"},r.a.createElement(A.a,{render:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(R.a,{"aria-label":"Nitrus"},r.a.createElement(_.a,{prefix:""},"Nitrus"),r.a.createElement(z.a,{"aria-label":"Nitrus"},r.a.createElement(r.a.Fragment,null,r.a.createElement(C,{socket:t}))),r.a.createElement(B.a,null,r.a.createElement(F.a,{id:"logoutIcon","aria-label":"Logout",onClick:Z},r.a.createElement(G.a,null)))),r.a.createElement(J.a,{condensed:!0},r.a.createElement(M.a,null,r.a.createElement(W.a,{sm:{span:0},md:2,lg:2},r.a.createElement("div",{id:"DesktopQueueWrapper"},r.a.createElement(x,{socket:t,spotifyID:a}))),r.a.createElement(W.a,{sm:4,md:6,lg:10},r.a.createElement(D,{socket:t,spotifyID:a})),r.a.createElement(W.a,{sm:1,md:{span:0},lg:{span:0}},r.a.createElement(q,{socket:t,spotifyID:a})))))}}))},V=a(58),X=a.n(V),Y=.01*window.innerHeight;document.documentElement.style.setProperty("--vh","".concat(Y,"px")),window.addEventListener("resize",function(){var e=.01*window.innerHeight;document.documentElement.style.setProperty("--vh","".concat(e,"px"))});var $=new URLSearchParams(window.location.search).get("spotifyID"),ee="https://nitrus.azurewebsites.net",te=X()(ee);te.on("connect",function(){te.emit("init",$)}),te.on("redirectToLogin",function(){window.location.replace("".concat(ee,"/login"))}),Object(c.render)(r.a.createElement(K,{spotifyID:$,socket:te}),document.getElementById("root"))},65:function(e,t,a){e.exports=a(130)},72:function(e,t,a){},76:function(e,t,a){},77:function(e,t,a){},78:function(e,t,a){}},[[65,1,2]]]);
//# sourceMappingURL=main.62d9323e.chunk.js.map