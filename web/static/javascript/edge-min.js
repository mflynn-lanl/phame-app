$(document).ready(function(){function e(){$.ajax({type:"POST",url:"./cgi-bin/edge_user_management.cgi",cache:!1,dataType:"json",data:{action:"check",protocol:location.protocol,sid:sessionStorage.sid},error:function(){$(".no-show-logout").hide(),$("#edge-projet-list-li").hide(),$(".edge-user-btn").hide(),$("a[href=#edge-content-pipeline]").hide(),$("#edge-content-home").prepend("<h2 class='error'>Failed to check user management system. Please check server error log for detail or contact system administrator</h2>"),console.log("ERROR")},success:function(e){e.error?(console.log(e.error),e.error.toLowerCase().indexOf("administrator")>=0?($(".no-show-logout").hide(),$("#edge-projet-list-li").hide(),$(".edge-user-btn").hide(),$("a[href=#edge-content-pipeline]").hide(),$("#edge-content-home").prepend("<h2 class='error'>"+e.error+"</h2>")):($(".no-show-logout").show(),$(".edge-user-btn").hide())):(P=!0,sessionStorage.umStatus=P,sessionStorage.umURL=e.url,sessionStorage.sid=e.sid,O=e.url,$(".no-show-logout").hide(),$(".no-show-login").show(),$("#edge-project-page-li").text("Public Project List"),f(),t())}})}function t(){var e=O.split(":"),t=e.indexOf(location.hostname)?location.protocol+e[1]:O;$("#begin-password-reset").find("iframe").attr("src",t+"/resetPasswd.jsp"),$("#signUpForm").find("iframe").attr("src",t+"/register.jsp"),$("#UpdateProfileForm").find("iframe").attr("src",t+"/userUpdate.jsp")}function i(e,t){var i,o=!0;if(t&&t.length>2){t=t.split(/[ ,]+/);var n=$(this).text().toLowerCase(),r=$(this).data("filtertext")||"";for(r=r.toLowerCase(),i=0;i<t.length;i++)t[i]&&t[i].length>2&&(n.indexOf(t[i].toLowerCase(),0)>=0||r.indexOf(t[i].toLowerCase(),0)>=0)&&(o=!1)}return o}function o(e,t){var i,o=!1,n=0,r=0;if(t&&t.length>0){t=t.split(/[ ,]+/);var l=$(this).text().toLowerCase(),a=$(this).data("filtertext")||"";for(a=a.toLowerCase(),i=0;i<t.length;i++)t[i]&&t[i].length>0&&(r++,l.indexOf(t[i].toLowerCase(),0)<0&&a.indexOf(t[i].toLowerCase(),0)<0&&n++);r===n&&(o=!0)}return o}function n(e){var t=e.target.files[0];if(t)if(t.type.match("text.*"))if(t.size>5120)c(t.name+" with size "+t.size+" bytes is too big (>5k)");else{var i=new FileReader;i.onload=function(e){var t=e.target.result;$("#edge-batch-text-input").val(t),$("#edge-batch-text-input").textinput("refresh")},i.readAsText(t)}else c(t.name+" is not a valid text file.");else alert("Failed to load file")}function r(e,t){var o='<fieldset data-role="controlgroup" id="edge-userList" data-filter="true" data-filter-placeholder="Search users ...">';$.ajax({url:"./cgi-bin/edge_user_management.cgi",type:"POST",dataType:"json",cache:!1,data:{proj:t,action:e,protocol:location.protocol,sid:sessionStorage.sid},success:function(e){if(e.length>0){$("#edge_confirm_dialog a:contains('Confirm')").show();for(var t=0;t<e.length;t++){var n=e[t].firstname,r=e[t].lastname,l=e[t].email;o+="<input type='checkbox' data-mini='false' name='edge-userList' id='edge-userList_"+t+"' value='"+l+"'><label for='edge-userList_"+t+"'>"+n+" "+r+"</label>"}o+="</fieldset>",$("#edge_confirm_dialog_content").append(o),$("#edge-userList").filterable({children:".ui-checkbox, label, input",filterCallback:i,create:function(){$("#edge-userList").before("<div id='edge-userList-show-allnone-btn' style='margin-left:5%'> Show <a href='#' id='edge-userList-show-all'>All</a> | <a href='#' id='edge-userList-show-none'>None</a> </div>")},filter:function(){$("#edge-userList .ui-checkbox").children("label").each(function(){$(this).hasClass("ui-checkbox-on")&&($(this).removeClass("ui-screen-hidden"),$(this).parent().removeClass("ui-screen-hidden"),$("#edge-userList").controlgroup("refresh"))})}}),$("#edge-userList-show-all").on("click",function(){$("#edge-userList .ui-checkbox").children().removeClass("ui-screen-hidden"),$("#edge-userList .ui-checkbox").removeClass("ui-screen-hidden"),$("#edge-userList").controlgroup("refresh")}),$("#edge-userList-show-none").on("click",function(){$("#edge-userList .ui-checkbox").children().addClass("ui-screen-hidden"),$("#edge-userList .ui-checkbox").addClass("ui-screen-hidden"),$("#edge-userList").controlgroup("refresh")})}else $("#edge_confirm_dialog_content").html("All user have been shared"),$("#edge_confirm_dialog a:contains('Confirm')").hide();$("#edge_confirm_dialog").enhanceWithin().popup("open")},error:function(e){console.log(e),c("ACTION FAILED: Please try again or contact your system administrator.")}})}function l(e){$.ajax({url:"./cgi-bin/edge_report.cgi",type:"POST",dataType:"html",cache:!1,data:{proj:e,sid:sessionStorage.sid},beforeSend:function(){$.mobile.loading("show",{text:"Load...",textVisible:1,html:""})},complete:function(){$.mobile.loading("hide")},success:function(e){console.log("got response"),A.hide(),$("#edge-content-report").html(e),$("#edge-content-report div[data-role='popup']").popup(),$("#edge-content-report > div[data-role='collapsible'] table ").table(),$("#edge-content-report > div[data-role='collapsible']").collapsible(),$("#edge-content-report fieldset[data-role='controlgroup']").controlgroup(),$("#edge-content-report").show(),$("#edge-content-report").find("img").lazyLoadXT(),$("#edge-content-report").find("iframe").lazyLoadXT(),console.log("finished loading"),$(".krona_plot").length?(E&&clearInterval(E),E=setInterval(function(){$("#edge-content-report iframe").each(function(){var e=this,t=$("div[title='Help']",$(e).contents());$(t).size()&&$(t).parent().hide()})},100)):E&&clearInterval(E),console.log("finished krona"),$.getScript("./javascript/edge-output.js").done(function(){}).fail(function(e,t,i){console.log(e,t,i)});var t=$("#edge-content-report").find("p:first").text().match(/Project Status: (.+)/m);"Complete"!=t[1]&&($("#edge-content-report div.ui-grid-a").hide(),$("#edge-content-report div.ui-grid-c").hide())},error:function(){$.mobile.loading("hide"),c("Failed to retrieve the report. Please REFRESH the page and try again.")}})}function a(){$(":radio[name='edge-contig-taxa-sw']").on("change",function(){1==$(this).val()&&0==$("#edge-assembly-sw").val()&&(c("Contig Classification function can only be performed when assembly function turns on."),$("#edge-contig-taxa-sw2").prop("checked",!0))}),$(":radio[name='edge-primer-valid-sw']").on("change",function(){1==$(this).val()&&0==$("#edge-assembly-sw").val()&&(c("Primer validation function can only be performed when assembly function turns on."),$("#edge-primer-valid-sw2").prop("checked",!0))}),$(":radio[name='edge-primer-adj-sw']").on("change",function(){1==$(this).val()&&0==$("#edge-assembly-sw").val()&&(c("Primer design function can only be performed when assembly function turns on."),$("#edge-primer-adj-sw2").prop("checked",!0))}),$(":radio[name='edge-qc-sw']").on("change",function(){0==$(this).val()&&1==$("#edge-pp-sw").val()&&0==$(":radio[name='edge-hostrm-sw']:checked").val()&&(c("At least one function needs to be turned on!"),$("#edge-qc-sw1").click().checkboxradio("refresh"))}),$(":radio[name='edge-hostrm-sw']").on("change",function(){0==$(this).val()&&1==$("#edge-pp-sw").val()&&0==$(":radio[name='edge-qc-sw']:checked").val()&&(c("At least one function needs to be turned on!"),$("#edge-hostrm-sw1").click().checkboxradio("refresh"))}),$("#edge-assembly-sw").on("change",function(){0==$(this).val()&&($("#edge-primer-valid-sw1").is(":checked")&&($("#edge-primer-valid-sw1").prop("checked",!1).checkboxradio("refresh"),$("#edge-primer-valid-sw2").prop("checked",!0).checkboxradio("refresh")),$("#edge-primer-adj-sw1").is(":checked")&&($("#edge-primer-adj-sw1").prop("checked",!1).checkboxradio("refresh"),$("#edge-primer-adj-sw2").prop("checked",!0).checkboxradio("refresh")),$("#edge-contig-taxa-sw1").is(":checked")&&($("#edge-contig-taxa-sw1").prop("checked",!1).checkboxradio("refresh"),$("#edge-contig-taxa-sw2").prop("checked",!0).checkboxradio("refresh")))}),$("#edge-anno-source").hide(),$(":radio[name='edge-anno-tool']").on("change",function(){$("#edge-anno-tool1").is(":checked")&&($("#edge-anno-source").hide(),$("#edge-anno-kingdom").show()),$("#edge-anno-tool2").is(":checked")&&($("#edge-anno-source").show(),$("#edge-anno-kingdom").hide())})}function s(){$(".edge-collapsible-options > select").each(function(){var e=$(this).parents('div[data-role="collapsible"]');$(e).find("input").prop("disabled",!1),$(e).find(".input-type-file select").prop("disabled",!1),$(e).find(".input-type-file div").css("pointer-events","auto"),0==$(this).val()&&($(e).find("input:radio").checkboxradio("refresh"),$(e).find("input").prop("disabled",!0),$(e).find(".input-type-file select").prop("disabled",!0),$(e).find(".input-type-file div").css("pointer-events","none"))})}function d(e){$.ajax({url:e,dataType:"text",cache:!1,success:function(e){if($("#edge-log-view").html(e),$("#log-auto-scroll").is(":checked")){var t=$("#edge_log_dialog pre").prop("scrollHeight");$("#edge_log_dialog pre").scrollTop(t)}},error:function(){$("#edge-log-view").text("No log retrieved from "+e)}})}function c(e){$("#edge_integrity_dialog_content").text(e),$("#edge_integrity_dialog").popup("open")}function p(e){$.ajax({url:"./cgi-bin/edge_projectspage.cgi",type:"POST",dataType:"html",cache:!1,data:{umSystem:P,userType:w,view:e,protocol:location.protocol,sid:sessionStorage.sid},beforeSend:function(){$.mobile.loading("show",{text:"Load...",textVisible:1,html:""})},complete:function(){$.mobile.loading("hide")},success:function(e){A.hide(),$("#edge-project-page").html(e),$("#edge-project-page").show(),$(".edge-project-page-link").each(function(){var e=$(this).attr("data-pid");$(this).off("click").on("click",function(t){t.preventDefault(),l(e),f(e)})}),$("#edge-project-page-admin").on("click",function(){p("admin")}),$("#edge-project-list-filter").filterable({children:$("#edge-project-list-filter").find("tbody").children(),filterCallback:o,filter:function(){$("#edge-project-list-filter .ui-collapsible").each(function(){$(this).find("tbody").children().not(".ui-screen-hidden").size()>0?$(this).collapsible("option","collapsed",!1):$(this).collapsible("option","collapsed",!0)})}}),$("#edge-project-page").enhanceWithin()},error:function(){$.mobile.loading("hide"),$("#edge_integrity_dialog_content").text("Failed to retrieve the report. Please REFRESH the page and try again."),$("#edge_integrity_dialog").popup("open")}})}function f(e){g=e,$.ajax({url:"./cgi-bin/edge_info.cgi",type:"POST",dataType:"json",cache:!1,data:{proj:e,umSystem:P,protocol:location.protocol,sid:sessionStorage.sid},complete:function(){$("#edge-project-list-ul > li").off("click").on("click",function(e){e.preventDefault();var t=$(this).children("a").attr("data-pid");l(t),f(t)}),clearInterval(k),k=setInterval(function(){_>0&&f(e)},T)},success:function(e){if(g=e.INFO.NAME,u=e.INFO.PROJNAME||e.INFO.NAME,h=e.INFO.STATUS,b=e.INFO.TIME,m=e.INFO.PROJTYPE,S=0,_=0,I=0,$("#cpu-usage-bar").val(e.INFO.CPUU).slider("refresh"),$("#mem-usage-bar").val(e.INFO.MEMU).slider("refresh"),$("#disk-usage-bar").val(e.INFO.DISKU).slider("refresh"),$("#cpu-usage-val").html(e.INFO.CPUU+" %"),$("#mem-usage-val").html(e.INFO.MEMU+" %"),$("#disk-usage-val").html(e.INFO.DISKU+" %"),m&&(m.toLowerCase().indexOf("shared")>=0?$("#action-unshare-btn").parent().show():$("#action-unshare-btn").parent().hide(),m.toLowerCase().indexOf("publish")>=0?$("#action-publish-btn").attr("data","unpublish").text("Make project private"):$("#action-publish-btn").attr("data","publish").text("Make project public"),m.toLowerCase().indexOf("guest")>=0&&!j?$("#action-share-btn").parent().parent().hide():$("#action-share-btn").parent().parent().show()),$.isEmptyObject(e.LIST))$("#edge-project-list-ul .edge-proj-list-li").remove();else{$("#edge-project-list-ul .edge-proj-list-li").remove();var t=Object.keys(e.LIST);t.sort(function(t,i){return e.LIST[t].TIME<e.LIST[i].TIME?-1:e.LIST[t].TIME>e.LIST[i].TIME}).reverse(),$.each(t,function(t,i){var o=e.LIST[i];if(o.NAME){var n=o.PROJNAME,r=o.NAME,l=o.TIME,a=o.STATUS;n||(n=r);var s="white",d=o.DESC||"No description";switch(d=d+" ("+a+")",a){case"finished":projClass="edge-time-bg-green",projIcon="ui-icon-check",S++;break;case"running":projClass="edge-time-bg-orange",projIcon="ui-icon-load",_++;break;case"failed":projClass="edge-time-bg-red",projIcon="ui-icon-delete",I++;break;default:projClass="edge-time-bg-grey",projIcon="ui-icon-refresh"}g==r&&(s="yellow");var c="<li class='edge-proj-list-li'><div class='edge-project-time "+projClass+"'>"+l+"</div><a href='' style='color:"+s+"' class='edge-project-list ui-btn ui-btn-icon-right "+projIcon+"' title='"+d+"' data-pid='"+r+"'>"+n+"</a></li>";$(c).appendTo("#edge-project-list-ul")}})}if(0==$(".edge-proj-list-li").size()){var i="<li class='edge-proj-list-li'><a href='#' class='edge-project-list ui-btn ui-btn-icon-right ui-icon-check'>No project found</a></li>";$("#edge-project-list-ul").append(i)}if($.isEmptyObject(e.PROG))$("#edge-progress-ul > li").remove();else{$("#edge-progress-ul > li").fadeOut().remove();var o=e.INFO.PROJNAME||e.INFO.NAME,i="<li data-role='list-divider'>"+o+"</li>";$("#edge-progress-ul").append(i);var t=Object.keys(e.PROG);t.sort(function(e,t){return parseInt(e)-parseInt(t)}),v=100,$.each(t,function(t,o){var n=e.PROG[o],r=n.NAME,l=n.STATUS;switch(l){case"skip":return!0;case"finished":projIcon="ui-icon-forward edge-icon-bg-green",projText="Result exists. Skipped this step.";break;case"running":v=parseInt(o),projIcon="ui-icon-recycle edge-icon-bg-orange",projText="Running";break;case"done":projIcon="ui-icon-check edge-icon-bg-green",projText="Complete";break;case"failed":v=parseInt(o),projIcon="ui-icon-delete edge-icon-bg-red",projText="Failed";break;default:projIcon="ui-icon-clock",projText="Incomplete"}i="<li><a href='#' class='ui-btn ui-btn-icon-right "+projIcon+"' title='"+projText+"'>"+r+"</a></li>",$("#edge-progress-ul").append(i)}),i="<li data-role='list-divider' class='edge-proj-last-check'>Last checked: "+e.INFO.TIME+"</li>",100==v&&"finished"!=h&&$("#edge-progress-ul").find(".ui-icon-forbidden").removeClass("edge-icon-bg-green"),$("#edge-progress-ul").append(i),$("#edge-submit-info").listview("refresh"),$("#edge-progress-ul").listview("refresh"),$("#edge-project-list-ul").listview("refresh")}},error:function(){$("#edge-submit-info").fadeIn("fast");var e="<li data-icon='delete' data-theme='c' class='list-info-delete'><a href='#'>FAILED to retrieve project info. Please check server error log for detail.</a></li>";$("#edge-submit-info").append(e)}})}var g,u,h,m,b,v,k,y,x,w,j=!0,_=0,S=0,I=0,T=5e3,C="/",P=sessionStorage.umStatus||!1,O=sessionStorage.umURL,L=$(this),A=$(".edge-main-page");$(".no-show-logout").hide(),sessionStorage.umStatus?(t(),$("#edge-project-page-li").text("Public Project List")):e(),$("#edge-user-btn").on("click",function(){$("#signInForm").popup("open")}),sessionStorage.sid&&""!=sessionStorage.sid&&"undefined"!=sessionStorage.sid&&($(".no-show-login").hide(),$(".no-show-logout").show(),firstname=sessionStorage.fnname,w=sessionStorage.userType,$("#edge-user-btn").removeClass("ui-btn-icon-notext").addClass("ui-btn-icon-left edge-user-btn-login"),$("#edge-user-btn").html(sessionStorage.fnname),$("#edge-project-page-li").text("My Project List"),$("#edge-user-btn").unbind("click").on("click",function(){$("#popupUser").popup("open")})),s(),a(),f(g),A.hide(),$("#edge-content-home").fadeIn(),$("a[href=#edge-content-home]").on("click",function(){A.hide(),$("#edge-content-home").fadeIn(),L.find(".edge-navmenu-panel:not(.edge-panel-page-nav)").panel("close")}),$("a[href=#edge-content-pipeline]").on("click",function(){A.hide(),$("#edge-submit-info").children().remove(),$("#edge-content-pipeline").fadeIn("fast",function(){P&&""==sessionStorage.sid&&c("Please login to run EDGE.")}),L.find(".edge-navmenu-panel:not(.edge-panel-page-nav)").panel("close")}),$("#chck-rememberme").click(function(){$("#chck-rememberme").is(":checked")?(localStorage.usrname=$("#signIn-email").val(),localStorage.chkbx=$("#signIn-email").val()):(localStorage.usrname="",localStorage.chkbx="")}),$("#signInForm").popup({afteropen:function(){localStorage.chkbx&&""!=localStorage.chkbx?($("#chck-rememberme").prop("checked",!0),$("#signIn-email").val(localStorage.usrname),$("#signIn-password").focus()):($("#chck-rememberme").prop("checked",!1),$("#signIn-email").focus())}},{positionTo:"window"},{transition:"fade"}),$("#popupUser").popup({positionTo:"#edge-user-btn"},{transition:"slidedown"}),$("#signInForm").keypress(function(e){var t=e.which;return 13==t?($("#signIn-submit-btn").click(),!1):void 0}),$("#signIn-submit-btn").on("click",function(e){e.preventDefault(),username=$("#signIn-email").val(),password=$("#signIn-password").val(),0==username.length&&$("#signIn-email").addClass("highlight"),0==password.length&&$("#signIn-password").addClass("highlight"),username&&password&&($("#signInForm").popup("close"),$.ajax({type:"POST",url:"./cgi-bin/edge_user_management.cgi",dataType:"json",cache:!1,data:{username:username,password:password,action:"login",protocol:location.protocol},error:function(){c("Failed to login in. Please check server error log for detail.")},success:function(e){e.status?(A.hide(),$("#edge-content-home").fadeIn(),$(".no-show-login").hide(),$(".no-show-logout").fadeIn("fast"),sessionStorage.fnname=e.firstname,sessionStorage.userType=e.type,sessionStorage.sid=e.SESSION,w=e.type,$("#edge-user-btn").removeClass("ui-btn-icon-notext").addClass("ui-btn-icon-left edge-user-btn-login"),$("#edge-user-btn").html(sessionStorage.fnname),$("#edge-project-page-li").text("My Project List"),$("#edge-content-home").find(".error").remove(),$("#popupUser").removeClass("highlight"),$("#edge-user-btn").unbind("click").bind("click",function(){$("#popupUser").popup("open")}),f(g)):(password="",$("#dlg-invalid-credentials").popup("open"),$("#dlg-invalid-credentials").on("popupafterclose",function(){$("#signInForm").popup("open")}))}}))}),$("#resetPasswd-link").on("click",function(){$("#signInForm").popup("close"),setTimeout(function(){$("#begin-password-reset").popup("open")},300)}),$("#signUpBtn").on("click",function(){$("#signInForm").popup("close"),setTimeout(function(){$("#signUpForm").popup("open")},300)}),$("#signUp-submit-btn").on("click",function(){$("#signUpForm").popup("close"),setTimeout(function(){$("#dlg-sign-up-sent").popup("open").css("width","480px")},300)}),$("#UpdateProfileBtn").on("click",function(){$("#popupUser").popup("close"),setTimeout(function(){$("#UpdateProfileForm").popup("open"),$("#iframe-UpdateProfileForm").contents().find("input[name=email]").val(username),$("#iframe-UpdateProfileForm").contents().find("input[name=password]").val(password),$("#iframe-UpdateProfileForm").contents().find("#login-form").submit(),setTimeout(function(){$("#iframe-UpdateProfileForm").attr("src",function(e,t){return t})},300)},300)}),$("#updateProfile-submit-btn").on("click",function(){$("#UpdateProfileForm").popup("close"),$("#edge_inegrity_dialog_header").text("Message"),$("#edge_integrity_dialog_content").text("Your Profile have been Update."),setTimeout(function(){$("#edge_integrity_dialog").popup("open")},300)}),$("#signOutBtn").on("click",function(){$.ajax({type:"POST",url:"./cgi-bin/edge_user_management.cgi",dataType:"json",cache:!1,data:{action:"logout",protocol:location.protocol,sid:sessionStorage.sid},error:function(){c("Failed to login in. Please check server error log for detail.")},complete:function(){$("#popupUser").popup("close"),sessionStorage.clear(),username="",password="",w="",A.hide(),$("#edge-content-home").fadeIn(),$(".no-show-login").fadeIn("fast"),$(".no-show-logout").hide(),$("#edge-user-btn").addClass("ui-btn-icon-notext").removeClass("edge-user-btn-login"),$("#edge-user-btn").html("User"),$("#edge-project-page-li").text("Public Project List"),setTimeout(function(){f(g)},5),$("#edge_integrity_dialog_header").text("Message"),$("#edge_integrity_dialog_content").text("You have been logged out successfully."),setTimeout(function(){$("#edge_integrity_dialog").popup("open")},300),$("#edge-user-btn").unbind("click").on("click",function(){$("#signInForm").popup("open")})}})}),$(".edge-popup-close").on("click",function(e){e.preventDefault(),$(this).parent().popup("close"),location.href=location.href.split("#")[0]}),$(".edge-logo").find("a").on("click",function(e){e.preventDefault(),location.href=location.href.split("#")[0]}),$("#edge-input-options").hide(),$("#edge-input-toggle").on("click",function(){$("#edge-input-options").toggle()}),$("#edge-sra-input-block").hide(),$(":radio[name='edge-sra-sw']").on("change",function(){1==$(this).val()?($("#edge-sra-input-block").fadeIn("fast"),$("#edge-file-input-block").hide(),$(".btnAdd-edge-input").hide()):($("#edge-sra-input-block").fadeOut("fast"),$("#edge-file-input-block").fadeIn("fast"),$(".btnAdd-edge-input").fadeIn("fast"),$("#edge-sra-acc").val(""))}),$("#edge-batch-sample-input").click(function(e){e.preventDefault();var t='#each unique project name in the bracket []\n[Project1]\n#q1=/path/to/paired_end_file_1\nq1=edgeui_input/testData/Ecoli_10x.1.fastq\n#q2=/path/to/paired_end_file_2\nq2=edgeui_input/testData/Ecoli_10x.2.fastq\ndescription="test batch input project 1"\n';t+='[Project2]\n#s=/path/to/single_end_file\ns=edgeui_input/testData/Ecoli_10x.1.fastq\ndescription="test batch input project 2"\n',$("#edge-batch-text-input").val(t),$("#edge-batch-text-input").textinput("refresh")}),$("input[id=edge-batch-file-input]").on("change",n),$("input[id$='usage-bar']").each(function(){$(this).parent().find("input").hide(),$(this).parent().find(".ui-slider-handle").remove(),$(this).parent().find(".ui-slider-track").css("margin","0 15px 0 15px").css("pointer-events","none")}),$("#edge_file_tree").fileTree({root:C,script:"./cgi-bin/jqueryFileTree.cgi"},function(e){$("#"+x).val(e),$("#edge_file_dialog").popup("close")}),$(".edge-file-selector").on("click",function(){x=$(this).prevAll().children().prop("id")}),$(".ui-btn.ui-input-clear").on("click",function(){var e=$(this).prev("input").prop("defaultValue");$(this).prev("input").val(e)}),$("#btnAdd-edge-input-se").click(function(e){e.preventDefault();var t=$(".edge-input-se-block").length,i=new Number(t+1),o=$("#edge-input-se-block"+t).clone().attr("id","edge-input-se-block"+i);o.find("label").attr("for","edge-input-se"+i).text("Single-end FASTQ file ("+i+")"),o.find("input").attr("id","edge-input-se"+i).attr("name","edge-input-se[]"),o.find(".btnDel-edge-input-se").css("visibility","visible"),$("#edge-input-se-block"+t).after(o),o.find(".edge-file-selector").on("click",function(){x="edge-input-se"+i}),o.find(".btnDel-edge-input-se").on("click",function(){$("#edge-input-se-block"+i).remove(),$("#btnAdd-edge-input-se").removeClass("ui-disabled")}),5==i&&$("#btnAdd-edge-input-se").addClass("ui-disabled")}),$("#btnAdd-edge-input-pe").click(function(e){e.preventDefault();var t=$(".edge-input-pe-block").length,i=new Number(t+1),o=$("#edge-input-pe-block"+t).clone().attr("id","edge-input-pe-block"+i);o.find("label:first").attr("for","edge-input-pe1-"+i).text("Pair-1 FASTQ file ("+i+")"),o.find("input:first").attr("id","edge-input-pe1-"+i).attr("name","edge-input-pe1[]"),o.find("label:last").attr("for","edge-input-pe2-"+i).text("Pair-2 FASTQ file ("+i+")"),o.find("input:last").attr("id","edge-input-pe2-"+i).attr("name","edge-input-pe2[]"),o.find(".btnDel-edge-input-pe").css("visibility","visible"),$("#edge-input-pe-block"+t).after(o),o.find(".edge-file-selector").on("click",function(){x=$(this).prevAll().children().prop("id")}),o.find(".btnDel-edge-input-pe").on("click",function(){$("#edge-input-pe-block"+i).remove(),$("#btnAdd-edge-input-pe").removeClass("ui-disabled")}),5==i&&$("#btnAdd-edge-input-pe").addClass("ui-disabled")}),$(".btnAdd-edge-phylo-ref-file").click(function(e){e.preventDefault();var t=$(".edge-phylo-ref-file-block").length;console.log(t);var i=new Number(t+1),o=$("#edge-phylo-ref-file-block"+t).clone().attr("id","edge-phylo-ref-file-block"+i);o.find("label:first").attr("for","edge-phylo-ref-file-"+i).text("Add Genome FASTA ("+i+")"),o.find("input:first").attr("id","edge-phylo-ref-file-"+i).attr("name","edge-phylo-ref-file"),o.find(".btnAdd-edge-phylo-ref-file").remove(),$("#edge-phylo-ref-file-block"+t).after(o),o.find(".edge-file-selector").on("click",function(){x=$(this).prevAll().children().prop("id")}),5==i&&$(".btnAdd-edge-phylo-ref-file").addClass("ui-disabled")}),$.getJSON("data/host_list.json",function(e){var t=Object.keys(e);t.sort(),$.each(t,function(e,t){var i=t;i=i.replace(/_/g," "),$("#edge-hostrm-file-fromlist").append($("<option value="+t+">"+i+"</option>"))}),$("#edge-hostrm-file-fromlist").selectmenu("refresh")}),$.mobile.document.on("listviewcreate","#filter-menu-menu,#edge-hostrm-file-fromlist-menu",function(e){var t,i=$(e.target),n=i.jqmData("filter-form");n||(t=$("<input data-type='search'></input>"),n=$("<form></form>").append(t),t.textinput(),i.before(n).jqmData("filter-form",n),n.jqmData("listview",i)),i.filterable({input:t,children:"> li:not(:jqmData(placeholder='true'))",filterCallback:o})}).on("pagecontainerbeforeshow",function(e,t){var i,o,n=t.toPage&&t.toPage.attr("id");("filter-menu-dialog"===n||"edge-hostrm-file-fromlist-dialog"===n)&&(i=t.toPage.find("ul"),o=i.jqmData("filter-form"),t.toPage.jqmData("listview",i),i.before(o))}).on("pagecontainerhide",function(e,t){var i,o,n=t.toPage&&t.toPage.attr("id");("filter-menu-dialog"===n||"edge-hostrm-file-fromlist-dialog"===n)&&(i=t.toPage.jqmData("listview"),o=i.jqmData("filter-form"),i.before(o))}),$("#edge-ref-file-fromlist-listbox").popup({afteropen:function(){var e=$("#edge-ref-file-fromlist option").size();2>e&&($.mobile.loading("show",{text:"Loading Genome List...",textVisible:1}),$.getJSON("data/SNP_ref_list.json",function(e){function t(){for(var e=r;e--&&n<i.length;){var l=i[n];l=l.replace(/_uid\d+$/,""),o[n]="<option value="+l+">"+l+"</option>",n++}n<i.length&&setTimeout(t(),3)}var i=Object.keys(e);i.sort();var o=[],n=0,r=100;t(),o[n]="<option id='no-results' disabled>No results found.</option>",$("#edge-ref-file-fromlist").append(o.join("")),$("#edge-ref-file-fromlist").selectmenu("refresh"),$.mobile.loading("hide")}))}}),$.mobile.document.on("listviewcreate","#filter-menu-menu,#edge-ref-file-fromlist-menu",function(e){var t,o=$(e.target),n=$("#edge-ref-file-fromlist-listbox"),r=n.jqmData("filter-form");r||(t=$("<input data-type='search' placeholder='ex: Escherichia'></input>"),select="<div id='edge-ref-file-fromlist-allnone-btn' style='float:right;margin-right:5%'> Select <a href='#' id='edge-ref-file-fromlist-all'>All</a> | <a href='#' id='edge-ref-file-fromlist-none'>None</a> </div>",r=$("<form></form>").append(t).append(select),t.textinput(),n.jqmData("filter-form",r),o.before(r),r.jqmData("listview",o),$("#edge-ref-file-fromlist-menu").css("display","inline-block")),o.filterable({input:t,children:"> li:not(:jqmData(placeholder='true'))",filterCallback:i,filter:function(){0===o.children(":visible").not("#no-results").length?(o.children().last().removeClass("ui-screen-hidden"),$("#edge-ref-file-fromlist-allnone-btn").hide()):(o.children().last().addClass("ui-screen-hidden"),$("#edge-ref-file-fromlist-allnone-btn").show())}}),$("#edge-ref-file-fromlist-none").click(function(){o.children().not(".ui-screen-hidden").children("a").removeClass("ui-checkbox-on"),o.children().not(".ui-screen-hidden").children("a").addClass("ui-checkbox-off"),o.children().not(".ui-screen-hidden").each(function(){var e=$(this).index();$("#edge-ref-file-fromlist option").eq(e).removeAttr("selected")}),$("#edge-ref-file-fromlist").selectmenu("refresh")}),$("#edge-ref-file-fromlist-all").click(function(){o.children().not(".ui-screen-hidden").children("a").removeClass("ui-checkbox-off"),o.children().not(".ui-screen-hidden").children("a").addClass("ui-checkbox-on"),o.children().not(".ui-screen-hidden").each(function(){{var e=$(this).index();$("#edge-ref-file-fromlist option").eq(e).attr("selected","selected")}}),$("#edge-ref-file-fromlist").selectmenu("refresh")}),$("#edge-ref-file-fromlist-listbox").on("popupafterclose",function(){$("#edge-ref-file-fromlist option:selected").length>50&&($("#edge_integrity_dialog_content").text("Select more than 50 reference genome may slow the process..."),setTimeout(function(){$("#edge_integrity_dialog").popup("open")},100))})}).on("pagebeforeshow pagehide","#edge-ref-file-fromlist-dialog",function(e){{var t=$("#edge-ref-file-fromlist-listbox").jqmData("filter-form"),i="pagebeforeshow"===e.type;i?$(e.target).find(".ui-content"):$("#edge-ref-file-fromlist-menu")}t.find("input").textinput().end().insertBefore($("#edge-ref-file-fromlist-menu")),$("#edge-ref-file-fromlist option:selected").length>50&&"pagehide"===e.type&&($("#edge_integrity_dialog_content").text("Select more than 50 reference genome may slow the process..."),setTimeout(function(){$("#edge_integrity_dialog").popup("open")},500))}),$("#edge-phylo-ref-select-listbox").popup({afteropen:function(){var e=$("#edge-phylo-ref-select option").size();2>e&&($.mobile.loading("show",{text:"Loading Genome List...",textVisible:1}),$.getJSON("data/SNP_ref_list.json",function(e){function t(){for(var e=r;e--&&n<i.length;){var l=i[n];l=l.replace(/_uid\d+$/,""),o[n]="<option value="+l+">"+l+"</option>",n++}n<i.length&&setTimeout(t(),3)}var i=Object.keys(e);i.sort();var o=[],n=0,r=100;t(),o[n]="<option id='no-results' disabled>No results found.</option>",$("#edge-phylo-ref-select").append(o.join("")),$("#edge-phylo-ref-select").selectmenu("refresh"),$.mobile.loading("hide")}))}}),$.mobile.document.on("listviewcreate","#filter-menu-menu,#edge-phylo-ref-select-menu",function(e){var t,o=$(e.target),n=$("#edge-phylo-ref-select-listbox"),r=n.jqmData("filter-form");r||(t=$("<input data-type='search' placeholder='ex: Escherichia'></input>"),select="<div id='edge-phylo-ref-select-allnone-btn' style='float:right;margin-right:5%'> Select <a href='#' id='edge-phylo-ref-select-all'>All</a> | <a href='#' id='edge-phylo-ref-select-none'>None</a> </div>",r=$("<form></form>").append(t).append(select),t.textinput(),n.jqmData("filter-form",r),o.before(r),r.jqmData("listview",o),$("#edge-phylo-ref-select-menu").css("display","inline-block")),o.filterable({input:t,children:"> li:not(:jqmData(placeholder='true'))",filterCallback:i,filter:function(){0===o.children(":visible").not("#no-results").length?(o.children().last().removeClass("ui-screen-hidden"),$("#edge-phylo-ref-select-allnone-btn").hide()):(o.children().last().addClass("ui-screen-hidden"),$("#edge-phylo-ref-select-allnone-btn").show())}}),$("#edge-phylo-ref-select-none").click(function(){o.children().not(".ui-screen-hidden").children("a").removeClass("ui-checkbox-on"),o.children().not(".ui-screen-hidden").children("a").addClass("ui-checkbox-off"),o.children().not(".ui-screen-hidden").each(function(){var e=$(this).index();$("#edge-phylo-ref-select option").eq(e).removeAttr("selected")}),$("#edge-phylo-ref-select").selectmenu("refresh")}),$("#edge-phylo-ref-select-all").click(function(){o.children().not(".ui-screen-hidden").children("a").removeClass("ui-checkbox-off"),o.children().not(".ui-screen-hidden").children("a").addClass("ui-checkbox-on"),o.children().not(".ui-screen-hidden").each(function(){{var e=$(this).index();$("#edge-phylo-ref-select option").eq(e).attr("selected","selected")}}),$("#edge-phylo-ref-select").selectmenu("refresh")}),$("#edge-phylo-ref-select-listbox").on("popupafterclose",function(){$("#edge-phylo-ref-select option:selected").length>50&&($("#edge_integrity_dialog_content").text("Select more than 50 reference genome may slow the process..."),setTimeout(function(){$("#edge_integrity_dialog").popup("open")},100))})}).on("pagebeforeshow pagehide","#edge-phylo-ref-select-dialog",function(e){{var t=$("#edge-phylo-ref-select-listbox").jqmData("filter-form"),i="pagebeforeshow"===e.type;i?$(e.target).find(".ui-content"):$("#edge-phylo-ref-select-menu")}t.find("input").textinput().end().insertBefore($("#edge-phylo-ref-select-menu")),$("#edge-phylo-ref-select option:selected").length>50&&"pagehide"===e.type&&($("#edge_integrity_dialog_content").text("Select more than 50 reference genome may slow the process..."),setTimeout(function(){$("#edge_integrity_dialog").popup("open")
},500))}),$(".edge-collapsible-options > select").on("change",function(){s()}),$("#edge-all-on-btn").on("click",function(){L.find(".edge-collapsible-options > select").val(1).slider("refresh"),s()}),$("#edge-all-exp-btn").on("click",function(){L.find('div[data-role="collapsible"]').collapsible("option","collapsed",!1)}),$("#edge-all-close-btn").on("click",function(){L.find('div[data-role="collapsible"]').collapsible("option","collapsed",!0)}),$("#edge-form-reset").on("click",function(){L.find("form")[0].reset(),$(".ui-select select").val("").selectmenu("refresh"),s()}),$(".edge-collapsible-options div.ui-slider-switch").on("mouseover",function(){$(this).parents('div[data-role="collapsible"]').collapsible("disable")}),$(".edge-collapsible-options div.ui-slider-switch").on("mouseout",function(){$(this).parents('div[data-role="collapsible"]').collapsible("enable")}),$("#edge-view-log-btn").on("mouseover",function(){d("./EDGE_output/"+g+"/process_current.log")}),$("#edge_log_dialog").popup({beforeposition:function(){d("./EDGE_output/"+g+"/process_current.log")},afteropen:function(){"finished"!=h&&(y=setInterval(function(){d("./EDGE_output/"+g+"/process_current.log"),"finished"==h&&clearInterval(y)},T))},afterclose:function(){clearInterval(y)}}),$("a[id^='action']").on("click",function(){var e=$(this).attr("data"),t="Do you want to <span id='action_type'>"+e.toUpperCase()+"</span> project "+u+"?";e.indexOf("publish")<0&&(t+="<p>This action can not be undone.</p>"),"share"==e||"unshare"==e?($("#edge_confirm_dialog_content").html("<span id='action_type'>"+e.toUpperCase()+"</span> project "+u+" to"),r(e,g)):$("#edge_confirm_dialog_content").html(t)}),$("#edge_confirm_dialog").popup({afterclose:function(){f(g)}}),$("#edge_confirm_dialog a:contains('Confirm')").on("click",function(){var e=$("#edge_confirm_dialog_content > span").html(),t=[];$("#edge-userList .ui-checkbox").children("label").each(function(){$(this).hasClass("ui-checkbox-on")&&t.push($(this).next().val())});var i=t.join(",");$.ajax({url:"./cgi-bin/edge_action.cgi",type:"POST",dataType:"json",cache:!1,data:{proj:g,action:e,shareEmail:i,protocol:location.protocol,sid:sessionStorage.sid},beforeSend:function(){$.mobile.loading("show",{text:"Executing "+e.toUpperCase()+" command...",textVisible:1,html:""})},complete:function(){$.mobile.loading("hide"),f(g)},success:function(e){"SUCCESS"==e.STATUS?($.mobile.loading("hide"),c(e.INFO)):($.mobile.loading("hide"),c(e.INFO))},error:function(){$.mobile.loading("hide"),c("ACTION FAILED: Please try again or contact your system administrator.")}})}),$(".edge-navmenu-panel ul").listview(),$(".edge-navmenu-link").on("click",function(){L.find(".edge-navmenu-panel:not(.edge-panel-page-nav)").panel("open")}),$("div.edge-action-panel").panel({beforeopen:function(){f(g)}}),$(".edge-action-link").on("click",function(){L.find(".edge-action-panel").panel("open")});var E;$("#edge-form-submit").on("click",function(){if(P&&""==sessionStorage.sid)return void c("Please login to run EDGE.");var e=$("#edge-proj-name").val();$.ajax({url:"./cgi-bin/edge_submit.cgi",type:"POST",dataType:"json",cache:!1,data:L.find("form").serialize()+"&"+$.param({protocol:location.protocol,sid:sessionStorage.sid}),beforeSend:function(){$(".list-info, .list-info-delete").fadeOut().remove(),L.find("input").removeClass("highlight"),$.mobile.loading("show",{text:"submitting...",textVisible:1,html:""})},complete:function(){$.mobile.loading("hide"),$("#edge-submit-info").listview("refresh")},success:function(t){if($.each(t,function(t){if("PARAMS"!=t&&"SUBMISSION_STATUS"!=t){var i;"failure"==this.STATUS?i="<li data-icon='delete' data-theme='c' class='list-info-delete'><a href='#'>"+t+": "+this.NOTE+"</a></li>":(i="<li data-icon='info' class='list-info'><a href='#'>"+t+": "+this.NOTE+"</a></li>","PROJECT_NAME"==t&&(e=this.NOTE.split(" ").pop())),$("#edge-submit-info").append(i).fadeIn("fast")}}),"success"==t.SUBMISSION_STATUS){$("#edge-submit-info").fadeIn("fast");var i="<li data-icon='info' class='list-info'><a href='#'>The job has been submitted successfully. Click to see open progress panel.</a></li>";$(i).on("click",function(){L.find(".edge-action-panel").panel("open")}).appendTo("#edge-submit-info"),f(e)}else $.isEmptyObject(t.PARAMS)||$.each(t.PARAMS,function(e,t){$("#"+e).addClass("highlight"),$("#"+e).parents('div[data-role="collapsible"]').collapsible("option","collapsed",!1),$("#edge-submit-info").fadeIn("fast");var i=$("label[for='"+e+"']").text(),o="<li data-icon='delete' data-theme='c' class='list-info-delete'><a href='#'>"+i+": "+t+"</a></li>";$(o).appendTo("#edge-submit-info").on("click",function(){$("html, body").animate({scrollTop:$("#"+e).offset().top-80},200)})});if($(".list-info, .list-info-delete").size()){var o=$("#edge-submit-info").outerHeight(),n=parseInt(o)+100;$("html, body").animate({scrollTop:"+="+n+"px"},500)}},error:function(){$("#edge-submit-info").fadeIn("fast");var e="<li data-icon='delete' data-theme='c' class='list-info-delete'><a href='#'>FAILED to run submission CGI. Please check server error log for detail.</a></li>";$("#edge-submit-info").append(e).fadeIn("fast")}})}),$("#edge-project-page-li").on("click",function(){p("user")}),$("#edge-project-list-ul").filterable({filterCallback:o})});