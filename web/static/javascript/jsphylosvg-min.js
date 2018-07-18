Smits={};Smits.Common={nodeIdIncrement:0,activeNode:0,roundFloat:function(e,t){var n=0,r=1;while(n<t){r*=10;n++}return Math.round(e*r)/r},apply:function(e,t){if(e&&typeof t=="object"){for(var n in t){e[n]=t[n]}}return e},addRaphEventHandler:function(e,t,n,r){try{e[t](function(e,t){return function(n,r){var i=t;i.e=n;e(i)}}(n,r))}catch(i){}},isInteger:function(e){return!isNaN(parseInt(e))},isXMLSerializerAvailable:function(){if(typeof XMLSerializer=="function"){return true}else{return false}},createSvgEl:function(e,t){e=document.createElementNS("http://www.w3.org/2000/svg",e);if(t){for(var n in t){if(t.hasOwnProperty(n)){e.setAttribute(n,String(t[n]))}}}return e},createGradientEl:function(e,t,n){if(t.type!="radialGradient")return false;var r=Smits.Common.createSvgEl("radialGradient",{id:e,gradientUnits:"userSpaceOnUse",cx:n[0],cy:n[1],r:n[2],fx:n[0],fy:n[1]});if(t.stop){var i=t.stop;for(var s=0;s<i.length;s++){var o=i[s];if(o["@attributes"]){r.appendChild(Smits.Common.createSvgEl("stop",o["@attributes"]))}else{if(o["_attributes"])delete o["_attributes"];if(o["_children"])delete o["_children"];if(o["__proto__"])delete o["__proto__"];r.appendChild(Smits.Common.createSvgEl("stop",o))}}}return r},setCssStyle:function(e,t){var n=document.styleSheets[0];if(n.addRule){n.addRule(e,t)}else if(n.insertRule){n.insertRule(e+" { "+t+" }",n.cssRules.length)}}};Smits.PhyloCanvas=function(){var e,t,n,r,i;return function(s,o,u,a,f){this.getNewickObject=function(){return n};this.clear=function(){};this.scale=function(e){r.svg.scale(e)};this.getSvg=function(){return r};this.getPhylogram=function(){return e};this.getSvgSource=function(){if(Raphael.svg&&Smits.Common.isXMLSerializerAvailable()){var e=new XMLSerializer;return e.serializeToString(r.svg.canvas)}else{return false}};Smits.Common.nodeIdIncrement=0;if(typeof s==="object"){if(s.xml){if(!s.fileSource){var l=XMLObjectifier.textToXML(s.xml)}else{var l=s.xml}l=XMLObjectifier.xmlToJSON(l);i=new Smits.PhyloCanvas.PhyloxmlParse(l)}else if(s.phyloxml){if(!s.fileSource){var l=XMLObjectifier.textToXML(s.phyloxml)}else{var l=s.phyloxml}l=XMLObjectifier.xmlToJSON(l);i=new Smits.PhyloCanvas.PhyloxmlParse(l)}else if(s.nexml){if(!s.fileSource){var l=XMLObjectifier.textToXML(s.nexml)}else{var l=s.nexml}l=XMLObjectifier.xmlToJSON(l);i=new Smits.PhyloCanvas.NexmlParse(l,s)}else if(s.json){i=new Smits.PhyloCanvas.PhyloxmlParse(s.json)}else if(s.newick){i=new Smits.PhyloCanvas.NewickParse(s.newick)}else if(s.nexmlJson){i=new Smits.PhyloCanvas.NexmlJsonParse(s)}else{alert("Please set the format of input data")}}else{i=new Smits.PhyloCanvas.NewickParse(s)}t=o;r=new Smits.PhyloCanvas.Render.SVG(t,u,a);if(f=="circular"){e=new Smits.PhyloCanvas.Render.CircularPhylogram(r,i)}else{e=new Smits.PhyloCanvas.Render.Phylogram(r,i)}}}();Smits.PhyloCanvas.prototype={};Smits.PhyloCanvas.Render={};Smits.PhyloCanvas.Render.Style={line:{stroke:"rgb(0,0,0)","stroke-width":1},text:{"font-family":"Verdana","font-size":12,"text-anchor":"start"},path:{stroke:"rgb(0,0,0)","stroke-width":1},connectedDash:{stroke:"rgb(200,200,200)","stroke-dasharray":". "},textSecantBg:{fill:"#EEE",stroke:"#DDD"},highlightedEdgeCircle:{fill:"red"},barChart:{fill:"#003300",stroke:"#DDD"},getStyle:function(e,t){if(this[e]){return this[e]}else{return this[t]}}};Smits.PhyloCanvas.Render.Parameters={jsOverride:0,Rectangular:{bufferX:200,paddingX:10,paddingY:20,bufferInnerLabels:10,bufferOuterLabels:5,minHeightBetweenLeaves:10,alignPadding:0,alignRight:false,showScaleBar:"0.1"},Circular:{bufferRadius:.33,bufferAngle:20,initStartAngle:160,innerCircleRadius:0,minHeightBetweenLeaves:5,bufferInnerLabels:2,bufferOuterLabels:5},binaryCharts:[],integratedBinaryCharts:[],barCharts:[],binaryChartBufferInner:5,binaryChartBufferSiblings:.01,binaryChartThickness:15,binaryChartDisjointed:false,barChartBufferInner:3,barChartHeight:50,barChartWidth:.5,mouseRollOver:function(e){if(e.node.edgeCircleHighlight){e.node.edgeCircleHighlight.show()}else{var t=e.svg.draw(new Smits.PhyloCanvas.Render.Circle(e.x,e.y,5,{attr:Smits.PhyloCanvas.Render.Style.highlightedEdgeCircle}));e.node.edgeCircleHighlight=t[0]}e.textEl.attr({fill:"red"})},mouseRollOut:function(e){e.node.edgeCircleHighlight.hide();e.textEl.attr({fill:"#000"})},set:function(e,t,n){if(!this.jsOverride){if(n){if(n=="circular"){this["Circular"][e]=parseFloat(t)}else if(n=="rectangular"){this["Rectangular"][e]=parseFloat(t)}}else{this[e]=parseFloat(t)}}}};Smits.PhyloCanvas.Render.Line=function(){return function(e,t,n,r,i){this.type="line";this.attr=Smits.PhyloCanvas.Render.Style.line;this.x1=e;this.x2=t;this.y1=n;this.y2=r;if(i){Smits.Common.apply(this,i);if(i.attr)this.attr=i.attr}}}();Smits.PhyloCanvas.Render.Text=function(){return function(e,t,n,r){this.type="text";this.attr=Smits.PhyloCanvas.Render.Style.text;this.x=e;this.y=t;this.text=n;if(r){Smits.Common.apply(this,r);if(r.attr)this.attr=r.attr}}}();Smits.PhyloCanvas.Render.Path=function(){var e=Smits.PhyloCanvas.Render.Style.path;return function(e,t){this.type="path";this.attr=Smits.PhyloCanvas.Render.Style.path;this.path=e;if(t){Smits.Common.apply(this,t);if(t.attr)this.attr=t.attr}}}();Smits.PhyloCanvas.Render.Circle=function(){return function(e,t,n,r){this.type="circle";this.x=e;this.y=t;this.radius=n;if(r){Smits.Common.apply(this,r);if(r.attr)this.attr=r.attr}}}();Smits.PhyloCanvas.Render.SVG=function(){var e,t;return function(t,n,r){e=t;this.canvasSize=[n,r];this.svg=Raphael(t,this.canvasSize[0],this.canvasSize[1])}}();Smits.PhyloCanvas.Render.SVG.prototype={render:function(){var e=this.phylogramObject.getDrawInstructs();console.log("render",this.phylogramObject.getDrawInstructs());for(var t=0;t<e.length;t++){if(e[t].type=="line"){var n=this.svg.path(["M",e[t].x1,e[t].y1,"L",e[t].x2,e[t].y2]).attr(Smits.PhyloCanvas.Render.Style.line)}else if(e[t].type=="path"){var r=this.svg.path(e[t].path).attr(e[t].attr)}else if(e[t].type=="circle"){var r=this.svg.circle(e[t].x,e[t].y,e[t].radius).attr({stroke:"red"})}else{var i=this.svg.text(e[t].x,e[t].y,e[t].text).attr(Smits.PhyloCanvas.Render.Style.text);if(e[t].attr){i.attr(e[t].attr)}if(e[t].rotate){i.rotate(e[t].rotate)}var s=i.getBBox();var o=Math.sqrt(s.height*s.height+s.width*s.width)}}},draw:function(e){var t,n;if(e.type=="line"){t=this.svg.path(["M",e.x1,e.y1,"L",e.x2,e.y2]).attr(Smits.PhyloCanvas.Render.Style.line)}else if(e.type=="path"){t=this.svg.path(e.path).attr(e.attr)}else if(e.type=="circle"){t=this.svg.circle(e.x,e.y,e.radius).attr({stroke:"red"})}else if(e.type=="text"){t=this.svg.text(e.x,e.y,e.text).attr(Smits.PhyloCanvas.Render.Style.text);if(e.attr){t.attr(e.attr)}if(e.rotate){t.rotate(e.rotate)}var r=t.getBBox();n=Math.sqrt(r.height*r.height+r.width*r.width)}return[t,n]}};Smits.PhyloCanvas.Render.Phylogram=function(){var e,t=Smits.PhyloCanvas.Render.Parameters.Rectangular,n,r,i,s,o,u,a=true,f=0,l=0,c,h,p,d,v,m,g,b,w,E,S,x,T=[],N=function(e){return e+Math.round(e/4)},C=function(e,t,n,r){return["M",e,t,"L",n,t,"L",n,r,"L",e,r,"Z"]},k=function(n,r){if(n.len&&a==false&&n.children.length==0){f=Smits.Common.roundFloat(f+s,4)}if(n.children.length>0){var u=[],c,h,p,d;if(n.len){c=r;h=r=Smits.Common.roundFloat(r+i*n.len,4);p=f+n.getMidbranchPosition(a)*s;d=p;e.draw(new Smits.PhyloCanvas.Render.Line(c,h,p,d))}if(n.name){var v={};v=Smits.PhyloCanvas.Render.Style.getStyle("bootstrap","text");if(n.uri){v.href=n.uri}if(n.description){v.title=n.description}if(n.level==0){var m=f+n.getMidbranchPosition(a)*s}else{var m=d}e.draw(new Smits.PhyloCanvas.Render.Text((h||r)+5,m,n.name,{attr:v}))}if(n.children&&n.children.length){for(var g=0;g<n.children.length;g++){var y=n.children[g];u.push(k(y,r))}}var b=[];for(var g=0;g<u.length;g++){if(u[g][0])b.push(u[g][0]);if(u[g][1])b.push(u[g][1])}var w=Math.min.apply(null,b);var E=Math.max.apply(null,b);e.draw(new Smits.PhyloCanvas.Render.Path(["M",r+1e-4,w,"L",r,w,"L",r,E,"L",r+1e-4,E],{attr:Smits.PhyloCanvas.Render.Style.line}))}else{c=r;h=Smits.Common.roundFloat(r+i*n.len,2);p=f;d=f;n.y=f;T.push(n);e.draw(new Smits.PhyloCanvas.Render.Line(c,h,p,d));if(t.alignRight){e.draw(new Smits.PhyloCanvas.Render.Path(["M",h,p,"L",t.alignPadding+o,d],{attr:Smits.PhyloCanvas.Render.Style.connectedDash}))}if(n.name){var v={};if(n.style){v=Smits.PhyloCanvas.Render.Style.getStyle(n.style,"text")}v["text-anchor"]="start";if(n.uri){v.href=n.uri}if(n.description){v.title=n.description}var S=e.draw(new Smits.PhyloCanvas.Render.Text(t.alignRight?o+t.bufferInnerLabels+t.alignPadding:h+t.bufferInnerLabels,d,n.name,{attr:v}));l=Math.max(S[1],l);if(Smits.PhyloCanvas.Render.Parameters.mouseRollOver){Smits.Common.addRaphEventHandler(S[0],"mouseover",Smits.PhyloCanvas.Render.Parameters.mouseRollOver,{svg:e,node:n,x:h,y:d,textEl:S[0]})}if(Smits.PhyloCanvas.Render.Parameters.mouseRollOut){Smits.Common.addRaphEventHandler(S[0],"mouseout",Smits.PhyloCanvas.Render.Parameters.mouseRollOut,{svg:e,node:n,x:h,y:d,textEl:S[0]})}if(Smits.PhyloCanvas.Render.Parameters.onClickAction){Smits.Common.addRaphEventHandler(S[0],"click",Smits.PhyloCanvas.Render.Parameters.onClickAction,{svg:e,node:n,x:h,y:d,textEl:S[0]})}}if(a){a=false}}return[p,d]},L=function(){y=f+s;d=0;v=t.showScaleBar*i;e.draw(new Smits.PhyloCanvas.Render.Line(d,v,y,y));e.draw(new Smits.PhyloCanvas.Render.Text((d+v)/2,y-8,t.showScaleBar))},A=function(t,n,r){var i=(r&&r.bufferInner?r.bufferInner:0)|Smits.PhyloCanvas.Render.Parameters.binaryChartBufferInner,o=(r&&r.bufferSiblings?r.bufferSiblings*s:0)|(Smits.PhyloCanvas.Render.Parameters.binaryChartBufferSiblings<1?s*Smits.PhyloCanvas.Render.Parameters.binaryChartBufferSiblings:Smits.PhyloCanvas.Render.Parameters.binaryChartBufferSiblings),u=(r&&r.thickness?r.thickness:0)|Smits.PhyloCanvas.Render.Parameters.binaryChartThickness,a;for(var f=0;f<T.length;f++){var l=T[f];e.draw(new Smits.PhyloCanvas.Render.Path(C(t+i,l.y-s/2+o/2,t+i+u,l.y+s/2-o/2),{attr:Smits.PhyloCanvas.Render.Style.getStyle(l.chart[n],"textSecantBg")}))}return t+i+u},O=function(t,n,r){var i=[],o,u=r&&r.bufferInner?r.bufferInner:0|Smits.PhyloCanvas.Render.Parameters.barChartBufferInner,a=r&&r.height?r.height:0|Smits.PhyloCanvas.Render.Parameters.barChartHeight,f=r&&r.width?r.width<1?s*r.width:r.width:0|(Smits.PhyloCanvas.Render.Parameters.barChartWidth<1?s*Smits.PhyloCanvas.Render.Parameters.barChartWidth:Smits.PhyloCanvas.Render.Parameters.barChartWidth),l=0;for(var c=0;c<T.length;c++){i.push(T[c].chart[n])}o=Math.max.apply(null,i);l=Smits.Common.roundFloat(a/o,4);for(var c=0;c<T.length;c++){var h=T[c];e.draw(new Smits.PhyloCanvas.Render.Path(C(t+u,h.y-f/2,t+u+l*h.chart[n],h.y+f/2),{attr:Smits.PhyloCanvas.Render.Style.getStyle(h.chart[n],"barChart")}))}return t+u+a};return function(a,h){this.getCanvasSize=function(){return[n,r]};this.getRoot=function(){return h.getRoot()};if(h.getValidate()){e.draw(0,0,h.getValidate())}e=a;var d=h.getRoot();var v=h.getNewickLen();n=e.canvasSize[0];r=e.canvasSize[1];E=t.bufferX;S=t.paddingX;x=t.paddingY;u=t.minHeightBetweenLeaves;f=x;i=Math.round((n-E-S*2)/v);s=Math.round((r-x*2)/(t.showScaleBar?d.getCountAllChildren():d.getCountAllChildren()-1));if(s<u){s=u}o=Math.round(n-E-S*2);if(Smits.PhyloCanvas.Render.Parameters.binaryCharts.length||Smits.PhyloCanvas.Render.Parameters.barCharts.length){t.alignRight=true}k(d,S);if(t.showScaleBar){L()}c=o+l+t.bufferInnerLabels;if(Smits.PhyloCanvas.Render.Parameters.binaryCharts.length){var m=Smits.PhyloCanvas.Render.Parameters.binaryCharts;for(var g in m){c=A(c,m[g].chart,m[g])}}if(Smits.PhyloCanvas.Render.Parameters.barCharts.length){var y=Smits.PhyloCanvas.Render.Parameters.barCharts;for(var g in y){p=O(c,y[g].chart,y[g])}}}}();Smits.PhyloCanvas.Render.Phylogram.prototype={};Smits.PhyloCanvas.Render.CircularPhylogram=function(){function S(e,t){t+=w;return[Smits.Common.roundFloat(c+e*Math.sin(t*E),4),Smits.Common.roundFloat(h+e*Math.cos(t*E),4)]}function x(e){var t=C(90-e-w);if(t>90&&t<270){t+=180;var n="end"}else{var n="start"}return[t,n]}function T(e,t,n,r){var i=S(e,t);var s=S(e,n);var o=[],u,a=0;if(Math.abs(C(n-t))>180){u=1}else{u=-1}if(r&&r.invertSecant){u*=-1;a=1}if(r&&r.noMove){}else{o.push("M")}o.push(i[0],i[1],"A",e,e,0,u<1?0:1,a,s[0],s[1]);return o}function N(e,t,n,r){var i=[];var s=S(t,e);var o=S(n,e);if(r&&r.noMove){}else{i.push("M")}i.push(s[0],s[1],"L",o[0],o[1]);return i}function C(e){while(e>360||e<0){if(e>360){e-=360}else if(e<0){e+=360}}return e}function k(e,t,n,r){if(!t&&e.length>1){var r=e[3];var n=e[2];var t=e[1];var e=e[0]}var i=A("M",T(e,n,r,{noMove:1,invertSecant:0}),"L",T(t,r,n,{noMove:1,invertSecant:1}),"Z");return i}function L(n,r){r=r;if(n.id==1){f=true}if(n.len){if(f){l=g||1}else{if(n.children.length==0)l=Smits.Common.roundFloat(l+o,4)}}if(n.children.length>0){var i=[],u,a,c,h;u=r;a=r+=Smits.Common.roundFloat(s*n.len,4);if(n.name){}if(n.children&&n.children.length){for(var m=0;m<n.children.length;m++){var y=n.children[m];var w=L(y,r);if(w>0)i.push(w)}}var E=Smits.Common.roundFloat(Math.min.apply(null,i),4);var C=Smits.Common.roundFloat(Math.max.apply(null,i),4);if(n.level!=0){e.draw(new Smits.PhyloCanvas.Render.Path(A("M",S(r+.01,E),"L",T(r,E,C,{noMove:true}),"L",S(r+.01,C))))}if(n.len){c=Smits.Common.roundFloat(E+(C-E)/2,4);e.draw(new Smits.PhyloCanvas.Render.Path(N(c,u,a)))}}else{n.y=l;d.push(n);u=r;a=r=Smits.Common.roundFloat(r+s*n.len);c=l;e.draw(new Smits.PhyloCanvas.Render.Path(N(c,u,a)));e.draw(new Smits.PhyloCanvas.Render.Path(N(c,a,p),{attr:Smits.PhyloCanvas.Render.Style.connectedDash}));if(n.name){var k=S(p+t.bufferInnerLabels,c);var O=x(c);var M=O[0];var _=O[1];var D={};if(n.style){Smits.Common.apply(D,Smits.PhyloCanvas.Render.Style.getStyle(n.style,"text"))}D["text-anchor"]=_;if(n.uri){D.href=n.uri}if(n.description){D.title=n.description}var P=e.draw(new Smits.PhyloCanvas.Render.Text(k[0],k[1],n.name,{attr:D,rotate:[M,k[0],k[1]]}));if(n.bgStyle){v.push([n.bgStyle,c])}var k=S(a,c);if(Smits.PhyloCanvas.Render.Parameters.mouseRollOver){Smits.Common.addRaphEventHandler(P[0],"mouseover",Smits.PhyloCanvas.Render.Parameters.mouseRollOver,{svg:e,node:n,x:k[0],y:k[1],textEl:P[0]})}if(Smits.PhyloCanvas.Render.Parameters.mouseRollOut){Smits.Common.addRaphEventHandler(P[0],"mouseout",Smits.PhyloCanvas.Render.Parameters.mouseRollOut,{svg:e,node:n,x:k[0],y:k[1],textEl:P[0]})}if(Smits.PhyloCanvas.Render.Parameters.onClickAction){Smits.Common.addRaphEventHandler(P[0],"click",Smits.PhyloCanvas.Render.Parameters.onClickAction,{svg:e,node:n,x:k[0],y:k[1],textEl:P[0]})}b=Math.max(P[1],b)}}if(f){f=false}return c}function A(e){var t=e;for(var n=1;n<arguments.length;n++){t=t.concat(arguments[n])}return t}function O(){var n=[];if(v.length>0){if(Smits.PhyloCanvas.Render.Style["jsphylosvgGradientList"]){for(var r=0;r<Smits.PhyloCanvas.Render.Style["jsphylosvgGradientList"].length;r++){var i=Smits.PhyloCanvas.Render.Style["jsphylosvgGradientList"][r];var s=Smits.Common.createGradientEl(i,Smits.PhyloCanvas.Render.Style[i],[c,h,p+b+t.bufferOuterLabels]);e.svg.defs.appendChild(s)}}for(var r=0;r<v.length;r++){if(r!=v.length-1&&v[r][0]==v[r+1][0]){v[r+1][2]=v[r][2]?v[r][2]:v[r][1];continue}var n=k(p,p+b+t.bufferOuterLabels,v[r][2]?v[r][2]-o/2:v[r][1]-o/2,v[r][1]+o/2);var u=Smits.PhyloCanvas.Render.Style.getStyle(v[r][0],"textSecantBg");var a=e.draw(new Smits.PhyloCanvas.Render.Path(n,{attr:u.type?{}:u}));if(u.type&&u.type=="radialGradient"){a[0].node.setAttribute("fill","url(#"+u.name+")")}if(u.type&&u.type=="radialGradient"){a[0].node.setAttribute("stroke","none")}a[0].toBack()}}var n=k(p,p+b+t.bufferOuterLabels,(g||1)-o/2,360-o/2);var a=e.draw(new Smits.PhyloCanvas.Render.Path(n,{attr:Smits.PhyloCanvas.Render.Style.textSecantBg}));a[0].toBack();return p+b+t.bufferOuterLabels}function M(t,n,r){var i=r&&r.bufferInner?parseFloat(r.bufferInner):Smits.PhyloCanvas.Render.Parameters.binaryChartBufferInner,s=(r&&r.bufferSiblings?r.bufferSiblings*o:0)|(Smits.PhyloCanvas.Render.Parameters.binaryChartBufferSiblings<1?o*Smits.PhyloCanvas.Render.Parameters.binaryChartBufferSiblings:Smits.PhyloCanvas.Render.Parameters.binaryChartBufferSiblings),u=r&&r.thickness?parseFloat(r.thickness):Smits.PhyloCanvas.Render.Parameters.binaryChartThickness,a=(r&&r.disjointed?r.disjointed:false)|Smits.PhyloCanvas.Render.Parameters.binaryChartDisjointed,f=r&&r.isInternal?r.isInternal:false,l=true,c;for(var h=0;h<d.length;h++){var v=d[h];if((!d[h+1]||v.chart[n]!==d[h+1].chart[n]||a)&&v.chart[n]!="none"){var m=Smits.PhyloCanvas.Render.Style.getStyle(v.chart[n],"textSecantBg");if(f){var g=[p-i-u,p-i,(c?c:v.y)-o/2+(l&&!a?0:s/2),v.y+o/2-(h==d.length-1&&!a?0:s/2)]}else{var g=[t+i,t+i+u,(c?c:v.y)-o/2+(l&&!a?0:s/2),v.y+o/2-(h==d.length-1&&!a?0:s/2)]}if(m.label){var y=Smits.PhyloCanvas.Render.Style.getStyle(m.labelStyle,"text");var b=S((g[0]+g[1])/2,(g[2]+g[3])/2);var E=x((g[2]+g[3])/2);var T=C(E[0]+(y["rotate"]?parseFloat(y["rotate"]):0));var N=C(90-(g[2]+g[3])/2-w);if(N>90&&N<270){T+=180}if(!y["text-anchor"]){y["text-anchor"]="middle"}var L=e.draw(new Smits.PhyloCanvas.Render.Text(b[0],b[1],m.label,{attr:y,rotate:T}));L[0].toBack()}if(m.borderStyle){var A=Smits.PhyloCanvas.Render.Style.getStyle(m.borderStyle,"textSecantBg");var O=[p,A.fullsize?g[1]:g[0],g[2],g[3]];var M=e.draw(new Smits.PhyloCanvas.Render.Path(k(O),{attr:A}));M[0].toBack()}var _=e.draw(new Smits.PhyloCanvas.Render.Path(k(g),{attr:m}));_[0].toBack();c=0;l=false}else{if(!c){c=v.y}if(v.chart[n]=="none"){c=0}}l=false}return f?t:t+i+u}function _(t,n,r){var i=[],s,u=r&&r.bufferInner?parseFloat(r.bufferInner):Smits.PhyloCanvas.Render.Parameters.barChartBufferInner,a=r&&r.height?parseFloat(r.height):Smits.PhyloCanvas.Render.Parameters.barChartHeight?Smits.PhyloCanvas.Render.Parameters.barChartHeight:0,f=r&&r.width?parseFloat(r.width)<1?o*parseFloat(r.width):parseFloat(r.width):0|(Smits.PhyloCanvas.Render.Parameters.barChartWidth<1?o*Smits.PhyloCanvas.Render.Parameters.barChartWidth:Smits.PhyloCanvas.Render.Parameters.barChartWidth),l=0;for(var c=0;c<d.length;c++){i.push(d[c].chart[n])}s=Math.max.apply(null,i);l=Smits.Common.roundFloat(a/s,4);for(var c=0;c<d.length;c++){var h=d[c];if(h.chart[n]>0){e.draw(new Smits.PhyloCanvas.Render.Path(k(t+u,t+u+l*h.chart[n],h.y-f/2,h.y+f/2),{attr:Smits.PhyloCanvas.Render.Style.getStyle(h.chart[n],"barChart")}))}}return t+u+a}var e,t=Smits.PhyloCanvas.Render.Parameters.Circular,n,r,i,s,o,u,a,f=true,l=0,c,h,p,d=[],v=[],m,g,y,b=0,w,E=Math.PI/180;return function(f,l,d){this.getCanvasSize=function(){return[n,r]};this.getRoot=function(){return l.getRoot()};if(l.getValidate()){f.draw({type:"text",x:0,y:f.canvasSize[1]/3,text:l.getValidate()});return}e=f;var v=l.getRoot();var m=l.getNewickLen();n=e.canvasSize[0];r=e.canvasSize[1];c=n/2;h=r/2;i=Math.min.apply(null,[n,r]);d=t.bufferRadius>1?t.bufferRadius:Smits.Common.roundFloat(i*t.bufferRadius,4);g=t.bufferAngle;a=t.innerCircleRadius;u=t.minHeightBetweenLeaves;w=t.initStartAngle;p=Math.round((i-d-a)/2);s=(p-a)/m;o=Smits.Common.roundFloat((360-g)/v.getCountAllChildren(),4);L(v,a);y=p+b+t.bufferOuterLabels;if(Smits.PhyloCanvas.Render.Parameters.integratedBinaryCharts.length){var E=Smits.PhyloCanvas.Render.Parameters.integratedBinaryCharts;for(var S in E){var x=E[S].bufferInner?E[S].bufferInner:Smits.PhyloCanvas.Render.Parameters.binaryChartBufferInner;var T=E[S].thickness?E[S].thickness:Smits.PhyloCanvas.Render.Parameters.binaryChartThickness;y=M(y-T-x,E[S].chart,E[S])}}y=O();if(Smits.PhyloCanvas.Render.Parameters.binaryCharts.length){var N=Smits.PhyloCanvas.Render.Parameters.binaryCharts;for(var S in N){y=M(y,N[S].chart,N[S])}}if(Smits.PhyloCanvas.Render.Parameters.barCharts.length){var C=Smits.PhyloCanvas.Render.Parameters.barCharts;for(var S in C){y=_(y,C[S].chart,C[S])}}}}();Smits.PhyloCanvas.Render.CircularPhylogram.prototype={};var XMLObjectifier=function(){var e=function(e){if(!!e&&typeof e==="object"){function t(){}t.prototype=e;return new t}};var t=function(e){var t="";if(!!e&&typeof e==="string"){t=e}var n=/^((-)?([0-9]*)((\.{0,1})([0-9]+))?$)/;return n.test(t)};var n={xmlToJSON:function(n){try{if(!n){return null}var r={};r.typeOf="JSXBObject";var i=n.nodeType==9?n.documentElement:n;r.RootName=i.nodeName||"";if(n.nodeType==3||n.nodeType==4){return n.nodeValue}function s(e){return e.replace(/^\s+|\s+$/gm,"")}function o(e){var t=/-/g;var n=String(e).replace(t,"_");return n}function u(e,t){if(t.attributes.length>0){var n=t.attributes.length-1;var r;e._attributes=[];do{r=String(o(t.attributes[n].name));e._attributes.push(r);e[r]=s(t.attributes[n].value)}while(n--)}}var a=function(){var e={activate:function(){var e=[];if(!!e){e.getNodesByAttribute=function(t,n){if(!!e&&e.length>0){var r=[];var i;var s=e.length-1;try{do{i=e[s];if(i[t]===n){r.push(i)}}while(s--);r.reverse();return r}catch(o){return null}return null}};e.getNodeByAttribute=function(t,n){if(!!e&&e.length>0){var r;var i=e.length-1;try{do{r=e[i];if(r[t]===n){return r}}while(i--)}catch(s){return null}return null}};e.getNodesByValue=function(t){if(!!e&&e.length>0){var n=[];var r;var i=e.length-1;try{do{r=e[i];if(!!r.Text&&r.Text===t){n.push(r)}}while(i--);return n}catch(s){return null}return null}};e.contains=function(t,n){if(!!e&&e.length>0){var r=e.length-1;try{do{if(e[r][t]===n){return true}}while(r--)}catch(i){return false}return false}};e.indexOf=function(t,n){var r=-1;if(!!e&&e.length>0){var i=e.length-1;try{do{if(e[i][t]===n){r=i}}while(i--)}catch(s){return-1}return r}};e.SortByAttribute=function(t,n){if(!!e&&e.length>0){function r(e,t){var n=e[t];n=bam.validation.isNumeric(n)?parseFloat(n):n;return n}function i(e,i){var s,o;s=r(e,t);o=r(i,t);var u=s<o?-1:o<s?1:0;if(!!n){u=n.toUpperCase()==="DESC"?0-u:u}return u}e.sort(i)}};e.SortByValue=function(t){if(!!e&&e.length>0){function n(e){var t=e.Text;t=bam.validation.isNumeric(t)?parseFloat(t):t;return t}function r(e,r){var i,s;i=n(e);s=n(r);var o=i<s?-1:s<i?1:0;if(!!t){o=t.toUpperCase()==="DESC"?0-o:o}return o}e.sort(r)}};e.SortByNode=function(t,n){if(!!e&&e.length>0){function r(e,t){var n=e[t][0].Text;n=bam.validation.isNumeric(n)?parseFloat(n):n;return n}function i(e,i){var s,o;s=r(e,t);o=r(i,t);var u=s<o?-1:o<s?1:0;if(!!n){u=n.toUpperCase()==="DESC"?0-u:u}return u}e.sort(i)}}}return e}};return e}();var f=function(){var t=e(a);return t.activate()};function l(e){e.getNodeByAttribute=function(e,t){if(this.length>0){var n;var r=this.length-1;try{do{n=this[r];if(n[e]==t){return n}}while(r--)}catch(i){return false}return false}};e.contains=function(e,t){if(this.length>0){var n=this.length-1;try{do{if(this[n][e]==t){return true}}while(n--)}catch(r){return false}return false}};e.indexOf=function(e,t){var n=-1;if(this.length>0){var r=this.length-1;try{do{if(this[r][e]==t){n=r}}while(r--)}catch(i){return-1}return n}};e.SortByAttribute=function(e,n){if(this.length){function r(e,n){var r=e[n];r=t(r)?parseFloat(r):r;return r}function i(t,i){var s=0;var o,u;o=r(t,e);u=r(i,e);if(o<u){s=-1}else if(u<o){s=1}if(n){s=n.toUpperCase()=="DESC"?0-s:s}return s}this.sort(i)}};e.SortByValue=function(e){if(this.length){function n(e){var n=e.Text;n=t(n)?parseFloat(n):n;return n}function r(t,r){var i=0;var s,o;s=n(t);o=n(r);if(s<o){i=-1}else if(o<s){i=1}if(e){i=e.toUpperCase()=="DESC"?0-i:i}return i}this.sort(r)}};e.SortByNode=function(e,n){if(this.length){function r(e,n){var r=e[n][0].Text;r=t(r)?parseFloat(r):r;return r}function i(t,i){var s=0;var o,u;o=r(t,e);u=r(i,e);if(o<u){s=-1}else if(u<o){s=1}if(n){s=n.toUpperCase()=="DESC"?0-s:s}return s}this.sort(i)}}}function c(e,t){var n;var r;var i;var a="";if(!t){return null}if(t.attributes.length>0){u(e,t)}e.Text="";if(t.hasChildNodes()){var f=t.childNodes.length-1;var h=0;do{r=t.childNodes[h];switch(r.nodeType){case 1:e._children=[];n=r.localName?r.localName:r.baseName;n=o(n);if(a!=n){e._children.push(n)}if(!e[n]){e[n]=[]}i={};e[n].push(i);if(r.attributes.length>0){u(i,r)}if(!e[n].contains){l(e[n])}a=n;if(r.hasChildNodes()){c(i,r)}break;case 3:e.Text+=s(r.nodeValue);break;case 4:e.Text+=r.text?s(r.text):s(r.nodeValue);break}}while(h++<f)}}c(r,i);n=null;i=null;return r}catch(h){return null}},textToXML:function(e){var t=null;try{t=document.all?new ActiveXObject("Microsoft.XMLDOM"):new DOMParser;t.async=false}catch(n){throw new Error("XML Parser could not be instantiated")}var r;try{if(document.all){r=t.loadXML(e)?t:false}else{r=t.parseFromString(e,"text/xml")}}catch(n){throw new Error("Error parsing XML string")}return r}};return n}();Smits.PhyloCanvas.Node=function(){return function(e,t){this.id=Smits.Common.nodeIdIncrement+=1;this.level=0;this.len=0;this.newickLen=0;this.name="";this.type="";this.chart={};this.img=[];if(e)Smits.Common.apply(this,e);this._countAllChildren=false;this._countImmediateChildren=false;this._midBranchPosition=false;this.children=new Array;if(t){t.children.push(this)}}}();Smits.PhyloCanvas.Node.prototype={getCountAllChildren:function(){if(this._countAllChildren!==false)return this._countAllChildren;var e=0;for(var t in this.children){if(Smits.Common.isInteger(t)){var n=this.children[t];if(n.children&&n.children.length>0){e+=n.getCountAllChildren()}else{e++}}}this._countAllChildren=e;return e},getCountImmediateChildren:function(){if(this._countImmediateChildren!==false)return this._countImmediateChildren;var e=0;for(var t in this.children){var n=this.children[t];e+=n.length}this._countImmediateChildren=e;return e},getMidbranchPosition:function(e){if(this._midBranchPosition!==false)return this._midBranchPosition;var t=[0,0];for(var n=0;n<this.children.length;n++){var r=this.children[n];if(r.children&&r.children.length>0){if(n==0&&e){t[0]=r.getMidbranchPosition(true);t[1]+=r.getCountAllChildren()-1}else if(n==0){t[0]=r.getMidbranchPosition();t[1]+=r.getCountAllChildren()}else if(n==this.children.length-1){t[1]+=r.getMidbranchPosition()}else{t[1]+=r.getCountAllChildren()}}else{if(n==0&&e){t[0]=0}else if(n==0){t[0]=1;t[1]+=1}else if(n==this.children.length-1){t[1]+=1}else{t[1]+=1}}}this._midBranchPosition=t[1]>=t[0]?(t[1]+t[0])/2:t[0];return this._midBranchPosition}};Smits.PhyloCanvas.NewickParse=function(){var e,t,n,r=0,i=0,s,o,u=function(e){var n=new Smits.PhyloCanvas.Node;while(t!==")"&&t!==","){if(t===":"){c();n.len=Smits.Common.roundFloat(f(),4);if(n.len==0){n.len=1e-4}}else if(t==="'"||t==='"'){n.type="label";n.name=l(t)}else{n.type="label";n.name=f()}}n.level=e.level+1;return n},a=function(e){var n=new Smits.PhyloCanvas.Node;if(e){n.level=e.level+1}while(t!==")"){c();if(t==="("){n.children.push(a(n))}else{n.children.push(u(n))}}c();if(t!==":"&&t!==")"&&t!==","&&t!==";"){n.type="label";n.name=f()}if(t===":"){c();n.len=Smits.Common.roundFloat(f(),4);if(n.len==0){n.len=1e-4}n.type="stem"}return n},f=function(){var e="";while(t!==":"&&t!==")"&&t!==","&&t!==";"){e+=t;c()}return e},l=function(e){var n="";while(t!==e){n+=t;c()}return n},c=function(){t=e.charAt(n);n+=1;return t},h=function(e,t){if(e.children&&e.children.length){for(var n=0;n<e.children.length;n++){var s=e.children[n];if(s.len===0){s.len=1}s.newickLen=Smits.Common.roundFloat(s.len+e.newickLen,4);if(s.level>r)r=s.level;if(s.newickLen>i)i=s.newickLen;if(s.children.length>0){h(s,e)}}}return e};return function(t){this.getRoot=function(){return s};this.getLevels=function(){return r};this.getNewickLen=function(){return i};this.getValidate=function(){return o};r=0;i=0;e=t;n=0;c();s=a();s=h(s)}}();Smits.PhyloCanvas.NewickParse.prototype={};Smits.PhyloCanvas.PhyloxmlParse=function(){var e=0,t=0,n,r,i=function(e,t){var n=new Smits.PhyloCanvas.Node;if(t){n.level=t.level+1}if(e.clade&&e.clade.length){for(var s=0;s<e.clade.length;s++){var o=e.clade[s];n.children.push(i(o,n))}}if(e.branch_length){if(typeof e.branch_length==="object"){e.branch_length=e.branch_length[0].Text}n.len=Smits.Common.roundFloat(e.branch_length,4);if(n.len==0){n.len=1e-4}}if(e.name){n.type="label";n.name=e.name[0].Text;if(e.name[0]&&e.name[0].style){n.style=e.name[0].style}if(e.name[0]&&e.name[0].bgStyle){n.bgStyle=e.name[0].bgStyle}}else if(e.confidence){n.name=e.confidence[0].Text}if(e.sequence&&e.sequence[0]&&e.sequence[0].name&&e.sequence[0].name[0]&&e.sequence[0].name[0].Text){n.sequenceName=e.sequence[0].name[0].Text}if(e.taxonomy&&e.taxonomy[0]){if(e.taxonomy[0].scientific_name&&e.taxonomy[0].scientific_name[0]&&e.taxonomy[0].scientific_name[0].Text){n.taxonomyScientificName=e.taxonomy[0].scientific_name[0].Text}if(e.taxonomy[0].common_name&&e.taxonomy[0].common_name[0]&&e.taxonomy[0].common_name[0].Text){n.taxonomyCommonName=e.taxonomy[0].common_name[0].Text}}if(e.sequence&&e.sequence[0]&&e.sequence[0].accession&&e.sequence[0].accession[0]&&e.sequence[0].accession[0].Text){n.sequenceAccession=e.sequence[0].accession[0].Text}if(e.point){n.LatLong=[e.point[0].lat[0].Text,e.point[0]["long"][0].Text]}if(!n.name){if(n.sequenceName){n.name=n.sequenceName}else if(n.taxonomyScientificName){n.name=n.taxonomyScientificName}else if(n.taxonomyCommonName){n.name=n.taxonomyCommonName}else if(n.sequenceAccession){n.name=n.sequenceAccession}if(n.name){n.type="label"}}if(e.annotation){if(e.annotation[0]&&e.annotation[0].desc&&e.annotation[0].desc[0]&&e.annotation[0].desc[0].Text){n.description=e.annotation[0].desc[0].Text}if(e.annotation[0]&&e.annotation[0].uri&&e.annotation[0].uri[0]&&e.annotation[0].uri[0].Text){n.uri=e.annotation[0].uri[0].Text}if(e.annotation[0]&&e.annotation[0].img){for(var s in e.annotation[0].img){if(Smits.Common.isInteger(s)){n.img[s]=e.annotation[0].img[s].Text}}}}if(e.chart){if(e.chart[0]){for(var s in e.chart[0]){if(s!="Text"&&s!="_children"){n.chart[s]=e.chart[0][s][0].Text}}}}if(n&&n.level>1){if(!n.len){r="Error. Please include Branch Lengths - we only draw rooted phylogenetic trees."}}return n},s=function(n,r){if(n.children&&n.children.length){for(var i=0;i<n.children.length;i++){var o=n.children[i];o.newickLen=Math.round((o.len+n.newickLen)*1e4)/1e4;if(o.level>e)e=o.level;if(o.newickLen>t)t=o.newickLen;if(o.children.length>0){s(o,n)}}}return n},o=function(e,t){for(var n in e){if(n!="_children"&&n!="Text"){if(n=="rectangular"||n=="circular"){o(e[n][0],n)}else{if(!Smits.PhyloCanvas.Render.Parameters[n]){Smits.PhyloCanvas.Render.Parameters[n]={}}Smits.PhyloCanvas.Render.Parameters.set(n,e[n][0].Text,t)}}}return};return function(u){this.getRoot=function(){return n};this.getLevels=function(){return e};this.getNewickLen=function(){return t};this.getValidate=function(){return r};if(u.phylogeny&&u.phylogeny[0]&&u.phylogeny[0].clade){n=i(u.phylogeny[0].clade[0])}if(u.phylogeny&&u.phylogeny[0]&&u.phylogeny[0].render&&u.phylogeny[0].render[0]){var a=u.phylogeny[0].render[0];if(a&&a.styles){var f=a.styles[0];for(var l in f){if(l!="_children"&&l!="Text"){if(f[l][0]["type"]&&f[l][0]["type"]=="radialGradient"&&Raphael.svg){f[l][0]["name"]=l;Smits.PhyloCanvas.Render.Style[l]=f[l][0];if(!Smits.PhyloCanvas.Render.Style["jsphylosvgGradientList"]){Smits.PhyloCanvas.Render.Style["jsphylosvgGradientList"]=[]}Smits.PhyloCanvas.Render.Style["jsphylosvgGradientList"].push(l)}else{if(!Smits.PhyloCanvas.Render.Style[l]){Smits.PhyloCanvas.Render.Style[l]={}}for(var c in f[l][0]){if(c!="_attributes"&&c!="_children"&&c!="type"){Smits.PhyloCanvas.Render.Style[l][c.replace("_","-")]=f[l][0][c]}}}}}}if(a&&a.parameters){o(a.parameters[0])}if(a&&a.charts){var h=a.charts[0];for(var l in h){if(l!="_children"&&l!="Text"){for(var c in h[l]){if(h[l][c].type=="binary"){h[l][c].chart=l;Smits.PhyloCanvas.Render.Parameters.binaryCharts.push(h[l][c])}else if(h[l][c].type=="integratedBinary"){h[l][c].chart=l;Smits.PhyloCanvas.Render.Parameters.integratedBinaryCharts.push(h[l][c])}else if(h[l][c].type=="bar"){h[l][c].chart=l;Smits.PhyloCanvas.Render.Parameters.barCharts.push(h[l][c])}}}}}}n=s(n)}}();Smits.PhyloCanvas.PhyloxmlParse.prototype={};Smits.PhyloCanvas.NexmlParse=function(){var e=0,t=0,n,r,i,s,o=function(e,t,n){var r=new Smits.PhyloCanvas.Node;if(n){r.level=n.level+1}for(var u=0;u<i.length;u++){if(i[u].source==e.id){for(var a=0;a<s.length;a++){if(i[u].target==s[a].id){r.children.push(o(s[a],i[u].length,r))}}}}if(r&&r.level>0&&!r.len){r.len=1}if(t){r.len=Smits.Common.roundFloat(t,4);if(r.len==0){r.len=1e-4}}if(e.label){r.type="label";r.name=e.label;if(e.style){r.style=e.style}}return r},u=function(n,r){if(n.children&&n.children.length){for(var i=0;i<n.children.length;i++){var s=n.children[i];s.newickLen=Math.round((s.len+n.newickLen)*1e4)/1e4;if(s.level>e)e=s.level;if(s.newickLen>t)t=s.newickLen;if(s.children.length>0){u(s,n)}}}return n},a=function(e,t){for(var n in e){if(n!="_children"&&n!="Text"){if(n=="rectangular"||n=="circular"){a(e[n][0],n)}else{if(!Smits.PhyloCanvas.Render.Parameters[n]){Smits.PhyloCanvas.Render.Parameters[n]={}}Smits.PhyloCanvas.Render.Parameters.set(n,e[n][0].Text,t)}}}return};return function(a,f){this.getRoot=function(){return n};this.getLevels=function(){return e};this.getNewickLen=function(){return t};this.getValidate=function(){return r};if(f.tree&&a.trees[0]&&a.trees[0].tree[f.tree-1]){i=a.trees[0].tree[f.tree-1].edge;s=a.trees[0].tree[f.tree-1].node}else{i=a.trees[0].tree[0].edge;s=a.trees[0].tree[0].node}for(var l=0;l<s.length;l++){var c=0;if(s[l].root&&s[l].root=="true"){n=s[l];break}for(var h=0;h<i.length;h++){if(i[h].target==s[l].id){c++}}if(c==0){n=s[l];break}}if(n){n=o(n);n=u(n)}else{r="Error. Currently, only rooted NeXML trees are supported."}}}();Smits.PhyloCanvas.NexmlParse.prototype={};Smits.PhyloCanvas.NexmlJsonParse=function(){var e=0,t=0,n,r,i=[],s=[],o=function(e,t,n){var u=new Smits.PhyloCanvas.Node;if(n){u.level=n.level+1}for(var a=0;a<i.length;a++){if(i[a].source==e.id){for(var f=0;f<s.length;f++){if(i[a].target==s[f].id){u.children.push(o(s[f],i[a].length,u))}}}}if(t){u.len=Smits.Common.roundFloat(t,4);if(u.len==0){u.len=1e-4}}if(e.label){u.type="label";u.name=e.label;if(e.accession){u.accession=e.accession}if(e.style){u.style=e.style}if(e.bgStyle){u.bgStyle=e.bgStyle}}if(e.chart){u.chart=e.chart}if(u&&u.level>1){if(!u.len){r="Error. Please include Branch Lengths - we only draw rooted phylogenetic trees."}}return u},u=function(n,r){if(n.children&&n.children.length){for(var i=0;i<n.children.length;i++){var s=n.children[i];s.newickLen=Math.round((s.len+n.newickLen)*1e4)/1e4;if(s.level>e)e=s.level;if(s.newickLen>t)t=s.newickLen;if(s.children.length>0){u(s,n)}}}return n},a=function(e,t){for(var n in e){if(n!="_children"&&n!="Text"){if(n=="rectangular"||n=="circular"){a(e[n],n)}else{if(!Smits.PhyloCanvas.Render.Parameters[n]){Smits.PhyloCanvas.Render.Parameters[n]={}}Smits.PhyloCanvas.Render.Parameters.set(n,e[n],t)}}}return};return function(f){this.getRoot=function(){return n};this.getLevels=function(){return e};this.getNewickLen=function(){return t};this.getValidate=function(){return r};var l=f.nexmlJson.nexml;var c=l.render;if(c&&c.styles){var h=c.styles;for(var p in h){if(p!="_children"&&p!="Text"){if(h[p]["@attributes"]["type"]&&h[p]["@attributes"]["type"]=="radialGradient"&&Raphael.svg){h[p]["name"]=p;h[p]["type"]=h[p]["@attributes"]["type"];Smits.PhyloCanvas.Render.Style[p]=h[p];if(!Smits.PhyloCanvas.Render.Style["jsphylosvgGradientList"]){Smits.PhyloCanvas.Render.Style["jsphylosvgGradientList"]=[]}Smits.PhyloCanvas.Render.Style["jsphylosvgGradientList"].push(p)}else{if(!Smits.PhyloCanvas.Render.Style[p]){Smits.PhyloCanvas.Render.Style[p]={}}for(var d in h[p]["@attributes"]){if(d!="_attributes"&&d!="_children"&&d!="type"){Smits.PhyloCanvas.Render.Style[p][d.replace("_","-")]=h[p]["@attributes"][d]}}}}}}if(c&&c.parameters){a(c.parameters)}if(c&&c.charts){var v=c.charts;for(var p in v){v[p]["@attributes"].chart=p;if(v[p]["@attributes"].type=="binary"){Smits.PhyloCanvas.Render.Parameters.binaryCharts.push(v[p]["@attributes"])}else if(v[p]["@attributes"].type=="integratedBinary"){Smits.PhyloCanvas.Render.Parameters.integratedBinaryCharts.push(v[p]["@attributes"])}else if(v[p]["@attributes"].type=="bar"){Smits.PhyloCanvas.Render.Parameters.barCharts.push(v[p]["@attributes"])}}}if(f.tree&&l.trees[0]&&l.trees[0].tree[f.tree-1]){i=l.trees[0].tree[f.tree-1].edge;s=l.trees[0].tree[f.tree-1].node}else{for(var p=0;p<l.trees.tree.edge.length;p++){i.push(l.trees.tree.edge[p]["@attributes"])}for(var p=0;p<l.trees.tree.node.length;p++){var m=l.trees.tree.node[p]["@attributes"];if(m.label){m.chart=l.trees.tree.node[p].chart}s.push(m)}}for(var p=0;p<s.length;p++){if(s[p].root&&s[p].root=="true"){n=s[p]}}if(n){n=o(n);n=u(n)}else{r="Error. Currently, only rooted NeXML trees are supported."}}}();Smits.PhyloCanvas.NexmlParse.prototype={}
